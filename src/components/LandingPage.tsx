import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, ShieldCheck, Play, Download, AlertTriangle, Users,
  Layers, Search, CheckCircle2, ShieldAlert, Cpu, Database, Server,
  ArrowRightLeft, Star, HelpCircle, ChevronDown, Check, Globe
} from "lucide-react";

interface LandingPageProps {
  onLaunchDemo: (tab: "analyze" | "trends" | "extension") => void;
}

export default function LandingPage({ onLaunchDemo }: LandingPageProps) {
  // Pricing toggle state
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  // FAQ accordion open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Selected pricing tier simulation
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    alert(`Thank you for selecting the VeriFact AI ${planName} Plan! Running in preview mode.`);
  };

  const handleLaunchDemo = (tabName: "analyze" | "trends" | "extension") => {
    onLaunchDemo(tabName);
  };

  const stats = [
    { value: "70%", label: "Faster spreading speed of fake news compared to verified facts on social feeds." },
    { value: "3.4B+", label: "Daily active internet users sharing unverified headlines and articles." },
    { value: "140%+", label: "Year-over-year increase in sophisticated AI-generated synthetic media." }
  ];

  const steps = [
    {
      step: "01",
      title: "Extract Claims",
      desc: "Our neural network crawls the content of any webpage, document, or social media post to automatically parse and extract key checkable factual assertions."
    },
    {
      step: "02",
      title: "Cross-Check Sources",
      desc: "Extracted assertions are cross-referenced across trusted, verified scientific registries, global press archives, and independent fact-checking databases."
    },
    {
      step: "03",
      title: "AI Verification",
      desc: "VeriFact LLM pipelines analyze linguistic nuance, historical context, peer consensus, and logical inconsistencies to form a holistic truth verification map."
    },
    {
      step: "04",
      title: "Explainable Verdict",
      desc: "Receive a transparent, auditable report featuring an overall Credibility Score, broken down claim verdicts, risk factors, and authoritative source links."
    }
  ];

  const features = [
    { icon: <Play className="h-6 w-6 text-brand-violet" />, title: "Real-Time Detection", desc: "Instantly evaluate live media broadcasts, articles, and text claims as you read or listen." },
    { icon: <Download className="h-6 w-6 text-brand-indigo" />, title: "Browser Extension", desc: "A seamless browser overlay for Chrome & Edge flagging dangerous misleading claims on social media feeds." },
    { icon: <Cpu className="h-6 w-6 text-brand-violet" />, title: "Explainable AI", desc: "No opaque true/false verdicts. Get structured, trace-to-source rationales explaining exactly how we verified each claim." },
    { icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />, title: "Fact-Check Integration", desc: "Synchronized with the Google Fact Check API, ClaimBuster, academic whitepapers, and reliable public databases." },
    { icon: <ShieldAlert className="h-6 w-6 text-amber-500" />, title: "Credibility Scoring", desc: "A transparent 0-100 score detailing our verification confidence alongside critical hazard flags." },
    { icon: <Globe className="h-6 w-6 text-brand-indigo" />, title: "Trend Monitoring", desc: "Stay ahead of hostile coordinate narrative campaigns with our live worldwide narrative tracking engine." },
    { icon: <Users className="h-6 w-6 text-brand-violet" />, title: "Source Reliability", desc: "Verify publisher records, ownership biases, historical retraction metrics, and general media scorecards." },
    { icon: <Layers className="h-6 w-6 text-emerald-500" />, title: "Transparency Dashboard", desc: "A clean interface to review global trending disinformation topics, high-risk domains, and geographic heatmaps." }
  ];

  const useCases = [
    { user: "Journalists", action: "Verify claims before publishing", details: "Validate incoming wire disclosures, check breaking quote statements, and isolate coordinated synthetic smear campaigns instantly in fast-paced newsrooms." },
    { user: "Students", action: "Validate research & assignments", details: "Check research paper sources, isolate pseudo-scientific claims, and guarantee academic references originate from trustworthy peer-reviewed registries." },
    { user: "Educators", action: "Teach digital media literacy", details: "Instruct students with clear, visible evidence on how bias mechanisms propagate and demonstrate scientific proof methodologies." },
    { user: "Researchers", action: "Track disinformation campaigns", details: "Perform programmatic research on foreign influence operations, track narrative mutations, and export global statistics for academic papers." },
    { user: "Government Agencies", action: "Monitor structural threat metrics", details: "Safeguard civic discourse, track systemic healthcare myths, and evaluate infrastructure-related narrative threats." },
    { user: "General Users", action: "Avoid sharing false content", details: "Block panic-inducing medical and financial rumors before sharing headlines with family, friends, and community groups." }
  ];

  const testimonials = [
    {
      quote: "VeriFact AI has completely changed our editorial validation cycles. What used to take two researchers over an hour of archival cross-referencing now takes our staff seconds.",
      author: "Elena Rostova",
      role: "Lead Investigative Editor, Global Press Syndicate",
      avatarBg: "bg-brand-indigo"
    },
    {
      quote: "Teaching media analysis in the modern age of generative AI has become incredibly challenging. VeriFact AI provides students a visual, hands-on way to understand proof paradigms.",
      author: "Dr. Marcus Vance",
      role: "Professor of Journalism, Stanford Media Institute",
      avatarBg: "bg-emerald-600"
    },
    {
      quote: "The programmatic API handles millions of social metadata runs daily, isolating automated propaganda farms before they trigger negative viral trending spikes.",
      author: "Siddharth Mehta",
      role: "CTO, Civic Discourse Alliance",
      avatarBg: "bg-brand-violet"
    }
  ];

  const faqs = [
    {
      q: "How accurate is the VeriFact AI system?",
      a: "Our verification pipelines maintain over 94% accuracy, corroborated against independent peer verification benchmarks. VeriFact combines Google Fact-Check datasets with active LLM parsing of official peer-reviewed science databases to ensure real-time contextual precision."
    },
    {
      q: "Which sources are used for cross-checking?",
      a: "VeriFact integrates thousands of high-authority sources, including global news agencies (AP, Reuters), official health databases (WHO, NIH), governmental filings (SEC, FDA), global research institutions (CERN, NASA), and certified IFCN fact-checking signatories."
    },
    {
      q: "How does the AI determine credibility?",
      a: "Unlike traditional keyword systems, VeriFact AI uses natural language understanding to isolate specific factual predicates. It matches the semantic core of these predicates against verified databases, analyzes language patterns for sensationalism or clickbait markers, and evaluates historical source bias metrics."
    },
    {
      q: "Is my browsing data stored or sold?",
      a: "Absolutely not. VeriFact AI adheres to privacy-by-design standards. The browser extension operates using sandboxed client-side matching, meaning only requested claims or analyzed URLs are securely sent for server analysis. No user-browsing profiles are compiled, stored, or sold."
    },
    {
      q: "Can I use VeriFact AI for academic research?",
      a: "Yes! Our Pro and Enterprise tiers allow researchers to query our endpoints programmatically, access historic narrative datasets, and export detailed CSV reports with comprehensive citation arrays."
    }
  ];

  return (
    <div className="bg-slate-50 text-gray-900 transition-colors dark:bg-slate-950 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20 bg-radial-[circle_at_top] from-brand-lilac/30 via-slate-50 to-slate-50 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -z-10 h-[340px] w-[600px] -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[100px] dark:bg-brand-violet/10"></div>
        <div className="absolute top-10 right-10 -z-10 h-[200px] w-[200px] rounded-full bg-brand-violet/10 blur-[60px] dark:bg-brand-violet/5"></div>
 
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-lilac px-3 py-1 text-xs font-semibold text-brand-indigo ring-1 ring-brand-indigo/10 dark:bg-brand-indigo/20 dark:text-brand-lilac dark:ring-brand-violet/20"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Introducing VeriFact AI V2.5
            </motion.div>
 
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white"
            >
              Detect Misinformation <br />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-indigo bg-clip-text text-transparent">
                Before It Spreads.
              </span>
            </motion.h1>
 
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
            >
              AI-powered real-time credibility analysis for news articles, social media posts, scientific claims, and online content. Build trust with traceable verification logic.
            </motion.p>
 
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => handleLaunchDemo("analyze")}
                className="flex items-center gap-2 rounded-xl bg-brand-indigo px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/20 transition-all hover:bg-brand-violet hover:shadow-brand-violet/30 hover:scale-[1.02] active:scale-95 cursor-pointer animate-pulse"
              >
                Try Live Demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleLaunchDemo("extension")}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Download className="h-4 w-4 text-brand-violet" />
                Install Extension
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 border-y border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">THE TRUTH PARADOX</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              The Internet Has a Trust Problem
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              Modern digital infrastructure permits instant worldwide distribution of information—allowing fabricated stories, hyper-partisan reporting, and deepfakes to travel faster and broader than authentic verified journalism.
            </p>
          </div>

          {/* Stats Display Cards */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl border border-gray-100 bg-slate-50 p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="text-4xl font-extrabold text-brand-violet font-mono">
                  {stat.value}
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">SYSTEM ARCHITECTURE</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              How VeriFact AI Works
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              A comprehensive four-step real-time credibility analysis mapping factual statements directly against public repositories.
            </p>
          </div>

          <div className="relative mt-16">
            {/* Connecting line on desktop */}
            <div className="absolute top-1/2 left-4 right-4 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-brand-indigo/20 via-brand-violet to-brand-indigo/20 md:block"></div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="relative bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:border-brand-violet transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-indigo text-white font-mono font-bold text-lg shadow-lg shadow-brand-indigo/25">
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-sans font-bold text-lg text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs text-gray-500 leading-relaxed dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 bg-white border-y border-gray-200 dark:bg-slate-950 dark:border-slate-800 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">ROBUST CAPABILITIES</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Core Platform Features
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              Built on sophisticated large language pipelines and real-time validation layers designed for professional and casual application.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-white transition-all dark:border-slate-900 dark:bg-slate-900/40 dark:hover:bg-slate-900"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                  {feat.icon}
                </div>
                <h3 className="font-sans font-bold text-gray-900 dark:text-white">{feat.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed dark:text-gray-400">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Extension Showcase Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Visual extension UI mockup */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-violet opacity-20 blur-lg"></div>
              
              <div className="relative rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="rounded-xl border border-gray-100 bg-slate-50 overflow-hidden dark:border-slate-800 dark:bg-slate-950">
                  
                  {/* Browser toolbar mock */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200 dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="h-5 w-2/3 bg-white border border-gray-200 rounded text-[10px] text-gray-400 px-2 flex items-center justify-between dark:bg-slate-950 dark:border-slate-800">
                      <span>https://socialfeed.com/home</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-violet" />
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-indigo">
                      <ShieldCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Feed mock content with active warning tooltip */}
                  <div className="p-4 space-y-4">
                    {/* Standard Social Post Card */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 dark:bg-slate-900 dark:border-slate-800 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-brand-indigo flex items-center justify-center text-white text-xs font-bold">NP</div>
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">National Postings Feed</p>
                          <p className="text-[10px] text-gray-400">Sponsored Post • 1h ago</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-800 dark:text-gray-100 leading-relaxed font-semibold">
                        BREAKING: Scientific board confirms atmospheric pockets on Mars can immediately sustain human colonization breathe-cycles without spacesuits. Try it out!
                      </p>

                      {/* Flag Overlay badge */}
                      <span className="inline-flex mt-3 items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 dark:bg-red-950/50 dark:text-red-400">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Fabricated Claim Detected by VeriFact AI
                      </span>

                      {/* Extension popup active state */}
                      <div className="absolute right-4 top-16 w-56 bg-white border border-red-200 shadow-2xl rounded-lg p-3 dark:bg-slate-950 dark:border-red-900/50 z-10 animate-pulse">
                        <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-1.5 dark:border-slate-800">
                          <p className="text-[10px] font-bold text-red-500">VERIFACT REPORT</p>
                          <span className="text-[10px] font-mono text-gray-400">Score: 12%</span>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                          No atmospheric oxygen is present beyond 0.13%. Carbon dioxide represents 95%. High risk of hypoxia.
                        </p>
                        <button 
                          onClick={() => handleLaunchDemo("extension")}
                          className="w-full mt-2 bg-red-50 hover:bg-red-100 text-red-600 text-[9px] py-1 font-bold rounded transition-colors text-center block dark:bg-red-950/20 dark:text-red-400"
                        >
                          Show Full Proof Timeline
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Showcase details */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">UNOBTRUSIVE SECURITY</span>
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Seamless Browser Overlay</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our lightweight browser extension integrates directly into Chrome, Edge, and Safari. It scans headlines, posts, and social networks locally, applying real-time color credibility shields without delaying your load speeds.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Flags toxic links, clickbait, and known troll factory URLs.
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Displays interactive hovering claim verification scorecards.
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Provides single-click redirection to authoritative counter-reports.
                </li>
              </ul>
              <button 
                onClick={() => handleLaunchDemo("extension")}
                className="flex items-center gap-2 text-sm font-bold text-brand-violet hover:text-brand-indigo"
              >
                Launch Extension Simulator View
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white border-y border-gray-200 dark:bg-slate-950 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">UNIVERSAL ACCESS</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Sectors We Empower
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              VeriFact AI is tuned to safeguard structural truth requirements across academic, newsroom, administrative, and consumer applications.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {useCases.map((use, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-white hover:border-brand-violet transition-all dark:border-slate-900 dark:bg-slate-900/40 dark:hover:bg-slate-900 dark:hover:border-brand-violet">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-sans font-extrabold text-lg text-gray-900 dark:text-white">{use.user}</h3>
                  <span className="text-[10px] font-mono font-bold bg-brand-lilac text-brand-indigo px-2.5 py-0.5 rounded-full dark:bg-brand-indigo/20 dark:text-brand-lilac">
                    Use Case
                  </span>
                </div>
                <p className="text-sm font-bold text-brand-violet mb-2">{use.action}</p>
                <p className="text-xs text-gray-500 leading-relaxed dark:text-gray-400">{use.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">ENGINEERING DESIGN</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Behind the Verification Engine
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              An advanced stack structured around high-throughput scraping pipelines, safe AI modules, and robust validation structures.
            </p>
          </div>

          {/* Interactive Flow Architecture Diagram */}
          <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-sans font-bold text-lg text-center mb-8 text-gray-800 dark:text-gray-200">
              VeriFact AI Pipeline Architecture Flow
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
              
              {/* Box 1: Input source */}
              <div className="p-4 rounded-xl border border-brand-indigo/30 bg-brand-lilac/30 text-center dark:border-brand-violet/20 dark:bg-brand-indigo/20">
                <Globe className="h-8 w-8 text-brand-indigo mx-auto mb-2 dark:text-brand-violet" />
                <h4 className="text-xs font-bold text-brand-indigo dark:text-brand-lilac uppercase tracking-wider">01. Web Ingress</h4>
                <p className="text-[10px] text-brand-indigo/80 mt-1 dark:text-brand-violet">Browser inputs, URLs, post scrapers, and newsroom RSS streams.</p>
              </div>

              <div className="flex justify-center text-gray-300 dark:text-slate-800 rotate-90 md:rotate-0">
                <ArrowRightLeft className="h-6 w-6" />
              </div>

              {/* Box 2: Analysis Node */}
              <div className="p-4 rounded-xl border border-brand-violet/30 bg-brand-lilac/20 text-center dark:border-brand-violet/20 dark:bg-brand-indigo/10">
                <Cpu className="h-8 w-8 text-brand-violet mx-auto mb-2 dark:text-brand-violet" />
                <h4 className="text-xs font-bold text-brand-indigo dark:text-brand-lilac uppercase tracking-wider">02. LLM Parser</h4>
                <p className="text-[10px] text-brand-indigo/80 mt-1 dark:text-brand-violet">Contextual assertion segmentation and semantic parsing models.</p>
              </div>

              <div className="flex justify-center text-gray-300 dark:text-slate-800 rotate-90 md:rotate-0">
                <ArrowRightLeft className="h-6 w-6" />
              </div>

              {/* Box 3: Cross Match API */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <Database className="h-8 w-8 text-emerald-600 mx-auto mb-2 dark:text-emerald-400" />
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">03. Fact Registries</h4>
                <p className="text-[10px] text-emerald-700/80 mt-1 dark:text-emerald-400">Citations matched with Google Fact Check & Science repositories.</p>
              </div>

            </div>

            {/* Tech details badges */}
            <div className="mt-12 border-t border-gray-100 pt-8 dark:border-slate-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Frontend Layer</span>
                  <p className="text-xs font-extrabold text-gray-800 mt-1 dark:text-gray-200">React • Tailwind CSS</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Backend Logic</span>
                  <p className="text-xs font-extrabold text-gray-800 mt-1 dark:text-gray-200">Node.js Express API</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">AI Frameworks</span>
                  <p className="text-xs font-extrabold text-gray-800 mt-1 dark:text-gray-200">Gemini LLMs • NLP</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Durable Database</span>
                  <p className="text-xs font-extrabold text-gray-800 mt-1 dark:text-gray-200">PostgreSQL • Drizzle</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white border-y border-gray-200 dark:bg-slate-950 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">TRUSTED VOICE</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Recommended by Professionals
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              How investigative media houses, public educators, and software engineers utilize our system.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((test, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-gray-100 bg-slate-50 flex flex-col justify-between dark:border-slate-900 dark:bg-slate-900/30">
                <div>
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed dark:text-gray-400">
                    "{test.quote}"
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-slate-800">
                  <div className={`h-10 w-10 rounded-full ${test.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                    {test.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{test.author}</h4>
                    <p className="text-[10px] text-gray-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">SCALABLE SOLUTIONS</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Predictable, Flat Pricing
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              Select the capabilities suited for your verification requirements. Standard packages can be canceled at any time.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="relative flex rounded-full bg-gray-200 p-1 dark:bg-slate-900">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    billingCycle === "monthly" 
                      ? "bg-white text-gray-900 shadow-sm dark:bg-slate-800 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    billingCycle === "yearly" 
                      ? "bg-white text-gray-900 shadow-sm dark:bg-slate-800 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Yearly <span className="text-[9px] font-extrabold text-brand-violet">(Save 20%)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
            
            {/* Free Tier */}
            <div 
              onClick={() => handleSelectPlan("Free")}
              className={`p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedPlan === "Free"
                  ? "border-2 border-brand-violet bg-white dark:bg-slate-900 shadow-xl scale-[1.02]"
                  : "border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-brand-violet/50"
              }`}
            >
              {selectedPlan === "Free" && (
                <div className="absolute -top-3 right-4 bg-brand-violet text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active
                </div>
              )}
              <div>
                <h3 className="font-sans font-bold text-gray-500 uppercase tracking-wider text-xs">Free Tier</h3>
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  $0
                </p>
                <p className="text-xs text-gray-400 mt-1">Free forever, standard usage</p>
                <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">Basic credibility checks on standard media text files.</p>
                
                <ul className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-slate-800">
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    15 credibility analyses per day
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Standard explanation summary
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Browser Extension installation
                  </li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan("Free");
                }}
                className={`w-full mt-8 border font-bold text-xs py-3 rounded-xl transition-all cursor-pointer ${
                  selectedPlan === "Free"
                    ? "bg-brand-indigo text-white border-transparent"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700 dark:border-slate-800 dark:text-gray-300 dark:hover:bg-slate-800"
                }`}
              >
                {selectedPlan === "Free" ? "Plan Selected" : "Activate Free Plan"}
              </button>
            </div>
 
            {/* Pro Tier */}
            <div 
              onClick={() => handleSelectPlan("Professional")}
              className={`p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedPlan === "Professional"
                  ? "border-2 border-brand-violet bg-white dark:bg-slate-900 shadow-xl scale-[1.02]"
                  : "border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-brand-violet/50"
              }`}
            >
              <div className="absolute -top-3 right-4 bg-brand-violet text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedPlan === "Professional" ? "Active" : "Recommended"}
              </div>
              <div>
                <h3 className="font-sans font-bold text-brand-violet uppercase tracking-wider text-xs">Professional</h3>
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  {billingCycle === "monthly" ? "$29" : "$23"}<span className="text-sm font-semibold text-gray-400">/mo</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Billed {billingCycle === "monthly" ? "monthly" : "annually"}</p>
                <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">Advanced analysis, higher throughput, and programmatic research tools.</p>
                
                <ul className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-slate-800">
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Unlimited manual URL evaluations
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Deep multi-claim breakdown & proof timeline
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Publisher history and retract files audit
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Exportable verification PDF summaries
                  </li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan("Professional");
                }}
                className={`w-full mt-8 font-bold text-xs py-3 rounded-xl transition-all shadow-lg cursor-pointer ${
                  selectedPlan === "Professional"
                    ? "bg-brand-violet hover:bg-brand-indigo text-white shadow-brand-violet/20"
                    : "bg-brand-indigo hover:bg-brand-violet text-white shadow-brand-indigo/20"
                }`}
              >
                {selectedPlan === "Professional" ? "Plan Selected" : "Subscribe Professional"}
              </button>
            </div>
 
            {/* Enterprise Tier */}
            <div 
              onClick={() => handleSelectPlan("Enterprise")}
              className={`p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedPlan === "Enterprise"
                  ? "border-2 border-brand-violet bg-white dark:bg-slate-900 shadow-xl scale-[1.02]"
                  : "border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-brand-violet/50"
              }`}
            >
              {selectedPlan === "Enterprise" && (
                <div className="absolute -top-3 right-4 bg-brand-violet text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active
                </div>
              )}
              <div>
                <h3 className="font-sans font-bold text-gray-500 uppercase tracking-wider text-xs">Enterprise</h3>
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Custom
                </p>
                <p className="text-xs text-gray-400 mt-1">Designed for organizations</p>
                <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">Full API integration, continuous media streams, and custom dashboard branding.</p>
                
                <ul className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-slate-800">
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Restful developer API access
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Real-time broadcast monitoring plugins
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Custom white-labeled truth badges
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    Dedicated analyst support team
                  </li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan("Enterprise");
                }}
                className={`w-full mt-8 border font-bold text-xs py-3 rounded-xl transition-all cursor-pointer ${
                  selectedPlan === "Enterprise"
                    ? "bg-brand-indigo text-white border-transparent"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700 dark:border-slate-800 dark:text-gray-300 dark:hover:bg-slate-800"
                }`}
              >
                {selectedPlan === "Enterprise" ? "Plan Selected" : "Contact Enterprise Sales"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-950 scroll-mt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">FAQS</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-xl overflow-hidden dark:border-slate-800"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 bg-slate-50 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800/80"
                >
                  <span className="text-sm font-bold">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                
                {openFaq === idx && (
                  <div className="p-5 bg-white border-t border-gray-100 text-xs text-gray-500 leading-relaxed dark:bg-slate-950 dark:border-slate-800 dark:text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-brand-indigo to-slate-950 text-white">
        {/* Background visual detail */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-brand-violet/20 blur-[120px]"></div>

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build a More Trustworthy Internet
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm text-brand-lilac leading-relaxed">
            Protect your publication, organization, or personal social feeds from automated falsehoods with explainable real-time credibility checks.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleLaunchDemo("analyze")}
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-indigo shadow-xl transition-all hover:bg-brand-lilac hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started Now
            </button>
            <button
              onClick={() => handleLaunchDemo("extension")}
              className="rounded-xl border border-white/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
            >
              Install Chrome Extension
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-16 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-indigo">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="font-sans text-lg font-bold tracking-tight text-white">
                  VeriFact<span className="text-brand-violet">AI</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 max-w-sm">
                AI-powered global verification layers verifying online claims to preserve trust, truth, and transparency in public and organizational discourse.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleLaunchDemo("analyze")} className="hover:text-white transition-colors">Interactive Demo</button></li>
                <li><button onClick={() => handleLaunchDemo("extension")} className="hover:text-white transition-colors">Browser Extension</button></li>
                <li><button onClick={() => handleLaunchDemo("trends")} className="hover:text-white transition-colors">Public Dashboard</button></li>
                <li><span className="text-slate-600">Integration API (Soon)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#technology" className="hover:text-white transition-colors">Architecture Map</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Levels</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">accordion FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Authority</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Retract File Standards</span></li>
                <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer font-semibold text-brand-violet">Contact Security</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>© 2026 VeriFact AI, Inc. All rights reserved.</p>
            <p>Made with high-integrity research parameters.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
