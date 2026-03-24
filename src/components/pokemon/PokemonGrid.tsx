'use client';

import type React from 'react';

interface PokemonGridProps {
  children: React.ReactNode;
  sentinelRef?: React.Ref<HTMLDivElement>;
}

export default function PokemonGrid({ children, sentinelRef }: PokemonGridProps) {
  return (
    <div className="w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {children}
      {sentinelRef ? <div ref={sentinelRef} /> : null}
    </div>
  );
}
