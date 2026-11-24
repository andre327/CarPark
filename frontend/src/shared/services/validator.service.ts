import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched;
    }

    public getFieldError(form: FormGroup, field: string): string | null {
        if (!form.controls[field]) return null;

        const errors = form.controls[field].errors || {};
        const format = new Intl.NumberFormat('es-CO');

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
                case 'maxlength':
                    return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
                case 'max':
                    return `El valor máximo permitido es ${format.format(errors['max'].max)}`;
                case 'min':
                    return `El valor minimo permitido es ${format.format(errors['min'].min)}`;
            }
        }

        return null;
    }

    public validateField(control: AbstractControl, field: string): void {
        if (control.invalid && (control.dirty || control.touched)) {
            control.markAsTouched();
        }
    }

    public markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
            if (control) {
                control.markAsTouched();
                if (control instanceof FormGroup) {
                    this.markFormGroupTouched(control);
                }
            }
        });
    }

    public clearForm(formGroup: FormGroup): void {
        formGroup.reset();
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
            if (control) {
                control.markAsUntouched();
                control.markAsPristine();
                if (control instanceof FormGroup) {
                    this.clearForm(control);
                }
            }
        });
    }
}
