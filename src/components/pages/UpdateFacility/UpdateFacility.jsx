// src/components/pages/UpdateFacility/UpdateFacility.jsx
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Save, 
  Loader2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const UpdateFacility = () => {
  // Explicit ID Fetch Strategy
const params = useParams();
const id = params?.id;
  
  const router = useRouter();

  // State Management Flags
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Controlled Dynamic Form State Mapping
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

  // Fetch Existing Data Hook
  useEffect(() => {
    fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities/${id}`
)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          facilityName: data.facilityName || "",
          facilityType: data.facilityType || "",
          image: data.image || "",
          location: data.location || "",
          pricePerHour: data.pricePerHour !== undefined ? String(data.pricePerHour) : "",
          capacity: data.capacity !== undefined ? String(data.capacity) : "",
          availableSlots: Array.isArray(data.availableSlots) ? data.availableSlots.join(", ") : (data.availableSlots || ""),
          description: data.description || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load facility data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Modernized Handle Update Execution Pipeline
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      const updatedFacility = {
        facilityName: formData.facilityName,
        facilityType: formData.facilityType,
        image: formData.image,
        location: formData.location,
        pricePerHour: Number(formData.pricePerHour),
        capacity: Number(formData.capacity),
        availableSlots: formData.availableSlots
          .split(",")
          .map((slot) => slot.trim())
          .filter((slot) => slot.length > 0),
        description: formData.description,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFacility),
        }
      );

      if (response.ok) {
        toast.success("Facility updated");
        router.push("/manage-facilities");
      } else {
        const errData = await response.json().catch(() => ({}));
        toast.error(errData.message || "Update failed");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const FieldLabel = ({ icon: Icon, text }) => (
    <label className="flex items-center gap-2 text-[#F8FAFC]/60 text-xs font-semibold uppercase tracking-wider mb-2">
      <Icon className="h-3.5 w-3.5 text-[#22C55E]" />
      {text}
    </label>
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#22C55E] animate-spin" />
          <p className="text-[#F8FAFC]/60 text-sm tracking-wide">
            Fetching facility configuration...
          </p>
        </div>
      </section>
    );
  }

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#111827] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Navigation & Headers */}
          <div className="mb-10">
            <Link 
              href="/manage-facilities" 
              className="inline-flex items-center gap-2 text-sm text-[#F8FAFC]/40 hover:text-[#22C55E] transition-colors mb-4 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="text-left">
              <p className="text-[#22C55E] text-xs uppercase tracking-[0.3em] font-bold">
                Editor Console
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mt-2 tracking-tight">
                Update Facility Info
              </h1>
              <p className="text-[#F8FAFC]/40 text-sm mt-2">
                Modify performance criteria, pricing variations, or operational block hours.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Base Spec Card Box Section */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel icon={Building2} text="Facility Name" />
                  <input
                    type="text"
                    name="facilityName"
                    placeholder="Arena Name"
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
                    placeholder="Sports Category"
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
                  placeholder="Physical Address"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Pricing Matrix & Logistics Splits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <FieldLabel icon={CircleDollarSign} text="Price Per Hour" />
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#F8FAFC]/40 text-sm">৳</span>
                  <input
                    type="number"
                    name="pricePerHour"
                    placeholder="Rate"
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
                  placeholder="Limit"
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
                  placeholder="Comma separated slots"
                  required
                  value={formData.availableSlots}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Media Image Section with Live Real-time Update Preview Box */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div>
                <FieldLabel icon={Image} text="Cover Asset Image URL" />
                <input
                  type="url"
                  name="image"
                  placeholder="Image Asset Link"
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
                    alt="Real-time storage snapshot preview" 
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-mono text-[#F8FAFC]/40">Active Sync Preview Match Found</span>
                </div>
              )}
            </div>

            {/* Markdown/Description Context Box Container */}
            <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-2xl p-6 md:p-8">
              <FieldLabel icon={FileText} text="Detailed Facility Description" />
              <textarea
                name="description"
                placeholder="Description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#F8FAFC]/10 text-white focus:outline-none focus:border-[#22C55E] transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Bottom Form Actions Control Row */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#22C55E] hover:bg-[#16a34a] disabled:bg-neutral-800 disabled:text-neutral-500 text-[#111827] py-4 rounded-xl font-black transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl shadow-green-500/5"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Saving Document Context Headers...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default UpdateFacility;