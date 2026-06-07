import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import NoticeForm from "@/components/NoticeForm";

interface NoticeData {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  imageUrl?: string | null;
}

export default function EditNotice() {
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
        <main
          className="container-main"
          style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
        >
          <div
            className="glass-card animate-fade-in-scale"
            style={{
              padding: "2rem",
              maxWidth: "640px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Loading skeleton for form */}
            <div
              className="animate-shimmer"
              style={{ width: "60%", height: "1.5rem", borderRadius: "0.5rem" }}
            />
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div
                  className="animate-shimmer"
                  style={{
                    width: "30%",
                    height: "0.85rem",
                    borderRadius: "0.4rem",
                    marginBottom: "0.5rem",
                  }}
                />
                <div
                  className="animate-shimmer"
                  style={{
                    width: "100%",
                    height: "2.75rem",
                    borderRadius: "0.75rem",
                  }}
                />
              </div>
            ))}
          </div>
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
            paddingTop: "4rem",
            paddingBottom: "4rem",
            textAlign: "center",
          }}
        >
          <div className="animate-fade-in" style={{ padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😔</div>
            <h2
              style={{
                fontSize: "1.3rem",
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
            <button
              className="btn-gradient"
              onClick={() => router.push("/")}
            >
              ← Back to Notices
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Notice — NoticeBoard</title>
        <meta
          name="description"
          content="Edit an existing notice on the NoticeBoard."
        />
      </Head>

      <Header />

      <main
        className="container-main"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        <NoticeForm initialData={notice} isEdit />
      </main>
    </>
  );
}
