import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<FakeStoreProduct[]>(this.apiUrl).pipe(
      map((products) =>
        products.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
        })),
      ),
    );
  }

  /*
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
    */
}
