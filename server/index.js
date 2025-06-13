import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Mock SEO analysis function (simulating external API)
function analyzeSEO(text) {
  // Calculate basic readability metrics
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
  const avgSentencesPerParagraph = paragraphs.length > 0 ? sentences.length / paragraphs.length : 0;
  
  // Calculate readability score (simplified Flesch Reading Ease)
  const avgSentenceLength = avgWordsPerSentence;
  const avgSyllablesPerWord = 1.5; // Simplified assumption
  const readabilityScore = Math.max(0, Math.min(100, 
    206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)
  ));
  
  // Generate keyword suggestions based on text analysis
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'a', 'an', 'this', 'that', 'these', 'those'];
  
  const wordFreq = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord.length > 3 && !commonWords.includes(cleanWord)) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  });
  
  // Get top keywords
  const topKeywords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word, freq]) => ({
      keyword: word,
      frequency: freq,
      relevance: Math.min(100, (freq / words.length) * 1000),
      searchVolume: Math.floor(Math.random() * 10000) + 100,
      difficulty: Math.floor(Math.random() * 100) + 1
    }));
  
  // Generate additional suggested keywords
  const suggestedKeywords = [
    'digital marketing', 'content strategy', 'SEO optimization', 'online presence',
    'brand awareness', 'user engagement', 'conversion rate', 'social media',
    'target audience', 'market research', 'competitive analysis', 'growth hacking'
  ].map(keyword => ({
    keyword,
    frequency: 0,
    relevance: Math.floor(Math.random() * 80) + 20,
    searchVolume: Math.floor(Math.random() * 50000) + 1000,
    difficulty: Math.floor(Math.random() * 100) + 1
  }));
  
  const allKeywords = [...topKeywords, ...suggestedKeywords.slice(0, 8)];
  
  return {
    metrics: {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      readabilityScore: Math.round(readabilityScore),
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSentencesPerParagraph: Math.round(avgSentencesPerParagraph * 10) / 10
    },
    keywords: allKeywords,
    suggestions: [
      {
        type: 'readability',
        message: readabilityScore < 30 ? 'Text is quite difficult to read. Consider shorter sentences.' :
                readabilityScore < 60 ? 'Text readability is moderate. Could be improved with simpler language.' :
                'Text has good readability for general audience.',
        priority: readabilityScore < 30 ? 'high' : readabilityScore < 60 ? 'medium' : 'low'
      },
      {
        type: 'length',
        message: words.length < 300 ? 'Content is quite short. Consider expanding for better SEO.' :
                words.length > 2000 ? 'Content is very long. Consider breaking into sections.' :
                'Content length is appropriate for SEO.',
        priority: words.length < 300 || words.length > 2000 ? 'medium' : 'low'
      },
      {
        type: 'keywords',
        message: topKeywords.length < 5 ? 'Limited keyword diversity. Consider adding more relevant terms.' :
                'Good keyword diversity detected.',
        priority: topKeywords.length < 5 ? 'high' : 'low'
      }
    ]
  };
}

// Smart keyword insertion function
function insertKeywordIntelligently(text, keyword) {
  const sentences = text.split(/([.!?]+\s*)/);
  const words = text.toLowerCase().split(/\s+/);
  
  // Don't insert if keyword already exists
  if (words.some(word => word.includes(keyword.toLowerCase()))) {
    return text;
  }
  
  // Find the best position to insert the keyword
  let bestPosition = 0;
  let bestScore = 0;
  
  for (let i = 0; i < sentences.length; i += 2) { // Only check actual sentences, not punctuation
    const sentence = sentences[i];
    if (!sentence || sentence.trim().length < 10) continue;
    
    const sentenceWords = sentence.toLowerCase().split(/\s+/);
    const position = sentence.length / 2; // Middle of sentence
    
    // Score based on sentence length and position in text
    const lengthScore = Math.min(sentenceWords.length / 20, 1); // Prefer longer sentences
    const positionScore = 1 - (Math.abs(i - sentences.length / 2) / sentences.length); // Prefer middle of text
    const score = lengthScore * 0.6 + positionScore * 0.4;
    
    if (score > bestScore) {
      bestScore = score;
      bestPosition = i;
    }
  }
  
  // Insert keyword naturally into the best sentence
  if (bestPosition < sentences.length && sentences[bestPosition]) {
    const sentence = sentences[bestPosition];
    const words = sentence.split(/\s+/);
    
    // Find a good insertion point (avoid beginning and end)
    const insertIndex = Math.floor(words.length * 0.3) + Math.floor(Math.random() * Math.floor(words.length * 0.4));
    
    // Create natural insertion
    const beforeKeyword = words.slice(0, insertIndex).join(' ');
    const afterKeyword = words.slice(insertIndex).join(' ');
    
    // Add connecting words for natural flow
    const connectors = ['including', 'such as', 'like', 'especially', 'particularly'];
    const connector = connectors[Math.floor(Math.random() * connectors.length)];
    
    sentences[bestPosition] = `${beforeKeyword} ${connector} ${keyword} ${afterKeyword}`;
  }
  
  return sentences.join('');
}

// API Routes
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    if (text.length > 50000) {
      return res.status(400).json({ error: 'Text is too long (max 50,000 characters)' });
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const analysis = analyzeSEO(text);
    
    res.json({
      success: true,
      data: analysis
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze text',
      details: error.message 
    });
  }
});

app.post('/api/insert-keyword', async (req, res) => {
  try {
    const { text, keyword } = req.body;
    
    if (!text || !keyword) {
      return res.status(400).json({ error: 'Text and keyword are required' });
    }
    
    const updatedText = insertKeywordIntelligently(text, keyword);
    
    res.json({
      success: true,
      data: {
        updatedText,
        inserted: updatedText !== text
      }
    });
    
  } catch (error) {
    console.error('Keyword insertion error:', error);
    res.status(500).json({ 
      error: 'Failed to insert keyword',
      details: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});