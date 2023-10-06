import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { BranchCardComponent } from './components/cards/branch-card/branch-card.component';
import { ProductCardComponent } from './components/cards/product-card/product-card.component';
import { InvoiceCardComponent } from './components/cards/invoice-card/invoice-card.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { SaleFormComponent } from './components/forms/sale-form/sale-form.component';
import { MatTableModule } from '@angular/material/table';
import { AddStockFormComponent } from './components/forms/add-stock-form/add-stock-form.component';



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
    AddStockFormComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
