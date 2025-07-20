import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
  
})

export class PriceComponent implements AfterViewInit {
  activeTab: 'professional' | 'enterprise' = 'professional';

  professionalFeatures = [
    'Inbox',
    'Content Planner',
    'Analytics',
    'Approval processes',
    'Management summary',
    'Performance of the posts',
  
  ];

  enterpriseFeatures = [
    'All Professional Features',
    'Sentiment Tracking',
    'Email Approval Process',
    'Post-based inbox',
    'Smart Custom Folder',
    'Smart Rules',
    'Multitagging',
    'Media Library',
    'Custom Channel API'
    
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get currentFeatures(): string[] {
    return this.activeTab === 'professional' ? this.professionalFeatures : this.enterpriseFeatures;
  }

  switchTab(tab: 'professional' | 'enterprise') {
    this.activeTab = tab;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.3 });

      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
  }
}