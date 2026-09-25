import { Component, ContentChild, ElementRef, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  @ContentChild('featuredText') featuredText!: ElementRef;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product());
  }

  showFeaturedText() {
    console.log(this.featuredText.nativeElement.textContent);
  }
}
