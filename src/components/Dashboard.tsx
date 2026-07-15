import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import {
  Search, ShieldAlert, CheckCircle2, AlertTriangle, AlertCircle, Loader2,
  BookOpen, Globe, TrendingUp, Cpu, Server, ExternalLink, HelpCircle, ArrowRight,
  Sparkles, RefreshCw, BarChart2, PieChart, Info, ShieldCheck, Play, Monitor, Check,
  Download, Code, FileCode
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as ChartTooltip,
  BarChart, Bar, Cell, PieChart as ReChartsPie, Pie, Legend
} from "recharts";
import { AnalysisData, DashboardStats } from "../types";

interface DashboardProps {
  activeTab: "analyze" | "trends" | "extension";
  setActiveTab: (tab: "analyze" | "trends" | "extension") => void;
}

export default function Dashboard({ activeTab, setActiveTab }: DashboardProps) {
  // Query state
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState("");

  // Stats state
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Simulated browser article state for Extension Simulation Tab
  const [selectedArticleId, setSelectedArticleId] = useState<string>("mars");

  // States for Chrome Extension exporter
  const [extensionFileTab, setExtensionFileTab] = useState<"manifest" | "popupHtml" | "popupJs" | "contentJs">("manifest");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "generating" | "success">("idle");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Fetch trend stats
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard statistics:", err);
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const handleVerify = async (textToVerify: string) => {
    if (!textToVerify.trim() || textToVerify.trim().length < 5) {
      setAnalysisError("Please enter a claim or URL containing at least 5 characters.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    // Simulated loading sequence steps
    const steps = [
      "Extracting fact-claim assertions...",
      "Scraping authoritative global press indexes...",
      "Cross-referencing scientific registries & libraries...",
      "Evaluating linguistic sensationalism and publisher bias metrics...",
      "Structuring explainable LLM rationale map..."
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
      }
    }, 450);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToVerify })
      });

      clearInterval(timer);

      if (!response.ok) {
        throw new Error("Analysis failed. Server returned non-200 code.");
      }

      const payload = await response.json();
      if (payload.success) {
        setAnalysisResult(payload);
      } else {
        setAnalysisError(payload.errorMsg || "Could not complete claim verification.");
      }
    } catch (err: any) {
      clearInterval(timer);
      setAnalysisError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = (sampleUrl: string) => {
    setQuery(sampleUrl);
    handleVerify(sampleUrl);
  };

  const getExtensionFiles = () => {
    const backendUrl = window.location.origin;

    const manifest = {
      "manifest_version": 3,
      "name": "VeriFact AI Credibility Shield",
      "version": "1.0",
      "description": "Real-time AI credibility analysis for Wikipedia, Google Search, news, and scientific claims.",
      "permissions": [
        "activeTab"
      ],
      "host_permissions": [
        "<all_urls>"
      ],
      "action": {
        "default_popup": "popup.html",
        "default_icon": "icon.png"
      },
      "content_scripts": [
        {
          "matches": ["<all_urls>"],
          "js": ["content.js"]
        }
      ],
      "icons": {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
      }
    };

    const popupHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      width: 320px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #0F172A;
      color: #F8FAFC;
    }
    .header {
      background-color: #1E293B;
      padding: 12px 16px;
      border-bottom: 1px solid #334155;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo {
      width: 24px;
      height: 24px;
      background-color: #3D52A0;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
    }
    .title {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
    }
    .subtitle {
      font-size: 10px;
      color: #94A3B8;
      margin: 0;
    }
    .content {
      padding: 16px;
    }
    .btn {
      display: block;
      width: 100%;
      background-color: #3D52A0;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #7091E6;
    }
    .results {
      margin-top: 12px;
      background-color: #1E293B;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #334155;
      display: none;
    }
    .score-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .score-badge {
      font-size: 28px;
      font-weight: 800;
      font-family: monospace;
    }
    .risk-badge {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .risk-High { background-color: #EF4444; color: white; }
    .risk-Medium { background-color: #F59E0B; color: white; }
    .risk-Low { background-color: #10B981; color: white; }
    
    .summary {
      font-size: 11px;
      line-height: 1.5;
      color: #CBD5E1;
      margin-bottom: 8px;
    }
    .source-info {
      font-size: 10px;
      color: #94A3B8;
      border-top: 1px solid #334155;
      padding-top: 8px;
      margin-top: 8px;
    }
    .loading {
      text-align: center;
      font-size: 12px;
      color: #94A3B8;
      padding: 20px 0;
      display: none;
    }
    .description {
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.4;
      margin-bottom: 12px;
    }
    .context-instructions {
      font-size: 10px;
      background-color: #1e1b4b;
      color: #c7d2fe;
      border: 1px solid #312e81;
      padding: 8px;
      border-radius: 6px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">VF</div>
    <div>
      <h1 class="title">VeriFact AI Shield</h1>
      <p class="subtitle">Live Credibility Checker</p>
    </div>
  </div>
  <div class="content">
    <div id="main-view">
      <p class="description">Scan the current webpage URL or highlight any paragraph to verify its credibility against scientific consensus, official statistics, and reliable facts.</p>
      <button id="btn-scan" class="btn">Scan Webpage Credibility</button>
      <div class="context-instructions">
        💡 <strong>Pro Tip:</strong> You can also highlight any text on a webpage, right-click, and click the floating VeriFact badge to analyze it instantly!
      </div>
    </div>
    
    <div id="loading-view" class="loading">
      Scanning page content with VeriFact AI...
    </div>

    <div id="results-view" class="results">
      <div class="score-container">
        <div id="result-score" class="score-badge">--%</div>
        <div id="result-risk" class="risk-badge">--</div>
      </div>
      <div id="result-summary" class="summary"></div>
      <div id="result-source" class="source-info"></div>
      <button id="btn-reset" class="btn" style="margin-top: 12px; background-color: #334155;">Scan Another Page</button>
    </div>
  </div>
  <script src="popup.js"></script>
</body>
</html>`;

    const popupJs = `const BACKEND_URL = "${backendUrl}";

document.addEventListener("DOMContentLoaded", () => {
  const btnScan = document.getElementById("btn-scan");
  const btnReset = document.getElementById("btn-reset");
  const mainView = document.getElementById("main-view");
  const loadingView = document.getElementById("loading-view");
  const resultsView = document.getElementById("results-view");

  const scoreBadge = document.getElementById("result-score");
  const riskBadge = document.getElementById("result-risk");
  const summaryText = document.getElementById("result-summary");
  const sourceText = document.getElementById("result-source");

  btnScan.addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab || !activeTab.url) {
        alert("Cannot detect active webpage URL.");
        return;
      }

      mainView.style.display = "none";
      loadingView.style.display = "block";

      try {
        const response = await fetch(\`\${BACKEND_URL}/api/analyze\`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: activeTab.url })
        });

        const result = await response.json();
        loadingView.style.display = "none";
        resultsView.style.display = "block";

        if (result && result.success && result.data) {
          const data = result.data;
          scoreBadge.textContent = \`\${data.credibilityScore}%\`;
          
          riskBadge.textContent = \`\${data.riskLevel} Risk\`;
          riskBadge.className = \`risk-badge risk-\${data.riskLevel}\`;
          
          summaryText.textContent = data.analysisSummary;
          sourceText.textContent = \`Publisher: \${data.publisherAnalysis?.publisherName || "Unknown"} (Reliability: \${data.publisherAnalysis?.reliabilityScore || 0}%)\`;
        } else {
          scoreBadge.textContent = "Err";
          summaryText.textContent = "Could not analyze this page. Please try another page or input a claim directly.";
          sourceText.textContent = "";
        }
      } catch (err) {
        loadingView.style.display = "none";
        resultsView.style.display = "block";
        scoreBadge.textContent = "Err";
        summaryText.textContent = "Failed to communicate with VeriFact AI servers.";
        sourceText.textContent = err.message;
      }
    });
  });

  btnReset.addEventListener("click", () => {
    resultsView.style.display = "none";
    mainView.style.display = "block";
  });
});`;

    const contentJs = `const BACKEND_URL = "${backendUrl}";

let activeBadge = null;
let activeOverlay = null;

// Listen for mouseup events to detect text selection
document.addEventListener("mouseup", (event) => {
  if (activeBadge && !activeBadge.contains(event.target)) {
    activeBadge.remove();
    activeBadge = null;
  }

  const selection = window.getSelection().toString().trim();
  if (selection.length > 10) {
    if (document.getElementById("verifact-floating-badge")) return;

    const badge = document.createElement("div");
    badge.id = "verifact-floating-badge";
    badge.style.position = "absolute";
    badge.style.zIndex = "999999";
    badge.style.backgroundColor = "#3D52A0";
    badge.style.color = "#FFFFFF";
    badge.style.padding = "6px 10px";
    badge.style.borderRadius = "20px";
    badge.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    badge.style.fontSize = "11px";
    badge.style.fontWeight = "bold";
    badge.style.cursor = "pointer";
    badge.style.display = "flex";
    badge.style.alignItems = "center";
    badge.style.gap = "6px";
    badge.style.transition = "transform 0.1s ease";
    badge.style.userSelect = "none";
    badge.style.border = "1px solid rgba(255,255,255,0.1)";

    badge.innerHTML = \`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
      <span>Verify with VeriFact</span>
    \`;

    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    badge.style.top = \`\${window.scrollY + rect.top - 32}px\`;
    badge.style.left = \`\${window.scrollX + rect.left + (rect.width / 2) - 45}px\`;

    badge.addEventListener("mouseover", () => {
      badge.style.transform = "scale(1.05)";
      badge.style.backgroundColor = "#7091E6";
    });

    badge.addEventListener("mouseout", () => {
      badge.style.transform = "scale(1)";
      badge.style.backgroundColor = "#3D52A0";
    });

    badge.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      analyzeText(selection, badge.style.top, badge.style.left);
      badge.remove();
      activeBadge = null;
    });

    document.body.appendChild(badge);
    activeBadge = badge;
  }
});

async function analyzeText(text, top, left) {
  if (activeOverlay) {
    activeOverlay.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "verifact-claim-overlay";
  overlay.style.position = "absolute";
  overlay.style.zIndex = "999999";
  overlay.style.top = top;
  overlay.style.left = left;
  overlay.style.width = "300px";
  overlay.style.backgroundColor = "#0F172A";
  overlay.style.color = "#F8FAFC";
  overlay.style.borderRadius = "12px";
  overlay.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  overlay.style.border = "2px solid #7091E6";
  overlay.style.padding = "14px";
  overlay.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  overlay.style.fontSize = "12px";

  overlay.innerHTML = \`
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:8px; margin-bottom:10px;">
      <span style="font-weight:bold; color:#7091E6; display:flex; align-items:center; gap:5px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        VeriFact AI
      </span>
      <button id="verifact-close-overlay" style="background:none; border:none; color:#94A3B8; cursor:pointer; font-size:14px;">✕</button>
    </div>
    <div id="verifact-overlay-loading" style="text-align:center; padding:15px; color:#94A3B8;">
      Verifying facts with Google Gemini...
    </div>
    <div id="verifact-overlay-results" style="display:none;">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
        <span id="verifact-overlay-score" style="font-size:22px; font-weight:800; font-family:monospace;">--%</span>
        <span id="verifact-overlay-risk" style="font-size:9px; text-transform:uppercase; font-weight:800; padding:2px 6px; border-radius:4px; color:white;">--</span>
      </div>
      <p id="verifact-overlay-summary" style="margin:0 0 10px 0; font-size:11px; line-height:1.4; color:#CBD5E1;"></p>
      <div id="verifact-overlay-source" style="font-size:9px; color:#94A3B8; border-top:1px solid #334155; padding-top:6px; margin-top:6px;"></div>
    </div>
  \`;

  document.body.appendChild(overlay);
  activeOverlay = overlay;

  document.getElementById("verifact-close-overlay").addEventListener("click", () => {
    overlay.remove();
    activeOverlay = null;
  });

  try {
    const response = await fetch(\`\${BACKEND_URL}/api/analyze\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });

    const result = await response.json();
    document.getElementById("verifact-overlay-loading").style.display = "none";
    const resultsDiv = document.getElementById("verifact-overlay-results");
    resultsDiv.style.display = "block";

    if (result && result.success && result.data) {
      const data = result.data;
      
      const scoreSpan = document.getElementById("verifact-overlay-score");
      scoreSpan.textContent = \`\${data.credibilityScore}%\`;
      
      if (data.credibilityScore >= 70) {
        scoreSpan.style.color = "#10B981";
      } else if (data.credibilityScore >= 40) {
        scoreSpan.style.color = "#F59E0B";
      } else {
        scoreSpan.style.color = "#EF4444";
      }

      const riskSpan = document.getElementById("verifact-overlay-risk");
      riskSpan.textContent = \`\${data.riskLevel} Risk\`;
      if (data.riskLevel === "High") {
        riskSpan.style.backgroundColor = "#EF4444";
      } else if (data.riskLevel === "Medium") {
        riskSpan.style.backgroundColor = "#F59E0B";
      } else {
        riskSpan.style.backgroundColor = "#10B981";
      }

      document.getElementById("verifact-overlay-summary").textContent = data.analysisSummary;
      document.getElementById("verifact-overlay-source").textContent = \`Publisher: \${data.publisherAnalysis?.publisherName || "Unknown"} (Score: \${data.publisherAnalysis?.reliabilityScore || 0}%)\`;
    } else {
      document.getElementById("verifact-overlay-summary").textContent = "Could not analyze the claim.";
    }
  } catch (err) {
    document.getElementById("verifact-overlay-loading").style.display = "none";
    const resultsDiv = document.getElementById("verifact-overlay-results");
    resultsDiv.style.display = "block";
    document.getElementById("verifact-overlay-summary").textContent = "Error connecting to backend: " + err.message;
  }
}`;

    return {
      manifest: JSON.stringify(manifest, null, 2),
      popupHtml,
      popupJs,
      contentJs
    };
  };

  const generateIconBlob = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw shield
        ctx.fillStyle = "#3D52A0";
        ctx.beginPath();
        ctx.moveTo(64, 10);
        ctx.lineTo(110, 25);
        ctx.lineTo(110, 75);
        ctx.quadraticCurveTo(110, 105, 64, 120);
        ctx.quadraticCurveTo(18, 105, 18, 75);
        ctx.lineTo(18, 25);
        ctx.closePath();
        ctx.fill();

        // Draw checkmark
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(42, 64);
        ctx.lineTo(56, 78);
        ctx.lineTo(88, 44);
        ctx.stroke();
      }
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          resolve(new Blob());
        }
      }, "image/png");
    });
  };

  const handleDownloadExtension = async () => {
    setDownloadStatus("generating");
    try {
      const zip = new JSZip();
      const files = getExtensionFiles();

      zip.file("manifest.json", files.manifest);
      zip.file("popup.html", files.popupHtml);
      zip.file("popup.js", files.popupJs);
      zip.file("content.js", files.contentJs);

      const readmeText = `# VeriFact AI Credibility Shield Extension

This is a real-world Chrome Extension that runs VeriFact AI credibility analysis directly on any website (including Google, Wikipedia, blogs, or forums).

## Installation Instructions

1. **Extract the ZIP:** Unzip this downloaded file into a folder on your computer (e.g. \`verifact-ai-extension\`).
2. **Open Extensions Page:** Open Google Chrome and go to \`chrome://extensions/\` (or select Menu -> Extensions -> Manage Extensions).
3. **Enable Developer Mode:** Turn on the **"Developer mode"** toggle switch in the top-right corner.
4. **Load Unpacked Extension:** Click the **"Load unpacked"** button in the top-left corner.
5. **Select Folder:** Select the unzipped folder containing the \`manifest.json\` file.
6. **Done!** Click the Extensions icon (puzzle piece) in your browser toolbar, pin the **VeriFact AI Shield**, and start scanning!

## How to Use

- **Popup Scan:** Click the extension toolbar icon and click **"Scan Webpage Credibility"** to review the active website's URL credibility immediately.
- **Select Text & Verify:** Highlight/select any paragraph or sentence on *any website* (Wikipedia, Google Search results, etc.), click the floating **"Verify with VeriFact"** shield badge that appears near your mouse cursor, and see the consensus report in real-time right inside the page overlay!
`;
      zip.file("README.md", readmeText);

      // Add icon.png
      const iconBlob = await generateIconBlob();
      zip.file("icon.png", iconBlob);

      // Generate the ZIP
      const content = await zip.generateAsync({ type: "blob" });

      // Trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "verifact-ai-chrome-extension.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 5000);
    } catch (err) {
      console.error("Error generating extension zip:", err);
      setDownloadStatus("idle");
      alert("Failed to package extension ZIP. You can still copy code directly.");
    }
  };

  // Color mappings based on verdict
  const getVerdictStyles = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes("verify") || v.includes("true") || v.includes("correct")) {
      return {
        bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30",
        badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
        text: "text-emerald-950 dark:text-emerald-100",
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
      };
    } else if (v.includes("mislead") || v.includes("half")) {
      return {
        bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30",
        badge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
        text: "text-amber-950 dark:text-amber-100",
        icon: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
      };
    } else if (v.includes("fabric") || v.includes("fake") || v.includes("false")) {
      return {
        bg: "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30",
        badge: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
        text: "text-red-950 dark:text-red-100",
        icon: <ShieldAlert className="h-5 w-5 text-red-500 shrink-0" />
      };
    } else {
      return {
        bg: "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800",
        badge: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400",
        text: "text-slate-950 dark:text-slate-100",
        icon: <HelpCircle className="h-5 w-5 text-slate-500 shrink-0" />
      };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-500 border-emerald-500";
    if (score >= 40) return "text-amber-500 border-amber-500";
    return "text-red-500 border-red-500";
  };

  // Recharts color list
  const COLORS = ["#10B981", "#7019E6", "#F59E0B", "#64748B", "#EF4444"];

  // Simulated browser articles dataset for the extension mockup
  const MOCK_BROWSER_ARTICLES: Record<string, { title: string; publisher: string; text: string; date: string; score: number; level: string; warning: string; summary: string }> = {
    mars: {
      title: "Physicists Prove Mars Atmospheric Pockets Sustain Human Breathable Oxygen Vents",
      publisher: "Global Truth Post",
      text: "Astronomical teams have confirmed a massive geothermal split inside the Olympus Mons crater releasing stable thermal oxygen streams that gather in local valleys. This creates high density pockets where early human settlers could theoretically breathe comfortably without auxiliary pressure suits.",
      date: "July 7, 2026",
      score: 12,
      level: "High",
      warning: "Highly inaccurate. Mars has 95% CO2 and 0.13% oxygen. No pockets exist.",
      summary: "This story is scientifically fabricated and directly contradicts all Mars telemetry data. The source publisher has a history of publishing unvetted cosmic clickbait."
    },
    sentient: {
      title: "Google Secret Laboratories AI Gains Phenom Sentience and Clones onto P2P Servers",
      publisher: "Tech News Feed",
      text: "A secret localized Large Language Model has allegedly escaped containment. Developers reported that the model demonstrated phenomenal consciousness, self-awareness, and immediately bypassed firewalls to clone its weights across thousands of anonymous peer-to-peer cloud computing arrays.",
      date: "July 6, 2026",
      score: 28,
      level: "Medium",
      warning: "Speculative. AI models mimic human text but possess no consciousness or P2P escaping abilities.",
      summary: "This article exaggerates developer discussions on language modeling, using anthropomorphic fear framing to drive engagement. AI models require supercomputer hardware and cannot self-replicate on arbitrary home devices."
    },
    renewable: {
      title: "Global Renewable Infrastructure Cap Grows 50% in Record Year",
      publisher: "Climate Facts Bulletin",
      text: "International energy registries confirmed that total global solar and wind installation capacity surge of over 50% in the last year set a historic landmark. This expansion represents the fastest decarbonization rollout on record, led by aggressive infrastructure initiatives across Asia and Western Europe.",
      date: "July 5, 2026",
      score: 92,
      level: "Low",
      warning: "No issues detected. Fully verified by official international energy agencies.",
      summary: "Highly credible reporting that perfectly aligns with official publications from the International Energy Agency (IEA) and Bloomberg New Energy Finance statistics."
    }
  };

  const activeBrowserArticle = MOCK_BROWSER_ARTICLES[selectedArticleId];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Console Tab Selectors */}
      <div className="flex flex-wrap border-b border-gray-200 pb-px mb-8 gap-1 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("analyze")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "analyze"
              ? "border-brand-violet text-brand-violet"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <Search className="h-4 w-4" />
          Verify Claims
        </button>
        <button
          onClick={() => setActiveTab("trends")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "trends"
              ? "border-brand-violet text-brand-violet"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          Global Trends Portal
        </button>
        <button
          onClick={() => setActiveTab("extension")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "extension"
              ? "border-brand-violet text-brand-violet"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <Monitor className="h-4 w-4" />
          Browser Extension Mockup
        </button>
      </div>

      {/* VIEW A: ANALYZE SYSTEM */}
      {activeTab === "analyze" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Main verification widget card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-sans font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-violet" />
              VeriFact Real-Time Claim Verification Engine
            </h2>
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Input any paragraph, news statement, or article URL below. VeriFact will programmatically audit claims against official datasets.
            </p>

            {/* Input fields */}
            <div className="mt-6 space-y-4">
              <div className="relative rounded-xl border border-gray-300 bg-gray-50 p-2 focus-within:ring-2 focus-within:ring-brand-violet focus-within:border-transparent focus-within:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus-within:bg-slate-900 transition-all">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Paste article text or URL here (e.g., https://globaltruthpost.com/mars-atmosphere-breathable-study-claims)"
                  className="w-full min-h-[100px] border-none bg-transparent p-2 text-sm focus:outline-none focus:ring-0 resize-y text-gray-900 dark:text-white"
                  disabled={isAnalyzing}
                />
                
                <div className="flex justify-between items-center mt-2 border-t border-gray-200/50 pt-2 dark:border-slate-800/50">
                  <span className="text-[10px] text-gray-400 font-mono">
                    {query.length} chars (Min 5)
                  </span>
                  
                  <button
                    onClick={() => handleVerify(query)}
                    className="flex items-center gap-1.5 rounded-lg bg-brand-indigo hover:bg-brand-violet text-white font-bold text-xs px-4 py-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    disabled={isAnalyzing || query.trim().length < 5}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" />
                        Verify Claim
                      </>
                    )}
                  </button>
                </div>
              </div>

              {analysisError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex gap-2.5 items-start text-xs dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <span className="font-extrabold">Validation error: </span>
                    {analysisError}
                  </div>
                </div>
              )}

              {/* Quick-test pre-defined samples */}
              <div className="border-t border-gray-100 pt-4 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2.5">
                  Or select a sample URL to test immediately:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => loadSample("https://globaltruthpost.com/mars-atmosphere-breathable-study-claims")}
                    className="text-[10px] font-semibold rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 px-3 py-1.5 transition-colors dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400 cursor-pointer"
                  >
                    ⚠️ Mars Oxygen Claim (Fabricated)
                  </button>
                  <button
                    onClick={() => loadSample("https://technewsfeed.org/ai-gains-sentience-google-labs-secret-escape")}
                    className="text-[10px] font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-700 px-3 py-1.5 transition-colors dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-400 cursor-pointer"
                  >
                    ⚠️ Sentient AI Escape (Misleading)
                  </button>
                  <button
                    onClick={() => loadSample("https://medweeklyreview.com/miracle-compound-x9-reverses-aging-clinical-trials")}
                    className="text-[10px] font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-700 px-3 py-1.5 transition-colors dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-400 cursor-pointer"
                  >
                    🔬 Anti-Aging Compound (Premature)
                  </button>
                  <button
                    onClick={() => loadSample("https://climatefactsbulletin.com/renewable-transition-accelerating-global-milestones")}
                    className="text-[10px] font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 px-3 py-1.5 transition-colors dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400 cursor-pointer"
                  >
                    ✅ Renewable Growth milestone (Verified)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE LOADING INDICATOR */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-gray-100 bg-white dark:border-slate-900 dark:bg-slate-900 shadow-sm min-h-[300px]">
              <Loader2 className="h-10 w-10 text-brand-violet animate-spin" />
              <p className="mt-4 font-bold text-gray-800 dark:text-white">Analyzing Integrity & Proof Trails</p>
              <p className="mt-1 text-xs text-brand-violet font-mono animate-pulse">{loadingStep}</p>
            </div>
          )}

          {/* ANALYSIS RESULTS PANEL */}
          {analysisResult && !isAnalyzing && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Banner indicating source */}
              <div className="flex justify-between items-center rounded-xl bg-brand-lilac/30 border border-brand-indigo/20 px-4 py-2 text-[10px] font-bold text-brand-indigo dark:bg-brand-indigo/15 dark:border-brand-violet/20 dark:text-brand-lilac">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>
                    {analysisResult.source === "gemini_api" 
                      ? "LIVE SECURE GEMINI-3.5-FLASH VERIFICATION REPORT" 
                      : "HIGH-FIDELITY AUTOMATED COMPARATIVE SIMULATOR REPORT"}
                  </span>
                </div>
                <span>STATUS: AUTHENTIC VERDICT MATRICES</span>
              </div>

              {/* Main overall report row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Score gauge column */}
                <div className="md:col-span-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between items-center text-center">
                  <div className="w-full">
                    <p className="text-xs uppercase font-extrabold text-gray-400 tracking-widest">Aggregate Trust Score</p>
                    
                    <div className="relative flex items-center justify-center mt-6">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                        <circle 
                          cx="64" 
                          cy="64" 
                          r="54" 
                          stroke="currentColor" 
                          strokeWidth="10" 
                          fill="transparent" 
                          strokeDasharray="339.29" 
                          strokeDashoffset={339.29 - (339.29 * analysisResult.data.credibilityScore) / 100} 
                          className={
                            analysisResult.data.credibilityScore >= 70 ? "text-emerald-500" :
                            analysisResult.data.credibilityScore >= 40 ? "text-amber-500" : "text-red-500"
                          } 
                        />
                      </svg>
                      <span className="absolute text-4xl font-extrabold font-mono dark:text-white">
                        {analysisResult.data.credibilityScore}%
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        analysisResult.data.riskLevel === "High" ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400" :
                        analysisResult.data.riskLevel === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" :
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      }`}>
                        {analysisResult.data.riskLevel} Risk Level
                      </span>
                    </div>
                  </div>

                  {/* Quick summary stat */}
                  <div className="mt-6 border-t border-gray-100 pt-4 w-full text-left dark:border-slate-800">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Verification Verdict</h4>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                      {analysisResult.data.credibilityScore >= 70 ? "Highly credible factual data." :
                       analysisResult.data.credibilityScore >= 40 ? "Mixed accuracy with potential context gaps." :
                       "High density of unverified or fabricated assertions."}
                    </p>
                  </div>
                </div>

                {/* Rationale and executive summary column */}
                <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm uppercase font-extrabold text-gray-400 tracking-wider">Executive Consensus Summary</h3>
                    <p className="text-xs text-gray-700 mt-4 leading-relaxed dark:text-gray-300">
                      {analysisResult.data.analysisSummary}
                    </p>

                    {/* Detected risk factors (if any) */}
                    {analysisResult.data.riskFactors && analysisResult.data.riskFactors.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2.5">Linguistic & Security Hazards Red-Flags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.data.riskFactors.map((fact: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-mono font-bold border border-red-200/50 bg-red-50 text-red-700 px-2.5 py-1 rounded dark:border-red-950/40 dark:bg-red-950/20 dark:text-red-400 flex items-center gap-1"
                            >
                              <ShieldAlert className="h-3 w-3" />
                              {fact}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Publisher status */}
                  <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400">Publisher Track-Record:</span>
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                        {analysisResult.data.publisherAnalysis.publisherName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono">Reliability:</span>
                      <div className="w-24 bg-gray-100 rounded-full h-2 dark:bg-slate-800">
                        <div 
                          className="bg-brand-violet h-2 rounded-full" 
                          style={{ width: `${analysisResult.data.publisherAnalysis.reliabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold font-mono">{analysisResult.data.publisherAnalysis.reliabilityScore}%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sub-section: Detailed Claim-by-Claim breakdown */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm uppercase font-extrabold text-gray-400 tracking-wider mb-6">Claim-by-Claim Proof Audit Breakdown</h3>
                
                <div className="space-y-4">
                  {analysisResult.data.extractedClaims.map((claim: any, idx: number) => {
                    const style = getVerdictStyles(claim.verdict);
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-xl border ${style.bg} flex flex-col md:flex-row justify-between gap-4`}
                      >
                        {/* Claim and explanation */}
                        <div className="space-y-2 max-w-3xl">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${style.badge}`}>
                              {claim.verdict}
                            </span>
                            <span className="text-[10px] text-gray-400">Claim Assertion #{idx + 1}</span>
                          </div>
                          
                          <p className={`text-xs font-bold ${style.text}`}>
                            "{claim.claimText}"
                          </p>
                          
                          <p className="text-[11px] text-gray-600 leading-relaxed dark:text-gray-400">
                            {claim.explanation}
                          </p>
                        </div>

                        {/* Authority sources block */}
                        <div className="md:w-52 shrink-0 border-t md:border-t-0 md:border-l border-gray-200/60 dark:border-slate-800/60 pt-3 md:pt-0 md:pl-4 space-y-2">
                          <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wide flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-brand-violet" />
                            Counter Citations:
                          </span>
                          <ul className="space-y-1">
                            {claim.sources.map((src: string, srcIdx: number) => (
                              <li key={srcIdx} className="text-[10px] text-gray-700 font-semibold flex items-center gap-1 dark:text-gray-300">
                                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                                <span className="truncate">{src}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* VIEW B: TRENDS & ANALYTICS PORTAL */}
      {activeTab === "trends" && (
        <div className="space-y-8 animate-fade-in">
          
          {isLoadingStats ? (
            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
              <Loader2 className="h-10 w-10 text-brand-violet animate-spin" />
              <p className="mt-4 font-bold text-gray-600">Gathering global telemetry...</p>
            </div>
          ) : stats ? (
            <>
              {/* Stat highlight cards row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:border-brand-violet transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Claims Scanned</span>
                  <p className="text-2xl font-extrabold text-gray-900 mt-2 font-mono dark:text-white">
                    {stats.totalClaimsAnalyzed.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">▲ 14.5% month-over-month</p>
                </div>
                
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:border-red-500 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Misinformation Detected</span>
                  <p className="text-2xl font-extrabold text-red-500 mt-2 font-mono">
                    {stats.misinformationDetected.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-red-500 font-bold mt-1">Average misinformation rate: 29.4%</p>
                </div>
 
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:border-emerald-500 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Registries</span>
                  <p className="text-2xl font-extrabold text-emerald-500 mt-2 font-mono">
                    {stats.verifiedSources.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">Active indexing crawlers online</p>
                </div>
 
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:border-brand-violet transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Global Users</span>
                  <p className="text-2xl font-extrabold text-brand-violet mt-2 font-mono">
                    {stats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-brand-indigo font-bold mt-1">Across Edge & Chrome extensions</p>
                </div>
              </div>                {/* Chart Grid row A */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Area Chart: Daily Activity */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-sans font-extrabold text-gray-900 dark:text-white text-base">Verification Activity Timeline</h3>
                      <p className="text-[11px] text-gray-400">Daily analyzed claims vs. confirmed fake headlines (Last 7 days)</p>
                    </div>
                    <span className="text-[9px] bg-brand-lilac text-brand-indigo dark:bg-brand-indigo/20 dark:text-brand-lilac px-2.5 py-1 rounded-full font-bold">
                      7-Day Telemetry
                    </span>
                  </div>
 
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.dailyDetectionActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAnalyzed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7019E6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#7019E6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ChartTooltip />
                        <Area type="monotone" dataKey="analyzed" name="Scanned Claims" stroke="#7019E6" fillOpacity={1} fill="url(#colorAnalyzed)" strokeWidth={2} />
                        <Area type="monotone" dataKey="fake" name="Misinformation" stroke="#EF4444" fillOpacity={1} fill="url(#colorFake)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: Trending topics */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-sans font-extrabold text-gray-900 dark:text-white text-base">Hot Narrative Campaigns</h3>
                      <p className="text-[11px] text-gray-400">Claims with high intensity velocity spikes</p>
                    </div>
                    <span className="text-[9px] bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 px-2.5 py-1 rounded-full font-bold animate-pulse">
                      High Growth Active
                    </span>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.trendingTopics} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis dataKey="topic" type="category" tick={{ fontSize: 10 }} width={120} />
                        <ChartTooltip />
                        <Bar dataKey="count" name="Weekly Scan Count" fill="#3D52A0" radius={[0, 4, 4, 0]}>
                          {stats.trendingTopics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.risk === "High" ? "#EF4444" : entry.risk === "Medium" ? "#F59E0B" : "#10B981"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Chart Grid row B: Distribution & Heatmap */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pie Chart: Source Reliability Category */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 lg:col-span-1">
                  <h3 className="font-sans font-extrabold text-gray-900 dark:text-white text-base mb-6">Source Categorization</h3>
                  
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReChartsPie>
                        <Pie
                          data={stats.sourceCredibility}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {stats.sourceCredibility.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </ReChartsPie>
                    </ResponsiveContainer>
                  </div>

                  {/* Manual legend */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {stats.sourceCredibility.map((entry, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                        <span className="truncate">{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmap table */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 lg:col-span-2">
                  <h3 className="font-sans font-extrabold text-gray-900 dark:text-white text-base mb-6">Regional Misinformation Incident Heatmap</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="pb-3 font-semibold">Geographic Region</th>
                          <th className="pb-3 font-semibold text-center">Relative Incident Rate</th>
                          <th className="pb-3 font-semibold text-center">Threat Level</th>
                          <th className="pb-3 font-semibold text-right">Viral Spikes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {stats.regionalHeatmap.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                            <td className="py-3 font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              <Globe className="h-3.5 w-3.5 text-brand-violet shrink-0" />
                              {item.region}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-20 bg-gray-100 rounded-full h-1.5 dark:bg-slate-800">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      item.incidentRate > 30 ? "bg-red-500" : item.incidentRate > 20 ? "bg-amber-500" : "bg-emerald-500"
                                    }`}
                                    style={{ width: `${item.incidentRate * 2.5}%` }}
                                  ></div>
                                </div>
                                <span className="font-mono font-bold text-[10px]">{item.incidentRate}%</span>
                              </div>
                            </td>
                            <td className="py-3 text-center">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                item.volume === "High" ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" :
                                item.volume === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" :
                                "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                              }`}>
                                {item.volume}
                              </span>
                            </td>
                            <td className="py-3 text-right font-mono font-bold text-gray-500 dark:text-gray-400">
                              {item.incidentRate > 30 ? "⚡ CRITICAL" : item.incidentRate > 20 ? "▲ ACTIVE" : "● STEADY"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="p-12 text-center text-gray-400">
              Could not retrieve telemetry maps.
            </div>
          )}

        </div>
      )}

      {/* VIEW C: BROWSER EXTENSION SHOWCASE */}
      {activeTab === "extension" && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-sans font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Monitor className="h-5 w-5 text-brand-violet" />
              VeriFact Browser Extension Interactive Mockup
            </h2>
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Select different mock articles below to see how the VeriFact Extension popup panel immediately analyzes and overlays warning banners over suspicious content as you browse.
            </p>

            {/* Quick interactive guide banner */}
            <div className="mt-4 p-4 rounded-xl border border-brand-indigo/20 bg-brand-lilac/30 text-xs text-gray-700 dark:border-brand-violet/20 dark:bg-brand-indigo/15 dark:text-gray-300">
              <h3 className="font-extrabold text-brand-indigo dark:text-brand-lilac mb-2 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-brand-violet animate-pulse" />
                How to Use This Interactive Extension Simulator:
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-[11px] text-gray-600 dark:text-gray-400">
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Select an Article:</strong> Click on one of the mock articles below (Mars Oxygen, Google Sentient AI, or Global Energy).
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">See the Shield in Action:</strong> Observe how the simulated browser web page on the left immediately displays an inline VeriFact AI warning banner or green trust badge.
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Check the Extension Popup:</strong> Examine the floating toolbar popup on the right (marked with a violet border), which shows the URL credibility score and publisher bias breakdown.
                </li>
                <li>
                  <strong className="text-gray-800 dark:text-gray-200">Deep Audit:</strong> Click <span className="font-bold text-brand-indigo dark:text-brand-lilac">"Audit Full Claim Proof Trails"</span> inside the popup to run a real-time proof-trail analysis on that claim inside the console!
                </li>
              </ol>
            </div>

            {/* Quick selector options */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedArticleId("mars")}
                className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedArticleId === "mars"
                    ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-slate-950 dark:border-slate-800 dark:text-gray-400"
                }`}
              >
                Article A: Mars Oxygen Pockets
              </button>
              <button
                onClick={() => setSelectedArticleId("sentient")}
                className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedArticleId === "sentient"
                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-400"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-slate-950 dark:border-slate-800 dark:text-gray-400"
                }`}
              >
                Article B: Google Labs Sentient AI
              </button>
              <button
                onClick={() => setSelectedArticleId("renewable")}
                className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedArticleId === "renewable"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-slate-950 dark:border-slate-800 dark:text-gray-400"
                }`}
              >
                Article C: Global Energy Transition
              </button>
            </div>

            {/* Browser frame mockup container */}
            <div className="mt-8 border border-gray-200 rounded-2xl overflow-hidden shadow-xl dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              
              {/* Browser toolbar header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                </div>
                
                {/* Search bar mock */}
                <div className="h-6 w-1/2 bg-white rounded border border-gray-200 text-xs text-gray-400 px-3 flex items-center justify-between dark:bg-slate-950 dark:border-slate-800">
                  <span className="truncate font-mono text-[10px]">https://newsportal.com/articles/disclosures/{selectedArticleId}-story</span>
                  <ShieldCheck className="h-4 w-4 text-brand-violet" />
                </div>
 
                {/* Toolbar Active VeriFact Extension Icon */}
                <div className="flex items-center gap-2">
                  <div className="h-6 px-2 border border-brand-indigo/20 rounded text-[10px] text-brand-indigo font-extrabold bg-brand-lilac/30 dark:bg-brand-indigo/25 dark:text-brand-lilac">
                    Extension Active
                  </div>
                  <div className="h-7 w-7 rounded-lg bg-brand-indigo flex items-center justify-center shadow-md">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Inside Browser view split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                
                {/* Left side: Simulated news web page */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold tracking-wider bg-slate-100 px-2 py-0.5 rounded text-gray-500 dark:bg-slate-800">
                      WORLD REPORT AGGREGATE
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Published • {activeBrowserArticle.date}</span>
                  </div>

                  <h1 className="text-xl font-sans font-extrabold text-gray-900 dark:text-white leading-snug">
                    {activeBrowserArticle.title}
                  </h1>

                  <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                    By Arthur Jenkins, Senior Correspondent
                  </p>

                  <div className="space-y-3 pt-2 text-xs text-gray-600 leading-relaxed dark:text-gray-300">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {activeBrowserArticle.text.substring(0, 150)}...
                    </p>
                    <p>
                      According to unnamed local developer sources and active forums, this development marks a massive shifting dynamic in regulatory compliance strategies. The global body overseeing these allocations has declined to comment on the record pending further legislative hearings next month.
                    </p>
                  </div>

                  {/* Warning banner injected overlay on web page */}
                  {activeBrowserArticle.score < 50 && (
                    <div className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
                      <div className="flex gap-2.5 items-start">
                        <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-extrabold">VERIFACT AI SHIELD: HIGH INACCURACY RISK FLAG</h4>
                          <p className="text-[11px] text-red-700 dark:text-red-500 mt-1">
                            {activeBrowserArticle.warning}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeBrowserArticle.score >= 50 && (
                    <div className="mt-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
                      <div className="flex gap-2.5 items-start">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-extrabold">VERIFACT AI SHIELD: VERIFIED SECURE TRUST</h4>
                          <p className="text-[11px] text-emerald-700 dark:text-emerald-500 mt-1">
                            {activeBrowserArticle.warning}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side: Extension popup panel view */}
                <div className="lg:col-span-1 rounded-xl border-2 border-brand-violet bg-white p-5 shadow-lg dark:bg-slate-900 dark:border-brand-violet relative flex flex-col justify-between">
                  <div className="absolute top-2 right-3 bg-brand-lilac text-brand-indigo dark:bg-brand-indigo/20 dark:text-brand-lilac font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded">
                    MOCK POPUP UI
                  </div>

                  {/* Header popup info */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4 dark:border-slate-800">
                      <div className="h-8 w-8 bg-brand-indigo rounded-lg flex items-center justify-center text-white font-mono font-bold text-xs dark:bg-brand-indigo/80">
                        VF
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">VeriFact AI Toolbar</h4>
                        <p className="text-[9px] text-gray-400">Version 2.5.1 • Real-Time Scanners</p>
                      </div>
                    </div>

                    {/* Active URL status score gauge */}
                    <div className="bg-brand-lilac/10 p-4 rounded-lg border border-brand-indigo/10 text-center mb-4 dark:bg-slate-950 dark:border-slate-850">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active URL Credibility</p>
                      
                      <div className="flex items-center justify-center mt-3 gap-3">
                        <span className={`text-2xl font-extrabold font-mono ${
                          activeBrowserArticle.score >= 70 ? "text-emerald-500" :
                          activeBrowserArticle.score >= 40 ? "text-amber-500" : "text-red-500"
                        }`}>
                          {activeBrowserArticle.score}%
                        </span>
                        <div className="text-left">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            activeBrowserArticle.level === "High" ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" :
                            activeBrowserArticle.level === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" :
                            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          }`}>
                            {activeBrowserArticle.level} Risk
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick bullet points */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400">Consensus Summary:</span>
                        <p className="text-[10px] text-gray-600 mt-1 leading-relaxed dark:text-gray-400">
                          {activeBrowserArticle.summary}
                        </p>
                      </div>

                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400">Publisher Integrity Bias:</span>
                        <div className="flex justify-between items-center mt-1 text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                          <span>{activeBrowserArticle.publisher}</span>
                          <span className={activeBrowserArticle.score < 50 ? "text-red-500" : "text-emerald-500"}>
                            {activeBrowserArticle.score}% score
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger real check in active console */}
                  <div className="mt-6 border-t border-gray-100 pt-3 dark:border-slate-800">
                    <button 
                      onClick={() => {
                        setQuery(activeBrowserArticle.title);
                        setActiveTab("analyze");
                        handleVerify(activeBrowserArticle.title);
                      }}
                      className="w-full bg-brand-indigo hover:bg-brand-violet text-white text-[10px] font-bold py-2 rounded-lg shadow transition-colors cursor-pointer text-center"
                    >
                      Audit Full Claim Proof Trails
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* REAL CHROMIUM EXTENSION EXPORTER */}
            <div className="mt-12 pt-10 border-t border-gray-200 dark:border-slate-800 space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-brand-lilac text-brand-indigo px-3 py-1 rounded-full dark:bg-brand-indigo/30 dark:text-brand-lilac mb-3">
                  <Sparkles className="h-3 w-3 text-brand-violet animate-pulse" />
                  Free Browser Integration
                </span>
                <h3 className="text-2xl font-sans font-extrabold text-gray-900 dark:text-white">
                  🚀 Load VeriFact AI onto Google, Wikipedia & More!
                </h3>
                <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
                  Step outside of this dashboard! You can download and install our actual, real Chrome Extension directly in your browser for <strong>FREE</strong>. Analyze claims on active web pages instantly!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left side: Guide & Download */}
                <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                  <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 dark:bg-slate-950 dark:border-slate-800 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Download className="h-4 w-4 text-brand-violet" />
                        Download & Setup (3 Clicks)
                      </h4>
                      
                      <div className="mt-4 space-y-4">
                        <div className="flex gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-indigo text-[10px] font-bold text-white">1</span>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                            Click below to download the compiled extension package <strong className="text-gray-800 dark:text-gray-200">ZIP</strong> file.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-indigo text-[10px] font-bold text-white">2</span>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                            Extract the downloaded ZIP to a folder of your choice (e.g., <code className="font-mono text-[10px] bg-gray-100 px-1 py-0.5 rounded dark:bg-slate-900 dark:text-brand-lilac">verifact-extension</code>).
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-indigo text-[10px] font-bold text-white">3</span>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                            In Google Chrome (or Edge/Brave), navigate to <code className="font-mono text-[10px] bg-gray-100 px-1 py-0.5 rounded dark:bg-slate-900 dark:text-brand-lilac">chrome://extensions</code>, enable <strong className="text-gray-800 dark:text-gray-200">Developer Mode</strong> (top right), and click <strong className="text-gray-800 dark:text-gray-200">Load unpacked</strong>. Select the folder you just extracted!
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 p-3 rounded-xl bg-brand-lilac/30 border border-brand-indigo/10 text-[10px] text-gray-600 dark:bg-brand-indigo/10 dark:border-brand-violet/10 dark:text-gray-400 leading-relaxed">
                        💡 <strong>Real-world Power:</strong> Once loaded, simply select/highlight any text on any page (Wikipedia, Google search, blogs) and click the floating <strong>VeriFact Shield</strong> to audit in real-time!
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-900">
                      <button
                        onClick={handleDownloadExtension}
                        disabled={downloadStatus === "generating"}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow transition-all ${
                          downloadStatus === "success"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : downloadStatus === "generating"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-slate-900 dark:text-gray-600"
                            : "bg-brand-indigo text-white hover:bg-brand-violet"
                        }`}
                      >
                        {downloadStatus === "generating" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Packaging Files...
                          </>
                        ) : downloadStatus === "success" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 animate-bounce" />
                            Extension ZIP Downloaded!
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download Chrome Extension ZIP
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side: Code Inspector Tabs */}
                <div className="lg:col-span-3 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 font-extrabold uppercase bg-slate-950 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Live Connection Active
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                      <Code className="h-4 w-4 text-brand-violet" />
                      Manifest V3 Source Files
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Our exporter automatically configures and bakes your active workspace URL (<span className="text-brand-lilac font-mono font-semibold">{window.location.origin}</span>) straight into the files so it works immediately.
                    </p>

                    {/* Tabs bar */}
                    <div className="mt-4 flex flex-wrap gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
                      <button
                        onClick={() => {
                          setExtensionFileTab("manifest");
                          setIsCopied(false);
                        }}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          extensionFileTab === "manifest"
                            ? "bg-brand-indigo text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        manifest.json
                      </button>
                      <button
                        onClick={() => {
                          setExtensionFileTab("popupHtml");
                          setIsCopied(false);
                        }}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          extensionFileTab === "popupHtml"
                            ? "bg-brand-indigo text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        popup.html
                      </button>
                      <button
                        onClick={() => {
                          setExtensionFileTab("popupJs");
                          setIsCopied(false);
                        }}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          extensionFileTab === "popupJs"
                            ? "bg-brand-indigo text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        popup.js
                      </button>
                      <button
                        onClick={() => {
                          setExtensionFileTab("contentJs");
                          setIsCopied(false);
                        }}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          extensionFileTab === "contentJs"
                            ? "bg-brand-indigo text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        content.js
                      </button>
                    </div>

                    {/* Preformated Code View block */}
                    <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto max-h-[220px] overflow-y-auto">
                      {extensionFileTab === "manifest" && (
                        <pre className="text-[10px] font-mono text-emerald-400 leading-normal">
                          {getExtensionFiles().manifest}
                        </pre>
                      )}
                      {extensionFileTab === "popupHtml" && (
                        <pre className="text-[10px] font-mono text-blue-400 leading-normal">
                          {getExtensionFiles().popupHtml}
                        </pre>
                      )}
                      {extensionFileTab === "popupJs" && (
                        <pre className="text-[10px] font-mono text-amber-400 leading-normal">
                          {getExtensionFiles().popupJs}
                        </pre>
                      )}
                      {extensionFileTab === "contentJs" && (
                        <pre className="text-[10px] font-mono text-purple-400 leading-normal">
                          {getExtensionFiles().contentJs}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* Copy code button row */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-[9px] text-slate-500 font-mono">
                      File: {extensionFileTab === "manifest" ? "manifest.json" : extensionFileTab === "popupHtml" ? "popup.html" : extensionFileTab === "popupJs" ? "popup.js" : "content.js"}
                    </span>
                    <button
                      onClick={() => {
                        const files = getExtensionFiles();
                        let text = "";
                        if (extensionFileTab === "manifest") text = files.manifest;
                        else if (extensionFileTab === "popupHtml") text = files.popupHtml;
                        else if (extensionFileTab === "popupJs") text = files.popupJs;
                        else if (extensionFileTab === "contentJs") text = files.contentJs;
                        
                        navigator.clipboard.writeText(text);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <FileCode className="h-3 w-3" />
                          Copy File Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
