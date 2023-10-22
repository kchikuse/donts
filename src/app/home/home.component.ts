import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Role } from '../app.config';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private notify: NotifyService) {}

  go(role: Role) {
    this.notify.click();
    this.router.navigateByUrl(role);
  }
}
