"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
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
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <Link href="/" className="logo">
            <span className="logo-accent">BRO</span> UNIVERSITY
          </Link>
          <p className="footer-tagline">Building India's deep-tech academic vanguard. Empowering intelligence in biological systems, computing substrates, and silicon substrates.</p>
          <div className="social-links">
            <a href="#" className="social-link" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}>
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="social-link" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}>
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
            </a>
            <a href="#" className="social-link" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}>
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h5>Academics</h5>
            <Link href="/">Neuroscience School</Link>
            <Link href="/programs">Degree Curriculums</Link>
            <Link href="/research">Translatative Research</Link>
          </div>
          <div className="footer-links-col">
            <h5>Ecosystem</h5>
            <Link href="/investor">Roadmap & Vision</Link>
            <Link href="/admissions">Admissions Inquiry</Link>
            <Link href="/admin">Developer Dashboard</Link>
          </div>
          <div className="footer-links-col">
            <h5>Strategic Decks</h5>
            <Link href="/investor">Investor Brief (PDF)</Link>
            <Link href="/investor">Neuroscience Curricula</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">&copy; 2026 BRO University Institution. Designed for Future Leaders.</div>
        <div className="footer-meta">
          <span>Bengaluru, India</span>
          <span className="meta-separator">|</span>
          <span>Neuroscience vertical Node</span>
        </div>
      </div>
    </footer>
  );
}
