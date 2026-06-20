"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Activity, 
  Cpu, 
  Network, 
  Terminal, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Brain
} from "lucide-react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Dynamic load 3D background visual
const SynapticNetwork3D = dynamic(() => import("../../components/ThreeCanvas").then(mod => mod.SynapticNetwork3D), { ssr: false });

export default function Research() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorTextRef = useRef(null);

  useEffect(() => {
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

    gsap.from(".reveal-item", {
      y: 30,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: "power3.out"
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseEnter = (label = "") => {
    if (cursorRingRef.current && cursorDotRef.current) {
      if (label) {
        if (cursorTextRef.current) cursorTextRef.current.innerText = label;
        cursorRingRef.current.classList.add("labeled");
      } else {
        cursorRingRef.current.classList.add("hovering");
      }
      cursorDotRef.current.classList.add("hovering");
    }
  };

  const handleMouseLeave = () => {
    if (cursorRingRef.current && cursorDotRef.current) {
      cursorRingRef.current.classList.remove("hovering", "labeled");
      cursorDotRef.current.classList.remove("hovering", "labeled");
    }
  };

  const handleCardTilt = (e, cardEl) => {
    if (window.innerWidth <= 768) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxRotate = 6;
    const rX = ((y / rect.height) - 0.5) * maxRotate * 2;
    const rY = ((x / rect.width) - 0.5) * -maxRotate * 2;

    gsap.to(cardEl, {
      rotateX: rX,
      rotateY: rY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });

    cardEl.style.setProperty("--mouse-x", `${x}px`);
    cardEl.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardReset = (cardEl) => {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.6
    });
  };

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" id="custom-cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" id="custom-cursor-ring">
        <span ref={cursorTextRef} className="cursor-text" />
      </div>

      <Navbar />

      <main className="research-section" style={{ paddingTop: "10rem" }}>
        
        {/* Visual 3D network backdrop inside the main content frame */}
        <div style={{ position: "relative", width: "100%", height: "250px", overflow: "hidden", marginBottom: "3rem", borderRadius: "var(--border-radius-lg)", border: "1px solid var(--border-color)" }}>
          <SynapticNetwork3D />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at center, transparent 30%, var(--bg-color) 90%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
            <span className="section-badge" style={{ color: "#00f5d4" }}>NEURAL INTELLIGENCE NODE</span>
            <h1 style={{ fontSize: "2.4rem", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>Active Labs & Discoveries</h1>
          </div>
        </div>

        <div className="section-header reveal-item">
          <h2 className="section-title">Solving Translational Human Problems</h2>
          <p className="section-subtitle">We believe original biological research must translate directly into clinical therapeutics and computing hardware.</p>
        </div>

        {/* Research focus pillars */}
        <div className="research-grid">
          
          <div 
            className="research-card hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("HEALTH")}
          >
            <div className="r-badge" style={{ color: "#00f5d4" }}><Activity /></div>
            <h3 className="r-title">AI Healthcare Systems</h3>
            <p className="r-desc">Developing predictive deep learning algorithms to optimize clinical diagnosis pathways and medical resource distribution.</p>
            <div className="card-spotlight"></div>
          </div>

          <div 
            className="research-card hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("INFO")}
          >
            <div className="r-badge" style={{ color: "#00f5d4" }}><Network /></div>
            <h3 className="r-title">Neuro Information Systems</h3>
            <p className="r-desc">Mapping complex multi-channel cognitive signals to construct computational neural informatics protocols.</p>
            <div className="card-spotlight"></div>
          </div>

          <div 
            className="research-card hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("MED")}
          >
            <div className="r-badge" style={{ color: "#00f5d4" }}><ShieldAlert /></div>
            <h3 className="r-title">Neuropathic Pain Research</h3>
            <p className="r-desc">Targeting neural pathways and synaptic modeling systems to formulate advanced pain reduction therapies.</p>
            <div className="card-spotlight"></div>
          </div>

          <div 
            className="research-card hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("SILICON")}
          >
            <div className="r-badge" style={{ color: "#00f5d4" }}><Cpu /></div>
            <h3 className="r-title">Semiconductor Innovation</h3>
            <p className="r-desc">Architecting sub-nm nodes, neuromorphic transistor grids, and quantum dot compute accelerators.</p>
            <div className="card-spotlight"></div>
          </div>

          <div 
            className="research-card hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("CPU")}
          >
            <div className="r-badge" style={{ color: "#00f5d4" }}><Terminal /></div>
            <h3 className="r-title">Human-Machine Intelligence</h3>
            <p className="r-desc">Cultivating direct physical interfaces linking biological synaptic networks to digital microprocessors.</p>
            <div className="card-spotlight"></div>
          </div>

        </div>

        {/* Incubation center detail */}
        <div 
          className="bento-card bento-w2 hover-spotlight tilt-target reveal-item"
          onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
          onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
          onMouseEnter={() => handleMouseEnter("VENTURES")}
          style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", minHeight: "auto", padding: "3rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TrendingUp className="bento-icon" style={{ color: "#00f5d4" }} />
            <h3 className="bento-card-title">Venture Incubator</h3>
            <span className="soon-badge" style={{ background: "rgba(0, 245, 212, 0.1)", color: "#00f5d4", border: "1px solid rgba(0, 245, 212, 0.2)", alignSelf: "flex-start" }}>Translational Launch</span>
          </div>
          <div>
            <p className="bento-card-text" style={{ maxWidth: "none", marginBottom: "1.5rem" }}>
              Every Ph.D. research thesis and patent drafted on campus undergoes review by our Strategic Venture Capital Board to convert laboratory patents into operating spin-out ventures.
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-color)" }}>14+</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>IP Filings Targeted</div>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-color)" }}>$2.5M</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Incubation Pool</div>
              </div>
            </div>
          </div>
          <div className="card-spotlight"></div>
        </div>

      </main>

      <Footer />
    </>
  );
}
