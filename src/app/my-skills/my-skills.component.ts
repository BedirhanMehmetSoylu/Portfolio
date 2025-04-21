import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, MatDialogModule,],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {
  skills = [
    {
      imagePath: 'html.png',
      text: 'HTML',
    },
    {
      imagePath: 'css.png',
      text: 'CSS',
    },
    {
      imagePath: 'javascript.png',
      text: 'JavaScript',
    },
    {
      imagePath: 'typescript.png',
      text: 'TypeScript',
    },
    {
      imagePath: 'angular.png',
      text: 'Angular',
    },
    {
      imagePath: 'firebase.png',
      text: 'Firebase',
    },
    {
      imagePath: 'git.png',
      text: 'Git',
    },
    {
      imagePath: 'api.svg',
      text: 'Rest Api',
    },
    {
      imagePath: 'scrum.png',
      text: 'Scrum',
    }
  ];

  constructor(private dialog: MatDialog) {}
}
