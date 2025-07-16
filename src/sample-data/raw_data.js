let example = {
  "_id": "ObjectId",
  "platform": "YOUTUBE|REDDIT|GITHUB|TWITTER",
  "scraped_at": "2025-07-16T10:30:00Z",
  "processed": false,
  "entry": {
    // Platform-specific fields
    "content": "actual comment/post text",
    "author": "username",
    "created_at": "2025-07-15T14:20:00Z",
    "url": "direct link to content",
    "score": 45, // upvotes, likes, etc
    "reply_count": 3,
    
    // Context fields (crucial for AI filtering)
    "parent_content": {
      "title": "Elementor V4 Review - Game Changer?",
      "description": "In this video I test the new...",
      "author": "WebSquadron"
    },
    
    // Platform-specific metadata
    "metadata": {
      "video_id": "abc123", // YouTube
      "subreddit": "elementor", // Reddit
      "issue_number": 456, // GitHub
      "hashtags": ["#elementorv4"] // Twitter
    }
  }
}