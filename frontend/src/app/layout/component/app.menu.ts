import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
import {
    House,
    Package,
    Users,
    Truck,
    ShoppingCart,
    Receipt,
    Tag,
    Contact,
    Car,
    User
} from 'lucide-angular';
import { AppMenuItems } from '../interfaces/menu.interface';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: AppMenuItems[] = [];
    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', lucideIcon: House, routerLink: ['/'] },
                    { label: 'Clientes', lucideIcon: User, routerLink: ['/client'] },
                    { label: 'Carros', lucideIcon: Car, routerLink: ['/car'] },
                ]
            },
        ];
    }
}
