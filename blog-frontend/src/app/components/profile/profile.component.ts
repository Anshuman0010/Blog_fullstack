import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { Router } from '@angular/router'; // Import Router
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule], // Add CommonModule and FormsModule
})
export class ProfileComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages
  postsPerPage: number = 5; // Posts per page
  constructor(private apiService: ApiService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.fetchUserPosts();
  }

  fetchUserPosts(): void {
    this.apiService.getUserPosts().subscribe(
      (data: any) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      (error: any) => {
        console.error('Error fetching user posts:', error);
      }
    );
  }

  editPost(post: any): void {
    post.isEditing = true; // Enable editing mode
  }

  saveEdit(post: any): void {
    const updatedPost = { title: post.title, content: post.content };
    this.apiService.updatePost(post._id, updatedPost).subscribe(
      () => {
        post.isEditing = false; // Exit editing mode
        this.fetchUserPosts(); // Refresh posts
        console.log('Post updated successfully');
      },
      (error: any) => {
        console.error('Error updating post:', error);
      }
    );
  }
  // goToPage(page: number): void {
  //   if (page > 0 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     this.fetchUserPosts(); // Fetch posts for the new page
  //   }
  // }
  cancelEdit(post: any): void {
    post.isEditing = false; // Exit editing mode
    this.fetchUserPosts(); // Refresh posts to discard changes
  }

  deletePost(postId: string): void {
    this.apiService.deletePost(postId).subscribe(
      () => {
        console.log('Post deleted successfully');
        this.fetchUserPosts(); // Refresh posts
      },
      (error: any) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']); // Use Router to navigate
  }

  filterPosts(): void {
    if (!this.searchQuery.trim()) {
      // Reset to all posts if searchQuery is empty
      this.filteredPosts = [...this.posts];
    } else {
      // Filter posts by title
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }  
}
