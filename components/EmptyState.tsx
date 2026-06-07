import Link from "next/link";

export default function EmptyState() {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      {/* Illustration */}
      <div className="animate-float" style={{ marginBottom: "2rem" }}>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Board */}
          <rect
            x="35"
            y="30"
            width="130"
            height="140"
            rx="12"
            fill="var(--glass-bg)"
            stroke="var(--border-color)"
            strokeWidth="2"
          />

          {/* Board header */}
          <rect
            x="35"
            y="30"
            width="130"
            height="28"
            rx="12"
            fill="url(#headerGrad)"
          />
          <rect x="35" y="46" width="130" height="12" fill="url(#headerGrad)" />

          {/* Pin dots */}
          <circle cx="70" cy="44" r="3" fill="rgba(255,255,255,0.8)" />
          <circle cx="100" cy="44" r="3" fill="rgba(255,255,255,0.8)" />
          <circle cx="130" cy="44" r="3" fill="rgba(255,255,255,0.8)" />

          {/* Empty lines */}
          <rect
            x="55"
            y="76"
            width="90"
            height="8"
            rx="4"
            fill="var(--skeleton-from)"
            opacity="0.5"
          />
          <rect
            x="55"
            y="96"
            width="70"
            height="8"
            rx="4"
            fill="var(--skeleton-from)"
            opacity="0.35"
          />
          <rect
            x="55"
            y="116"
            width="80"
            height="8"
            rx="4"
            fill="var(--skeleton-from)"
            opacity="0.25"
          />
          <rect
            x="55"
            y="136"
            width="50"
            height="8"
            rx="4"
            fill="var(--skeleton-from)"
            opacity="0.15"
          />

          {/* Question mark */}
          <text
            x="100"
            y="115"
            textAnchor="middle"
            fontSize="40"
            fill="var(--text-tertiary)"
            opacity="0.3"
          >
            ?
          </text>

          <defs>
            <linearGradient
              id="headerGrad"
              x1="35"
              y1="30"
              x2="165"
              y2="58"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--accent-from)" />
              <stop offset="1" stopColor="var(--accent-to)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h3
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        No notices yet
      </h3>
      <p
        style={{
          fontSize: "0.95rem",
          color: "var(--text-secondary)",
          maxWidth: "360px",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}
      >
        Your notice board is empty. Create your first notice to get started!
      </p>
      <Link href="/notices/create">
        <button className="btn-gradient" id="empty-state-add-btn">
          <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: "0.25rem" }}></i> Create First Notice
        </button>
      </Link>
    </div>
  );
}
