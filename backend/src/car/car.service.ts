import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ){}
  async create(createCarDto: CreateCarDto) {
    const car = await this .carRepository.create({
      ...createCarDto
    });
    await this.carRepository.save(car);
    return {
      severity: 'success',
      summary: 'Éxito',
      detail: 'Carro registrado correctamente.',
      life: 3000,
      status: 201
    };
  }

  async findAll() {
    return await this.carRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
