import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Search, 
  TrendingUp, 
  FileText, 
  Target, 
  Lightbulb,
  Plus,
  Loader2,
  BarChart3,
  Eye,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  text: z.string()
    .min(50, 'Text must be at least 50 characters long')
    .max(50000, 'Text must be less than 50,000 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface SEOMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readabilityScore: number;
  avgWordsPerSentence: number;
  avgSentencesPerParagraph: number;
}

interface Keyword {
  keyword: string;
  frequency: number;
  relevance: number;
  searchVolume: number;
  difficulty: number;
}

interface Suggestion {
  type: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

interface AnalysisResult {
  metrics: SEOMetrics;
  keywords: Keyword[];
  suggestions: Suggestion[];
}

export function SEOAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isInserting, setIsInserting] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentText, setCurrentText] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsAnalyzing(true);
    setCurrentText(data.text);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data.text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }
      
      const result = await response.json();
      setAnalysisResult(result.data);
      toast.success('Analysis completed successfully!');
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const insertKeyword = async (keyword: string) => {
    if (!currentText) return;
    
    setIsInserting(keyword);
    
    try {
      const response = await fetch('/api/insert-keyword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: currentText, 
          keyword: keyword 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to insert keyword');
      }
      
      const result = await response.json();
      
      if (result.data.inserted) {
        setCurrentText(result.data.updatedText);
        form.setValue('text', result.data.updatedText);
        toast.success(`Keyword "${keyword}" inserted successfully!`);
      } else {
        toast.info(`Keyword "${keyword}" already exists in the text.`);
      }
      
    } catch (error) {
      console.error('Keyword insertion error:', error);
      toast.error('Failed to insert keyword. Please try again.');
    } finally {
      setIsInserting(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Eye className="w-4 h-4" />;
      case 'low': return <CheckCircle2 className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return { level: 'Very Easy', color: 'text-green-600' };
    if (score >= 80) return { level: 'Easy', color: 'text-green-500' };
    if (score >= 70) return { level: 'Fairly Easy', color: 'text-yellow-500' };
    if (score >= 60) return { level: 'Standard', color: 'text-orange-500' };
    if (score >= 50) return { level: 'Fairly Difficult', color: 'text-red-500' };
    if (score >= 30) return { level: 'Difficult', color: 'text-red-600' };
    return { level: 'Very Difficult', color: 'text-red-700' };
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Content Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your content for SEO analysis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your blog post, article, social media content, or any text you want to optimize for SEO..."
                        className="min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{field.value.length} characters</span>
                      <span>Min: 50 | Max: 50,000</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isAnalyzing}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Content
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Word Count</p>
                        <p className="text-2xl font-bold">{analysisResult.metrics.wordCount}</p>
                      </div>
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Sentences</p>
                        <p className="text-2xl font-bold">{analysisResult.metrics.sentenceCount}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Paragraphs</p>
                        <p className="text-2xl font-bold">{analysisResult.metrics.paragraphCount}</p>
                      </div>
                      <Target className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Words/Sentence</p>
                        <p className="text-2xl font-bold">{analysisResult.metrics.avgWordsPerSentence}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Readability Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Readability Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Readability Score</span>
                      <span className={`text-sm font-bold ${getReadabilityLevel(analysisResult.metrics.readabilityScore).color}`}>
                        {analysisResult.metrics.readabilityScore}/100 - {getReadabilityLevel(analysisResult.metrics.readabilityScore).level}
                      </span>
                    </div>
                    <Progress value={analysisResult.metrics.readabilityScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average words per sentence:</span>
                      <span className="font-medium">{analysisResult.metrics.avgWordsPerSentence}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average sentences per paragraph:</span>
                      <span className="font-medium">{analysisResult.metrics.avgSentencesPerParagraph}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Keyword Analysis & Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {analysisResult.keywords.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{keyword.keyword}</span>
                              {keyword.frequency > 0 && (
                                <Badge variant="secondary">
                                  Used {keyword.frequency}x
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="block">Relevance</span>
                                <div className="flex items-center gap-1">
                                  <Progress value={keyword.relevance} className="h-1 flex-1" />
                                  <span className="text-xs">{Math.round(keyword.relevance)}%</span>
                                </div>
                              </div>
                              <div>
                                <span className="block">Search Volume</span>
                                <span className="font-medium text-foreground">{keyword.searchVolume.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="block">Difficulty</span>
                                <span className="font-medium text-foreground">{keyword.difficulty}/100</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => insertKeyword(keyword.keyword)}
                            disabled={isInserting === keyword.keyword}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                          >
                            {isInserting === keyword.keyword ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                Inserting...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-1" />
                                Insert
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="suggestions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    SEO Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {getPriorityIcon(suggestion.priority)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={getPriorityColor(suggestion.priority) as any}>
                              {suggestion.priority.toUpperCase()} PRIORITY
                            </Badge>
                            <span className="text-sm text-muted-foreground capitalize">
                              {suggestion.type}
                            </span>
                          </div>
                          <p className="text-sm">{suggestion.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Updated Content Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {currentText}
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Updated content length: {currentText.length} characters</span>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(currentText);
                        toast.success('Content copied to clipboard!');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Copy Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}