import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {
    this.cartService.getCartUpdates().subscribe(cart => {
      this.cartItems = cart;
      this.cdr.detectChanges();
    })
  }

  get cartCount(): number {
    return this.cartService.getCart().reduce((total, item) => total + item.quantity, 0);
  }
}
