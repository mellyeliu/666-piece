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

const CharacterBox = ({ discoveredElements = [], storyEntries = [] }) => {
  // Calculate total possible combinations (including second-order)
  const totalCombinations = 20; // Total number of possible combinations
  const totalStories = 11; // Total number of possible story entries
  const initialElementIds = ["roots", "language", "memory", "dreams"];

  // Calculate level based on progress
  const calculateLevel = () => {
    const progress = (discoveredElements.length / 15) * 100; // 15 is total possible elements (4 initial + 11 combinations)
    if (progress >= 90) return 5;
    if (progress >= 70) return 4;
    if (progress >= 50) return 3;
    if (progress >= 30) return 2;
    return 1;
  };

  // Count only the discovered combinations (elements that aren't initial elements)
  const discoveredCombinations = discoveredElements.filter(
    (element) => !initialElementIds.includes(element.id)
  ).length;

  return (
    <div style={styles.characterBox}>
      <div style={styles.characterTitle}>角色</div>
      <div style={styles.characterContent}>
        <div style={styles.characterImage}></div>
        <div style={styles.statsContainer}>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Level</span>
            <span style={styles.statValue}>{calculateLevel()}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Elements</span>
            <span style={styles.statValue}>{discoveredElements.length}/15</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Combinations</span>
            <span style={styles.statValue}>
              {discoveredCombinations}/{totalCombinations}
            </span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Stories</span>
            <span style={styles.statValue}>
              {storyEntries.length}/{totalStories}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBox;
