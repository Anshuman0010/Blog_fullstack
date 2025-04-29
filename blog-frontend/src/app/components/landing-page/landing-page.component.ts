  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common'; // Correctly import CommonModule
  import { ApiService } from '../../services/api.service'; // Don't forget your service
  import { RouterModule } from '@angular/router';
  @Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule, RouterModule],  // Ensure CommonModule is added to the imports array
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
  })
  export class LandingPageComponent implements OnInit {
    posts: any[] = [];

    constructor(private apiService: ApiService) {
      console.log('LandingPageComponent constructor called');
    }

    ngOnInit(): void {
      console.log('LandingPageComponent initialized');

      // Fetch posts from the backend
      this.apiService.getPosts().subscribe(
        (data) => {
          console.log('Posts fetched:', data);
          this.posts = data;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
    }
  }
