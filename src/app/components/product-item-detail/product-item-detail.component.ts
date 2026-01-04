import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent implements OnInit {
  product: Product | undefined;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.productService.getProductById(id).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  onQuantityChange(): void {
    if (this.selectedQuantity < 1) {
      this.selectedQuantity = 1;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, Number(this.selectedQuantity));
      alert(`Added ${this.selectedQuantity} ${this.product.name}(s) to cart!`);
      this.selectedQuantity = 1;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
