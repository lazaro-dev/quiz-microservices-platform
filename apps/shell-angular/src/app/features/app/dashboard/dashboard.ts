import { SessionService } from '@/app/core/services/session.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly sessionService = inject(SessionService)
  logout () {
    this.sessionService.clear();
  }
}
