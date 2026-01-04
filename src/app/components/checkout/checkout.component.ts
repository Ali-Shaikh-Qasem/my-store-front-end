import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  creditCard: string = '';
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.total = this.cartService.getTotal();
    
    // Redirect to cart if cart is empty
    if (this.total === 0) {
      this.router.navigate(['/cart']);
    }
  }

  onSubmit(): void {
    // Validate form
    if (!this.fullName || !this.address || !this.creditCard) {
      alert('Please fill in all fields');
      return;
    }

    // Validate name (minimum 3 characters)
    if (this.fullName.trim().length < 3) {
      alert('Full name must be at least 3 characters');
      return;
    }

    // Validate credit card (16 digits)
    const cardNumber = this.creditCard.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
      alert('Credit card must be 16 digits');
      return;
    }

    // Navigate to confirmation page with order details
    this.router.navigate(['/confirmation'], {
      state: {
        fullName: this.fullName,
        total: this.total
      }
    });

    // Clear cart
    this.cartService.clearCart();
  }
}
