import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  imageUrl?: string | null;
  createdAt: string;
}

interface NoticeCardProps {
  notice: Notice;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (notice: Notice) => void;
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

export default function NoticeCard({
  notice,
  index,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  const isUrgent = notice.priority === "Urgent";

  const formattedDate = new Date(notice.publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        animationDelay: `${index * 0.06}s`,
        animationFillMode: "both",
        border: isUrgent ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
      }}
    >
      {/* Top row — badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span className={`badge ${categoryBadgeClass[notice.category] || "badge-general"}`}>
            <i className={`${categoryIcon[notice.category] || "fa-solid fa-circle-info"}`} style={{ marginRight: "0.3rem" }}></i> {notice.category}
          </span>
          {isUrgent ? (
            <span
              className="badge badge-urgent animate-pulse-glow"
              title="Urgent Notice"
              style={{
                width: "1.85rem",
                height: "1.85rem",
                borderRadius: "50%",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}
            >
              <i className="fa-solid fa-circle-exclamation"></i>
            </span>
          ) : (
            <span
              className="badge badge-normal"
              title="Normal Notice"
              style={{
                width: "1.85rem",
                height: "1.85rem",
                borderRadius: "50%",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}
            >
              <i className="fa-solid fa-circle-check"></i>
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--text-tertiary)",
            fontWeight: 500,
          }}
        >
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}
      >
        {notice.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {notice.body}
      </p>

      {/* Image (if present) */}
      {notice.imageUrl && (
        <div
          style={{
            borderRadius: "0.75rem",
            overflow: "hidden",
            maxHeight: "160px",
          }}
        >
          <img
            src={notice.imageUrl}
            alt={notice.title}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <Link
          href={`/notices/${notice.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button
            className="btn-ghost"
            title="View Full Notice"
            style={{
              padding: "0 0.8rem",
              height: "2.25rem",
              borderRadius: "0.6rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-eye"></i> View
          </button>
        </Link>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-ghost"
            onClick={() => onEdit(notice.id)}
            id={`edit-notice-${notice.id}`}
            title="Edit Notice"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="btn-ghost"
            onClick={() => onDelete(notice)}
            id={`delete-notice-${notice.id}`}
            title="Delete Notice"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              color: "#ef4444",
              borderColor: "rgba(239, 68, 68, 0.25)",
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export type { Notice };
