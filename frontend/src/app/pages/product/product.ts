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
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Categorie, ResponseMessage } from 'src/shared/interfaces/base.interface';

import { ValidatorService } from 'src/shared/services/validator.service';
import { CategoryService } from '../category/services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { SupplierService } from '../supplier/services/supplier.service';
import { SupplierInterface } from '../supplier/interfaces/supplier.interface';
import { ProductInterface, ProductResponse } from './interfaces/product.interface';
import { ProductService } from './services/product.service';
import { ThemeUtils } from '@primeuix/themes';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product',
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
    TextareaModule,
    InputNumberModule,
    UpperCasePipe,
    DecimalPipe,
    TooltipModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  providers: [ConfirmationService,MessageService]
})
export class Product implements OnInit, OnDestroy {
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private validatorService = inject(ValidatorService);

  product = signal<ProductInterface[]>([]);
  category = signal<Categorie[]>([]);
  supplier = signal<SupplierInterface[]>([]);

  productDialog: boolean = false;
  productSelect: ProductInterface | null = null;

  productForm!: FormGroup;

  private _destroyer$ = new Subject<void>();

  constructor(){}

  ngOnInit(): void {
    this.initForm(); 
    this.loadCategory();
    this.loadSupplier();
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this._destroyer$.next();
    this._destroyer$.complete();
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.productForm, field);
  }
  getErrors(field: string) {
    return this.validatorService.getFieldError(this.productForm, field);
  }

  initForm(){
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      purchase_price: ['', [Validators.required, Validators.min(100), Validators.max(99999999), Validators.pattern(/^\d+$/)]],
      sale_price: ['', [Validators.required, Validators.min(100), Validators.max(99999999), Validators.pattern(/^\d+$/)]],
      current_stock: ['', [Validators.required, Validators.min(1), Validators.max(99999999), Validators.pattern(/^\d+$/)]],
      minimum_stock: ['', [Validators.required, Validators.min(1), Validators.max(99999999), Validators.pattern(/^\d+$/)]],
      category_id: ['', [Validators.required]],
      supplier_id: ['', [Validators.required]],
      description: ['', [Validators.min(5), Validators.maxLength(30)]],
    });
    this.productForm.reset();
  }

  openNew(){
    this.productSelect = null;
    this.productForm.reset();
    this.productDialog = true;
  }

  saveProduct(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.value as ProductResponse;
    const $req = this.productSelect ? this.productService.updateProduct(this.productSelect.id, formValue) : this.productService.postProduct(formValue);
    $req.pipe(takeUntil(this._destroyer$)).subscribe({
      next:(response:ResponseMessage)=>{
        this.messageService.add({ severity: response.severity, summary: response.summary, detail: response.detail, life: response.life })
        if(response.status === 201){
          this.hideDialog();
          this.loadProduct();
          this.productSelect = null;
        }
      },
      error:()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro crear el producto', life: 8000 })
      }
    })
  }

  openEdit(product:ProductInterface):void{
    this.productSelect = product;
    this.productForm.patchValue({
      name: product.name,
      purchase_price: product.purchase_price,
      sale_price: product.sale_price,
      current_stock: product.current_stock,
      minimum_stock: product.minimum_stock,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      description: product.description
    })
    this.productDialog = true;
  }

  changeSupplier(id:string){
    this.productService.deleteProduct(id).pipe(takeUntil(this._destroyer$)).subscribe({
      next:(response:ResponseMessage)=>{
        this.messageService.add({ severity: response.severity, summary: response.summary, detail: response.detail, life: response.life });
        if(response.status === 201){
          this.loadProduct();
        }
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cambiar el estado del producto', life: 8000 })
      }
    })
  }

  loadProduct():void{
    this.productService.getProduct().pipe(takeUntil(this._destroyer$)).subscribe({
      next:(product)=>{
        this.product.set(product);
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cargar los datos de los productos', life: 8000 })
      }
    })
  }

  hideDialog():void{
    this.productForm.reset();
    this.productDialog = false;
  }

  private loadCategory():void{
    this.categoryService.getCategory().pipe(takeUntil(this._destroyer$)).subscribe({
      next: (category)=>{
        this.category.set(category)
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cargar los datos de la categoria', life: 8000 })
      }
    })
  }

  private loadSupplier():void{
    this.supplierService.getSupplier().pipe(takeUntil(this._destroyer$)).subscribe({
      next: (supplier)=>{
        this.supplier.set(supplier)
      },
      error: () =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro cargar los proveedores', life: 8000 })
      }
    })
  }

  getSeverity(status: boolean): 'success' | 'danger' {
    return status ? 'success' : 'danger';
  }
}
