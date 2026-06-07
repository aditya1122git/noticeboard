import type { Notice } from "@/components/NoticeCard";

interface ViewModalProps {
  notice: Notice;
  onClose: () => void;
}

const categoryBadgeClass: Record<string, string> = {
  Exam: "badge-exam",
  Event: "badge-event",
  General: "badge-general",
};

const categoryIcon: Record<string, string> = {
  Exam: "fa-solid fa-file-lines",
  Event: "fa-solid fa-calendar-check",
  General: "fa-solid fa-circle-info",
};

export default function ViewModal({ notice, onClose }: ViewModalProps) {
  const isUrgent = notice.priority === "Urgent";

  const formattedDate = new Date(notice.publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div
      className="animate-backdrop-in"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--modal-backdrop)",
        backdropFilter: "blur(6px)",
        padding: "1rem",
      }}
    >
      <div
        className="glass-card animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          border: isUrgent ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
          position: "relative",
        }}
      >
        {/* Top-Right Close Icon Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            transition: "all 0.2s ease",
          }}
          className="btn-ghost"
          title="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Top Row: Badges & Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            paddingRight: "2rem", // Keep away from Close button
          }}
        >
          <span className={`badge ${categoryBadgeClass[notice.category] || "badge-general"}`}>
            <i className={`${categoryIcon[notice.category] || "fa-solid fa-circle-info"}`} style={{ marginRight: "0.3rem" }}></i> {notice.category}
          </span>
          {isUrgent ? (
            <span
              className="badge badge-urgent animate-pulse-glow"
              title="Urgent Notice"
            >
              <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "0.25rem" }}></i> Urgent
            </span>
          ) : (
            <span
              className="badge badge-normal"
              title="Normal Notice"
            >
              <i className="fa-solid fa-circle-check" style={{ marginRight: "0.25rem" }}></i> Normal
            </span>
          )}
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-tertiary)",
              fontWeight: 500,
              marginLeft: "auto",
            }}
          >
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
          }}
        >
          {notice.title}
        </h2>

        {/* Image (if present) */}
        {notice.imageUrl && (
          <div
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              maxHeight: "300px",
              width: "100%",
            }}
          >
            <img
              src={notice.imageUrl}
              alt={notice.title}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        )}

        {/* Full content body */}
        <div
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {notice.body}
        </div>

        {/* Bottom Close Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0.5rem",
            borderTop: "1px solid var(--border-color)",
            paddingTop: "1rem",
          }}
        >
          <button
            className="btn-gradient"
            onClick={onClose}
            style={{ minWidth: "100px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
