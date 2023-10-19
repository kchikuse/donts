import {
  Component,
  HostListener,
  Input,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../app.config';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  animations: [],
})
export class QuoteComponent {
  @Input() role: Role = 'husbands';

  quote = computed(() => this.quotes()[this.index()]);

  private quotes = signal<string[]>([]);
  private index = signal(0);

  private get max(): number {
    return this.quotes().length - 1;
  }

  constructor(private http: HttpClient, private router: Router) {}

  @HostListener('window:beforeunload')
  savePosition() {
    localStorage.setItem(this.role, String(this.index()));
  }

  ngOnInit() {
    this.loadIndex();
    this.http.get<string[]>(`assets/${this.role}.json`).subscribe((quotes) => {
      this.quotes.set(quotes);
    });
  }

  prev() {
    let index = this.index();

    if (index > 0) {
      index--;
    } else {
      index = this.max;
    }

    this.index.set(index);
  }

  next() {
    let index = this.index();

    if (index < this.max) {
      index++;
    } else {
      index = 0;
    }

    this.index.set(index);
  }

  home() {
    this.savePosition();
    this.router.navigateByUrl('/');
  }

  private loadIndex() {
    const index = localStorage.getItem(this.role) ?? 0;
    this.index.set(Number(index));
  }
}
