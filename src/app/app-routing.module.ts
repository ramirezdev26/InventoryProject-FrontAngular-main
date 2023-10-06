import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PagenotfoundComponent } from './components/page-not-found/pagenotfound/pagenotfound.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { SaleFormComponent } from './components/forms/sale-form/sale-form.component';
import { AddStockFormComponent } from './components/forms/add-stock-form/add-stock-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'

  },
  {
    path: 'home',
    component: WelcomePageComponent,

  },
  {
    path: 'products',
    component: ProductPageComponent
  },
  {
    path: 'invoices',
    component: InvoicePageComponent
  },
  {
    path: 'products',

    children: [
      {
        path: 'new',
        component: ProductFormComponent},
      {
        path: 'add-stock',
        component: AddStockFormComponent}
    ]
  },
  {
    path: 'invoices',

    children: [
      {
        path: 'new',
        component: SaleFormComponent}
    ]
  },
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
