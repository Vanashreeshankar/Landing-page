import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  iconsVisible = false;
  isMobile = false;
  isBrowser = false;

  icons = [
    { class: 'fab fa-instagram', label: 'Instagram' },
    { class: 'fab fa-tiktok', label: 'TikTok' },
    { class: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { class: 'fab fa-x-twitter', label: 'X (Twitter)' },
    { class: 'fab fa-facebook-f', label: 'Facebook' },
    { class: 'fab fa-threads', label: 'Threads' },
    { class: 'fab fa-facebook-messenger', label: 'Messenger' },
    { class: 'fab fa-pinterest', label: 'Pinterest' },
    { class: 'fas fa-star', label: 'Trustpilot' },
    { class: 'fab fa-mastodon', label: 'Mastodon' },
    { class: 'fab fa-youtube', label: 'YouTube' },
    { class: 'fab fa-whatsapp', label: 'WhatsApp' },
    { class: 'fab fa-wordpress', label: 'WordPress' },
    { class: 'fab fa-google-play', label: 'Play Store' },
    { class: 'fab fa-apple', label: 'App Store' },
    { class: 'fas fa-briefcase', label: 'Google My Business' }
  ];

  logos = [
    'assets/logo/DeutscheBahn_white-1.webp',
    'assets/logo/EON_white-1.webp',
    'assets/logo/Flughafen_Muenchen.png',
    'assets/logo/Frosch_white.webp',
    'assets/logo/HamburgAirport_white-1.webp',
    'assets/logo/Rossmann_white-1.webp'
  ];
  duplicatedLogos = [...this.logos, ...this.logos];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.onResize();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  toggleIcons(): void {
    this.iconsVisible = !this.iconsVisible;
  }

  getIconStyle(index: number): { [key: string]: string } {
    if (!this.iconsVisible) {
      return {
        opacity: '0',
        transform: 'scale(0.5)',
      };
    }
  
    const total = this.icons.length;
  
    if (this.isMobile) {
      const angle = (index / total) * 2 * Math.PI;
      const radius = 100;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return {
        opacity: '1',
        transform: `translate(${x}px, ${y}px) scale(1)`
      };
    } else {
      const xOffsets = [10, 20, 30, 40, 50, 40, 30, 20, 10];
      const column = index % 2; // 0 = left arc, 1 = right arc
      const row = Math.floor(index / 2);
      const x = (column === 0 ? 0 : 60) + (xOffsets[row] || 20); // both arc x shift in same direction
      const y = (row - Math.floor(total / 4)) * 60;
  
      return {
        opacity: '1',
        transform: `translate(${x}px, ${y}px) scale(1)`
      };
    }
  }
  
  
}
