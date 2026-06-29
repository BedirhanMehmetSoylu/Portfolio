import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss', './my-skills.component.responsive.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySkillsComponent {
  protected readonly nav = inject(NavigationService);
  protected readonly dialog = inject(MatDialog);
  public readonly translate = inject(TranslateService);

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

}