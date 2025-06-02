import React from "react";

const styles = {
  characterBox: {
    width: "var(--sidebar-width)",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    boxShadow: "var(--shadow-component)",
    border: "var(--border-double)",
  },
  characterTitle: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
  },
  characterContent: {
    flex: 1,
    padding: "var(--spacing-sm)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  characterImage: {
    width: "100%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('/butterfly.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    marginBottom: "var(--spacing-sm)",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "var(--font-size-small)",
    fontFamily: "var(--font-family-mono)",
  },
  statLabel: {
    color: "var(--text-secondary)",
  },
  statValue: {
    fontWeight: "bold",
  },
};

const CharacterBox = () => {
  return (
    <div style={styles.characterBox}>
      <div style={styles.characterTitle}>角色</div>
      <div style={styles.characterContent}>
        <div style={styles.characterImage}></div>
        <div style={styles.statsContainer}>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Level</span>
            <span style={styles.statValue}>1</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Elements</span>
            <span style={styles.statValue}>4/8</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Combinations</span>
            <span style={styles.statValue}>2/6</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Stories</span>
            <span style={styles.statValue}>2/6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBox;
