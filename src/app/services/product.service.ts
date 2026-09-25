import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 899,
      image: '/images/laptop.jpg',
      description: 'Powerful laptop for everyday use.',
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 599,
      image: '/images/smartphone.jpg',
      description: 'Modern smartphone with a great camera.',
    },
    {
      id: 3,
      name: 'Headphones',
      price: 99,
      image: '/images/headphones.jpg',
      description: 'Wireless headphones with great sound.',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
