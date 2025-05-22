import React from "react";

const styles = {
  storyEntry: {
    padding: "20px",
    backgroundImage: "url('/paper-light.png')",
    // background: "white",
    opacity: 0,
    animation: "fadeIn 1s ease-in forwards",
    position: "relative",
    width: "calc(100% - 40px)",
    height: "100%",
  },
  storyImage: (title) => ({
    // width: "50vh",
    height: "100%",
    backgroundImage: `url('/${title}.png')`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    // marginTop: "20vh",
    // marginLeft: "-5vh",
  }),
  storyText: {
    position: "absolute",
    right: "20px",
    top: "20px",
  },
  storyTextLeft: {
    right: "auto",
    left: "20px",
  },
  storyTitle: {
    fontSize: "50px",
    fontWeight: "bold",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    padding: "var(--spacing-sm)",
    // color: "transparent",
    // WebkitTextStroke: "0.001px black",
    fontFamily: "var(--font-family-handwriting)",
  },
  storyDescription: {
    fontSize: "var(--font-size-small)",
    lineHeight: "var(--line-height)",
    fontFamily: "var(--font-family-mono)",
    padding: "var(--spacing-sm)",
    background: "white",

    // backgroundColor: "white",
    position: "absolute",
    right: "20px",
    bottom: "150px",
    width: "30vh",
    border: "var(--border)",
  },
  storyDescriptionLeft: {
    right: "auto",
    left: "20px",
  },
};

const Vignette = ({ title, chineseTitle, description, index = 0 }) => {
  const isEven = index % 2 === 0;

  const storyTextStyle = {
    ...styles.storyText,
    ...(isEven ? styles.storyTextLeft : {}),
  };

  const storyDescriptionStyle = {
    ...styles.storyDescription,
    ...(isEven ? styles.storyDescriptionLeft : {}),
  };

  return (
    <div style={styles.storyEntry}>
      <div style={styles.storyImage(title)} />
      <div style={storyDescriptionStyle}>{description}</div>
      <div style={storyTextStyle}>
        <div style={styles.storyTitle}>{chineseTitle}</div>
      </div>
    </div>
  );
};

export default Vignette;
