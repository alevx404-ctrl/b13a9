// src/components/home/Hero.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#111827] px-4 sm:px-6 lg:px-8">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-[#166534]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-20">
        
        {/* Left Layout: Value Proposition & Single CTA */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          
          {/* Athletic Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#166534]/20 border border-[#22C55E]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#22C55E] mx-auto lg:mx-0 w-fit">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Empowering Your Game
          </div>

          {/* Premium Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.1]">
            Reserve Your Arena. <br />
            <span className="bg-gradient-to-r from-[#22C55E] to-[#166534] bg-clip-text text-transparent">
              Elevate Your Play.
            </span>
          </h1>

          {/* Short SaaS Description */}
          <p className="text-base sm:text-lg text-[#F8FAFC]/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover and book premium football turfs, badminton courts, swimming lanes, and tennis courts instantly. Streamlined management for facility hosts; seamless reservations for athletes.
          </p>

          {/* Cleaned Up Single CTA Action */}
          <div className="pt-4 flex justify-center lg:justify-start">
            <Link 
              href="/facilities"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#22C55E]/90 text-[#111827] px-10 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#22C55E]/10 active:scale-[0.98]"
            >
              Explore Facilities
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Minimalist Trust Signals */}
          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#F8FAFC]/5 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-2 text-xs text-[#F8FAFC]/50 font-medium">
              <ShieldCheck className="h-4 w-4 text-[#22C55E]/70 shrink-0" />
              Secure Sessions
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F8FAFC]/50 font-medium">
              <Zap className="h-4 w-4 text-[#22C55E]/70 shrink-0" />
              Instant Booking
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F8FAFC]/50 font-medium">
              <Activity className="h-4 w-4 text-[#22C55E]/70 shrink-0" />
              Real-time Slots
            </div>
          </div>

        </div>

        {/* Right Layout: Hero Visual Showcase */}
        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center z-10">
          <div className="relative p-3 bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-md group transition-transform duration-500 hover:scale-[1.01]">
            
            {/* Hero Image Frame */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111827]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60 z-10" />
              <img 
                src="https://i.ibb.co.com/ZpRS87cb/download-1.jpg" 
                alt="Premium indoor venue arena layout" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
              />
            </div>

            {/* Micro-Card Dynamic Indicator */}
            <div className="absolute -bottom-6 -left-6 bg-[#111827] border border-[#F8FAFC]/10 p-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="bg-[#166534] p-2.5 rounded-lg text-[#22C55E] shadow-inner">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#22C55E]">Live Booking</p>
                <p className="text-xs font-semibold text-[#F8FAFC]">14 Courts Active</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;