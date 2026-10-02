import React from 'react';

interface BookCoverArtProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const BookCoverArt: React.FC<BookCoverArtProps> = ({
  className = '',
  size = 'md',
  showBadge = true,
}) => {
  // Dimension classes based on size
  const sizeClasses = {
    sm: 'w-36 h-52 text-xs',
    md: 'w-60 h-88 sm:w-64 sm:h-96 text-sm',
    lg: 'w-72 h-[420px] text-base',
  }[size];

  return (
    <div
      className={`relative select-none rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group border-[6px] border-white/90 bg-[#FDF8F3] ${sizeClasses} ${className}`}
      style={{
        boxShadow:
          '0 20px 35px -10px rgba(120, 53, 15, 0.15), 0 8px 16px -6px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(180, 83, 9, 0.12)',
      }}
    >
      {/* Book Spine Shadow on the Left */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-20 pointer-events-none" />

      {/* Book Sheen / Lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-white/40 pointer-events-none z-10" />

      {/* Outer Cover Border */}
      <div className="absolute inset-2 border border-amber-600/20 rounded-xl pointer-events-none z-10" />

      {/* Cover Content Container */}
      <div className="relative w-full h-full flex flex-col justify-between p-6 z-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EA] to-[#F5EBE0]">
        {/* Top Area */}
        <div className="pt-2" />

        {/* Central Illustration Area */}
        <div className="relative my-auto flex flex-col items-center justify-center py-2">
          {/* Subtle decorative glow ring */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-200/50 to-rose-200/40 blur-xl absolute" />

          {/* Stylized Family Tree and Silhouette SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-32 h-32 text-amber-800 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tree Foliage Arc */}
            <circle cx="100" cy="70" r="48" fill="#FDE68A" fillOpacity="0.45" />
            <circle cx="78" cy="80" r="32" fill="#FBBF24" fillOpacity="0.25" />
            <circle cx="122" cy="80" r="32" fill="#F87171" fillOpacity="0.2" />

            {/* Tree Leaves & Branches */}
            <path
              d="M100 130V95M100 95C90 85 75 88 70 80M100 95C110 85 125 88 130 80M100 110C92 104 82 108 80 102M100 110C108 104 118 108 120 102"
              stroke="#78350F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Family Figures Under Tree */}
            {/* Parent 1 (Left) */}
            <circle cx="86" cy="142" r="6" fill="#78350F" />
            <path
              d="M78 162C78 152 82 150 86 150C90 150 94 152 94 162"
              stroke="#78350F"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Parent 2 (Right) */}
            <circle cx="114" cy="142" r="6" fill="#78350F" />
            <path
              d="M106 162C106 152 110 150 114 150C118 150 122 152 122 162"
              stroke="#78350F"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Child in the Center */}
            <circle cx="100" cy="148" r="4.5" fill="#B45309" />
            <path
              d="M93 162C93 155 97 154 100 154C103 154 107 155 107 162"
              stroke="#B45309"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Ground Arch */}
            <path
              d="M50 164C80 160 120 160 150 164"
              stroke="#92400E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Title & Subtitle */}
          <div className="text-center mt-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-amber-950 leading-tight">
              AİLE DEDİĞİN
            </h3>
            <div className="h-0.5 w-12 bg-amber-600/40 mx-auto my-2 rounded-full" />
            <p className="font-serif italic text-amber-800 text-xs sm:text-sm">
              Öğrencilerin Kaleminden Aile Öyküleri
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-1">
          <p className="text-[10px] uppercase tracking-wider text-amber-800/80 font-semibold">
            Genç Yazarlar & Aile Platformu
          </p>
        </div>
      </div>
    </div>
  );
};
