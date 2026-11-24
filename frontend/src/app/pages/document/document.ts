import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DocumentService } from './services/document.service';
import { Param } from 'src/shared/interfaces/base.interface';
import { Subject, takeUntil } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-document',
  imports: [TableModule, ToastModule],
  templateUrl: './document.html',
  styleUrl: './document.scss',
  providers: [MessageService]
})
export class Document implements OnInit, OnDestroy{
  private documentService = inject(DocumentService);
  private messageService = inject(MessageService);

  document = signal<Param[]>([]);

  private _destroyer$ = new Subject<void>();

  constructor(){}

  ngOnInit(): void {
    this.loadDocument();
  }

  ngOnDestroy(): void {
    this._destroyer$.next();
    this._destroyer$.complete();
  }

  private loadDocument():void{
    this.documentService.getDocument().pipe(takeUntil(this._destroyer$)).subscribe({
      next: (document)=>{
        this.document.set(document)
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cargar los datos de los documentos', life: 8000 })
      }
    })
  }
}
