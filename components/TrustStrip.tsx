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

  const allMessages = [...messages, ...messages];

  return (
    <div className="bg-purple py-4 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {allMessages.map((message, index) => (
            <span
              key={index}
              className="text-white font-mono text-sm sm:text-base font-bold uppercase tracking-wider mx-6 sm:mx-8"
            >
              {message} ✦
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
