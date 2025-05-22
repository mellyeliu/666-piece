import React from "react";

const styles = {
  storyEntry: {
    padding: "20px",
    backgroundColor: "var(--bg-white)",
    opacity: 0,
    animation: "fadeIn 1s ease-in forwards",
    position: "relative",
    width: "calc(100% - 40px)",
    marginBottom: "4vh",
    height: "100vh",
  },
  storyImage: {
    width: "50vh",
    height: "50vh",
    backgroundImage: "url('/orchid.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    marginTop: "20vh",
    marginLeft: "-5vh",
  },
  storyText: {
    position: "absolute",
    right: "20px",
    top: "20px",
  },
  storyTitle: {
    fontSize: "50px",
    fontWeight: "bold",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    padding: "var(--spacing-sm)",
    fontFamily: "var(--font-family-handwriting)",
  },
  storyDescription: {
    fontSize: "var(--font-size-small)",
    lineHeight: "var(--line-height)",
    padding: "var(--spacing-sm)",
    backgroundColor: "white",
    position: "absolute",
    right: "20px",
    bottom: "100px",
    width: "30vh",
    border: "var(--border)",
  },
};

const Vignette = ({ title, chineseTitle, description }) => {
  return (
    <div style={styles.storyEntry}>
      <div style={styles.storyImage} />
      <div style={styles.storyDescription}>{description}</div>
      <div style={styles.storyText}>
        <div style={styles.storyTitle}>{chineseTitle}</div>
      </div>
    </div>
  );
};

export default Vignette;
