// src/components/pages/MyBookings/MyBookings.jsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, CalendarDays, Clock3, Trash2 } from "lucide-react";
// Better Auth Client Hook Import
import { authClient } from "@/lib/auth-client";
// 1. Route Guard Component Import
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const MyBookings = () => {
  // Extract Active Session Context
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch filtered bookings
  useEffect(() => {
    // Wait until Better Auth resolves the session status
    if (sessionLoading) return;

    // If no user is logged in, clear bookings and stop loading
    if (!session?.user?.email) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Dynamic fetch endpoint string utilizing email queries
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings?email=${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load booking history.");
        setLoading(false);
      });
  }, [session?.user?.email, sessionLoading]); // Safely refetch if session shifts

  // Async Delete Handler Logic
  const handleDeleteBooking = async (id) => {
    if (!session?.user?.email) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    const proceed = window.confirm("Are you sure you want to cancel this reservation?");
    if (!proceed) return;

    try {
      // Secured parameters validation delete string execution
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}?email=${session.user.email}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Cancellation failed");
      }

      // Smooth state sync removal
      const remainingBookings = bookings.filter((booking) => booking._id !== id);
      setBookings(remainingBookings);
      
      toast.success("Reservation cancelled successfully");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not delete reservation");
    }
  };

  // Keep loading interface up if either session data or server routes are calculating data
  if (sessionLoading || loading) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#22C55E] animate-spin" />
      </section>
    );
  }

  // 2. Wrap Entire Return Layout inside the ProtectedRoute gate component
  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#111827] py-20 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="mb-12">
            <p className="text-[#22C55E] uppercase text-xs tracking-[0.3em] font-bold">
              Reservation Control
            </p>
            <h1 className="text-4xl font-black text-[#F8FAFC] mt-3">
              My Bookings
            </h1>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl">
              <p className="text-[#F8FAFC]/40 text-sm">
                No active reservations discovered for {session?.user?.email}.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                  {/* Left Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#F8FAFC]/40 text-xs uppercase tracking-wider">
                        Facility Name
                      </p>
                      <h3 className="text-xl font-bold text-[#F8FAFC] mt-0.5">
                        {booking.facilityName || "Premium Sports Arena"}
                      </h3>
                      <p className="text-[#F8FAFC]/30 text-[11px] font-mono mt-1">
                        ID: {booking.facilityId}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[#F8FAFC]/60">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#22C55E]" />
                        {booking.date}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-[#22C55E]" />
                        {booking.slot} ({booking.durationHours} hrs)
                      </div>
                    </div>
                  </div>

                  {/* Right Balance Metrics */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#F8FAFC]/5">
                    <div className="text-left md:text-right">
                      <p className="text-[#F8FAFC]/40 text-xs uppercase tracking-wider">
                        Total Paid
                      </p>
                      <p className="text-2xl font-black text-[#22C55E]">
                        ৳{booking.pricePaid}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200"
                      title="Cancel Reservation"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </ProtectedRoute>
  );
};

export default MyBookings;