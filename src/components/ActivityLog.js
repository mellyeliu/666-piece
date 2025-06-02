import React, { useEffect, useRef } from "react";

const styles = {
  activityLog: {
    width: "var(--sidebar-width)",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    // background: "#f7f5f1",
    boxShadow: "var(--shadow-component)",
    border: "var(--border-double)",
  },
  activityTitle: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
    userSelect: "none",
  },
  activityContent: {
    flex: 1,
    padding: "var(--spacing-sm)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    overflowY: "auto",
  },
  activityEntry: {
    padding: "var(--spacing-xs)",
    // border: "var(--border)",
    fontSize: "var(--font-size-small)",
    fontFamily: "var(--font-family-mono)",
    opacity: 0,
    transform: "translateY(10px)",
    animation: "fadeInUp 0.5s ease-out forwards",
  },
};

const ActivityLog = ({ entries }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div style={styles.activityLog}>
      <div style={styles.activityTitle}>活動記錄</div>
      <div style={styles.activityContent} ref={contentRef}>
        {entries.map((entry, index) => (
          <div key={index} style={styles.activityEntry}>
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
