import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      text: 'REVIEWS.FIRST',
      name: "L. Eckert - Team Partner",
      image: "reviewer.png",
      style: 'position: absolute; width: 120%; height: 200%; object-fit: cover; transform: translateX(-2%) translateY(15%);;'
    },
    {
      text: "REVIEWS.SECOND",
      name: "A. Hess - Team Partner",
      image: "reviewer_2.jpg",
      style: 'position: absolute; width: 160%; height: 210%; object-fit: cover; transform: translateX(-3%) translateY(15%);'
    },
    {
      text: "REVIEWS.THIRD",
      name: "M. Tosyali - Team Partner",
      image: "reviewer_3.jpg",
      style: 'position: absolute; width: 190%; height: 290%; object-fit: cover; transform: translateX(7%) translateY(30%);'
    }
  ];

  currentIndex = 0;

  nextReview() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  previousReview() {
    this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }
}


