"use client";

import { useState } from 'react';
import { ArrowUpRight, Award, Crown, X } from 'lucide-react';
import "./vanguard.css";

export default function VanguardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Studio', href: '#studio' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Inquire', href: '#inquire' }
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none font-inter text-white flex flex-col justify-between">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
        />
        {/* Dark Vignette Overlay for maximum text readability and aesthetic premium contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/45 z-0" />
      </div>

      {/* Navbar Header */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-5 lg:py-7 flex items-center justify-between">
        {/* Brand Name Left */}
        <a href="#" className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white hover:opacity-95 transition-opacity">
          VANGUARD
        </a>

        {/* Center Nav Links (Hidden below md) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs lg:text-sm text-white/80 hover:text-white uppercase tracking-widest transition-colors duration-250 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Button (Hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#inquire"
            className="group inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-white/10 transition-all duration-300"
          >
            GET IN TOUCH
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        {/* Hamburger Toggle (Visible below md) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col justify-center items-end gap-1.5 focus:outline-none py-2 px-1 group"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-0.5 bg-white transition-all group-hover:w-5 duration-250" />
          <div className="w-6 h-0.5 bg-white transition-all duration-250" />
          <div className="w-4 h-0.5 bg-white transition-all group-hover:w-6 duration-250" />
        </button>
      </header>

      {/* Hero Body Content */}
      <main className="relative z-10 w-full flex-grow flex items-center px-6 sm:px-10 lg:px-16 py-4">
        <div className="max-w-4xl flex flex-col items-start">
          
          {/* Tagline Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 mb-6 lg:mb-8">
            <Crown className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              World-Class Digital Collective
            </span>
          </div>

          {/* Main Title Heading */}
          <h1 className="animate-fade-up-delay-1 font-podium text-white uppercase leading-[0.92] tracking-tight text-[clamp(2.8rem,8vw,7rem)] flex flex-col">
            <span>Design.</span>
            <span>Disrupt.</span>
            <span>Conquer.</span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="animate-fade-up-delay-2 text-white/70 text-sm sm:text-base leading-relaxed max-w-md mt-6 lg:mt-8">
            We build fierce brand identities{' '}
            <span className="block sm:inline">that don't just turn heads --</span>{' '}
            <strong className="text-white font-bold">they lead.</strong>
          </p>

          {/* CTA Group Row */}
          <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Primary Action Button */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-black text-white hover:bg-neutral-900 border border-white/20 px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase font-bold transition-all duration-300 rounded-none"
            >
              SEE OUR WORK
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            {/* Award Badge Block (Hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-3">
              <Award className="w-8 h-8 text-white/50 stroke-[1.5]" />
              <div className="flex flex-col text-left">
                <span className="text-white/60 text-xs tracking-wider uppercase font-semibold leading-tight">
                  Top-Rated
                </span>
                <span className="text-white/40 text-[10px] tracking-wider uppercase leading-tight">
                  Brand Studio
                </span>
              </div>
            </div>
          </div>

          {/* Stats Group Grid Row */}
          <div className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16">
            
            {/* Stat Item 1 */}
            <div className="flex flex-col text-left">
              <span className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                250+
              </span>
              <span className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1.5 font-medium">
                Brands Transformed
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex flex-col text-left">
              <span className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                95%
              </span>
              <span className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1.5 font-medium">
                Client Retention
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="flex flex-col text-left">
              <span className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                10+
              </span>
              <span className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1.5 font-medium">
                Years in the Game
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* Empty space at the bottom for balanced spatial composition */}
      <footer className="relative z-10 w-full h-10 pointer-events-none" />

      {/* Fullscreen Mobile Menu Overlay (Below md) */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between transition-all duration-500 ease-in-out md:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="w-full px-6 sm:px-10 py-5 flex items-center justify-between">
          <span className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            VANGUARD
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white focus:outline-none p-2"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Mobile Menu Vertical Centered Links */}
        <div className="flex flex-col items-center justify-center gap-8 text-center px-6 my-auto">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${index * 80 + 100}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transitionProperty: 'opacity, transform',
                transitionDuration: '500ms'
              }}
              className="font-podium text-4xl sm:text-5xl text-white uppercase tracking-wide hover:opacity-80 transition-all font-bold"
            >
              {link.name}
            </a>
          ))}

          {/* Mobile GET IN TOUCH button with staggered animation delay */}
          <div
            className="mt-6 transition-all duration-500"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 80 + 100}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transitionProperty: 'opacity, transform'
            }}
          >
            <a
              href="#inquire"
              onClick={() => setMenuOpen(false)}
              className="group inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-white/10 transition-all duration-300"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-4 h-4 text-white/80" />
            </a>
          </div>
        </div>

        {/* Empty footer for alignment balance */}
        <div className="h-10" />
      </div>

    </div>
  );
}
