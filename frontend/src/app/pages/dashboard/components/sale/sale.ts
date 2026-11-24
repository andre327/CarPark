import { LayoutService } from '@/layout/service/layout.service';
import { Component } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-sale',
  imports: [ChartModule],
  templateUrl: './sale.html',
  styleUrl: './sale.scss'
})
export class Sale {
  lineData: any;
  lineOptions: any;
  subscription: Subscription;

  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
      this.initCharts();
    });
  }

  ngOnInit() {
    this.initCharts();
  }

  initCharts(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.lineData = {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      datasets: [
        {
          label: 'Ventas',
          data: [50000, 80000, 100000, 150000, 180000, 200000, 250000],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
          borderColor: documentStyle.getPropertyValue('--p-primary-200'),
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 5
        }
      ]
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
        }
      }
    };
  }
}
