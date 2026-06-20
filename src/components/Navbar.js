"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTheme("light");
    document.body.classList.add("light-theme");

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Custom Cursor Hover Bindings
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


  // Magnetism on Hover
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
    <header className={`navbar ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "mobile-active" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="logo" onMouseEnter={() => handleMouseEnter("HOME")} onMouseLeave={handleMouseLeave}>
          <img 
            src="/image.png" 
            alt="BRO University" 
            className="logo-img" 
          />
        </Link>
        
        <nav className="nav-links">
          <Link 
            href="/" 
            className={`nav-link ${pathname === "/" ? "active-path" : ""}`}
            onMouseEnter={() => handleMouseEnter("HOME")} 
            onMouseLeave={handleMouseLeave}
          >
            Home
          </Link>
          
          <Link 
            href="/programs" 
            className={`nav-link ${pathname === "/programs" ? "active-path" : ""}`}
            onMouseEnter={() => handleMouseEnter("ACADEMICS")} 
            onMouseLeave={handleMouseLeave}
          >
            Academics
          </Link>
          
          <Link 
            href="/research" 
            className={`nav-link ${pathname === "/research" ? "active-path" : ""}`}
            onMouseEnter={() => handleMouseEnter("RESEARCH")} 
            onMouseLeave={handleMouseLeave}
          >
            Research
          </Link>

          <Link 
            href="/investor" 
            className={`nav-link ${pathname === "/investor" ? "active-path" : ""}`}
            onMouseEnter={() => handleMouseEnter("INNOVATION")} 
            onMouseLeave={handleMouseLeave}
          >
            Innovation
          </Link>

          <Link 
            href="/#community" 
            className="nav-link"
            onMouseEnter={() => handleMouseEnter("HEY BRO")} 
            onMouseLeave={handleMouseLeave}
          >
            HEY BRO
          </Link>

          <Link 
            href="/admissions" 
            className={`nav-link ${pathname === "/admissions" ? "active-path" : ""}`}
            onMouseEnter={() => handleMouseEnter("CONTACT")} 
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </Link>
        </nav>

        <div className="nav-actions">
          <Link 
            href="/admissions"
            className="vanguard-btn-primary btn-magnetic"
            onMouseMove={(e) => handleMagnetism(e, e.currentTarget)}
            onMouseLeave={(e) => { handleMagnetReset(e.currentTarget); handleMouseLeave(); }}
            onMouseEnter={() => handleMouseEnter("APPLY")}
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/programs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Academics</Link>
          <Link href="/research" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Research</Link>
          <Link href="/investor" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Innovation</Link>
          <Link href="/#community" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>HEY BRO</Link>
          <Link href="/admissions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
