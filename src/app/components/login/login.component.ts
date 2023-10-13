import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from 'src/app/services/auth-service/auth.service';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]})

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private inventoryService: InventoryService,
    private authDecod: JwtHelperService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const userDetails = {
        email: value.email,
        password: value.password
      }
      this.authService.login(userDetails)
      .subscribe((tocken: any) => {
        localStorage.setItem('token', tocken.token);
        this.inventoryService.setCurrentRol(this.authDecod.decodeToken(tocken.token).roles) 
        this.inventoryService.setCurrentBranchId(this.authDecod.decodeToken(tocken.token).branchId) 
        this.router.navigate(['/home']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


}
