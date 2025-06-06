import React, { useEffect, useRef } from "react";
import Vignette from "./Vignette";

const styles = {
  scrollContainer: {
    flex: 1,
    height: "calc(85vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-dark.png')",
    backgroundPosition: "0.1px 0.1px",
    backgroundSize: "calc(100% - 0.2px) calc(100% - 0.2px)",
    backgroundRepeat: "no-repeat",
    border: "var(--border-double)",
    paddingTop: "5vh",
    paddingInline: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-xl)",
    gap: "var(--spacing-md)",
    maxWidth: "400px",
    position: "relative",
    backgroundColor: "white",
    // animation: "swing 8s ease-in-out infinite",
    transformOrigin: "top center",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    border: "var(--border)",
    backgroundImage: "url('/paper-light.png')",
    scrollBehavior: "smooth",
    // Hide scrollbar for Chrome, Safari and Opera
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // Hide scrollbar for IE, Edge and Firefox
    msOverflowStyle: "none",
    scrollbarWidth: "none",
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

// Add keyframes animation
const swingAnimation = `
@keyframes swing {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(0.5deg); }
  75% { transform: rotate(-0.5deg); }
  100% { transform: rotate(0deg); }
}
`;

const Scroll = ({ entries = [], onDiscoverElement }) => {
  console.log("Scroll component props:", { entries, onDiscoverElement });

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Increased delay for slower scroll
      setTimeout(() => {
        const scrollHeight = contentRef.current.scrollHeight;
        const currentScroll = contentRef.current.scrollTop;
        const targetScroll = scrollHeight;
        const duration = 1500; // 1.5 seconds for slower scroll
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Linear scroll
          contentRef.current.scrollTop =
            currentScroll + (targetScroll - currentScroll) * progress;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }, 100);
    }
  }, [entries]);

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
    <>
      <style>{swingAnimation}</style>
      <div style={styles.scrollContainer}>
        <div style={styles.handle}>
          <div style={styles.handleLine} />
          <div style={styles.handleLine2} />
        </div>
        <div
          style={{
            ...styles.content,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          ref={contentRef}
        >
          {contentToRender.map((entry, index) => (
            <Vignette
              key={entry.title}
              title={entry.title.toLowerCase()}
              chineseTitle={entry.chineseTitle}
              description={entry.description}
              image={entry.image}
              index={index}
              onDiscoverElement={onDiscoverElement}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Scroll;
