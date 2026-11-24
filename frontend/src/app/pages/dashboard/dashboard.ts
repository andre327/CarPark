import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { LowStock } from './components/low-stock/low-stock';
import { Sale } from './components/sale/sale';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, LowStock, Sale],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12">
                <app-sale/>
            </div>
        </div>
    `
})
export class Dashboard {}
