export interface ExtractedClaim {
  claimText: string;
  verdict: 'Verified' | 'Misleading' | 'Unverified' | 'Fabricated' | string;
  explanation: string;
  sources: string[];
}

export interface PublisherAnalysis {
  publisherName: string;
  reliabilityScore: number;
  summary: string;
}

export interface AnalysisData {
  credibilityScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | string;
  analysisSummary: string;
  extractedClaims: ExtractedClaim[];
  riskFactors: string[];
  publisherAnalysis: PublisherAnalysis;
}

export interface AnalysisResponse {
  success: boolean;
  isSimulated: boolean;
  source: string;
  errorMsg?: string;
  data: AnalysisData;
}

export interface TrendingTopic {
  topic: string;
  count: number;
  change: string;
  risk: 'Low' | 'Medium' | 'High' | string;
}

export interface DailyActivity {
  date: string;
  analyzed: number;
  fake: number;
}

export interface SourceCredibility {
  name: string;
  value: number;
}

export interface RegionalIncident {
  region: string;
  incidentRate: number;
  volume: 'Low' | 'Medium' | 'High' | string;
}

export interface DashboardStats {
  totalClaimsAnalyzed: number;
  misinformationDetected: number;
  verifiedSources: number;
  activeUsers: number;
  trendingTopics: TrendingTopic[];
  dailyDetectionActivity: DailyActivity[];
  sourceCredibility: SourceCredibility[];
  regionalHeatmap: RegionalIncident[];
}
