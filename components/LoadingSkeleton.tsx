export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="notice-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            animationDelay: `${i * 0.08}s`,
          }}
        >
          {/* Badges row */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div
              className="animate-shimmer"
              style={{
                width: "5rem",
                height: "1.5rem",
                borderRadius: "9999px",
              }}
            />
            <div
              className="animate-shimmer"
              style={{
                width: "4rem",
                height: "1.5rem",
                borderRadius: "9999px",
              }}
            />
          </div>

          {/* Title */}
          <div
            className="animate-shimmer"
            style={{
              width: "85%",
              height: "1.25rem",
              borderRadius: "0.5rem",
            }}
          />

          {/* Body lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div
              className="animate-shimmer"
              style={{
                width: "100%",
                height: "0.9rem",
                borderRadius: "0.4rem",
              }}
            />
            <div
              className="animate-shimmer"
              style={{
                width: "92%",
                height: "0.9rem",
                borderRadius: "0.4rem",
              }}
            />
            <div
              className="animate-shimmer"
              style={{
                width: "60%",
                height: "0.9rem",
                borderRadius: "0.4rem",
              }}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <div
              className="animate-shimmer"
              style={{
                flex: 1,
                height: "2.2rem",
                borderRadius: "0.75rem",
              }}
            />
            <div
              className="animate-shimmer"
              style={{
                flex: 1,
                height: "2.2rem",
                borderRadius: "0.75rem",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
