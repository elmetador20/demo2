"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Brain, 
  Dna, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen
} from "lucide-react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Programs() {
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

    // Initial load animations
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

      <main className="why-bro-section" style={{ paddingTop: "10rem" }}>
        <div className="section-header reveal-item">
          <span className="section-badge" style={{ color: "#00f5d4" }}>SCHOOL OF NEUROSCIENCE</span>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", marginBottom: "1rem" }}>Future-Ready Curricula</h1>
          <p className="section-subtitle">Combining computational biology, laboratory experiments, and clinical instrumentation. Built to cultivate pioneers.</p>
        </div>

        {/* Programs Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginTop: "3rem" }}>
          
          {/* Undergraduate Track */}
          <div 
            className="bento-card bento-w2 hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("B.SC")}
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", minHeight: "auto", padding: "3.5rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="r-badge" style={{ color: "#00f5d4" }}><Brain /></div>
              <h3 className="bento-card-title">B.Sc. Cognitive Science</h3>
              <span className="soon-badge" style={{ background: "rgba(0, 245, 212, 0.1)", color: "#00f5d4", border: "1px solid rgba(0, 245, 212, 0.2)", alignSelf: "flex-start" }}>4 Year Bachelors</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="bento-card-text" style={{ maxWidth: "none" }}>An immersive program bridging classical biology with algorithmic modeling. Students study neural cortex chemistry, signal pathways, and neuromorphic code blocks.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <div>• Cellular Neurobiology</div>
                <div>• Quantitative Methods</div>
                <div>• Synaptic Physics</div>
                <div>• Laboratory Rotations</div>
              </div>
            </div>
            <div className="card-spotlight"></div>
          </div>

          {/* Graduate Track */}
          <div 
            className="bento-card bento-w2 hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("M.SC")}
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", minHeight: "auto", padding: "3.5rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="r-badge" style={{ color: "#00f5d4" }}><Dna /></div>
              <h3 className="bento-card-title">M.Sc. Neural Engineering</h3>
              <span className="soon-badge" style={{ background: "rgba(0, 245, 212, 0.1)", color: "#00f5d4", border: "1px solid rgba(0, 245, 212, 0.2)", alignSelf: "flex-start" }}>2 Year Masters</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="bento-card-text" style={{ maxWidth: "none" }}>Focused entirely on designing, constructing, and testing physical interfaces between living neurons and computer processors. Emphasizes signal processing and microelectrode arrays.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <div>• BCI Instrument Architectures</div>
                <div>• Telemetry Coding</div>
                <div>• Synaptic Interfaces</div>
                <div>• Clinical Ethics Protocols</div>
              </div>
            </div>
            <div className="card-spotlight"></div>
          </div>

          {/* Doctoral Track */}
          <div 
            className="bento-card bento-w2 hover-spotlight tilt-target reveal-item"
            onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
            onMouseLeave={(e) => { handleCardReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("PH.D")}
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", minHeight: "auto", padding: "3.5rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="r-badge" style={{ color: "#00f5d4" }}><Activity /></div>
              <h3 className="bento-card-title">Ph.D. Neuroinformatics</h3>
              <span className="soon-badge" style={{ background: "rgba(0, 245, 212, 0.1)", color: "#00f5d4", border: "1px solid rgba(0, 245, 212, 0.2)", alignSelf: "flex-start" }}>Research Doctorate</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="bento-card-text" style={{ maxWidth: "none" }}>Original, thesis-driven research modeling biological memory arrays, neural networking substrates, and next-gen computational architectures inspired by structural organic synapse dynamics.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <div>• Cellular Simulation Models</div>
                <div>• Original Patent Drafting</div>
                <div>• Interdisciplinary Fab labs</div>
                <div>• Venture Capital Incubation</div>
              </div>
            </div>
            <div className="card-spotlight"></div>
          </div>

        </div>

        {/* CTA */}
        <div className="cta-section" style={{ padding: "8rem 0 4rem" }}>
          <div className="cta-container">
            <h2 className="cta-title" style={{ fontSize: "2.5rem" }}>Ready to Redefine Academic Frontiers?</h2>
            <p className="cta-subtitle">Secure your placement for the foundational launch session of the School of Neuroscience.</p>
            <Link href="/admissions" className="cta-button primary-cta open-modal-btn" onMouseEnter={() => handleMouseEnter("APPLY")} onMouseLeave={handleMouseLeave}>
              Initiate Admissions Request
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
