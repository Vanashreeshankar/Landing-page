import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('mobileMenuAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10%)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  logoPath: string = 'assets/logo/socialhub.webp';
  mobileMenuOpen: boolean = false;
  selectedLang: string = 'en';

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
          this.mobileMenuOpen = false;
        }
      });
    }
  }
}