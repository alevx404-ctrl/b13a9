// src/components/shared/Navbar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Trophy, LogOut, LogIn, ChevronDown, Calendar, PlusCircle, Settings, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Better Auth Client Session Hook
  const { data: session, isPending } = authClient.useSession();

  // Core public static links + global public links
  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/facilities" },
    // Public non-private pages
  ];

  // Close dropdown menu when clicking completely outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navbar background blur control logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Logout Handler Logic
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            setIsOpen(false);
            setDropdownOpen(false);
            router.push("/");
            router.refresh(); 
          },
        },
      });
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out cleanly.");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#111827]/80 backdrop-blur-md border-[#F8FAFC]/5 shadow-sm"
          : "bg-[#111827] border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Site Name */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-[#166534] p-2 rounded-xl text-[#22C55E] transition-transform duration-300 group-hover:scale-105">
              <Trophy className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#F8FAFC]">
              Sport<span className="text-[#22C55E]">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation Link Flow */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-2 ${
                    isActive
                      ? "text-[#22C55E]"
                      : "text-[#F8FAFC]/80 hover:text-[#F8FAFC]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#22C55E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth CTA Controller with Dropdown */}
          <div className="hidden md:flex items-center">
            {isPending ? (
              <div className="h-10 w-24 bg-[#F8FAFC]/5 rounded-xl animate-pulse" />
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-[#F8FAFC]/5 hover:bg-[#F8FAFC]/10 text-[#F8FAFC] px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#F8FAFC]/10 transition-all duration-200"
                >
                  <div className="h-5 w-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                  <span>{session.user.name}</span>
                  <ChevronDown className={`h-4 w-4 text-[#F8FAFC]/50 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Overlay Panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1f2937] border border-[#F8FAFC]/10 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <Link
                      href="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#F8FAFC]/80 hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      My Bookings
                    </Link>
                    <Link
                      href="/add-facility"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#F8FAFC]/80 hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Facility
                    </Link>
                    <Link
                      href="/manage-facilities"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#F8FAFC]/80 hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Manage My Facilities
                    </Link>
                    
                    <div className="my-1 border-t border-[#F8FAFC]/5" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="group flex items-center gap-2 bg-[#166534] hover:bg-[#166534]/90 text-[#F8FAFC] px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-[#166534]/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                Login
                <LogIn className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#F8FAFC]/80 hover:text-[#F8FAFC] hover:bg-[#F8FAFC]/5 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Accordion Drawer Sheet */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#111827] border-b border-[#F8FAFC]/5 transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1 shadow-xl">
          {/* Always Visible Core Public Links */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#166534]/20 text-[#22C55E] border-l-4 border-[#22C55E]"
                    : "text-[#F8FAFC]/80 hover:text-[#F8FAFC] hover:bg-[#F8FAFC]/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Protected Links Injected directly on Active Mobile Sessions */}
          {session && (
            <>
              <div className="my-2 border-t border-[#F8FAFC]/5 pt-2" />
              <p className="px-4 text-xs font-bold uppercase tracking-widest text-[#F8FAFC]/30 mb-1">Private Dashboards</p>
              
              <Link
                href="/my-bookings"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium ${pathname === "/my-bookings" ? "text-[#22C55E] bg-[#166534]/10" : "text-[#F8FAFC]/80"}`}
              >
                My Bookings
              </Link>
              <Link
                href="/add-facility"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium ${pathname === "/add-facility" ? "text-[#22C55E] bg-[#166534]/10" : "text-[#F8FAFC]/80"}`}
              >
                Add Facility
              </Link>
              <Link
                href="/manage-facilities"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium ${pathname === "/manage-facilities" ? "text-[#22C55E] bg-[#166534]/10" : "text-[#F8FAFC]/80"}`}
              >
                Manage My Facilities
              </Link>
            </>
          )}

          {/* Mobile Actions Session Action Strip */}
          <div className="pt-4 border-t border-[#F8FAFC]/5 mt-2">
            {isPending ? (
              <div className="h-12 w-full bg-[#F8FAFC]/5 rounded-xl animate-pulse" />
            ) : session ? (
              <div className="space-y-3">
                <p className="text-xs text-[#F8FAFC]/40 text-center">
                  Signed in as <span className="text-[#F8FAFC]/70 font-semibold">{session.user.email}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 py-3 rounded-xl text-base font-semibold tracking-wide"
                >
                  Logout Account
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#166534] text-[#F8FAFC] py-3 rounded-xl text-base font-semibold tracking-wide shadow-md"
              >
                Login Account
                <LogIn className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;