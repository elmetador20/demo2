"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Crown,
  Brain,
  Cpu,
  Layers,
  Activity,
  Globe,
  Database
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Custom logo marks matching the user's design reference
const logoItems = [
  {
    name: "Coralogix",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#10b981" />
        <circle cx="12" cy="12" r="4" fill="#ffffff" />
      </svg>
    )
  },
  {
    name: "NetApp",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20V8L12 16L4 8V4Z" fill="#3b82f6" />
      </svg>
    )
  },
  {
    name: "Wiz",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22H22L12 2Z" fill="#a855f7" />
      </svg>
    )
  },
  {
    name: "lyft",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="18" r="3" fill="#ec4899" />
        <circle cx="18" cy="6" r="3" fill="#ec4899" />
        <line x1="6" y1="18" x2="18" y2="6" stroke="#ec4899" strokeWidth="4" />
      </svg>
    )
  },
  {
    name: "tenable",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#0284c7" />
        <circle cx="12" cy="12" r="4" fill="#ffffff" />
      </svg>
    )
  },
  {
    name: "SiriusXM",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="#06b6d4" />
      </svg>
    )
  },
  {
    name: "elastic",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="6" fill="#f59e0b" />
      </svg>
    )
  },
  {
    name: "JUST EAT",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 10H9V22H15V10H20L12 2Z" fill="#ef4444" />
      </svg>
    )
  },
  {
    name: "riskified",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#10b981" />
      </svg>
    )
  },
  {
    name: "The New York Times",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4V20H20V4Z" stroke="#6b7280" strokeWidth="2" />
        <path d="M12 8V16M8 12H16" stroke="#6b7280" strokeWidth="2" />
      </svg>
    )
  }
];

// Load 3D Scenes dynamically
const HeroInteractiveCanvas = dynamic(() => import("../components/ThreeCanvas").then(mod => mod.HeroInteractiveCanvas), { ssr: false });

