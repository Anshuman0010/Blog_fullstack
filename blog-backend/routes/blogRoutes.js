const express = require('express');
const BlogPost = require('../models/BlogPost');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();
router.put('/:postId', authenticate, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  console.log('Updating post with ID:', postId);
  console.log('Authenticated user ID:', req.user.id);

  try {
    // Find the blog post and ensure it belongs to the logged-in user
    const post = await BlogPost.findOne({ _id: postId, author: req.user.id });

    if (!post) {
      console.log('Post not found or user not authorized');
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    // Update the fields
    if (title) post.title = title;
    if (content) post.content = content;

    const updatedPost = await post.save();
    console.log('Post updated:', updatedPost);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 }).select('title content');
  res.json(posts);
});
// Fetch a specific blog post by ID
router.get('/:id', async (req, res) => {
    try {
      const post = await BlogPost.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
// Create Post (auth required)
// router.post('/', authenticate, async (req, res) => {
//   const { title, content } = req.body;
//   try {
//     const newPost = new BlogPost({ title, content, author: req.user.id });
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.post('/', authenticate, async (req, res) => {
  console.log('POST request received'); // Check if route is hit
  const { title, content } = req.body;
  console.log('Request body:', req.body); // Log request body

  try {
      const newPost = new BlogPost({ title, content, author: req.user.id });
      await newPost.save();
      res.status(201).json(newPost);
  } catch (err) {
      console.error('Error creating post:', err); // Log any errors
      res.status(400).json({ error: err.message });
  }
});

router.get('/user', authenticate, async (req, res) => {
  try {
    console.log('Fetching posts for user:', req.user.id); // Log the user ID
    const userPosts = await BlogPost.find({ author: req.user.id });
    console.log('User posts fetched:', userPosts); // Log the fetched posts
    res.json(userPosts);
  } catch (err) {
    console.error('Error fetching user posts:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
});  




router.delete('/:postId', authenticate, async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the blog post by ID and ensure it belongs to the logged-in user
    const post = await BlogPost.findOne({ _id: postId, author: req.user.id });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    // Delete the post
    await post.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: err.message });
  }
});
// Update Blog Post
// router.put('/:postId', authenticate, async (req, res) => {
//   const { postId } = req.params;
//   const { title, content } = req.body;
//   console.log("Edit called")
//   try {
//     // Find the blog post by ID and ensure it belongs to the logged-in user
//     const post = await BlogPost.findOne({ _id: postId, author: req.user.id });

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found or not authorized' });
//     }

//     // Update the post
//     post.title = title || post.title;
//     post.content = content || post.content;

//     const updatedPost = await post.save();
//     res.json(updatedPost);
//   } catch (err) {
//     console.error('Error updating post:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
