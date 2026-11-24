import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ){}
  async create(createClientDto: CreateClientDto) {
    const {documentNumber } = createClientDto;
    const exists = await this.clientRepository.findOne({
      where: { documentNumber }
    });
    if(exists){
      return {
        severity: 'warn',
        summary: 'Alerta',
        detail: 'Este número de documento ya se encuentra en uso.',
        life: 2000,
      };
    }
    const client = this.clientRepository.create(createClientDto);
    await this.clientRepository.save(client)
    return {
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cliente registrado correctamente.',
      life: 3000,
      status: 201
    };
  }

  async findAll(isActive?: boolean) {
    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive;
    }
    return await this.clientRepository.find({
      where
    });
  }

  async findOne(id: string) {
    return await this.clientRepository.findOne({ where: {id} })
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
