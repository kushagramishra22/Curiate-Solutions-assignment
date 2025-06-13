import { useState } from 'react';
import { Toaster } from 'sonner';
import { SEOAnalyzer } from '@/components/SEOAnalyzer';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ModeToggle';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="seo-analyzer-theme">
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SEO</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SEO Analyzer
              </h1>
            </div>
            <ModeToggle />
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Optimize Your Content for Better SEO
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Analyze your text content, get keyword suggestions, and improve your SEO performance 
                with intelligent recommendations and seamless keyword integration.
              </p>
            </div>
            
            <SEOAnalyzer />
          </div>
        </main>
        
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;