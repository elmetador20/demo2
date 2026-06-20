"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Brain, Cpu, Terminal, ArrowLeft, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Dynamic load 3D roadmap canvas
const Roadmap3D = dynamic(() => import("../../components/ThreeCanvas").then(mod => mod.Roadmap3D), { ssr: false });

export default function Investor() {
  const [activePhase, setActivePhase] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let ringX = -100, ringY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const updateCursor = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${dotX}px`;
        cursorDotRef.current.style.top = `${dotY}px`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX}px`;
        cursorRingRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(updateCursor);
    };
    const animId = requestAnimationFrame(updateCursor);

    // GSAP Pinned Scroll Storytelling
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%", // Scroll depth length
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Map self.progress (0 to 1) to active phases (0, 1, 2)
          const p = self.progress;
          let currentPhase = 0;
          if (p < 0.33) {
            currentPhase = 0;
          } else if (p < 0.66) {
            currentPhase = 1;
          } else {
            currentPhase = 2;
          }
          setActivePhase(currentPhase);
        }
      }
    });

    // Animate phase narrative entries
    timeline.fromTo(".story-phase-0", { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 })
            .fromTo(".story-phase-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
            .to(".story-phase-1", { opacity: 0, y: -50, duration: 1 })
            .fromTo(".story-phase-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
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

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" id="custom-cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" id="custom-cursor-ring">
        <span className="cursor-text" />
      </div>

      <Navbar />

      <main ref={containerRef}>
        
        {/* Intro Section */}
        <section className="why-bro-section" style={{ paddingTop: "10rem", paddingBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            <ArrowLeft style={{ width: "16px" }} /> Back to Homepage
          </Link>
          <div className="section-header">
            <span className="section-badge" style={{ color: "var(--accent-teal)" }}>STRATEGIC ROADMAP</span>
            <h1 className="section-title" style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", lineHeight: "1.05" }}>
              The Story of <span className="gradient-text">BRO University</span>
            </h1>
            <p className="section-subtitle">Scroll down to meet our neurological model guides and explore the phased launch timeline.</p>
            <div style={{ marginTop: "1.5rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>SCROLL TO DECODE</span>
              <ArrowDown className="spin-slow" style={{ width: "18px", color: "var(--accent-teal)" }} />
            </div>
          </div>
        </section>

        {/* PINNED STORYTELLING WORKSPACE */}
        <section ref={triggerRef} style={{ height: "100vh", position: "relative", width: "100%", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "0 4rem", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          
          {/* Left Panel: Cartoon Narrators Dialogue Box */}
          <div style={{ zIndex: 10, position: "relative", height: "450px", display: "flex", alignItems: "center" }}>
            
            {/* PHASE 1 STORY: Dr. Neurite (Neuroscience) */}
            <div className="story-phase-0" style={{ position: "absolute", top: 0, left: 0, width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Custom Vector Cartoon Avatar of Dr. Neurite designed from scratch */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 12px var(--accent-teal-border))" }}>
                  <rect width="72" height="72" rx="36" fill="var(--accent-teal-bg)" stroke="var(--accent-teal)" strokeWidth="2"/>
                  {/* Scientist Goggles */}
                  <rect x="18" y="24" width="16" height="12" rx="4" fill="none" stroke="var(--text-color)" strokeWidth="2"/>
                  <rect x="38" y="24" width="16" height="12" rx="4" fill="none" stroke="var(--text-color)" strokeWidth="2"/>
                  <line x1="34" y1="30" x2="38" y2="30" stroke="var(--text-color)" strokeWidth="2"/>
                  {/* Glowing synapses on head */}
                  <circle cx="36" cy="14" r="3" fill="var(--accent-teal)"/>
                  <path d="M 36 17 L 36 20 M 24 20 L 28 23 M 48 20 L 44 23" stroke="var(--accent-teal)" strokeWidth="1.5"/>
                  {/* Smile */}
                  <path d="M 30 46 Q 36 50 42 46" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "var(--accent-teal)" }}>Dr. Neurite</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>School of Neuroscience Lead</p>
                </div>
              </div>

              <div className="bento-card" style={{ padding: "2.5rem", height: "auto", background: "var(--accent-teal-bg)", border: "1px solid var(--accent-teal-border)" }}>
                <span className="soon-badge" style={{ background: "var(--accent-teal-bg)", color: "var(--accent-teal)", border: "1px solid var(--accent-teal-border)", alignSelf: "flex-start", marginBottom: "1rem", display: "inline-block" }}>
                  PHASE 1 - FOUNDATION ACTIVE
                </span>
                <p style={{ lineHeight: "1.7", color: "var(--text-color)" }}>
                  "Welcome, innovator! I'm Dr. Neurite. Our journey starts in the biological cortex. Before building artificial silicon intelligence, we must master the organic networks of the human brain. Phase 1 establishes elite labs in brain-computer interfaces (BCIs), cellular telemetry, and neural computing algorithms."
                </p>
              </div>
            </div>

            {/* PHASE 2 STORY: A.I. Bro (Artificial Intelligence) */}
            <div className="story-phase-1" style={{ position: "absolute", top: 0, left: 0, width: "100%", display: "flex", flexDirection: "column", gap: "2rem", opacity: 0 }}>
              {/* Custom Vector Cartoon Avatar of A.I. Bro designed from scratch */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 12px rgba(155, 93, 229, 0.3))" }}>
                  <rect width="72" height="72" rx="36" fill="rgba(155, 93, 229, 0.1)" stroke="#9b5de5" strokeWidth="2"/>
                  {/* Cute robot face */}
                  <rect x="22" y="22" width="28" height="20" rx="6" fill="#1d1d1f" stroke="#9b5de5" strokeWidth="2"/>
                  {/* Glowing LED eyes */}
                  <circle cx="30" cy="32" r="3.5" fill="#9b5de5"/>
                  <circle cx="42" cy="32" r="3.5" fill="#9b5de5"/>
                  {/* Antennas */}
                  <line x1="36" y1="22" x2="36" y2="15" stroke="#9b5de5" strokeWidth="2"/>
                  <circle cx="36" cy="13" r="3" fill="#9b5de5"/>
                  {/* Smile */}
                  <path d="M 32 38 L 40 38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#9b5de5" }}>A.I. Bro</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>School of AI Specialist</p>
                </div>
              </div>

              <div className="bento-card" style={{ padding: "2.5rem", height: "auto", background: "rgba(155, 93, 229, 0.03)", border: "1px solid rgba(155, 93, 229, 0.15)" }}>
                <span className="soon-badge" style={{ background: "rgba(155, 93, 229, 0.1)", color: "#9b5de5", border: "1px solid rgba(155, 93, 229, 0.2)", alignSelf: "flex-start", marginBottom: "1rem", display: "inline-block" }}>
                  PHASE 2 - EXPANSION COMING
                </span>
                <p style={{ lineHeight: "1.7", color: "var(--text-color)" }}>
                  "Hey bro! A.I. Bro here. Once Dr. Neurite finishes mapping the brain's cellular signals, we step in. We write neural-inspired machine algorithms and deep cognitive reasoning models. We don't just build statistical models—we build AGI modeled on actual biology."
                </p>
              </div>
            </div>

            {/* PHASE 3 STORY: Silicon Bro (Semiconductors) */}
            <div className="story-phase-2" style={{ position: "absolute", top: 0, left: 0, width: "100%", display: "flex", flexDirection: "column", gap: "2rem", opacity: 0 }}>
              {/* Custom Vector Cartoon Avatar of Silicon Bro designed from scratch */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 12px rgba(241, 91, 181, 0.3))" }}>
                  <rect width="72" height="72" rx="36" fill="rgba(241, 91, 181, 0.1)" stroke="#f15bb5" strokeWidth="2"/>
                  {/* Microchip body */}
                  <rect x="22" y="22" width="28" height="28" rx="4" fill="#1d1d1f" stroke="#f15bb5" strokeWidth="2"/>
                  {/* Chip pins */}
                  <line x1="18" y1="28" x2="22" y2="28" stroke="#f15bb5" strokeWidth="2"/>
                  <line x1="18" y1="36" x2="22" y2="36" stroke="#f15bb5" strokeWidth="2"/>
                  <line x1="18" y1="44" x2="22" y2="44" stroke="#f15bb5" strokeWidth="2"/>
                  <line x1="50" y1="28" x2="54" y2="28" stroke="#f15bb5" strokeWidth="2"/>
                  <line x1="50" y1="36" x2="54" y2="36" stroke="#f15bb5" strokeWidth="2"/>
                  <line x1="50" y1="44" x2="54" y2="44" stroke="#f15bb5" strokeWidth="2"/>
                  {/* Smile */}
                  <path d="M 31 38 Q 36 43 41 38" stroke="#f15bb5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#f15bb5" }}>Silicon Bro</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Semiconductor Lead</p>
                </div>
              </div>

              <div className="bento-card" style={{ padding: "2.5rem", height: "auto", background: "rgba(241, 91, 181, 0.03)", border: "1px solid rgba(241, 91, 181, 0.15)" }}>
                <span className="soon-badge" style={{ background: "rgba(241, 91, 181, 0.15)", color: "#f15bb5", border: "1px solid rgba(241, 91, 181, 0.2)", alignSelf: "flex-start", marginBottom: "1rem", display: "inline-block" }}>
                  PHASE 3 - SCALE COMING
                </span>
                <p style={{ lineHeight: "1.7", color: "var(--text-color)" }}>
                  "Yo! Silicon Bro reporting! When A.I. Bro has the software engines ready, we fabricate them on hardware. We design neuromorphic chips, biological-silicon hybrid gates, and sub-nanometer node devices. We complete the cycle: biological design, software modeling, hardware production."
                </p>
              </div>
            </div>

          </div>

          {/* Right Panel: Interactive 3D Canvas showing illuminated node */}
          <div className="about-canvas-panel" style={{ height: "100%" }} onMouseEnter={() => handleMouseEnter("3D ENGINE")} onMouseLeave={handleMouseLeave}>
            <Roadmap3D activeIndex={activePhase} />
          </div>

        </section>

        {/* Investment parameters */}
        <section className="cta-section" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="cta-container">
            <h2 className="cta-title" style={{ fontSize: "2.4rem" }}>Partner With BRO University</h2>
            <p className="cta-subtitle">We are securing pre-seed capital, foundational academic alignment, and global laboratory partners.</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem", margin: "3rem 0", maxWidth: "600px" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>$1.8M</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Foundational Pool</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>12+</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Global Faculty Advisors</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>Phase 1</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Active Rollout</div>
              </div>
            </div>
            
            <Link href="/admissions" className="cta-button primary-cta" onMouseEnter={() => handleMouseEnter("CONNECT")} onMouseLeave={handleMouseLeave}>
              Request Investor Briefing Packet
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
