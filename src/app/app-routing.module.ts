import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PagenotfoundComponent } from './components/page-not-found/pagenotfound/pagenotfound.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { SaleFormComponent } from './components/forms/sale-form/sale-form.component';
import { AddStockFormComponent } from './components/forms/add-stock-form/add-stock-form.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserNewFromComponent } from './components/forms/user-new-from/user-new-from.component';
import { AddBranchFormComponent } from './components/forms/add-branch-form/add-branch-form.component';
import { SupplierPageComponent } from './pages/supplier-page/supplier-page.component';
import { SupplierFormComponent } from './components/forms/supplier-form/supplier-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'

  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'branches',
    component: WelcomePageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'products',
    component: ProductPageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'invoices',
    component: InvoicePageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'users',
    component: UserPageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'suppliers',
    component: SupplierPageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'branches',

    children: [
      {
        path: 'new',
        component: AddBranchFormComponent}
    ]
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
    path: 'users',

    children: [
      {
        path: 'new',
        component: UserNewFromComponent}
    ]
  },
  {
    path: 'suppliers',

    children: [
      {
        path: 'new',
        component: SupplierFormComponent}
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
