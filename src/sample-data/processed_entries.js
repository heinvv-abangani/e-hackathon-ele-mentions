let example = {
  "_id": "ObjectId",
  "raw_entry_id": "ObjectId", // Reference to raw entry
  "processed_at": "2025-07-16T10:45:00Z",
  "relevance_score": 0.85, // 0-1, how relevant to Elementor V4
  "is_relevant": true,
  
  // Core sentiment analysis
  "sentiment": {
    "overall": "POSITIVE|NEGATIVE|NEUTRAL|MIXED",
    "confidence": 0.73,
    "emotional_tone": "excited|frustrated|curious|disappointed|hopeful"
  },
  
  // Product context
  "products_mentioned": ["Editor V4", "Editor V3", "Elementor Pro"],
  "features_discussed": ["Global Classes", "Performance", "CSS Generation"],
  
  // Categorization
  "content_type": "BUG_REPORT|FEATURE_REQUEST|UX_FEEDBACK|PERFORMANCE_REVIEW|COMPARISON|QUESTION",
  "priority_level": "HIGH|MEDIUM|LOW", // Based on influence/severity
  
  // Actionable insights
  "bugs_reported": [
    {
      "description": "Global Classes not saving in Firefox",
      "severity": "medium",
      "area": "Global Classes"
    }
  ],
  "feature_requests": [
    {
      "description": "Request for dark mode in editor",
      "demand_level": "high",
      "area": "UI/UX"
    }
  ],
  
  // Context preservation
  "key_quotes": ["This is amazing for performance!", "Finally fixed the bloat issue"],
  "user_profile": {
    "likely_user_type": "developer|designer|agency|beginner",
    "experience_level": "novice|intermediate|expert"
  }
}