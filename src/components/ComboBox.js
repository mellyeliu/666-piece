import React from "react";

const styles = {
  comboBox: {
    width: "var(--sidebar-width)",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    boxShadow: "var(--shadow-md)",
    border: "var(--border-double)",
  },
  comboTitle: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
  },
  gridContainer: {
    flex: 1,
    padding: "var(--spacing-sm)",
    position: "relative",
    backgroundImage: "radial-gradient(#bbb 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    backgroundColor: "var(--bg-white)",
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
    fontSize: "32px",
    marginBottom: "4px",
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

const ComboBox = ({
  gridElements = [],
  onDragStart,
  onDragOver,
  onGridDrop,
}) => {
  return (
    <div style={styles.comboBox}>
      <div style={styles.comboTitle}>元素網格</div>
      <div
        style={styles.gridContainer}
        onDragOver={onDragOver}
        onDrop={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          onGridDrop(e, x, y);
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
            <div style={styles.elementIcon}>{element.icon}</div>
            <div style={styles.elementChineseName}>{element.chineseName}</div>
            <div style={styles.elementName}>{element.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboBox;
