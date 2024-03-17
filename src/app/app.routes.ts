import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { OrderComponent } from './component/order/order.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AuthGuardFn } from './guards/auth.guard';
import { AdminGuardFn } from './guards/admin.guard';
import { AdminComponent } from './component/admin/admin.component';
import { OrderAdminComponent } from './component/admin/order-admin/order-admin.component';
import { ProductAdminComponent } from './component/admin/product.admin/product.admin.component';
import { CategoryAdminComponent } from './component/admin/category.admin/category.admin.component';
import { OrderDetailsAdminComponent } from './order-details-admin/order-details-admin.component';

export const routes: Routes = [
    {path: '',component: HomeComponent}, 
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'products/:id',component: DetailProductComponent},
    {path: 'orders',component: OrderComponent,canActivate:[AuthGuardFn]},
    {path: 'orders/:id',component: OrderDetailComponent},
    {path: 'profiles',component: UserProfileComponent,canActivate:[AuthGuardFn]},
    {path: 'admin',component: AdminComponent,canActivate:[AdminGuardFn]},
    {path: 'admin/orders',component: OrderAdminComponent,canActivate:[AdminGuardFn]},
    {path: 'admin/orders/:id',component: OrderDetailsAdminComponent,canActivate:[AdminGuardFn]},
    {path: 'admin/products',component: ProductAdminComponent,canActivate:[AdminGuardFn]},
    {path: 'admin/categories',component: CategoryAdminComponent,canActivate:[AdminGuardFn]},
];
