import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() itemAdded = new EventEmitter<{ product: Product, quantity: number }>();
  selectedQuantity: number = 1;

  constructor(private cartService: CartService) { }

  onQuantityChange(): void {
    if (this.selectedQuantity < 1) {
      this.selectedQuantity = 1;
    }
  }

  addToCart(): void {
    const quantity = Number(this.selectedQuantity);
    this.cartService.addToCart(this.product, quantity);
    this.itemAdded.emit({ product: this.product, quantity: quantity });
    alert(`Added ${this.selectedQuantity} ${this.product.name}(s) to cart!`);
    this.selectedQuantity = 1;
  }
}
