"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Users, 
  Settings, 
  Download, 
  Trash2, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import gsap from "gsap";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [systemLog, setSystemLog] = useState("System idle. Academic core active.");

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Load inquiries from localStorage
  const loadLeads = () => {
    if (typeof window !== "undefined") {
      // Create some default mock inquiries if empty to show strategic investors/applicants
      const existing = localStorage.getItem("bro_leads");
      if (!existing) {
        const mockData = [
          {
            id: "LEAD_mock1",
            name: "Dr. Vikram Sarabhai",
            email: "vikram@deeptech.in",
            field: "partner",
            note: "Interested in Phase 3 Silicon lithography fab partnership and matching seed pool fund.",
            timestamp: "2026-06-13 14:02:11",
            status: "Approved"
          },
          {
            id: "LEAD_mock2",
            name: "Priya Sharma",
            email: "priya.sharma@iitb.ac.in",
            field: "phd",
            note: "Applying for BCI research assistantship; background in EEG microelectrode signal modeling.",
            timestamp: "2026-06-13 15:45:00",
            status: "Review"
          },
          {
            id: "LEAD_mock3",
            name: "Aditya Roy",
            email: "aditya@bits-pilani.ac.in",
            field: "bsc",
            note: "Keen to enroll in foundational launch course of B.Sc. Cognitive Science.",
            timestamp: "2026-06-13 18:22:30",
            status: "New"
          }
        ];
        localStorage.setItem("bro_leads", JSON.stringify(mockData));
        setLeads(mockData);
      } else {
        setLeads(JSON.parse(existing));
      }
      setSystemLog("Academic lead telemetry database synchronized successfully.");
    }
  };

  useEffect(() => {
    loadLeads();

    // Mouse movement
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all leads?")) {
      localStorage.removeItem("bro_leads");
      setLeads([]);
      setSystemLog("Telemetry database cleared.");
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `bro_university_leads_${Date.now()}.json`);
    dlAnchorElem.click();
    setSystemLog("Lead database exported successfully.");
  };

  const filteredLeads = leads.filter(l => {
    if (activeTab === "all") return true;
    return l.field === activeTab;
  });

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" style={{ backgroundColor: "var(--accent-teal)" }} />
      <div ref={cursorRingRef} className="cursor-ring" style={{ borderColor: "var(--accent-teal)" }} />

      <div className="why-bro-section" style={{ minHeight: "100vh", paddingTop: "4rem" }}>
        
        {/* Back Link */}
        <div style={{ maxWidth: "1200px", margin: "0 auto 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            <ArrowLeft style={{ width: "16px" }} /> Back to Homepage
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--accent-teal)" }}>
            <ShieldCheck style={{ width: "16px" }} /> Investor Panel Authorized
          </div>
        </div>

        {/* Dashboard Frame */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateRows: "auto 1fr", gap: "2rem" }}>
          
          {/* Header */}
          <div className="bento-card bento-w2" style={{ padding: "3rem", height: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <span className="logo-accent" style={{ color: "var(--accent-teal)", fontSize: "1.2rem", fontWeight: 800 }}>BRO</span>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 700 }}>Academic Intelligence Core</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Real-time student applicant tracking & strategic investor leads pipeline.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={loadLeads} className="cta-button secondary-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", fontSize: "0.85rem" }}>
                <RefreshCw style={{ width: "14px" }} /> Sync
              </button>
              <button onClick={handleExport} className="cta-button secondary-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", fontSize: "0.85rem" }}>
                <Download style={{ width: "14px" }} /> Export JSON
              </button>
              <button onClick={handleClear} className="cta-button" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", fontSize: "0.85rem", background: "rgba(255, 75, 75, 0.1)", border: "1px solid rgba(255, 75, 75, 0.2)", color: "#ff4b4b" }}>
                <Trash2 style={{ width: "14px" }} /> Clear All
              </button>
            </div>
          </div>

          {/* Grid Panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.8fr", gap: "2rem", alignItems: "start" }}>
            
            {/* Sidebar Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              <div className="bento-card" style={{ padding: "2rem", height: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                  <Users style={{ color: "var(--accent-teal)" }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>TOTAL APPLICANTS</span>
                </div>
                <div style={{ fontSize: "3rem", fontWeight: 700 }}>{leads.length}</div>
              </div>

              <div className="bento-card" style={{ padding: "2rem", height: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                  <Activity style={{ color: "#9b5de5" }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>SYSTEM STATUS</span>
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--accent-teal)" }}>ONLINE / ACTIVE</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Foundational Phase 1 running.</p>
              </div>

              <div className="bento-card" style={{ padding: "2rem", height: "auto", background: "rgba(10, 10, 10, 0.5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                  <Terminal style={{ color: "var(--text-secondary)" }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>CONSOLE LOG</span>
                </div>
                <pre style={{ fontSize: "0.75rem", fontFamily: "Courier New, monospace", color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
                  {systemLog}
                </pre>
              </div>

            </div>

            {/* Leads Table */}
            <div className="bento-card" style={{ padding: "3rem", height: "auto" }}>
              <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {["all", "bsc", "msc", "phd", "partner"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? "var(--accent-teal-bg)" : "transparent",
                      color: activeTab === tab ? "var(--accent-teal)" : "var(--text-secondary)",
                      border: activeTab === tab ? "1px solid var(--accent-teal-border)" : "1px solid transparent",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {tab.toUpperCase()} ({leads.filter(l => tab === "all" ? true : l.field === tab).length})
                  </button>
                ))}
              </div>

              {filteredLeads.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left" }}>
                        <th style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>Name</th>
                        <th style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>Email</th>
                        <th style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>Type</th>
                        <th style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>Proposal / Statement</th>
                        <th style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map(l => (
                        <tr key={l.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <td style={{ padding: "1.2rem 0.5rem", fontWeight: 600 }}>{l.name}</td>
                          <td style={{ padding: "1.2rem 0.5rem", color: "var(--text-secondary)" }}>{l.email}</td>
                          <td style={{ padding: "1.2rem 0.5rem" }}>
                            <span style={{ 
                              background: l.field === "partner" ? "var(--accent-pink-bg)" : "var(--accent-teal-bg)",
                              color: l.field === "partner" ? "var(--accent-pink)" : "var(--accent-teal)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 600
                            }}>
                              {l.field.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: "1.2rem 0.5rem", color: "var(--text-secondary)", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={l.note}>
                            {l.note}
                          </td>
                          <td style={{ padding: "1.2rem 0.5rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>{l.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
                  No applicant leads found matching this filter criteria.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
