import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  fullName: string = '';
  total: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      fullName: string;
      total: number;
    };
    
    if (state) {
      this.fullName = state.fullName;
      this.total = state.total;
    }
  }

  ngOnInit(): void {
    // Redirect to home if no order data
    if (!this.fullName || this.total === 0) {
      this.router.navigate(['/']);
    }
  }
}
