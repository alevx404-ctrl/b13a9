// src/components/shared/Footer.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Trophy, Mail, Phone, MapPin, Globe, Share2, Target, Award } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Globe className="h-4 w-4" />, href: '#', label: 'Website' },
    { icon: <Share2 className="h-4 w-4" />, href: '#', label: 'Share' },
    { icon: <Target className="h-4 w-4" />, href: '#', label: 'Community' },
    { icon: <Award className="h-4 w-4" />, href: '#', label: 'Rankings' },
  ];

  return (
    <footer className="bg-[#111827] text-[#F8FAFC] border-t border-[#F8FAFC]/10 pt-16 pb-8 relative overflow-hidden">
      {/* Design Accent: Subtle Corner Glow */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Fixed Responsive Top Grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-12 border-b border-[#F8FAFC]/10 items-start">
          
          {/* Brand/Identity Card (Takes 4 columns on large screens) */}
          <div className="space-y-4 xl:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer w-fit">
              <div className="bg-[#166534] p-2.5 rounded-xl text-[#22C55E] shadow-inner border border-[#22C55E]/10 transition-transform duration-300 group-hover:scale-105">
                <Trophy className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#F8FAFC]">
                Sport<span className="text-[#22C55E]">Nest</span>
              </span>
            </Link>
            <p className="text-[#F8FAFC]/50 text-sm leading-relaxed font-medium max-w-sm">
              Discover, book, and play. Premium sports venue reservations crafted for athletes and facility owners alike. Elevate your game today.
            </p>
          </div>

          {/* Contact Blocks Area (Allocated 8 columns on large viewports to stop clipping) */}
          <div className="w-full xl:col-span-8 xl:justify-self-end">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#22C55E] mb-4">
              Contact Information
            </h3>
            
            {/* Optimized grid with auto-fitting behaviors to adapt perfectly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              
              {/* Mail Box Component */}
              <a 
                href="mailto:support@sportnest.com" 
                className="flex items-center gap-3 bg-[#F8FAFC]/5 border border-[#F8FAFC]/5 hover:border-[#22C55E]/30 p-4 rounded-2xl transition-all duration-200 group min-w-0"
              >
                <div className="p-2.5 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#22C55E] shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-[#F8FAFC]/30 uppercase tracking-wider">Email Us</p>
                  <p className="text-xs font-semibold text-[#F8FAFC]/80 group-hover:text-[#22C55E] transition-colors mt-0.5 truncate break-all">
                    support@sportnest.com
                  </p>
                </div>
              </a>

              {/* Phone Box Component */}
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-3 bg-[#F8FAFC]/5 border border-[#F8FAFC]/5 hover:border-[#22C55E]/30 p-4 rounded-2xl transition-all duration-200 group min-w-0"
              >
                <div className="p-2.5 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#22C55E] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-[#F8FAFC]/30 uppercase tracking-wider">Call Us</p>
                  <p className="text-xs font-semibold text-[#F8FAFC]/80 group-hover:text-[#22C55E] transition-colors mt-0.5 whitespace-nowrap">
                    +1 (234) 567-890
                  </p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-3 bg-[#F8FAFC]/5 border border-[#F8FAFC]/5 p-4 rounded-2xl min-w-0 sm:col-span-2 md:col-span-1">
                <div className="p-2.5 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#22C55E] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-[#F8FAFC]/30 uppercase tracking-wider">Find Us</p>
                  <p className="text-xs font-semibold text-[#F8FAFC]/80 mt-0.5 line-clamp-2">
                    123 Athletic Way, NY 10001
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Area: Social Links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Social Links Row */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 hover:border-[#22C55E]/40 text-[#F8FAFC]/40 hover:text-[#22C55E] p-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright Metadata */}
          <p className="text-xs text-[#F8FAFC]/30 font-medium tracking-wide text-center sm:text-right">
            &copy; {currentYear} <span className="text-[#F8FAFC]/60 font-semibold">SportNest</span>. All rights reserved. Built for champions.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;