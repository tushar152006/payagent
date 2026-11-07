import React from 'react';

interface PayAgentLogoProps {
  className?: string;
  size?: number | string;
  theme?: 'dark' | 'light' | 'auto';
  showTile?: boolean;
}

/**
 * PayAgent Official Logomark: "The Deterministic Gate" (Concept 01)
 *
 * Mathematical Construction: 100x100 Grid // 16u Orthographic Spine // 45° Mitre Cut
 * Symbology: Interlocking P + A (Payment + Agent). The left sovereign spine and upper
 * vault barrier enclose the central emerald checksum node (#10B981) while clearing
 * through PayPal cobalt blue (#0070E0).
 */
export const PayAgentLogo: React.FC<PayAgentLogoProps> = ({
  className = 'w-6 h-6',
  size,
  theme = 'auto',
  showTile = false,
}) => {
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  // Determine colors based on theme
  const primaryFill = isDark ? '#FFFFFF' : isLight ? '#0F172A' : 'currentColor';
  const cobaltFill = '#0070E0';
  const emeraldFill = '#10B981';

  const svgContent = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="PayAgent Deterministic Gate Logo"
    >
      {/* Left Sovereign Pillar (Firewall Spine) */}
      <path d="M14 14 H32 V86 H14 Z" fill={primaryFill} />
      
      {/* Upper P-Loop Barrier Bar with 45° Precision Chamfer */}
      <path
        d="M36 14 H72 L86 28 V46 L72 58 H36 V44 H68 V28 H36 Z"
        fill={primaryFill}
      />
      
      {/* Right A-Leg & Execution Gate (Clearing Cobalt) */}
      <path d="M68 62 H86 V86 H68 Z" fill={cobaltFill} />
      
      {/* Horizontal Spend Interceptor Vector */}
      <rect x="36" y="66" width="28" height="12" fill={cobaltFill} />
      
      {/* Deterministic Aperture Checksum Node (Verification Emerald) */}
      <rect x="46" y="31" width="10" height="10" rx="1" fill={emeraldFill} />
    </svg>
  );

  if (showTile) {
    return (
      <div className="w-9 h-9 rounded-lg bg-[#0A1128] border border-[#1E293B] flex items-center justify-center p-1.5 shadow-sm ring-1 ring-white/10 shrink-0">
        <div className="text-white w-full h-full flex items-center justify-center">
          {svgContent}
        </div>
      </div>
    );
  }

  return svgContent;
};

