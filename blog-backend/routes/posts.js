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