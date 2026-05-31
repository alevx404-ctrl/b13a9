// src/components/pages/ManageFacilities/ManageFacilities.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  Loader2,
  MapPin,
  CircleDollarSign,
  Users,
  Edit3,
  Trash2,
  PlusCircle,
  Building2,
  AlertTriangle,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const ManageFacilities = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Modal state replacement for native confirm window
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    facilityId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-facilities?email=${session.user.email}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load facilities");
        setLoading(false);
      });
  }, [session, sessionLoading]);

  const openDeleteConfirmation = (id) => {
    setDeleteModal({ isOpen: true, facilityId: id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, facilityId: null });
  };

  const handleDeleteExecute = async () => {
    const id = deleteModal.facilityId;
    if (!id) return;

    try {
      setIsDeleting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      setFacilities((prev) => prev.filter((facility) => facility._id !== id));

      toast.success("Facility deleted successfully");
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#22C55E] animate-spin" />
          <p className="text-[#F8FAFC]/60 text-sm tracking-wide">
            Retrieving your listed inventory...
          </p>
        </div>
      </section>
    );
  }

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#111827] py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Top Info Layout Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[#22C55E] uppercase text-xs tracking-[0.3em] font-bold">
                Owner Dashboard
              </p>
              <h1 className="text-4xl font-black text-white mt-2 tracking-tight">
                Manage My Facilities
              </h1>
              <p className="text-[#F8FAFC]/40 text-sm mt-1">
                Monitor listings, modify details, or remove active rental
                records.
              </p>
            </div>

            {facilities.length > 0 && (
              <Link
                href="/add-facility"
                className="inline-flex items-center gap-2 bg-[#22C55E]/10 hover:bg-[#22C55E] border border-[#22C55E]/30 text-[#22C55E] hover:text-[#111827] px-5 py-3 rounded-xl font-bold transition-all duration-300 text-sm group"
              >
                <PlusCircle className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
                <span>Add Another Venue</span>
              </Link>
            )}
          </div>

          {/* Empty Fallback State Layout */}
          {facilities.length === 0 ? (
            <div className="text-center py-20 bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-3xl p-8 max-w-xl mx-auto">
              <div className="mx-auto w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                No Facilities Discovered
              </h3>
              <p className="text-[#F8FAFC]/50 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                You haven't added any sports facility slots under your active
                email host profile address ({session?.user?.email}) yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/add-facility"
                  className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-[#111827] px-6 py-3 rounded-xl font-black transition-all duration-200 text-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Create First Listing</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Card Columns Matrix Layout Grid Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => (
                <div
                  key={facility._id}
                  className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-3xl overflow-hidden flex flex-col group hover:border-[#22C55E]/20 transition-all duration-300"
                >
                  {/* Image Block Wrapper with Overlay Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={facility.image}
                      alt={facility.facilityName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 bg-[#111827]/90 backdrop-blur-md border border-[#F8FAFC]/10 text-[#22C55E] px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                      {facility.facilityType || "Sports Venue"}
                    </div>
                  </div>

                  {/* Body Content Container */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight line-clamp-1">
                        {facility.facilityName}
                      </h2>

                      <div className="flex items-center gap-1.5 text-[#F8FAFC]/50 text-xs mt-2">
                        <MapPin className="h-3.5 w-3.5 text-[#22C55E] shrink-0" />
                        <span className="line-clamp-1">
                          {facility.location}
                        </span>
                      </div>

                      {/* Stat Metrics Box Container Row */}
                      <div className="grid grid-cols-2 gap-3 my-5 border-y border-[#F8FAFC]/5 py-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#F8FAFC]/30 flex items-center gap-1">
                            <CircleDollarSign className="h-3 w-3 text-[#22C55E]" />{" "}
                            Rate
                          </span>
                          <p className="text-sm font-bold text-white">
                            ৳{facility.pricePerHour}
                            <span className="text-[#F8FAFC]/40 text-xs font-normal">
                              /hr
                            </span>
                          </p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#F8FAFC]/30 flex items-center gap-1">
                            <Users className="h-3 w-3 text-[#22C55E]" />{" "}
                            Capacity
                          </span>
                          <p className="text-sm font-bold text-white">
                            {facility.capacity}{" "}
                            <span className="text-[#F8FAFC]/40 text-xs font-normal">
                              Max
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button Segment Wrapper Row */}
                    <div className="flex gap-3 mt-2">
                      <Link
                        href={`/update-facility/${facility._id}`}
                        className="flex-1 bg-[#22C55E]/10 border border-[#22C55E]/20 hover:bg-[#22C55E] text-[#22C55E] hover:text-[#111827] py-2.5 rounded-xl text-center text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Update</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openDeleteConfirmation(facility._id)}
                        className="flex-1 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/30 text-red-400 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Polished Confirmation Modal Backdrop */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1f2937] border border-[#F8FAFC]/10 max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400 shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Confirm Destruction
                  </h3>
                  <p className="text-sm text-[#F8FAFC]/60 mt-2 leading-relaxed">
                    Are you sure you want to permanently remove this facility
                    listing? This action deletes all server indices and cannot
                    be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={isDeleting}
                  className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#111827] text-[#F8FAFC]/60 hover:text-white border border-[#F8FAFC]/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteExecute}
                  disabled={isDeleting}
                  className="px-5 py-2.5 text-xs font-bold rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-1.5 transition-colors min-w-[90px] justify-center"
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
};

export default ManageFacilities;
