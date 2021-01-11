import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

function ratingRange(min: number, max: number) {
    return (c: AbstractControl): { [key:string]: boolean } | null => {
        if (c.value !== undefined && (isNaN(c.value) || c.value<min || c.value>max)) {
            return {range: true};
        }
        return null;
    }
}

@Component ({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
    employeeForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.employeeForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['',[Validators.required, Validators.minLength(3)]],
            emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            phone: [''],
            // notification: ['', [Validators.required]],
            notification: '',
            range: ['', [Validators.required, ratingRange(1,5)]]
        })
    }

    setNotification(userSelection: string): void {
        const phoneControl = this.employeeForm.get('phone');
        if (userSelection === 'phone') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }

        phoneControl.updateValueAndValidity();
    }

    save(): void {
        console.log(this.employeeForm.value);
    }
}