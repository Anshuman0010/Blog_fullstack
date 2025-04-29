const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Dashboard Route (auth required)
router.get('/', authenticate, (req, res) => {
  res.status(200).json({ message: 'Welcome to your Dashboard!' });
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
    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;
