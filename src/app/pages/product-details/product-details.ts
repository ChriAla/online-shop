import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  productId: string | null;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productService.getProducts().subscribe((products) => {
      console.log('Products:', products);
      console.log('URL ID:', this.productId);

      this.product = products.find((product) => product.id === Number(this.productId));

      this.cdr.markForCheck();

      console.log('Found product:', this.product);
    });
  }
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
