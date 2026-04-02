'use client';

export default function TrustStrip() {
  const messages = [
    "22g PROTEIN",
    "NO ADDED SUGAR",
    "LAB TESTED",
    "5 INGREDIENTS ONLY",
    "FREE SHIPPING OVER $80",
    "FSSAI CERTIFIED"
  ];

  const allMessages = [...messages, ...messages, ...messages]; // Extra spread for smoother loop

  return (
    // Background: Golden Harvest (#DAA520)
    <div className="bg-[#DAA520] py-3 sm:py-4 overflow-hidden border-y border-[#4B2C20]/10 shadow-sm relative z-20">
      <div className="flex whitespace-nowrap">
        {/* Text: Rich Chocolate (#4B2C20) */}
        <div className="flex animate-marquee">
          {allMessages.map((message, index) => (
            <span
              key={index}
              className="text-[#4B2C20] font-mono text-xs sm:text-sm font-black uppercase tracking-[0.2em] mx-6 sm:mx-10 flex items-center"
            >
              {message} 
              <span className="ml-6 sm:ml-10 text-[#800020] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}