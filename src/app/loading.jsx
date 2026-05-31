import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Cool subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#22C55E]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center max-w-sm text-center relative z-10">
        {/* Animated Loading Spinner Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-[#22C55E]/20 blur-md animate-pulse" />
          <Loader2 className="h-12 w-12 text-[#22C55E] animate-spin relative z-10" strokeWidth={2.5} />
        </div>

        {/* Text indicators */}
        <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight uppercase">
          Loading <span className="text-[#22C55E]">Nest</span>
        </h2>
        <p className="text-xs font-bold tracking-[0.2em] text-[#F8FAFC]/40 uppercase mt-2 animate-pulse">
          Fetching facility data...
        </p>
      </div>
    </main>
  );
}