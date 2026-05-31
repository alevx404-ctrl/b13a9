// src/components/home/Facilities.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

const Facilities = () => {
  const router = useRouter();

  // Curated trending static data optimized for home showcase
  const venues = [
    {
      id: "camp-nou-futsal-arena", // Replace with realistic or real database string IDs
      title: "Camp Nou Futsal Arena",
      type: "Football Turf",
      rating: "4.9",
      price: "৳5.5k/hr",
      location: "Downtown Sports Complex",
      image: "https://i.ibb.co.com/zVTVY4WB/Luxury-Indoor-Football-Turf-Design-Ultra-Realistic-4-K-Sports-Arena.jpg"
    },
    {
      id: "smashpoint-indoor-courts",
      title: "SmashPoint Indoor Courts",
      type: "Badminton Court",
      rating: "4.8",
      price: "৳3k/hr",
      location: "Metro Gym District",
      image: "https://i.ibb.co.com/2D6KjsQ/stadium-badminton.jpg"
    },
    {
      id: "vanguard-olympic-pool",
      title: "Vanguard Olympic Pool",
      type: "Swimming Lane",
      rating: "4.7",
      price: "৳3.6k/hr",
      location: "Northside Aquatic Club",
      image: "https://i.ibb.co.com/Xx5NGmdY/Olympic-Sized-Swimming-Pool-Stock-Image-Image-of-swimming-illuminated-21376657.jpg"
    }
  ];

  return (
    <section className="bg-[#111827] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-2">
              Trending Arenas
            </h2>
            <p className="text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              Most Booked Facilities This Week
            </p>
          </div>
          
          {/* Linked to the correct public path */}
          <Link 
            href="/facilities" 
            className="flex items-center gap-2 text-sm font-bold text-[#22C55E] hover:text-[#22C55E]/80 transition-colors group w-fit"
          >
            View All Fields
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Arenas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div 
              key={venue.id} 
              className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#22C55E]/30 transition-all duration-300 flex flex-col h-full group"
            >
              
              {/* Card Image Wrapper */}
              <div className="relative aspect-[16/10] bg-[#111827] overflow-hidden">
                <img 
                  src={venue.image} 
                  alt={venue.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-4 left-4 bg-[#111827]/90 text-[#22C55E] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#22C55E]/20">
                  {venue.type}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-lg text-[#F8FAFC] tracking-tight truncate">
                      {venue.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 font-semibold text-sm shrink-0">
                      <Star className="h-4 w-4 fill-amber-400" />
                      {venue.rating}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-[#F8FAFC]/60">
                    <p className="flex items-center gap-2 truncate">
                      <MapPin className="h-3.5 w-3.5 text-[#166534] shrink-0" />
                      {venue.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#166534] shrink-0" />
                      6:00 AM - 11:00 PM Daily
                    </p>
                  </div>
                </div>

                {/* Card CTA & Price */}
                <div className="pt-4 border-t border-[#F8FAFC]/5 flex items-center justify-between gap-4">
                  <div className="shrink-0">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#F8FAFC]/40">Hourly Rate</p>
                    <p className="text-xl font-extrabold text-[#22C55E]">{venue.price}</p>
                  </div>
                  
                  {/* Safely pushed over to dynamic details path routing */}
                  <button 
                    onClick={() => router.push(`/facilities/${venue.id}`)}
                    className="bg-[#166534] hover:bg-[#22C55E] hover:text-[#111827] text-[#F8FAFC] text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    Book Slot
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Facilities;