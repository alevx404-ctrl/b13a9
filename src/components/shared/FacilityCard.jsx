"use client";

import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";

const FacilityCard = ({ facility }) => {
  return (
    <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#22C55E]/30 transition-all duration-300 flex flex-col h-full group">

      {/* Clickable Image */}
      <Link href={`/facility/${facility._id}`}>
        <div className="h-56 overflow-hidden relative bg-[#111827] cursor-pointer">
          <img
            src={facility.image}
            alt={facility.facilityName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Facility Type Badge */}
          <span className="absolute top-4 left-4 bg-[#111827]/90 text-[#22C55E] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#22C55E]/20">
            {facility.facilityType}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">

        <div className="space-y-2">

          {/* Clickable Title */}
          <Link href={`/facility/${facility._id}`}>
            <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight truncate hover:text-[#22C55E] transition-colors duration-200 cursor-pointer">
              {facility.facilityName}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-sm text-[#F8FAFC]/60 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#166534] shrink-0" />
            <span className="truncate">{facility.location}</span>
          </p>
        </div>

        {/* Price + Capacity */}
        <div className="pt-4 border-t border-[#F8FAFC]/5 flex items-center justify-between">

          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#F8FAFC]/40">
              Hourly Rate
            </p>

            <p className="text-xl font-extrabold text-[#22C55E]">
              ৳{facility.pricePerHour}
              <span className="text-xs text-[#F8FAFC]/50 font-normal">
                /hr
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#F8FAFC]/60 bg-[#F8FAFC]/5 px-2.5 py-1.5 rounded-lg border border-[#F8FAFC]/5">
            <Users className="h-3.5 w-3.5 text-[#22C55E]" />
            <span>Cap: {facility.capacity}</span>
          </div>

        </div>

        {/* Description */}
        {facility.description && (
          <p className="text-[#F8FAFC]/50 text-xs leading-relaxed line-clamp-2 pt-1">
            {facility.description}
          </p>
        )}

        {/* CTA Button */}
        <Link href={`/facility/${facility._id}`}>
          <button className="group w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#166534]/80 text-[#F8FAFC] py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200 mt-2 shadow-md cursor-pointer">

            Book Now

            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </Link>

      </div>
    </div>
  );
};

export default FacilityCard;