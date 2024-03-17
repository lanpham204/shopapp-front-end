import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { OrderComponent } from './app/component/order/order.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './app/component/home/home.component';
import { RegisterComponent } from './app/component/register/register.component';
import { LoginComponent } from './app/component/login/login.component';
import { DetailProductComponent } from './app/component/detail-product/detail-product.component';
import { OrderDetailComponent } from './app/component/order-detail/order-detail.component';
import { AppComponent } from './app/app.component';


const bootstrap = () => bootstrapApplication(AppComponent, config);
export default bootstrap;
