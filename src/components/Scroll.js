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
    paddingTop: "5vh",
    paddingInline: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-xl)",
    gap: "var(--spacing-md)",
    maxWidth: "400px",
    position: "relative",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    border: "var(--border)",
    backgroundImage: "url('/paper-light.png')",
  },
  handle: {
    position: "absolute",
    top: "-18px",
    left: "50%",
    transform: "translateX(-50%) scaleY(-1)",
    width: "40px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },
  handleLine: {
    width: "1px",
    height: "30px",
    border: "1px solid var(--border-color)",
    transform: "rotate(45deg)",
    margin: "0 -11px",
  },
  handleLine2: {
    width: "1px",
    height: "30px",
    border: "1px solid var(--border-color)",
    transform: "rotate(-45deg)",
    margin: "0 -11px",
  },
};

const Scroll = ({ entries = [] }) => {
  const contentToRender = [
    {
      title: "welcome",
      chineseTitle: "思源",
      description:
        "A story of identities and beginnings. This is a placeholder! Loading...",
      image: "welcome",
    },
    ...entries,
  ];

  return (
    <div style={styles.scrollContainer}>
      <div style={styles.handle}>
        <div style={styles.handleLine} />
        <div style={styles.handleLine2} />
      </div>
      <div style={styles.content}>
        {contentToRender.map((entry, index) => (
          <Vignette
            key={index}
            title={entry.title}
            chineseTitle={entry.chineseTitle}
            description={entry.description}
            image={entry.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Scroll;
