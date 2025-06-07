import React from "react";
import Element from "./Element";

const styles = {
  comboBox: {
    width: "var(--sidebar-width)",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    boxShadow: "var(--shadow-component)",
    border: "var(--border-double)",
  },
  comboTitle: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearButton: {
    background: "none",
    border: "none",
    color: "black",
    cursor: "pointer",
    fontSize: "var(--font-size-small)",
    padding: "4px 8px",
    fontFamily: "var(--font-family-mono)",
    fontWeight: "bold",
  },
  gridContainer: {
    flex: 1,
    padding: "var(--spacing-sm)",
    position: "relative",
    backgroundImage: "radial-gradient(#bbb 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    animation: "swing 10s ease-in-out infinite",
    transformOrigin: "top center",
  },
  element: {
    position: "absolute",
    width: "75px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--bg-white)",
    border: "var(--border)",
    cursor: "move",
    transform: "translate(-50%, -50%)",
    fontFamily: "var(--font-family-mono)",
  },
  elementIcon: {
    width: "32px",
    height: "32px",
    marginBottom: "4px",
    backgroundImage: "url('/dragon2.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  elementChineseName: {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "2px",
  },
  elementName: {
    fontSize: "12px",
    textAlign: "center",
  },
};

// Add keyframes animation at the top level
const swingAnimation = `
@keyframes swing {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(0.1deg); }
  75% { transform: rotate(-0.1deg); }
  100% { transform: rotate(0deg); }
}
`;

const ComboBox = ({
  gridElements = [],
  onDragStart,
  onDragOver,
  onGridDrop,
  onComboDrop,
}) => {
  return (
    <>
      <style>{swingAnimation}</style>
      <div style={styles.comboBox}>
        <div style={styles.comboTitle}>
          <span>元素網格</span>
          <button
            style={styles.clearButton}
            onClick={() => onGridDrop(null, 0, 0, true)}
          >
            🗑️
          </button>
        </div>
        <div
          style={styles.gridContainer}
          onDragOver={onDragOver}
          onDrop={(e) => {
            if (e) {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              onGridDrop(e, x, y);
            } else {
              onGridDrop(null, 0, 0, true);
            }
          }}
        >
          {gridElements.map((element, index) => (
            <div
              key={index}
              style={{
                ...styles.element,
                left: element.x,
                top: element.y,
              }}
              draggable
              onDragStart={(e) => onDragStart(e, element)}
            >
              <div style={styles.elementIcon}></div>
              <div style={styles.elementChineseName}>{element.chineseName}</div>
              <div style={styles.elementName}>{element.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComboBox;
