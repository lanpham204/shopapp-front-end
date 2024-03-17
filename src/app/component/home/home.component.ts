import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FooterComponent, HeaderComponent,
    CommonModule,FormsModule]
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    limit: number = 12;
    currentPage: number = 1;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePage:number[] =[]

    categories: Category[] = [];
    selectedCategoryId: number = 0;

    keyword: string = '';

    constructor(private router: Router,
        private productService: ProductService,
        private categoryService: CategoryService,
        private cartService: CartService
        ) { }
    ngOnInit(): void {
        this.getProducts(this.selectedCategoryId,this.keyword,this.currentPage,this.limit)
        this.getCategories()
    }
    getProducts(categoryId: number,keyword: string,page: number, limit: number) {
        this.productService.getProducts(categoryId,keyword,page,limit).subscribe({
            next: (reponse: any) => {
                reponse.products.forEach((product: Product) => {
                    product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;

                });
                this.products = reponse.products;
                this.totalPages = reponse.totalPages;
                this.visiblePage = this.generateVisiblePageArray(this.currentPage,this.totalPages);
            },error: (error: any) => {
                console.error('Error retrieve product: ',error)
            }
        })
    }
    onPageChange(page: number) {
        this.currentPage = page;
        this.getProducts(this.selectedCategoryId,this.keyword,this.currentPage,this.limit)
    }
    searchProducts() {
        this.currentPage = 1;
        this.limit = 12;
        this.getProducts(this.selectedCategoryId,this.keyword,this.currentPage,this.limit)
    }
    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const visiblePages = [];

        const totalVisiblePages = 5;
        const halfVisiblePages = Math.floor(totalVisiblePages / 2);

        let startPage = currentPage - halfVisiblePages;
        let endPage = currentPage + halfVisiblePages;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalVisiblePages, totalPages);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - totalVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    }
    getCategories() {
        this.categoryService.getCategories().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
            }
        })
    }
    onProductClick(productId: number) {
        this.router.navigate(['/products',productId])
    }
    addToCart(product: Product) {
        if(product) {
            this.cartService.addToCart(product.id,1)
            alert('them thanh cong')
        } else {
            console.error('Cannot adding product to cart because product is null')
        }
    }
}
