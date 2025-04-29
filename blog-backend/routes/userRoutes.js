const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const BlogPost = require('../models/BlogPost');
// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Route

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "1234", // Ensure this value is correctly set in .env
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Find the user by their ID (req.user.id) that was set by the `authenticate` middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/getuserposts', authenticate, async (req, res) => {
  console.log("posts called")
  console.log(req)

  try {
    // Fetch posts for the authenticated user using `req.user.id`
    const userPosts = await BlogPost.find({ author: req.user.id });
    
    if (!userPosts.length) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.json(userPosts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ error: err.message });
  }
});
// Add pagination logic to the API
// router.get('/getuserposts', authenticate, async (req, res) => {
//   const { page = 1, limit = 5 } = req.query; // Default to page 1 and limit of 5 posts per page

//   try {
//     // Parse the page and limit as integers
//     const parsedPage = parseInt(page);
//     const parsedLimit = parseInt(limit);

//     // Validate the parsed values
//     if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
//       return res.status(400).json({ message: 'Invalid pagination parameters' });
//     }

//     // Fetch posts for the authenticated user with pagination
//     const userPosts = await BlogPost.find({ author: req.user.id })
//       .sort({ createdAt: -1 }) // Sort by most recent
//       .skip((parsedPage - 1) * parsedLimit) // Skip posts based on page number
//       .limit(parsedLimit); // Limit the number of results returned

//     // Get the total count of posts for the authenticated user
//     const totalPosts = await BlogPost.countDocuments({ author: req.user.id });

//     // Respond with paginated posts and metadata
//     console.log(userPosts)
//     res.json({
//       posts: userPosts,
//       totalPosts, // Total number of posts
//       totalPages: Math.ceil(totalPosts / parsedLimit), // Total pages based on the limit
//       currentPage: parsedPage, // Current page
//     });
//   } catch (err) {
//     console.error('Error fetching user posts:', err);
//     res.status(500).json({ error: err.message });
//   }
// });



router.delete('/:postId', authenticate, async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the blog post by ID and ensure it belongs to the logged-in user
    const post = await BlogPost.findOne({ _id: postId, author: req.user.id });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    // Delete the post
    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
