// src/components/pages/Facilities/FacilityDetails.jsx
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Users,
  Clock3,
  BadgeDollarSign,
  Loader2,
  CalendarDays,
} from "lucide-react";
import BookingForm from "@/components/forms/BookingForm";
// 1. Better Auth Client State Import
import { authClient } from "@/lib/auth-client";

const FacilityDetails = () => {
  const params = useParams();
  const id = params?.id;

  // 2. Extract Active Active Session Hook
  const { data: session } = authClient.useSession();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Controls form loading state

  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);

  const [bookedSlots, setBookedSlots] = useState([]);

  const totalPrice = Number(hours || 0) * Number(facility?.pricePerHour || 0);

  // Fetch base facility specs info
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFacility(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching facility:", err);
        setLoading(false);
      });
  }, [id]);

  // 1. Add THIS SECOND fetch to monitor real-time date reservations
  useEffect(() => {
    if (!bookingDate || !id) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings?facilityId=${id}&date=${bookingDate}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const slots = data.map((booking) => booking.slot);
        setBookedSlots(slots);

        // Auto clear selection if the user shifts dates and their previous choice is already taken
        if (slots.includes(selectedSlot)) {
          setSelectedSlot("");
        }
      })
      .catch((err) => {
        console.error("Slot Fetch Error:", err);
      });
  }, [bookingDate, id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // 3. Operational Client-Side Auth Shield Gate
    if (!session?.user) {
      toast.error("Please login first to reserve slots.");
      return;
    }

    if (!bookingDate || !selectedSlot || hours < 1) {
      toast.error("Please complete all booking selections.");
      return;
    }

    // 4. Integrated Payload with active context references
    const bookingPayload = {
      facilityId: id,
      facilityName: facility?.facilityName,
      date: bookingDate,
      slot: selectedSlot,
      durationHours: hours,
      pricePaid: totalPrice,
      userId: session.user.id,
      userEmail: session.user.email,
      createdAt: new Date(),
    };

    setIsSubmitting(true); // Disable buttons and show loaders

    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      toast.success("Booking confirmed successfully!");

      // Clear form values upon success
      setBookingDate("");
      setSelectedSlot("");
      setHours(1);
      setBookedSlots([]); // Flush cached date selection states
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false); // Re-enable buttons
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#22C55E] animate-spin" />
          <p className="text-[#F8FAFC]/60 text-sm tracking-wide">
            Loading facility details...
          </p>
        </div>
      </section>
    );
  }

  if (!facility) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#F8FAFC]">
            Facility Not Found
          </h2>
          <p className="text-[#F8FAFC]/50 mt-3 text-sm">
            The requested facility may not exist or was removed.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#111827] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Image */}
          <div className="relative overflow-hidden rounded-3xl border border-[#F8FAFC]/10 shadow-2xl bg-[#F8FAFC]/5">
            <img
              src={facility.image}
              alt={facility.facilityName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5 bg-[#111827]/90 backdrop-blur-md border border-[#22C55E]/20 text-[#22C55E] px-4 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-bold">
              {facility.facilityType}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <p className="text-[#22C55E] text-xs font-bold uppercase tracking-[0.3em] mb-3">
                Premium Sports Venue
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tight leading-tight">
                {facility.facilityName}
              </h1>
              <div className="mt-5 flex items-center gap-2 text-[#F8FAFC]/60 text-sm">
                <MapPin className="h-4 w-4 text-[#22C55E]" />
                <span>{facility.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#22C55E] mb-2">
                  <BadgeDollarSign className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-bold">
                    Pricing
                  </span>
                </div>
                <p className="text-2xl font-black text-[#F8FAFC]">
                  ৳{facility.pricePerHour}
                </p>
                <p className="text-[#F8FAFC]/40 text-xs mt-1">per hour</p>
              </div>

              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#22C55E] mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-bold">
                    Capacity
                  </span>
                </div>
                <p className="text-2xl font-black text-[#F8FAFC]">
                  {facility.capacity}
                </p>
                <p className="text-[#F8FAFC]/40 text-xs mt-1">players max</p>
              </div>

              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#22C55E] mb-2">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-bold">
                    Slots
                  </span>
                </div>
                <p className="text-2xl font-black text-[#F8FAFC]">
                  {facility.availableSlots?.length || 0}
                </p>
                <p className="text-[#F8FAFC]/40 text-xs mt-1">available</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">
                Facility Overview
              </h3>
              <p className="text-[#F8FAFC]/60 leading-relaxed text-sm">
                {facility.description}
              </p>
            </div>

            {/* Time Slots (Disables booked slots in UI) */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <CalendarDays className="h-5 w-5 text-[#22C55E]" />
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  Available Time Slots
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {facility.availableSlots?.map((slot, index) => {
                  // 2. Disable Slots in UI check assignment
                  const isBooked = bookedSlots.includes(slot);

                  // 3. Render Custom Configured Button Layout Node
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={isBooked || isSubmitting}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isBooked
                          ? "bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed"
                          : selectedSlot === slot
                            ? "bg-[#22C55E] text-[#111827] border border-[#22C55E]"
                            : "bg-[#111827] border border-[#F8FAFC]/10 text-[#F8FAFC]/70 hover:border-[#22C55E]/30"
                      }`}
                    >
                      {slot}
                      {isBooked && " • Booked"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <BookingForm
              facility={facility}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              hours={hours}
              setHours={setHours}
              totalPrice={totalPrice}
              handleBookingSubmit={handleBookingSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityDetails;
