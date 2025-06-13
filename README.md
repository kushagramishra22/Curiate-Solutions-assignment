# SEO Analyzer Web App

A powerful, production-ready web application that helps users optimize their content for better SEO performance. Analyze text content, get intelligent keyword suggestions, and seamlessly integrate keywords while maintaining content coherence.

![SEO Analyzer](https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality
- **Content Analysis**: Comprehensive SEO analysis of text content including readability scores, word count, and structural metrics
- **Keyword Intelligence**: AI-powered keyword suggestions with relevance scores, search volume, and difficulty ratings
- **Smart Keyword Insertion**: One-click keyword integration that maintains content flow and readability
- **Real-time Preview**: Live preview of updated content with inserted keywords

### Advanced Features
- **Multi-tab Interface**: Organized view with Overview, Keywords, Suggestions, and Preview tabs
- **Readability Analysis**: Flesch Reading Ease scoring with detailed breakdown
- **SEO Recommendations**: Intelligent suggestions for content optimization
- **Dark/Light Theme**: Beautiful theme switching with system preference detection
- **Responsive Design**: Fully responsive interface that works on all devices

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible UI components
- **React Hook Form** with Zod validation for robust form handling
- **Lucide React** for consistent iconography

### Backend
- **Node.js** with Express.js for the API server
- **CORS** enabled for cross-origin requests
- **Custom SEO Analysis Engine** with intelligent keyword processing

### Development Tools
- **TypeScript** for enhanced developer experience
- **ESLint** for code quality
- **Concurrently** for running multiple processes

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/kushagramishra22/Curiate-Solutions-assignment
   cd seo-analyzer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   This command starts both the frontend (Vite) and backend (Express) servers concurrently:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🏗️ Project Structure

```
seo-analyzer-app/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── SEOAnalyzer.tsx     # Main analyzer component
│   │   ├── ModeToggle.tsx      # Theme switcher
│   │   └── theme-provider.tsx  # Theme context
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── server/
│   └── index.js               # Express API server
├── public/                    # Static assets
└── dist/                      # Production build output
```

## 🔧 API Endpoints

### POST `/api/analyze`
Analyzes text content and returns SEO metrics and keyword suggestions.

**Request Body:**
```json
{
  "text": "Your content to analyze..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "wordCount": 150,
      "sentenceCount": 8,
      "paragraphCount": 3,
      "readabilityScore": 75,
      "avgWordsPerSentence": 18.8,
      "avgSentencesPerParagraph": 2.7
    },
    "keywords": [
      {
        "keyword": "digital marketing",
        "frequency": 3,
        "relevance": 85,
        "searchVolume": 12000,
        "difficulty": 45
      }
    ],
    "suggestions": [
      {
        "type": "readability",
        "message": "Text has good readability for general audience.",
        "priority": "low"
      }
    ]
  }
}
```

### POST `/api/insert-keyword`
Intelligently inserts a keyword into the provided text.

**Request Body:**
```json
{
  "text": "Original text content...",
  "keyword": "target keyword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "updatedText": "Updated text with keyword inserted...",
    "inserted": true
  }
}
```

### GET `/api/health`
Health check endpoint for monitoring server status.

## 🎨 UI Components

The application uses a comprehensive set of UI components from shadcn/ui:

- **Form Components**: Input, Textarea, Select, Button
- **Layout Components**: Card, Tabs, ScrollArea, Separator
- **Feedback Components**: Progress, Badge, Toast notifications
- **Interactive Components**: Dialog, Popover, Tooltip

## 🌟 Key Features Explained

### SEO Analysis Engine
The custom analysis engine provides:
- **Readability Scoring**: Based on Flesch Reading Ease formula
- **Content Structure Analysis**: Word, sentence, and paragraph metrics
- **Keyword Extraction**: Frequency-based keyword identification
- **Search Volume Estimation**: Simulated search volume data
- **Difficulty Assessment**: Keyword competition analysis

### Smart Keyword Insertion
The intelligent keyword insertion algorithm:
- Analyzes sentence structure and length
- Finds optimal insertion points to maintain readability
- Uses natural connecting words for seamless integration
- Prevents duplicate keyword insertion
- Maintains content coherence and flow

### Theme System
- **Light/Dark Mode**: Complete theme switching capability
- **System Preference**: Automatic detection of user's system theme
- **Persistent Storage**: Theme preference saved in localStorage
- **Smooth Transitions**: Animated theme transitions

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Netlify**: Optimized for static site deployment
- **Vercel**: Includes vercel.json configuration
- **Traditional Hosting**: Standard build output in `dist/` folder

## 🔍 Usage Guide

1. **Input Content**: Paste or type your content in the text area (minimum 50 characters)
2. **Analyze**: Click "Analyze Content" to process your text
3. **Review Results**: 
   - **Overview**: View content metrics and readability score
   - **Keywords**: See suggested keywords with relevance scores
   - **Suggestions**: Get actionable SEO recommendations
   - **Preview**: View your updated content
4. **Insert Keywords**: Click "Insert" next to any keyword to add it to your content
5. **Copy Results**: Use the "Copy Content" button to get your optimized text

## 🎯 SEO Best Practices Implemented

- **Content Length Analysis**: Optimal word count recommendations
- **Readability Optimization**: Flesch Reading Ease scoring
- **Keyword Density**: Balanced keyword distribution
- **Structural Analysis**: Sentence and paragraph optimization
- **Search Volume Insights**: Keyword popularity metrics
- **Competition Analysis**: Keyword difficulty assessment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🔮 Future Enhancements

- [ ] Integration with real SEO APIs (TextRazor, Twinword)
- [ ] Advanced keyword research tools
- [ ] Content scoring algorithms
- [ ] Export functionality (PDF, Word)
- [ ] Multi-language support
- [ ] Plagiarism detection
- [ ] Social media optimization
- [ ] Competitor analysis tools

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