export default function Home() {
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [expandedSchoolCard, setExpandedSchoolCard] = useState(null);

  const scrollContainerRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorTextRef = useRef(null);
  const spotlightRef = useRef(null);

  // Coordinates and data for the interactive ecosystem nodes
  const ecosystemNodes = [
    { 
      id: "students", 
      label: "Talent Node", 
      icon: Brain, 
      color: "var(--accent-blue)", 
      glow: "rgba(58, 188, 202, 0.2)",
      left0: "20%", top0: "30%",
      left1: "50%", top1: "10%"
    },
    { 
      id: "research", 
      label: "Research Core", 
      icon: Cpu, 
      color: "var(--accent-green)", 
      glow: "rgba(46, 254, 12, 0.2)",
      left0: "50%", top0: "15%",
      left1: "50%", top1: "30%"
    },
    { 
      id: "patents", 
      label: "Patent Translation", 
      icon: Layers, 
      color: "var(--accent-yellow)", 
      glow: "rgba(235, 166, 2, 0.2)",
      left0: "80%", top0: "35%",
      left1: "50%", top1: "50%"
    },
    { 
      id: "startups", 
      label: "Venture Spin-outs", 
      icon: Activity, 
      color: "var(--accent-purple)", 
      glow: "rgba(99, 102, 241, 0.25)",
      left0: "70%", top0: "75%",
      left1: "50%", top1: "70%"
    },
    { 
      id: "investors", 
      label: "Global Capital", 
      icon: Globe, 
      color: "var(--accent-blue)", 
      glow: "rgba(58, 188, 202, 0.2)",
      left0: "30%", top0: "75%",
      left1: "50%", top1: "90%"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleMouseMove = (e) => {
      // Update custom cursor
      gsap.to("#custom-cursor-dot", { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to("#custom-cursor-ring", { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 1. Premium Hero Entrance Animations
    const heroTl = gsap.timeline();

    heroTl.fromTo(".vanguard-tagline-badge",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Sleek line-by-line slide up mask reveal
    heroTl.fromTo(".vanguard-heading span",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.1, stagger: 0.15, ease: "power4.out" },
      "-=0.6"
    );

    heroTl.fromTo([".vanguard-subtext", ".vanguard-actions-row", ".vanguard-stats-row"],
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      "-=0.7"
    );

    // 2. Scroll Trigger Animations for downstream sections

    // About Section
    gsap.fromTo("#about .section-header-editorial > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about .section-header-editorial",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo("#about .editorial-block",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about .editorial-grid",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Why Section
    gsap.fromTo("#why .section-header-editorial > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#why .section-header-editorial",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo("#why .school-panel",
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#why .school-panels",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Phases Section Header
    gsap.fromTo("#phases .section-header-editorial > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#phases .section-header-editorial",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Bento Phase Cards
    gsap.utils.toArray(".phase-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Community Section
    gsap.fromTo("#community > *",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#community",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Research Impact Section
    gsap.fromTo("#research-impact .section-header-editorial > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#research-impact .section-header-editorial",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo("#research-impact .editorial-block",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#research-impact .editorial-grid",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseEnter = (label = "") => {
    const ring = document.getElementById("custom-cursor-ring");
    const dot = document.getElementById("custom-cursor-dot");
    const ringText = ring ? ring.querySelector(".cursor-text") : null;

    if (ring && dot) {
      if (label) {
        if (ringText) ringText.innerText = label;
        ring.classList.add("labeled");
      } else {
        ring.classList.add("hovering");
      }
      dot.classList.add("hovering");
    }
  };

  const handleMouseLeave = () => {
    const ring = document.getElementById("custom-cursor-ring");
    const dot = document.getElementById("custom-cursor-dot");
    if (ring && dot) {
      ring.classList.remove("hovering", "labeled");
      dot.classList.remove("hovering", "labeled");
    }
  };

  const handleMagnetism = (e, btnEl) => {
    if (window.innerWidth <= 768) return;
    const rect = btnEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnEl, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMagnetReset = (btnEl) => {
    gsap.to(btnEl, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1.1, 0.4)"
    });
  };

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" id="custom-cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" id="custom-cursor-ring">
        <span ref={cursorTextRef} className="cursor-text" />
      </div>


      <Navbar />

      <main ref={scrollContainerRef}>

        {/* HERO SECTION (Venture-Backed Deep-Tech Education Ecosystem) */}
        <section id="hero" className="hero-section-premium" style={{ position: "relative", overflow: "hidden" }}>
          {/* 3D Semicircle Rotating Sphere */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
            <HeroInteractiveCanvas />
          </div>
          
          {/* Vignette Overlay for maximum text readability and premium contrast */}
          <div className="vanguard-video-overlay" style={{ pointerEvents: "none", zIndex: 2 }} />

          <div className="hero-split-container">
            {/* Left Panel: Main Pitch Content & Scroll-triggered Details */}
            <div className="hero-left-panel">
              
              {/* State 0: Main Pitch (Visible on load) */}
              <div className="hero-pitch-content">
                {/* Tagline Badge */}
                <div className="reveal-item vanguard-tagline-badge">
                  <Crown className="w-4 h-4 text-white/70" />
                  <span className="vanguard-tagline-text">
                    Race Up Your Brain
                  </span>
                </div>

                {/* Main Heading in Podium font */}
                <h1 className="reveal-item vanguard-heading">
                  <span>Hey bro,</span>
                  <span>ready to</span>
                  <span>build?</span>
                </h1>

                {/* Subtext Paragraph */}
                <p className="reveal-item vanguard-subtext">
                  India’s next-generation deep tech university focused on Artificial Intelligence, Neuroscience, Semiconductors, Nanotechnology, and Future Innovation.
                </p>

                {/* CTA Buttons in Vanguard flat premium style */}
                <div className="reveal-item vanguard-actions-row">
                  <Link
                    href="/admissions"
                    className="vanguard-btn-primary"
                    onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
                    onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
                    onMouseEnter={() => handleMouseEnter("JOIN")}
                  >
                    Join Early Access
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link
                    href="/investor"
                    className="vanguard-btn-secondary"
                    onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
                    onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
                    onMouseEnter={() => handleMouseEnter("VISION")}
                  >
                    Explore Vision
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Vanguard Theme Stats Row */}
                <div className="reveal-item vanguard-stats-row">
                  <div className="vanguard-stat-item">
                    <span className="vanguard-stat-label">ROUND</span>
                    <span className="vanguard-stat-value">Pre-Seed</span>
                  </div>
                  <div className="vanguard-stat-item">
                    <span className="vanguard-stat-label">SCALE</span>
                    <span className="vanguard-stat-value">5 Domains</span>
                  </div>
                  <div className="vanguard-stat-item">
                    <span className="vanguard-stat-label">HQ HUB</span>
                    <span className="vanguard-stat-value">Bangalore</span>
                  </div>
                </div>
              </div>

              {/* State 1: Active Pipeline Detail Card (Visible and cross-faded on scroll) */}
              <div className="hero-pipeline-detail">
                <div style={{ position: "relative", width: "100%", minHeight: "340px" }}>
                  
                  {/* Step 1: Not Another Traditional University */}
                  <div className="detail-step-1" style={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}>
                    <span className="pipeline-step-badge">Phase 01</span>
                    <h2 className="pipeline-step-title">Not Another Traditional University</h2>
                    <p className="pipeline-step-desc">
                      A research-driven ecosystem where students become innovators, scientists, founders, and creators of future technologies.
                    </p>
                  </div>

                  {/* Step 2: Understanding Intelligence */}
                  <div className="detail-step-2" style={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}>
                    <span className="pipeline-step-badge">Phase 02</span>
                    <h2 className="pipeline-step-title">Understanding Intelligence</h2>
                    <p className="pipeline-step-desc">
                      Developing cognitive neural network topologies, decoding cortex connection logic, and building neuromorphic hardware buses.
                    </p>
                  </div>

                  {/* Step 3: Knowledge Domains */}
                  <div className="detail-step-3" style={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}>
                    <span className="pipeline-step-badge">Phase 03</span>
                    <h2 className="pipeline-step-title">Knowledge Domains</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1rem" }}>
                      <span style={{ border: "1px solid var(--accent-green)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-green)" }}>Artificial Intelligence</span>
                      <span style={{ border: "1px solid var(--accent-blue)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-blue)" }}>Neuroscience</span>
                      <span style={{ border: "1px solid var(--accent-yellow)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-yellow)" }}>Semiconductors</span>
                      <span style={{ border: "1px solid var(--text-color)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700 }}>Nanotechnology</span>
                      <span style={{ border: "1px solid var(--accent-green)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-green)" }}>Future Innovation</span>
                    </div>
                  </div>

                  {/* Step 4: Building the Future Through Discovery */}
                  <div className="detail-step-4" style={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}>
                    <span className="pipeline-step-badge">Phase 04</span>
                    <h2 className="pipeline-step-title">Building the Future Through Discovery</h2>
                    <p className="pipeline-step-desc">
                      A highly scalable deep-tech education ecosystem with global potential. Accelerating from pre-seed discovery to international deep-tech impact.
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Panel: Interactive Ecosystem Visualization */}
            <div className="hero-right-panel">
              <div className="ecosystem-visual-container">
                {/* SVG connection lines */}
                <svg className="ecosystem-svg-lines" viewBox="0 0 100 100">
                  {/* Dynamic connection lines transitioned by GSAP */}
                  <line id="line-1" className="flow-line" x1="20" y1="30" x2="50" y2="15" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                  <line id="line-2" className="flow-line" x1="50" y1="15" x2="80" y2="35" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                  <line id="line-3" className="flow-line" x1="80" y1="35" x2="70" y2="75" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                  <line id="line-4" className="flow-line" x1="70" y1="75" x2="30" y2="75" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="3 3" style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                  
                  {/* Cross-connection lines that fade out on scroll */}
                  <line id="line-5" className="cross-line" x1="30" y1="75" x2="20" y2="30" stroke="var(--border-color)" strokeWidth="1.0" opacity="0.35" style={{ transition: "opacity 0.3s" }} />
                  <line id="line-6" className="cross-line" x1="20" y1="30" x2="80" y2="35" stroke="var(--border-color)" strokeWidth="1.0" opacity="0.35" style={{ transition: "opacity 0.3s" }} />
                  <line id="line-7" className="cross-line" x1="50" y1="15" x2="70" y2="75" stroke="var(--border-color)" strokeWidth="1.0" opacity="0.35" style={{ transition: "opacity 0.3s" }} />
                  <line id="line-8" className="cross-line" x1="30" y1="75" x2="80" y2="35" stroke="var(--border-color)" strokeWidth="1.0" opacity="0.35" style={{ transition: "opacity 0.3s" }} />
                </svg>

                {/* Floating Node Cards */}
                {ecosystemNodes.map((node) => {
                  const IconComponent = node.icon;
                  return (
                    <div
                      key={node.id}
                      id={`node-${node.id}`}
                      className="ecosystem-node"
                      style={{
                        left: node.left0,
                        top: node.top0,
                        "--node-color": node.color,
                        "--node-color-glow": node.glow
                      }}
                      onMouseEnter={() => handleMouseEnter(node.label.toUpperCase())}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="glass-node-card">
                        <div className="node-icon-wrapper">
                          <IconComponent size={15} />
                        </div>
                        <span className="node-label">{node.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* LOGO MARQUEE WITH PREMIUM TRANSITION */}
        <section className="marquee-section">
          {/* Sleek Premium Wave Divider */}
          <div className="cloud-divider">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px', margin: '-1px 0' }}>
              <path 
                d="M0,30 C240,90 480,90 720,40 C960,-10 1200,-10 1440,50 L1440,120 L0,120 Z" 
                fill="var(--bg-color)" 
              />
            </svg>
          </div>
          
          {/* Scrolling Logo Marquee */}
          <div className="marquee-container">
            <div className="marquee-content">
              {logoItems.map((logo, idx) => (
                <div key={idx} className="marquee-logo-item">
                  {logo.icon}
                  <span>{logo.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {logoItems.map((logo, idx) => (
                <div key={`dup-${idx}`} className="marquee-logo-item">
                  {logo.icon}
                  <span>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (Education for the Next 50 Years) */}
        <section id="about" className="editorial-section">
          <div className="section-header-editorial">
            <span className="section-tag">ABOUT BRO</span>
            <h2 className="section-heading-editorial">Education for the Next 50 Years</h2>
            <p className="section-subheading-editorial">
              BRO UNIVERSITY is being built to bridge the gap between education, research, startups, and real-world innovation.
            </p>
          </div>

          <div className="editorial-grid">
            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("COGNITIVE")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">01</div>
              <h3 className="editorial-title">AI & Machine Learning</h3>
              <p className="editorial-desc">
                Architecting advanced intelligence nodes, self-optimizing neural topologies, and deep reasoning models.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("SYNAPSE")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">02</div>
              <h3 className="editorial-title">Neuroscience & Brain Technology</h3>
              <p className="editorial-desc">
                Deciphering biological cortex logic, synaptic connection loops, and high-fidelity interface telemetry.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("SILICON")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">03</div>
              <h3 className="editorial-title">Semiconductor & Chip Design</h3>
              <p className="editorial-desc">
                Fabbing custom sub-nm logic gates, microchip routing layouts, and biological-solid state hybrid buses.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("METRICS")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">04</div>
              <h3 className="editorial-title">Neuroinformatics</h3>
              <p className="editorial-desc">
                Structuring massive datasets of synaptic routing mappings to feed cognitive neural network nodes.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("AUTONOMY")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">05</div>
              <h3 className="editorial-title">Robotics & Future Computing</h3>
              <p className="editorial-desc">
                Engineering autonomous systems, spatial hardware computing matrix, and neuromorphic computational units.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("SPIN-OUTS")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">06</div>
              <h3 className="editorial-title">Deep Tech Startups</h3>
              <p className="editorial-desc">
                Accelerating research IP spin-outs, licensing breakthrough patents, and connecting founders with capital nodes.
              </p>
            </div>
          </div>
        </section>

        {/* WHY BRO UNIVERSITY? (Built for Future Leaders) */}
        <section id="why" className="editorial-section" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="section-header-editorial">
            <span className="section-tag" style={{ color: "var(--accent-blue)" }}>WHY BRO</span>
            <h2 className="section-heading-editorial">Built for Future Leaders</h2>
            <p className="section-subheading-editorial">
              Bridging the boundary between academia and commercial deep tech ventures.
            </p>
          </div>

          <div className="school-panels">
            {/* Card 1 */}
            <motion.div 
              layout
              onClick={() => setExpandedSchoolCard(expandedSchoolCard === 0 ? null : 0)}
              className={`school-panel ${expandedSchoolCard === 0 ? "expanded" : ""}`}
              onMouseEnter={() => handleMouseEnter(expandedSchoolCard === 0 ? "CLOSE" : "EXPAND")} 
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer", overflow: "hidden", display: "block" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", width: "100%", alignItems: "center" }}>
                <div className="panel-left">
                  <span className="panel-num">01</span>
                  <h3 className="panel-title">Research From Day One</h3>
                  <span className="panel-status status-active">ACTIVE PARTICIPATION</span>
                </div>
                <div className="panel-right">
                  <p>
                    Students won’t just study technology — they will build it. Designing and manufacturing original software and hardware IP inside wet-labs and clean-rooms.
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSchoolCard === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2rem", width: "100%" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }}>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Core Cleanrooms</h4>
                        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Wet Chemistry Lab</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Class 100 Cleanroom</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Synaptic Imaging Suite</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Molecular Assembly Lab</li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Ventures & IP Spinouts</h4>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                          Undergraduates hold shared equity on microchip patents filed during university residency. We accelerate from discovery to international deep-tech commercialization.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              layout
              onClick={() => setExpandedSchoolCard(expandedSchoolCard === 1 ? null : 1)}
              className={`school-panel ${expandedSchoolCard === 1 ? "expanded" : ""}`}
              onMouseEnter={() => handleMouseEnter(expandedSchoolCard === 1 ? "CLOSE" : "EXPAND")} 
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer", overflow: "hidden", display: "block" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", width: "100%", alignItems: "center" }}>
                <div className="panel-left">
                  <span className="panel-num">02</span>
                  <h3 className="panel-title">Future-Focused Programs</h3>
                  <span className="panel-status status-soon">GLOBAL OUTLOOK</span>
                </div>
                <div className="panel-right">
                  <p>
                    Designed around industries that will dominate the world economy, including neuroscience, cognitive artificial intelligence, and semiconductor fabbing.
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSchoolCard === 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2rem", width: "100%" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }}>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Academics & Labs</h4>
                        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Neuroinformatics</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Solid-State Buses</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Neural Coding</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Quantum Nanodevices</li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Industry Integration</h4>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                          We partner directly with leading semiconductor fabs and neural interfaces companies to structure a workspace-ready curriculum from day one.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              layout
              onClick={() => setExpandedSchoolCard(expandedSchoolCard === 2 ? null : 2)}
              className={`school-panel ${expandedSchoolCard === 2 ? "expanded" : ""}`}
              onMouseEnter={() => handleMouseEnter(expandedSchoolCard === 2 ? "CLOSE" : "EXPAND")} 
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer", overflow: "hidden", display: "block" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", width: "100%", alignItems: "center" }}>
                <div className="panel-left">
                  <span className="panel-num">03</span>
                  <h3 className="panel-title">Innovation Ecosystem</h3>
                  <span className="panel-status status-soon">CONNECTED MATRIX</span>
                </div>
                <div className="panel-right">
                  <p>
                    Deploying joint wet-labs, venture spin-out structures, and patent portfolios to license original technology solutions to global industries.
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSchoolCard === 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2rem", width: "100%" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }}>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Ecosystem Nodes</h4>
                        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Corporate Research Labs</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Pre-seed Venture Desk</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Patent Licensing Office</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Joint Ventures Desk</li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Startups Accelerator</h4>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                          We incubate research spin-outs with co-working spaces, equipment funding, and access to an extensive pool of pre-seed angel syndicates.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              layout
              onClick={() => setExpandedSchoolCard(expandedSchoolCard === 3 ? null : 3)}
              className={`school-panel ${expandedSchoolCard === 3 ? "expanded" : ""}`}
              onMouseEnter={() => handleMouseEnter(expandedSchoolCard === 3 ? "CLOSE" : "EXPAND")} 
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer", overflow: "hidden", display: "block" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", width: "100%", alignItems: "center" }}>
                <div className="panel-left">
                  <span className="panel-num">04</span>
                  <h3 className="panel-title">Investor-Ready Vision</h3>
                  <span className="panel-status status-active">SCALABLE NODE</span>
                </div>
                <div className="panel-right">
                  <p>
                    A highly scalable deep-tech education ecosystem with global potential. Accelerating from pre-seed to international impact.
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSchoolCard === 3 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2rem", width: "100%" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }}>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Investment Matrix</h4>
                        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Venture Capital Access</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Patent Asset Licensing</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Global Founder Network</li>
                          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-secondary)" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }} /> Academic Endowment</li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase" }}>Institutional Growth</h4>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                          By structuring our research centers as venture-backed intellectual property hubs, we ensure self-sustaining growth and long-term ecosystem returns.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* PHASES ROADMAP SECTION */}
        <section id="phases" className="phases-section">
          <div className="section-header-editorial">
            <span className="section-tag" style={{ color: "var(--accent-purple)" }}>THE ROADMAP</span>
            <h2 className="section-heading-editorial">Phased Ecosystem Rollout</h2>
            <p className="section-subheading-editorial">
              Explore the strategic development phases of BRO University, spanning from organic biology mapping to global capital scaling.
            </p>
          </div>

          <div className="phases-container">
            
            {/* Phase 1 */}
            <div className="phase-card">
              <div className="phase-card-left">
                <span className="phase-card-badge">Phase 01</span>
                <h3 className="phase-card-title">Not Another Traditional University</h3>
                <p className="phase-card-subtitle">Mapping organic neural networks and establishing the foundational research labs.</p>
                <div className="phase-card-meta">
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">LAUNCH</span>
                    <span className="phase-meta-val">Q3 2026</span>
                  </div>
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">STATUS</span>
                    <span className="phase-status-badge">
                      <span className="phase-status-dot status-dot-active" />
                      Active Rollout
                    </span>
                  </div>
                </div>
              </div>
              <div className="phase-card-right">
                <p className="phase-card-desc">
                  Before building silicon-based intelligence, we must master the complex chemistry and signal pathways of the human brain. Phase 1 focuses on setting up wet-labs and clean-rooms for cellular telemetry.
                </p>
                <div>
                  <h4 className="phase-card-focus-title">KEY FOCUS AREAS</h4>
                  <div className="phase-card-focus-list">
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Brain-Computer Interfaces
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Cellular Telemetry
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Synaptic Physics
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Quantitative Modeling
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="phase-card">
              <div className="phase-card-left">
                <span className="phase-card-badge">Phase 02</span>
                <h3 className="phase-card-title">Computational Intelligence</h3>
                <p className="phase-card-subtitle">Developing AI models inspired by actual biological processes.</p>
                <div className="phase-card-meta">
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">LAUNCH</span>
                    <span className="phase-meta-val">Q1 2027</span>
                  </div>
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">STATUS</span>
                    <span className="phase-status-badge">
                      <span className="phase-status-dot status-dot-soon" />
                      Planning Phase
                    </span>
                  </div>
                </div>
              </div>
              <div className="phase-card-right">
                <p className="phase-card-desc">
                  Moving past standard statistics-based machine learning. Phase 2 develops self-optimizing neural network topologies and deep cognitive reasoning engines modeled directly on cortical connectomics.
                </p>
                <div>
                  <h4 className="phase-card-focus-title">KEY FOCUS AREAS</h4>
                  <div className="phase-card-focus-list">
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Connection Logic
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Neuromorphic Nodes
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Cognitive Reasoning
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Algorithmic Models
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="phase-card">
              <div className="phase-card-left">
                <span className="phase-card-badge">Phase 03</span>
                <h3 className="phase-card-title">Silicon Integration</h3>
                <p className="phase-card-subtitle">Fabricating custom neuromorphic hardware and sub-nanometer chips.</p>
                <div className="phase-card-meta">
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">LAUNCH</span>
                    <span className="phase-meta-val">Q4 2027</span>
                  </div>
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">STATUS</span>
                    <span className="phase-status-badge">
                      <span className="phase-status-dot status-dot-soon" />
                      Conceptualized
                    </span>
                  </div>
                </div>
              </div>
              <div className="phase-card-right">
                <p className="phase-card-desc">
                  Software meets hardware. Phase 3 focuses on designing and fabbing custom microchips with biological-solid state hybrid buses, bringing synapse-like efficiency to physical silicon.
                </p>
                <div>
                  <h4 className="phase-card-focus-title">KEY FOCUS AREAS</h4>
                  <div className="phase-card-focus-list">
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Neuromorphic Chip Design
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Sub-nm Logic Fabbing
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Hybrid Synaptic Gates
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Microchip Routing Layouts
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="phase-card">
              <div className="phase-card-left">
                <span className="phase-card-badge">Phase 04</span>
                <h3 className="phase-card-title">Global Ecosystem Scale</h3>
                <p className="phase-card-subtitle">Scaling deep-tech startups and licensing breakthrough patents worldwide.</p>
                <div className="phase-card-meta">
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">LAUNCH</span>
                    <span className="phase-meta-val">Q2 2028</span>
                  </div>
                  <div className="phase-card-meta-item">
                    <span className="phase-meta-label">STATUS</span>
                    <span className="phase-status-badge">
                      <span className="phase-status-dot status-dot-soon" />
                      Long-term Vision
                    </span>
                  </div>
                </div>
              </div>
              <div className="phase-card-right">
                <p className="phase-card-desc">
                  Unleashing the intellectual property. Phase 4 establishes capital networks, research spin-out structures, and patent portfolios to license our technologies to global industries.
                </p>
                <div>
                  <h4 className="phase-card-focus-title">KEY FOCUS AREAS</h4>
                  <div className="phase-card-focus-list">
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Venture Spin-out Lab
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Patent Portfolios
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      Corporate Nodes
                    </div>
                    <div className="phase-card-focus-item">
                      <span className="phase-card-focus-dot" />
                      International Expansion
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HEY BRO COMMUNITY (More Than a University — A Movement) */}
        <section id="community" className="momentum-section" style={{ borderTop: "1px solid var(--border-color)", padding: "10rem 4rem" }}>
          <span className="section-tag" style={{ color: "var(--accent-blue)", marginBottom: "2rem" }}>THE MOVEMENT</span>
          <h2 className="section-heading-editorial" style={{ textAlign: "center", marginBottom: "2rem" }}>
            More Than a University — A Movement
          </h2>
          <p style={{ maxWidth: "700px", color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.7", marginBottom: "3rem", textAlign: "center" }}>
            HEY BRO is a future innovation community for students, researchers, creators, and dreamers who want to shape the future of humanity through technology. Join the movement. Build the future. Race Up Your Brain.
          </p>

          <Link
            href="/community"
            className="cta-button btn-magnetic primary-cta glow-btn"
            style={{ pointerEvents: "auto" }}
            onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
            onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("JOIN")}
          >
            Join HEY BRO
          </Link>
        </section>

        {/* RESEARCH & IMPACT (Solving Real Human Problems) */}
        <section id="research-impact" className="editorial-section" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="section-header-editorial">
            <span className="section-tag" style={{ color: "var(--accent-green)" }}>03 / IMPACT RESEARCH</span>
            <h2 className="section-heading-editorial">Solving Real Human Problems</h2>
            <p className="section-subheading-editorial">
              Focused on breakthrough innovation in:
            </p>
          </div>

          <div className="editorial-grid" style={{ marginBottom: "5rem" }}>
            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("HEALTHCARE")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">01</div>
              <h3 className="editorial-title">AI Healthcare Systems</h3>
              <p className="editorial-desc">
                Deploying deep neural reasoners to diagnose chronic diseases and model synaptic pathways.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("NEURO INFO")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">02</div>
              <h3 className="editorial-title">Neuro Information Systems</h3>
              <p className="editorial-desc">
                Structuring semantic brain wave databases for real-time telemetry processing.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("DIAGNOSTICS")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">03</div>
              <h3 className="editorial-title">Neuropathic Pain Research</h3>
              <p className="editorial-desc">
                Accelerating synaptic diagnostics to develop targeted solutions for neuropathic pain.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("FABRICATION")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">04</div>
              <h3 className="editorial-title">Semiconductor Innovation</h3>
              <p className="editorial-desc">
                Fabbing sub-nm microchip nodes designed specifically to accelerate neural operations.
              </p>
            </div>

            <div className="editorial-block" onMouseEnter={() => handleMouseEnter("INTERFACE")} onMouseLeave={handleMouseLeave}>
              <div className="editorial-num">05</div>
              <h3 className="editorial-title">Human-Machine Intelligence</h3>
              <p className="editorial-desc">
                Bridging natural biological synapses directly to deep artificial neural nodes.
              </p>
            </div>
          </div>

          <div style={{ borderLeft: "2px solid var(--accent-green)", paddingLeft: "2rem", marginTop: "4rem", maxWidth: "700px" }}>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic", color: "var(--text-color)" }}>
              "Technology should improve human life — not just industries."
            </p>
          </div>
        </section>

        {/* INVESTOR NODE ECOSYSTEM MAP */}
        <section id="investor" className="editorial-section" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="section-header-editorial">
            <span className="section-tag" style={{ color: "var(--accent-yellow)" }}>04 / ECOSYSTEM PATHWAYS</span>
            <h2 className="section-heading-editorial">The Venture Matrix</h2>
            <p className="section-subheading-editorial">
              Hover over nodes to trace how academic capital, patents, and founders flow through our deep-tech acceleration lanes.
            </p>
          </div>

          <div className="ecosystem-map-container" onMouseEnter={() => handleMouseEnter("EXPLORE")} onMouseLeave={handleMouseLeave}>
            <svg width="100%" height="400" viewBox="0 0 700 400" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <line x1="120" y1="140" x2="350" y2="60" stroke={hoveredNode === "students" || hoveredNode === "research" ? "var(--accent-green)" : "var(--border-color)"} strokeWidth={hoveredNode === "students" || hoveredNode === "research" ? "2" : "1"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
              <line x1="350" y1="60" x2="580" y2="150" stroke={hoveredNode === "research" || hoveredNode === "patents" ? "var(--accent-blue)" : "var(--border-color)"} strokeWidth={hoveredNode === "research" || hoveredNode === "patents" ? "2" : "1"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
              <line x1="580" y1="150" x2="200" y2="320" stroke={hoveredNode === "patents" || hoveredNode === "startups" ? "var(--accent-yellow)" : "var(--border-color)"} strokeWidth={hoveredNode === "patents" || hoveredNode === "startups" ? "2" : "1"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
              <line x1="200" y1="320" x2="460" y2="300" stroke={hoveredNode === "startups" || hoveredNode === "investors" ? "var(--accent-green)" : "var(--border-color)"} strokeWidth={hoveredNode === "startups" || hoveredNode === "investors" ? "2" : "1"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
              <line x1="120" y1="140" x2="200" y2="320" stroke={hoveredNode === "students" || hoveredNode === "startups" ? "var(--accent-blue)" : "var(--border-color)"} strokeWidth={hoveredNode === "students" || hoveredNode === "startups" ? "2" : "1"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
            </svg>

            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              {ecosystemNodes.map(node => (
                <div
                  key={node.id}
                  onMouseEnter={() => { setHoveredNode(node.id); handleMouseEnter(node.label); }}
                  onMouseLeave={() => { setHoveredNode(null); handleMouseLeave(); }}
                  className="ecosystem-map-node"
                  style={{
                    left: `${node.cx}px`,
                    top: `${node.cy}px`,
                    background: hoveredNode === node.id ? node.color : "var(--card-bg)",
                    color: hoveredNode === node.id ? "#000000" : "var(--text-color)",
                    border: `1px solid ${hoveredNode === node.id ? node.color : "var(--border-color)"}`,
                    boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}` : "none",
                  }}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section id="cta" className="cta-section" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="cta-glow" />
          <div className="cta-container">
            <h2 className="cta-title" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: "1.1", textTransform: "uppercase" }}>
              The Future Will<br />
              Belong to<br />
              <span className="gradient-text">Innovators</span>
            </h2>

            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "2rem auto 0", fontSize: "1.1rem", lineHeight: "1.6" }}>
              BRO UNIVERSITY is building a next-generation ecosystem where education meets intelligence, research, and future technology. HEY BRO, THE FUTURE STARTS HERE.
            </p>

            <div className="cta-buttons" style={{ marginTop: "3rem" }}>
              <Link
                href="/admissions"
                className="cta-button btn-magnetic primary-cta glow-btn"
                onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
                onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
                onMouseEnter={() => handleMouseEnter("SUPPORT")}
              >
                Become an Early Supporter
              </Link>
              <Link
                href="/admissions"
                className="cta-button btn-magnetic secondary-cta"
                onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
                onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
                onMouseEnter={() => handleMouseEnter("PARTNER")}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
