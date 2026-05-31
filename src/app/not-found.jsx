import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background ambient decorative blurs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#166534]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-3xl p-10 shadow-2xl backdrop-blur-sm text-center relative z-10">
        
        {/* Giant Out-of-bounds visual badge */}
        <div className="inline-flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
          Out of Bounds
        </div>

        {/* Big styled 404 Text */}
        <h1 className="text-8xl font-black tracking-tighter text-[#F8FAFC] select-none">
          4<span className="text-[#22C55E] drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">0</span>4
        </h1>

        <h3 className="text-xl font-bold text-[#F8FAFC] mt-4 tracking-tight">
          Facility Not Found
        </h3>
        
        <p className="text-sm text-[#F8FAFC]/50 mt-3 max-w-xs mx-auto leading-relaxed">
          The court or booking page you are looking for doesn&apos;t exist or has been moved to another stadium.
        </p>

        {/* Action Button to return home */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#22C55E] hover:bg-[#16a34a] text-[#111827] py-3.5 rounded-xl font-bold tracking-wide transition-all duration-200 shadow-lg shadow-[#22C55E]/10 hover:shadow-[#22C55E]/20"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}