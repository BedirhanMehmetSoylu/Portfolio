import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      text: "Michael really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      name: "V. Schuster - Team Partner",
      image: "reviewer.png",
      style: 'position: absolute; width: 260%; height: 120%; object-fit: cover; transform: rotate(90deg) translateX(20%);'
    },
    {
      text: "Michi was a top team colleague at DA. His positive commitment and willingness to take on responsibility made a a significant contribution to us achieving our goals.",
      name: "E. Eichinger - Team Partner",
      image: "reviewer_2.jpg",
      style: 'position: absolute; width: 160%; height: 210%; object-fit: cover; transform: translateX(-3%) translateY(15%);'
    },
    {
      text: "It was a great pleasure to work with Michael. He knows how to push and encourage team members to present the best work possible, always adding something to brainstorm, Regarding the well-being of group members, he was always present and available to listen and help others, with a great sense of humor as well.",
      name: "I. Nuber - Frontend Engineer",
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


