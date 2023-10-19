import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import {MatSelectModule} from '@angular/material/select';
import { PagenotfoundComponent } from './components/page-not-found/pagenotfound/pagenotfound.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { BranchCardComponent } from './components/cards/branch-card/branch-card.component';
import { ProductCardComponent } from './components/cards/product-card/product-card.component';
import { InvoiceCardComponent } from './components/cards/invoice-card/invoice-card.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { SaleFormComponent } from './components/forms/sale-form/sale-form.component';
import { MatTableModule } from '@angular/material/table';
import { AddStockFormComponent } from './components/forms/add-stock-form/add-stock-form.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserCardComponent } from './components/cards/user-card/user-card.component';
import { AddBranchFormComponent } from './components/forms/add-branch-form/add-branch-form.component';
import { UserNewFromComponent } from './components/forms/user-new-from/user-new-from.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SupplierFormComponent } from './components/forms/supplier-form/supplier-form.component';
import { SupplierCardComponent } from './components/cards/supplier-card/supplier-card.component';
import { SupplierPageComponent } from './pages/supplier-page/supplier-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductPageComponent,
    InvoicePageComponent,
    SidenavbarComponent,
    WelcomeComponent,
    WelcomePageComponent,
    PagenotfoundComponent,
    BranchCardComponent,
    ProductCardComponent,
    InvoiceCardComponent,
    ProductFormComponent,
    SaleFormComponent,
    AddStockFormComponent,
    LoginComponent,
    LayoutComponent,
    UserCardComponent,
    AddBranchFormComponent,
    UserNewFromComponent,
    UserPageComponent,
    SupplierFormComponent,
    SupplierCardComponent,
    SupplierPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
