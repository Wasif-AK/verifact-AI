# VeriFact AI — Real-Time Misinformation Detection System

VeriFact AI is a real-time misinformation detection platform delivered as a 
browser extension and web dashboard, built to analyze online content at the 
moment of consumption — not after it's already been shared.

The system extracts key factual claims from any webpage using NLP, 
cross-references them against fact-checking databases (Google Fact Check 
Tools, ClaimBuster), and uses a large language model to generate a clear, 
plain-language credibility verdict — explaining not just *whether* content 
is misleading, but *specifically which claims* are problematic and *why*.

Unlike existing tools that return a simple true/false label, VeriFact AI 
provides transparent, explainable reasoning designed to build media 
literacy rather than replace it. A public trends dashboard tracks 
misinformation patterns and flagged sources over time — a living record 
useful to journalists, educators, and policymakers.

## Features
- 🔍 Real-time claim extraction and verification
- 🧠 LLM-powered explainable credibility scoring (Gemini API)
- 🧩 Browser extension for in-page analysis while browsing
- 📊 Public dashboard tracking misinformation trends and flagged sources
- 📖 Transparent, source-cited reasoning for every verdict

## Tech Stack
React · TypeScript · Vite · Express · Tailwind CSS · Google Gemini API · Recharts

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version)

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.example` to `.env` and add your own Gemini API key:
```bash
cp .env.example .env
```
Then edit `.env` and set `GEMINI_API_KEY` to your actual key from 
[Google AI Studio](https://aistudio.google.com/apikey).

### Running Locally
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## License
This project is for educational purposes.