"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Admissions() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formField, setFormField] = useState("bsc");
  const [formNote, setFormNote] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
      y: 35,
      opacity: 0,
      duration: 1.0,
      stagger: 0.12,
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage for Admin Dashboard
    const newLead = {
      id: "LEAD_" + Date.now(),
      name: formName,
      email: formEmail,
      field: formField,
      note: formNote || "N/A",
      timestamp: new Date().toLocaleString(),
      status: "New"
    };

    const currentLeads = JSON.parse(localStorage.getItem("bro_leads") || "[]");
    currentLeads.push(newLead);
    localStorage.setItem("bro_leads", JSON.stringify(currentLeads));

    setIsFormSubmitted(true);
  };

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" id="custom-cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" id="custom-cursor-ring">
        <span ref={cursorTextRef} className="cursor-text" />
      </div>

      <Navbar />

      <main className="why-bro-section" style={{ paddingTop: "10rem", minHeight: "100vh" }}>
        <div className="section-header reveal-item">
          <span className="section-badge" style={{ color: "var(--accent-teal)" }}>PHASE 1 INTAKE</span>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", marginBottom: "1rem" }}>Admissions & Inquiry</h1>
          <p className="section-subtitle">Register interest for our foundational School of Neuroscience programs or strategic partnership slots.</p>
        </div>

        <div className="bento-grid" style={{ maxWidth: "800px", margin: "3rem auto 0" }}>
          <div className="bento-card bento-w2" style={{ padding: "4rem", height: "auto" }}>
            
            {!isFormSubmitted ? (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}>
                <div className="form-group">
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.1em", fontWeight: 600 }}>FULL NAME</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Dr. Vikram Sarabhai"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", padding: "1.2rem", borderRadius: "8px", color: "var(--text-color)", outline: "none", width: "100%" }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.1em", fontWeight: 600 }}>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="vikram@deeptech.in"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", padding: "1.2rem", borderRadius: "8px", color: "var(--text-color)", outline: "none", width: "100%" }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.1em", fontWeight: 600 }}>PROGRAM OF FOCUS</label>
                  <select 
                    required 
                    value={formField}
                    onChange={(e) => setFormField(e.target.value)}
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", padding: "1.2rem", borderRadius: "8px", color: "var(--text-color)", outline: "none", width: "100%", cursor: "pointer" }}
                  >
                    <option value="bsc">B.Sc. Cognitive Science (Neuroscience)</option>
                    <option value="msc">M.Sc. Neural Engineering (Neuroscience)</option>
                    <option value="phd">Ph.D. Neuroinformatics (Neuroscience)</option>
                    <option value="partner">Strategic Partner / Investor Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.1em", fontWeight: 600 }}>STATEMENT OF PURPOSE / PROPOSAL SUMMARY</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your research background or partnership goals..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", padding: "1.2rem", borderRadius: "8px", color: "var(--text-color)", outline: "none", width: "100%", resize: "none" }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="cta-button primary-cta btn-magnetic"
                  onMouseEnter={() => handleMouseEnter("SUBMIT")}
                  onMouseLeave={handleMouseLeave}
                  style={{ alignSelf: "flex-start", padding: "1.2rem 3rem" }}
                >
                  Submit Inquiry <ArrowRight style={{ marginLeft: "0.5rem", width: "18px" }} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                <CheckCircle style={{ width: "64px", height: "64px", color: "var(--accent-teal)" }} />
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>Inquiry Successfully Logged</h2>
                <p style={{ color: "var(--text-secondary)", maxWidth: "500px" }}>Welcome to the core. Our academic admissions panel will review your credentials and contact you within 24 hours.</p>
                <button 
                  onClick={() => setIsFormSubmitted(false)}
                  className="cta-button secondary-cta"
                  style={{ marginTop: "1rem" }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
