import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSemanticModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-task-manager';
}
