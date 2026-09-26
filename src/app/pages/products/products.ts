import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText = '';
  message = 'first message';

  private searchSubject = new Subject<string>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  onSearch() {
    this.searchSubject.next(this.searchText);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;

        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('API ERROR:', error);
      },
    });

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchText) => {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    });
  }

  focusSearch() {
    this.searchInput.nativeElement.focus();
  }
}
