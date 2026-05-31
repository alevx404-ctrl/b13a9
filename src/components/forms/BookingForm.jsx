// src/components/forms/BookingForm.jsx
"use client";

import React from 'react';
import { Calendar, ArrowRight } from "lucide-react";

const BookingForm = ({
  facility,
  bookingDate,
  setBookingDate,
  selectedSlot,
  setSelectedSlot,
  hours,
  setHours,
  totalPrice,
  handleBookingSubmit
}) => {
  return (
    <form onSubmit={handleBookingSubmit} className="bg-[#F8FAFC]/5 border border-[#22C55E]/20 rounded-2xl p-6 space-y-5 backdrop-blur-sm shadow-2xl">
      <div className="flex items-center gap-2 pb-2 border-b border-[#F8FAFC]/5">
        <Calendar className="h-5 w-5 text-[#22C55E]" />
        <h3 className="text-lg font-bold text-[#F8FAFC]">Secure Reservation Panel</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Date Field with Min Date Validation */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]/40">Select Date</label>
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200"
          />
        </div>

        {/* 2. Slot Selector Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]/40">Select Time Frame</label>
          <select
            required
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200 appearance-none"
          >
            <option value="" disabled>-- Choose Slot --</option>
            {facility?.availableSlots?.map((slot, index) => (
              <option key={index} value={slot} className="bg-[#111827]">
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Duration Hours Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]/40">Duration (Hours)</label>
          <input
            type="number"
            min="1"
            max="12"
            required
            value={hours}
            onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200"
          />
        </div>

        {/* 4. Dynamic Live Total Calculation Display Row */}
        <div className="bg-[#111827]/60 border border-[#F8FAFC]/5 rounded-xl p-4 flex items-center justify-between mt-5 md:mt-0">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#F8FAFC]/40">Calculated Statement</p>
            <p className="text-xs text-[#F8FAFC]/60 mt-0.5">৳{facility?.pricePerHour || 0} × {hours} hr</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#22C55E]">Gross Value</p>
            <p className="text-xl font-black text-[#22C55E]">৳{totalPrice}</p>
          </div>
        </div>
      </div>

      {/* 5. Submit Button */}
      <button 
        type="submit" 
        className="group w-full flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-[#111827] py-4 rounded-xl text-sm font-black uppercase tracking-wide transition-all duration-200 shadow-xl shadow-[#22C55E]/10 mt-4"
      >
        Confirm Arena Booking
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </form>
  );
};

export default BookingForm;