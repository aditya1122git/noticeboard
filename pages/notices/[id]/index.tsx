import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/Header";

interface NoticeData {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  imageUrl?: string | null;
  createdAt: string;
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

export default function NoticeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<NoticeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError(true);
            toast.error("Notice not found");
            return;
          }
          throw new Error("Failed to fetch");
        }
        const data: NoticeData = await res.json();
        setNotice(data);
      } catch {
        setError(true);
        toast.error("Failed to load notice");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container-main" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
          <div
            className="glass-card animate-shimmer"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "1rem",
            }}
          />
        </main>
      </>
    );
  }

  if (error || !notice) {
    return (
      <>
        <Header />
        <main
          className="container-main"
          style={{
            paddingTop: "6rem",
            paddingBottom: "6rem",
            textAlign: "center",
          }}
        >
          <div className="animate-fade-in" style={{ padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😔</div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Notice not found
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              The notice you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/">
              <button className="btn-gradient">
                <i className="fa-solid fa-arrow-left" style={{ marginRight: "0.3rem" }}></i> Back to Notices
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  }

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
    <>
      <Head>
        <title>{notice.title} — NoticeBoard</title>
        <meta name="description" content={notice.body.substring(0, 150)} />
      </Head>

      <Header />

      <main
        className="container-main animate-fade-in"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        {/* Navigation Back Button */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button
              className="btn-ghost"
              title="Back to Notice Board"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.05rem",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
        </div>

        {/* Full Screen Notice Card */}
        <div
          className="glass-card"
          style={{
            width: "100%",
            borderRadius: "1.25rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            border: isUrgent ? "2px solid #ef4444" : "2px solid #22c55e",
            boxShadow: isUrgent
              ? "0 10px 30px -10px rgba(239, 68, 68, 0.15)"
              : "0 10px 30px -10px rgba(34, 197, 94, 0.15)",
          }}
        >
          {/* Header section: Badges and Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className={`badge ${categoryBadgeClass[notice.category] || "badge-general"}`} style={{ padding: "0.35rem 0.9rem", fontSize: "0.8rem" }}>
                <i className={`${categoryIcon[notice.category] || "fa-solid fa-circle-info"}`} style={{ marginRight: "0.3rem" }}></i> {notice.category}
              </span>
              {isUrgent ? (
                <span
                  className="badge badge-urgent animate-pulse-glow"
                  title="Urgent Announcement"
                  style={{ padding: "0.35rem 0.9rem", fontSize: "0.8rem" }}
                >
                  <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "0.3rem" }}></i> Urgent
                </span>
              ) : (
                <span
                  className="badge badge-normal"
                  title="Normal Priority"
                  style={{ padding: "0.35rem 0.9rem", fontSize: "0.8rem" }}
                >
                  <i className="fa-solid fa-circle-check" style={{ marginRight: "0.3rem" }}></i> Normal
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--text-tertiary)",
                fontWeight: 500,
              }}
            >
              Published on: {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              letterSpacing: "-0.03em",
            }}
          >
            {notice.title}
          </h1>

          {/* Full Size Image */}
          {notice.imageUrl && (
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                width: "100%",
                maxHeight: "550px",
                display: "flex",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.15)",
                border: "1px solid var(--border-color)",
              }}
            >
              <img
                src={notice.imageUrl}
                alt={notice.title}
                style={{
                  width: "100%",
                  maxHeight: "550px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          {/* Main Content Body */}
          <div
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              padding: "0.5rem 0",
            }}
          >
            {notice.body}
          </div>

          {/* Edit/Delete Actions at bottom of details */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "1.5rem",
              marginTop: "0.5rem",
            }}
          >
            <Link href={`/notices/${notice.id}/edit`}>
              <button
                className="btn-ghost"
                title="Edit Notice"
                style={{
                  padding: "0 1.25rem",
                  height: "2.5rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .hover-color-accent:hover {
          color: var(--accent-from) !important;
        }
      `}</style>
    </>
  );
}
