"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Loading State
  if (isPending) {
    return (
      <section className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#22C55E] animate-spin" />
          <p className="text-[#F8FAFC]/60 text-sm">
            Verifying access...
          </p>
        </div>
      </section>
    );
  }

  // Block unauthorized rendering
  if (!session) {
    return null;
  }

  return children;
};

export default ProtectedRoute;