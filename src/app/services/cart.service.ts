import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  addToCart(product: Product): void {
    const existingItem = this.cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        product: product,
        quantity: 1,
      });
    }
    this.cartSubject.next(this.cart);
  }

  increaseQuantity(product: Product): void {
    const item = this.cart.find((item) => item.product.id === product.id);

    if (item) {
      item.quantity++;
    }
  }

  getCartUpdates() {
    return this.cartSubject.asObservable();
  }

  decreaseQuantity(product: Product): void {
    const item = this.cart.find((item) => item.product.id === product.id);

    if (item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.removeFromCart(product);
      }
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter((item) => item.product.id !== product.id);
  }
}
