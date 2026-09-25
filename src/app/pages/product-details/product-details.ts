import { Component } from '@angular/core';
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
    private cartService: CartService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.product = this.productService
      .getProducts()
      .find((product) => product.id === Number(this.productId));
  }
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
