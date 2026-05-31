// src/components/pages/AddFacility/AddFacility.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { 
  Building2, 
  Layers, 
  Image, 
  MapPin, 
  CircleDollarSign, 
  Users, 
  Clock, 
  FileText, 
  PlusCircle, 
  Loader2 
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const AddFacility = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    facilityName: "",
    facilityType: "",
    image: "",
    location: "",
    pricePerHour: "",
    capacity: "",
    availableSlots: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFacility = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const facilityPayload = {
        ...formData,
        pricePerHour: Number(formData.pricePerHour),
        capacity: Number(formData.capacity),
        availableSlots: formData.availableSlots
          .split(",")
          .map((slot) => slot.trim())
          .filter((slot) => slot.length > 0),
        ownerEmail: session?.user?.email,
        createdAt: new Date(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facilityPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add facility");
        return;
      }

      toast.success("Facility added successfully!");
      router.push("/facilities");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Helper component to keep standard labels and icon spacing unified
  const FieldLabel = ({ icon: Icon, text }) => (
    <label className="flex items-center gap-2 text-[#F8FAFC]/60 text-xs font-semibold uppercase tracking-wider mb-2">
      <Icon className="h-3.5 w-3.5 text-[#22C55E]" />
      {text}
    </label>
  );

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#111827] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Typography Elements */}
          <div className="mb-10 text-center md:text-left">
            <p className="text-[#22C55E] text-xs uppercase tracking-[0.3em] font-bold">
              Facility Management Panel
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mt-2 tracking-tight">
              Add New Facility
            </h1>
            <p className="text-[#F8FAFC]/40 text-sm mt-2">
              List a sports arena, field, or court for community booking availability.
            </p>
          </div>

          <form onSubmit={handleAddFacility} className="space-y-6">
            
            {/* Primary Details Box Section */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel icon={Building2} text="Facility Name" />
                  <input
                    type="text"
                    name="facilityName"
                    placeholder="e.g. Old Trafford Arena"
                    required
                    value={formData.facilityName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <FieldLabel icon={Layers} text="Facility Type" />
                  <input
                    type="text"
                    name="facilityType"
                    placeholder="e.g. Football, Indoor Cricket"
                    required
                    value={formData.facilityType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <FieldLabel icon={MapPin} text="Location Address" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>

            </div>

            {/* Logistics & Pricing Grid Split Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <FieldLabel icon={CircleDollarSign} text="Price Per Hour" />
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#F8FAFC]/40 text-sm">৳</span>
                  <input
                    type="number"
                    name="pricePerHour"
                    placeholder="1200"
                    required
                    min="1"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <FieldLabel icon={Users} text="Max Player Capacity" />
                <input
                  type="number"
                  name="capacity"
                  placeholder="e.g. 14"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>

              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <FieldLabel icon={Clock} text="Available Time Slots" />
                <input
                  type="text"
                  name="availableSlots"
                  placeholder="08:00 AM - 09:00 AM, 04:00 PM - 05:00 PM"
                  required
                  value={formData.availableSlots}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Media Image Section + Dynamic URL Real-Time Preview Container */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div>
                <FieldLabel icon={Image} text="Cover Asset Image URL" />
                <input
                  type="url"
                  name="image"
                  placeholder="https://images.unsplash.com/your-sports-photo"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>

              {formData.image && formData.image.startsWith("http") && (
                <div className="relative mt-2 rounded-xl overflow-hidden border border-[#F8FAFC]/10 max-h-48 bg-[#111827]">
                  <img 
                    src={formData.image} 
                    alt="Real-time configuration snapshot preview" 
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-mono text-[#F8FAFC]/40">Live Image Link Detected</span>
                </div>
              )}
            </div>

            {/* Textarea Narrative Summary Component Container */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8">
              <FieldLabel icon={FileText} text="Detailed Facility Description" />
              <textarea
                name="description"
                placeholder="Provide details about the ground material (turf, wooden, concrete), lighting systems, parking access, and house regulations..."
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Action Interactive Submit Command Node */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22C55E] hover:bg-[#16a34a] disabled:bg-neutral-800 disabled:text-neutral-500 text-[#111827] py-4 rounded-xl font-black transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl shadow-green-500/5 hover:shadow-green-500/10 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Configuring Server Collection Assets...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  <span>Publish Facility Listing</span>
                </>
              )}
            </button>

          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default AddFacility;