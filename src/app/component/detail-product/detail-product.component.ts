import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/productimage';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-detail-product',
    standalone: true,
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.scss',
    imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule
    ,RouterLink]
})
export class DetailProductComponent  implements OnInit{
    product?: Product;
    productId: number = 0;
    currentImageIndex = 0;
    quantity: number = 1;
    constructor(private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.productId = +this.route.snapshot.paramMap.get('id')!

        if(!isNaN(this.productId)) {
            debugger
            this.productService.getDetailProduct(this.productId).subscribe
            ({
                next: (reponse:any) => {
                    if(reponse.product_images && reponse.product_images.length > 0) {
                        reponse.product_images.forEach((image: ProductImage) => {
                            if (!image.image_url.startsWith(environment.apiBaseUrl)) {
                                image.image_url = `${environment.apiBaseUrl}/products/images/${image.image_url}`;
                              }
                        });

                    }
                    this.product = reponse
                    this.showImage(0)
                },error: (error: any) => {
                    console.error('Error retrieve product detail: ',error)
                }
            })
        }
    }
    showImage(index: number): void {
        if(this.product && this.product.product_images && this.product.product_images.length > 0) {
            if(index < 0) {
                index = this.product.product_images.length -1
            } else if(index >= this.product.product_images.length) {
                index = 0;
            }
            this.currentImageIndex = index;
        }
    }
    thumbnailClick(index: number) {
        this.currentImageIndex = index;
    }
    nextImage() {
        this.showImage(this.currentImageIndex+1)
    }
    previousImage() {
        this.showImage(this.currentImageIndex-1)
    }
    addToCart() {
        if(this.product) {
            this.cartService.addToCart(this.productId,this.quantity)
            alert('them thanh cong')
        } else {
            console.error('Cannot adding product to cart because product is null')
        }
    }
    increaseQuantity() {
        this.quantity++;
    }
    decreaseQuantity() {
        if(this.quantity > 1) {
            this.quantity--
        }
    }
    buyNow() {

    }
}
