"use client";

import SmokeBackground from "@/components/spooky-smoke-animation";

export default function FundoFumaca() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-90">
      <SmokeBackground smokeColor="#5B85A3" intensity={0.55} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/70" />
    </div>
  );
}
