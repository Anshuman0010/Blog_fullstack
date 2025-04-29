import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  newPost = {
    title: '',
    content: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Redirect to login if not authenticated
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }

    this.fetchUserPosts();
  }

  fetchUserPosts(): void {
    this.apiService.getUserPosts().subscribe(
      (data: any) => {
        this.posts = data;
      },
      (error: any) => {
        console.error('Error fetching user posts:', error);
      }
    );
  }

  createPost(): void {
    if (this.newPost.title && this.newPost.content) {
      this.apiService.createPost(this.newPost).subscribe(
        (response: any) => {
          this.posts.push(response);
          this.newPost = { title: '', content: '' };
        },
        (error: any) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  deletePost(postId: string): void {
    this.apiService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter((post) => post._id !== postId);
      },
      (error: any) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  enableEdit(post: any): void {
    post.isEditing = true;
  }

  cancelEdit(post: any): void {
    post.isEditing = false;
    this.fetchUserPosts(); // Refresh posts to discard unsaved changes
  }

  saveEdit(post: any): void {
    const updatedPost = { title: post.title, content: post.content };
    this.apiService.updatePost(post._id, updatedPost).subscribe(
      (updatedData: any) => {
        post.isEditing = false;
        post.title = updatedData.title;
        post.content = updatedData.content;
      },
      (error: any) => {
        console.error('Error updating post:', error);
      }
    );
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
