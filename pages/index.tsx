import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import NoticeCard from "@/components/NoticeCard";
import type { Notice } from "@/components/NoticeCard";
import DeleteModal from "@/components/DeleteModal";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [filter, setFilter] = useState<"All" | "Urgent" | "Normal">("All");

  const filteredNotices = notices.filter((notice) => {
    if (filter === "All") return true;
    return notice.priority === filter;
  });

  const fetchNotices = useCallback(async () => {
    try {
      const res = await fetch("/api/notices");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotices(data);
    } catch {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleEdit = (id: string) => {
    router.push(`/notices/${id}/edit`);
  };

  const handleDeleteClick = (notice: Notice) => {
    setDeleteTarget(notice);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/notices/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
        return;
      }

      toast.success("Notice deleted!");
      setNotices((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Head>
        <title>NoticeBoard</title>
        <meta
          name="description"
          content="View and manage all notices on the NoticeBoard. Create, edit, and delete announcements for exams, events, and general updates."
        />
      </Head>

      <Header />

      <main className="container-main" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        {/* Page heading */}
        {!loading && notices.length > 0 && (
          <div
            className="animate-slide-down"
            style={{
              marginBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                {filter === "All" ? "All Notices" : `${filter} Notices`}
              </h1>
            </div>

            {/* Filter dropdown on the right */}
            <div style={{ position: "relative", minWidth: "160px" }}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="glass-input"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: "1rem",
                  paddingRight: "2.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  height: "2.5rem",
                  appearance: "none",
                  background: "var(--glass-bg)",
                  lineHeight: "normal",
                }}
              >
                <option value="All" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}>All Notices</option>
                <option value="Urgent" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Urgent Notices</option>
                <option value="Normal" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Normal Notices</option>
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.8rem",
                }}
              >
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : notices.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {filteredNotices.length === 0 ? (
              <div
                className="glass-card animate-fade-in"
                style={{
                  padding: "4rem 2rem",
                  textAlign: "center",
                  maxWidth: "480px",
                  margin: "3rem auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    background: "rgba(168, 85, 247, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    color: "var(--accent-from)",
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  No {filter.toLowerCase()} notices
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                  }}
                >
                  There are no announcements currently marked as {filter.toLowerCase()} priority.
                </p>
                <button
                  className="btn-gradient"
                  onClick={() => setFilter("All")}
                  style={{ marginTop: "0.5rem" }}
                >
                  Show All Notices
                </button>
              </div>
            ) : (
              <div className="notice-grid">
                {filteredNotices.map((notice, i) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    index={i}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteModal
          notice={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
