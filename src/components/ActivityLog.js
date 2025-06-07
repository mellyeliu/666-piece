import React, { useEffect, useRef } from "react";

const styles = {
  sidePanel: {
    width: "var(--sidebar-width)",
    height: "calc(47vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    boxShadow: "var(--shadow-component)",
    border: "var(--border-double)",
  },
  title: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetButton: {
    background: "none",
    border: "none",
    color: "black",
    cursor: "pointer",
    fontSize: "var(--font-size-small)",
    padding: "4px 8px",
    fontFamily: "var(--font-family-mono)",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: "var(--spacing-sm)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    overflow: "hidden",
  },
  entriesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "var(--spacing-xs)",
  },
  entry: {
    padding: "var(--spacing-xs)",
    fontSize: "var(--font-size-small)",
    fontFamily: "var(--font-family-mono)",
    opacity: 0,
    transform: "translateY(10px)",
    animation: "fadeInUp 0.5s ease-out forwards",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
};

const ActivityLog = ({ entries = [] }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [entries]);

  const handleReset = () => {
    // Clear all localStorage items
    localStorage.clear();
    // Reload the page
    window.location.reload();
  };

  return (
    <div style={styles.sidePanel}>
      <div style={styles.title}>
        <span>活動記錄</span>
        <button style={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div style={styles.content} ref={contentRef}>
        {entries.map((entry, index) => (
          <div key={index} style={styles.entry}>
            <div style={{ color: "var(--text-secondary)" }}>
              {entry.timestamp}
            </div>
            <div>{entry.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
