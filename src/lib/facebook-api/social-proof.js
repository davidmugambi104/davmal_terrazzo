// lib/facebook-api/social-proof.js
export const fetchSocialProof = async () => ({
    livePosts: [
      {
        id: 1,
        user: 'JohnDoe',
        content: 'Just created an amazing new furniture design!',
        likes: 42,
        timestamp: new Date().toISOString()
      },
      // ... more posts
    ],
    recentReviews: [
      {
        id: 1,
        rating: 5,
        text: 'Fantastic design tools!',
        author: 'Sarah Smith'
      },
      // ... more reviews
    ]
  });