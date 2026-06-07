import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NoticeFormData {
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  imageUrl: string;
}

interface NoticeFormProps {
  initialData?: {
    id: string;
    title: string;
    body: string;
    category: string;
    priority: string;
    publishDate: string;
    imageUrl?: string | null;
  };
  isEdit?: boolean;
}

const CATEGORIES = ["Exam", "Event", "General"];
const PRIORITIES = ["Normal", "Urgent"];

export default function NoticeForm({
  initialData,
  isEdit = false,
}: NoticeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NoticeFormData, string>>>({});

  const [form, setForm] = useState<NoticeFormData>({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: new Date().toISOString().split("T")[0],
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        body: initialData.body,
        category: initialData.category,
        priority: initialData.priority,
        publishDate: new Date(initialData.publishDate)
          .toISOString()
          .split("T")[0],
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof NoticeFormData, string>> = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.body.trim()) newErrors.body = "Body is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.priority) newErrors.priority = "Priority is required";
    if (!form.publishDate) {
      newErrors.publishDate = "Publish date is required";
    } else {
      const d = new Date(form.publishDate);
      if (isNaN(d.getTime())) newErrors.publishDate = "Invalid date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const capitalizeWords = (str: string) => {
    return str
      .split(/(\s+)/)
      .map((part) => {
        if (part.trim().length > 0) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part;
      })
      .join("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const finalValue = name === "title" ? capitalizeWords(value) : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
    // Clear error on change
    if (errors[name as keyof NoticeFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const url = isEdit
        ? `/api/notices/${initialData!.id}`
        : "/api/notices";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          publishDate: new Date(form.publishDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(isEdit ? "Notice updated!" : "Notice created!");
      router.push("/");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.025em",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {isEdit ? (
          <>
            <i className="fa-solid fa-pen-to-square" style={{ color: "var(--accent-text)" }}></i> Edit Notice
          </>
        ) : (
          <>
            <i className="fa-solid fa-file-circle-plus" style={{ color: "var(--accent-text)" }}></i> Create New Notice
          </>
        )}
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "0.4rem",
          }}
        >
          Title <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="glass-input"
          placeholder="Enter notice title..."
          value={form.title}
          onChange={handleChange}
          required
        />
        {errors.title && (
          <span
            style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}
          >
            {errors.title}
          </span>
        )}
      </div>

      {/* Body */}
      <div>
        <label
          htmlFor="body"
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "0.4rem",
          }}
        >
          Body <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <textarea
          id="body"
          name="body"
          className="glass-input"
          placeholder="Write the notice content..."
          rows={5}
          value={form.body}
          onChange={handleChange}
          style={{ resize: "vertical", minHeight: "120px" }}
          required
        />
        {errors.body && (
          <span
            style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}
          >
            {errors.body}
          </span>
        )}
      </div>

      {/* Category & Priority — side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <div>
          <label
            htmlFor="category"
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.4rem",
            }}
          >
            Category <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            id="category"
            name="category"
            className="glass-input"
            value={form.category}
            onChange={handleChange}
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <span
              style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}
            >
              {errors.category}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.4rem",
            }}
          >
            Priority <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            id="priority"
            name="priority"
            className="glass-input"
            value={form.priority}
            onChange={handleChange}
            required
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.priority && (
            <span
              style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}
            >
              {errors.priority}
            </span>
          )}
        </div>
      </div>

      {/* Publish Date */}
      <div>
        <label
          htmlFor="publishDate"
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "0.4rem",
          }}
        >
          Publish Date <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <DatePicker
          selected={form.publishDate ? new Date(form.publishDate) : null}
          onChange={(date: Date | null) => {
            if (date) {
              // Convert to local YYYY-MM-DD string format
              const offset = date.getTimezoneOffset();
              const localDate = new Date(date.getTime() - offset * 60 * 1000);
              const formattedDate = localDate.toISOString().split("T")[0];
              
              setForm((prev) => ({
                ...prev,
                publishDate: formattedDate,
              }));
              if (errors.publishDate) {
                setErrors((prev) => ({ ...prev, publishDate: undefined }));
              }
            }
          }}
          dateFormat="yyyy-MM-dd"
          className="glass-input"
          id="publishDate"
          placeholderText="Select publish date..."
        />
        {errors.publishDate && (
          <span
            style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}
          >
            {errors.publishDate}
          </span>
        )}
      </div>

      {/* Image URL (optional) */}
      <div>
        <label
          htmlFor="imageUrl"
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "0.4rem",
          }}
        >
          Image URL{" "}
          <span style={{ fontWeight: 400, color: "var(--text-tertiary)" }}>
            (optional)
          </span>
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          className="glass-input"
          placeholder="https://example.com/image.jpg"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          paddingTop: "0.5rem",
        }}
      >
        <button
          type="submit"
          className="btn-gradient"
          disabled={loading}
          id="submit-notice-btn"
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
              Saving...
            </>
          ) : isEdit ? (
            <>
              <i className="fa-solid fa-floppy-disk" style={{ marginRight: "0.25rem" }}></i> Update Notice
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus" style={{ marginRight: "0.25rem" }}></i> Create Notice
            </>
          )}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => router.push("/")}
          style={{ flex: 0.6 }}
        >
          <i className="fa-solid fa-xmark" style={{ marginRight: "0.25rem" }}></i> Cancel
        </button>
      </div>
    </form>
  );
}
