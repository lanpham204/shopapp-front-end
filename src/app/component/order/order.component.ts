import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderDTO } from '../../dtos/order.dto';
import { validate } from 'class-validator';
import { error } from 'console';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    imports: [FooterComponent, HeaderComponent
        ,FormsModule,CommonModule,ReactiveFormsModule]
})
export class OrderComponent implements OnInit {
    orderForm: FormGroup;
    cartItems: {product:Product, quantity: number}[] = []
    totalAmount: number = 0;
    messageError: string = '';
    orderData: OrderDTO = {
        user_id: 0,
       fullname: '',
       email:'',
       phone_number: '',
       address: '',
       note: '',
       total_money: 0,
       shipping_method: 'express',
       payment_method: 'cod',
       cart_items: []
    }


    constructor(private cartSerivce:CartService,
        private productService:ProductService,
        private orderService: OrderService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService) {
            this.orderForm = new FormGroup({
                fullname: new FormControl('', Validators.required),
                email: new FormControl('', Validators.email),
                phone_number: new FormControl('', [Validators.required, Validators.minLength(10)]),
                address: new FormControl('', [Validators.required, Validators.minLength(5)]),
                note: new FormControl(''),
                shipping_method: new FormControl('express'),
                payment_method: new FormControl('cod'),
              });
        }


    ngOnInit(): void {
        this.orderData.user_id = this.tokenService.getUserId();
        const cart = this.cartSerivce.getCart();
        const productIds = Array.from(cart.keys())
        if(productIds.length === 0) {
            return;
        }
        this.productService.getDetailProductByIds(productIds).subscribe({
            next: (products) => {
                this.cartItems = productIds.map(productId =>{
                    const product = products.find((p:Product) => p.id === productId);
                    if(product) {
                        product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
                    }
                    return {
                        product: product!,
                        quantity: cart.get(productId)!
                    }
                })
            },complete:()=> {
                this.calculateTotal()
            }
            ,error: (error: any) => {
                console.error('Error retrieve cart: ',error)
            }
        })
    }
    calculateTotal(): void {
        this.totalAmount = this.cartItems.reduce(
            (total,item) => total + item.product.price * item.quantity,0
        );
    }
    order():void {
        debugger
        if(this.orderForm.valid) {
            debugger
            this.orderData = {
                ...this.orderData,
                ...this.orderForm.value
            }
            this.orderData.total_money = this.totalAmount;
            this.orderData.cart_items = this.cartItems.map(cartItem => {
                return {
                    product_id: cartItem.product.id,
                    quantity: cartItem.quantity
                };
            });
            debugger
            this.orderService.createOrder(this.orderData).subscribe({
                next: (response: any) => {
                    alert("Order success")
                    this.cartSerivce.removeCart()
                },error: (error: any) => {
                        alert(`Cannot order: ${error}`)
                        console.log(error)
                      }
            })

        } else {
            alert('Invalid data please enter complete information')
        }

    }
}
