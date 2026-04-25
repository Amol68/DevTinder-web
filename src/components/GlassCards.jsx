import { useState } from "react";

// ─── Base Glass Card ───────────────────────────────────────────────
export const GlassCard = ({ children, className = "", onClick,style}) => {
  return (
    <div
    style={style}
      onClick={onClick}
      className={`
        relative rounded-2xl px-4 py-3
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        transition-all duration-200
        hover:bg-white/8 hover:border-white/15
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ─── Profile Card ──────────────────────────────────────────────────
// Shows avatar, name, age, subtitle and optional action icon
export const ProfileGlassCard = ({
  name,
  age,
  subtitle,
  avatarLabel,
  avatarColor = "from-purple-400 to-pink-400",
  actionIcon,
  onAction,
  className = "",
  style=""
}) => {
  return (
    <GlassCard className={className} style={style}>
      <div className="flex items-center justify-between" >
        {/* Avatar + Info */}
        <div className="flex items-center gap-3">
          <div
            className={`
              w-11 h-11 rounded-full
              bg-gradient-to-br ${avatarColor}
              flex items-center justify-center
              text-white font-bold text-base
              shadow-lg flex-shrink-0
            `}
          >
            {avatarLabel}
          </div>
          <div>
            <p className="text-white font-semibold text-sm tracking-wide">
              {name}
              {age ? `, ${age}` : ""}
            </p>
            <p className="text-white/50 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Action Icon */}
        {actionIcon && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
            className="text-purple-400 hover:text-purple-300 transition-colors p-1"
          >
            {actionIcon}
          </button>
        )}
      </div>
    </GlassCard>
  );
};

// ─── Message / Reply Card ──────────────────────────────────────────
export const MessageGlassCard = ({
  senderLabel,
  message,
  emoji,
  className = "",
  style=""
}) => {
  return (
    <GlassCard className={className} style={style}>
      <p className="text-white/40 text-xs mb-1">{senderLabel}</p>
      <p className="text-white/80 text-sm leading-relaxed">
        "{message}"{emoji && <span className="ml-1">{emoji}</span>}
      </p>
    </GlassCard>
  );
};

// ─── Info / Stats Card ─────────────────────────────────────────────
export const InfoGlassCard = ({ icon, title, subtitle, className = "" }) => {
  return (
    <GlassCard className={className}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="text-purple-400 flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <p className="text-white font-semibold text-sm">{title}</p>
          {subtitle && (
            <p className="text-white/45 text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

// ─── Demo / Usage Example ──────────────────────────────────────────
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path
      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 
             2.4-7.4L2 9.4h7.6z"
    />
  </svg>
);

export default function GlassCardDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        background:
          "radial-gradient(ellipse at 40% 40%, #2d1b4e 0%, #1a1025 50%, #0f0a1a 100%)",
      }}
    >
      <div className="w-full max-w-sm flex flex-col gap-3">
        {/* 1. Profile Card */}
        <ProfileGlassCard
          name="Maya"
          age={27}
          subtitle="Coffee lover · 94% match"
          avatarLabel="M"
          avatarColor="from-purple-400 to-pink-500"
          actionIcon={<HeartIcon />}
          onAction={() => setLiked(!liked)}
        />

        {/* 2. Message Card */}
        <MessageGlassCard
          senderLabel="Maya replied"
          message="Pottery + cold brew on Saturday? My studio's open"
          emoji="🌸"
        />

        {/* 3. Info / Stats Card */}
        <InfoGlassCard
          icon={<SparkleIcon />}
          title="3 new matches today"
          subtitle="curated just for you"
        />

        {/* Footer text */}
        <div className="text-center mt-4">
          <p className="text-white font-bold text-xl tracking-tight">
            Real connections.
          </p>
          <p className="text-white/40 text-sm mt-1">Not endless swiping.</p>
        </div>
      </div>
    </div>
  );
}
