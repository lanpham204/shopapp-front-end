import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpUtilService } from "./http.util.service";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
  })
export class CartService {
    private cart: Map<number,number> = new Map();
    constructor(private productService: ProductService)
    {
        if (typeof localStorage !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
              this.cart = new Map(JSON.parse(storedCart));
            }
          } else {
            console.error('Local storage is not supported in this environment.');
          }
    }
    addToCart(productId: number, quantity: number) {
        if(this.cart.has(productId)) {
            this.cart.set(productId,this.cart.get(productId)! + quantity);
        } else {
            this.cart.set(productId,quantity);
        }
        this.saveCartToLocalStorage()
    }
    getCart(): Map<number, number> {
        return this.cart;
    }
    removeCart() {
      localStorage.removeItem('cart')
    }
    private saveCartToLocalStorage() {
            localStorage.setItem('cart',JSON.stringify(Array.from(this.cart.entries())));
    }
}
