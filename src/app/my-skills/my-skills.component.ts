import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
  private readonly cdr = inject(ChangeDetectorRef);

  selectedStack: 'frontend' | 'backend' = 'frontend';
  showLearning = true;

  frontendSkills = [
    { imagePath: 'html.png', text: 'HTML' },
    { imagePath: 'css.png', text: 'CSS' },
    { imagePath: 'javascript.png', text: 'JavaScript' },
    { imagePath: 'typescript.png', text: 'TypeScript' },
    { imagePath: 'angular.png', text: 'Angular' },
    { imagePath: 'firebase.png', text: 'Firebase' },
    { imagePath: 'git.png', text: 'Git' },
    { imagePath: 'api.svg', text: 'Rest Api' },
    { imagePath: 'scrum.png', text: 'Scrum' },
  ];

  backendSkills = [
    { imagePath: 'cloud.png', text: 'Cloud' },
    { imagePath: 'django.png', text: 'Django' },
    { imagePath: 'docker.png', text: 'Docker' },
    { imagePath: 'heroku.png', text: 'Heroku' },
    { imagePath: 'postgresql.png', text: 'PostgreSQL' },
    { imagePath: 'python.png', text: 'Python' },
    { imagePath: 'redis.png', text: 'Redis' },
    { imagePath: 'rxjs.png', text: 'RxJS' },
    { imagePath: 'sql.png', text: 'SQL' },
  ];

  learningSkillsFrontend = [
    { imagePath: 'react.png', text: 'React', needsInvert: false },
    { imagePath: 'vue_js.png', text: 'Vue Js', needsInvert: false },
  ];

  learningSkillsBackend = [
    { imagePath: 'flask.png', text: 'Flask', needsInvert: true },
    { imagePath: 'linux.png', text: 'Linux', needsInvert: true },
  ];

  get skills() {
    return this.selectedStack === 'frontend' ? this.frontendSkills : this.backendSkills;
  }

  get learningSkills() {
    return this.selectedStack === 'frontend' ? this.learningSkillsFrontend : this.learningSkillsBackend;
  }

  get skillImageFolder() {
    return this.selectedStack === 'frontend' ? 'frontend' : 'backend';
  }

  selectStack(stack: 'frontend' | 'backend') {
    this.selectedStack = stack;
    this.showLearning = false;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.showLearning = true;
      this.cdr.markForCheck();
    });
  }
}