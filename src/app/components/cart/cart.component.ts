import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  onQuantityChange(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.cartService.updateQuantity(item.product.id, item.quantity);
    this.total = this.cartService.getTotal();
  }

  removeItem(productId: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    this.cartService.removeFromCart(productId);
    if (item) {
      alert(`${item.product.name} has been removed from your cart!`);
    }
  }
}
