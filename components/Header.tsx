import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

function SunIcon() {
  return <i className="fa-solid fa-sun" style={{ fontSize: "1.1rem" }}></i>;
}

function MoonIcon() {
  return <i className="fa-solid fa-moon" style={{ fontSize: "1.1rem" }}></i>;
}

function PlusIcon() {
  return <i className="fa-solid fa-plus" style={{ marginRight: "0.25rem" }}></i>;
}

function MegaphoneIcon() {
  return <i className="fa-solid fa-bullhorn" style={{ fontSize: "1.35rem", color: "var(--accent-from)" }}></i>;
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
        boxShadow: "0 10px 30px -10px var(--glass-shadow)",
      }}
    >
      <div className="container-main">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "5rem",
          }}
        >
          {/* Logo / Title */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              color: "var(--text-primary)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MegaphoneIcon />
            </div>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Notice<span style={{ color: "var(--accent-text)" }}>Board</span>
            </span>
          </Link>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--border-color)",
                background: "var(--glass-bg)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Add Notice button */}
            <Link href="/notices/create" id="add-notice-btn">
              <button className="btn-gradient">
                <PlusIcon />
                <span className="header-btn-text">Add Notice</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-btn-text {
          display: none;
        }
        @media (min-width: 480px) {
          .header-btn-text {
            display: inline;
          }
        }
      `}</style>
    </header>
  );
}
