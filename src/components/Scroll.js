import React from "react";
import Vignette from "./Vignette";

const styles = {
  scrollContainer: {
    flex: 1,
    height: "calc(85vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-dark.png')",

    boxShadow: "var(--shadow-md)",
    borderRadius: "var(--border-radius)",
    border: "var(--border-double)",
    overflow: "hidden",
    paddingTop: "5vh",
    paddingInline: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-md)",

    gap: "var(--spacing-md)",
    overflowY: "auto",
    // maxWidth: "30vw",
    maxWidth: "400px",
  },
};

const Scroll = ({ entries = [] }) => {
  return (
    <div style={styles.scrollContainer}>
      {entries.map((entry, index) => (
        <Vignette
          key={index}
          title={entry.title}
          chineseTitle={entry.chineseTitle}
          description={entry.description}
        />
      ))}
    </div>
  );
};

export default Scroll;
