import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ValidatorService } from 'src/shared/services/validator.service';
import { ClientInterface } from './interfaces/client.interface';
import { DocumentService } from '@/pages/document/services/document.service';
import { Subject, takeUntil } from 'rxjs';
import { Param, ResponseMessage } from 'src/shared/interfaces/base.interface';
import { ClientService } from './services/client.service';
import { TooltipModule } from 'primeng/tooltip';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    MultiSelectModule, 
    ReactiveFormsModule,
    SelectModule,
    ToolbarModule,
    TagModule,
    TableModule,
    ToastModule,
    TooltipModule,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './client.html',
  styleUrl: './client.scss',
  providers: [ConfirmationService,MessageService]
})
export class Client implements OnInit, OnDestroy{
  private clientService = inject(ClientService);
  private documentService = inject(DocumentService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private validatorService = inject(ValidatorService);

  client = signal<ClientInterface[]>([]);
  documentTypes = signal<Param[]>([]);

  clientDialog: boolean = false;
  clientSelect: ClientInterface | null = null;

  clientForm!: FormGroup;

  private _destroyer$ = new Subject<void>();

  constructor(){}

  ngOnInit(): void {
    this.initForm();
    this.loadClient();
  }

  ngOnDestroy(): void {
    this._destroyer$.next();
    this._destroyer$.complete();
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.clientForm, field);
  }
  getErrors(field: string) {
    return this.validatorService.getFieldError(this.clientForm, field);
  }

  initForm(){
    this.clientForm = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      telephone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
      addres: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]]
    })
    this.clientForm.reset();
  }

  openNew(){
    this.clientSelect = null;
    this.clientForm.reset()
    this.clientDialog = true;
  }

  saveClient(){
    if(this.clientForm.invalid){
      this.clientForm.markAllAsTouched();
      return;
    }
    const formValue = this.clientForm.value as {documentTypeId:string; documentNumber:string; firstName:string; lastName:string; email:string; telephone:string; addres:string}
    const $req = this.clientSelect ? this.clientService.updateClient(this.clientSelect.id, formValue) : this.clientService.postClient(formValue);
    $req.pipe(takeUntil(this._destroyer$)).subscribe({
      next:(response:ResponseMessage)=>{
        this.messageService.add({ severity: response.severity, summary: response.summary, detail: response.detail, life: response.life })
        if(response.status === 201){
          this.hideDialog();
          this.loadClient();
          this.clientSelect = null;
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro crear el cliente', life: 8000 })
      }
    })
  }

  changeUser(id: string){
    this.clientService.deleteClient(id).pipe(takeUntil(this._destroyer$)).subscribe({
      next:(response:ResponseMessage)=>{
        this.messageService.add({ severity: response.severity, summary: response.summary, detail: response.detail, life: response.life });
        if(response.status === 201){
          this.loadClient();
        }
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cambiar el estado del cliente', life: 8000 })
      }
    })
  }

  openEdit(client:ClientInterface):void{
    this.clientSelect = client;
    this.clientForm.patchValue({
      documentTypeId: client.documentTypeId,
      documentNumber: client.documentNumber,
      firstName:      client.firstName,
      lastName:       client.lastName,
      email:          client.email,
      telephone:      client.telephone,
      addres:         client.addres
    })
    this.clientDialog = true;
  }

  loadClient():void{
    this.clientService.getClient().pipe(takeUntil(this._destroyer$)).subscribe({
      next:(client)=>{
        this.client.set(client);
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cargar los datos de los clientes', life: 8000 })
      }
    })
  }

  hideDialog():void{
    this.clientForm.reset();
    this.clientDialog = false;
  }


  getSeverity(status: boolean): 'success' | 'danger' {
    return status ? 'success' : 'danger';
  }
}
