import React from "react";

const styles = {
  activityLog: {
    width: "var(--sidebar-width)",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    background: "white",
    boxShadow: "var(--shadow-md)",
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
    animation: "fadeIn 0.5s ease-in forwards",
  },
};

const ActivityLog = ({ entries }) => {
  return (
    <div style={styles.activityLog}>
      <div style={styles.activityTitle}>活動記錄</div>
      <div style={styles.activityContent}>
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
