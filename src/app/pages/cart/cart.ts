import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cartItems: CartItem[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCart();
  }

  increaseQuantity(product: Product) {
    this.cartService.increaseQuantity(product);
    this.cartItems = this.cartService.getCart();
  }

  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product);
    this.cartItems = this.cartService.getCart();
  }
}
