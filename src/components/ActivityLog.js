import React from "react";

const styles = {
  activityLog: {
    width: "var(--sidebar-width)",
    height: "calc(75vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-white)",
    boxShadow: "var(--shadow-md)",
    borderRadius: "var(--border-radius)",
    border: "var(--border-double)",
    overflow: "hidden",
  },
  title: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono)",
    backgroundImage: "url('/paper-dark.png')",

    // backgroundColor: "var(--bg-secondary)",
  },
  content: {
    flex: 1,
    padding: "var(--spacing-sm)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  activityEntry: {
    padding: "var(--spacing-xs)",
    // border: "var(--border)",
    // backgroundColor: "var(--bg-secondary)",
    fontSize: "var(--font-size-small)",
    opacity: 0,
    animation: "fadeIn 0.5s ease-in forwards",
    borderRadius: "var(--border-radius)",
  },
  timestamp: {
    color: "var(--text-secondary)",
    fontSize: "12px",
  },
};

const ActivityLog = ({ entries }) => {
  return (
    <div style={styles.activityLog}>
      <div style={styles.title}>活動日誌</div>
      <div style={styles.content}>
        {entries.map((entry, index) => (
          <div key={index} style={styles.activityEntry}>
            <div style={styles.timestamp}>{entry.timestamp}</div>
            <div>{entry.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
