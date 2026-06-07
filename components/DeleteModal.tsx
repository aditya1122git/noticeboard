import type { Notice } from "@/components/NoticeCard";

interface DeleteModalProps {
  notice: Notice;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function DeleteModal({
  notice,
  onConfirm,
  onCancel,
  loading = false,
}: DeleteModalProps) {
  return (
    <div
      className="animate-backdrop-in"
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--modal-backdrop)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
    >
      <div
        className="glass-card animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "2rem",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontSize: "1.35rem",
          }}
        >
          <i className="fa-solid fa-triangle-exclamation" style={{ color: "#ef4444" }}></i>
        </div>

        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Delete Notice?
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to delete{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            &ldquo;{notice.title}&rdquo;
          </strong>
          ? This action cannot be undone.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            paddingTop: "0.5rem",
          }}
        >
          <button
            className="btn-ghost"
            onClick={onCancel}
            disabled={loading}
            style={{ flex: 1 }}
          >
            <i className="fa-solid fa-xmark" style={{ marginRight: "0.25rem" }}></i> Cancel
          </button>
          <button
            className="btn-danger"
            onClick={onConfirm}
            disabled={loading}
            id="confirm-delete-btn"
            style={{ flex: 1 }}
          >
            {loading ? (
              <>
                <span
                  className="animate-spin"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash" style={{ marginRight: "0.25rem" }}></i> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
