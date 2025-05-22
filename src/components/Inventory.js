import React from "react";
import Element from "./Element";

const styles = {
  sidePanel: {
    width: "var(--sidebar-width)",
    height: "calc(53vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    // backgroundImage: "url('/paper-light.png')",
    backgroundColor: "var(--bg-white)",
    boxShadow: "var(--shadow-sm)",
    border: "var(--border-double)",
  },
  title: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono-alt)",
    backgroundImage: "url('/paper-dark.png')",
    // backgroundColor: "var(--accent)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
    overflow: "hidden",
  },
  elementsContainer: {
    flex: 1,
    overflowY: "auto",
    // border: "var(--border)",
    padding: "var(--spacing-xs)",
    // backgroundColor: "var(--bg-secondary)",
  },
  elementsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(var(--element-size), 1fr))",
    gap: "var(--spacing-xs)",
  },
};

const Inventory = ({
  elements = [],
  discoveredElements = [],
  onDragStart,
  onElementClick,
}) => {
  return (
    <div style={styles.sidePanel}>
      <div style={styles.title}>元素調色板</div>
      <div style={styles.content}>
        <div style={styles.elementsContainer}>
          <div style={styles.elementsGrid}>
            {[...elements, ...discoveredElements]
              .filter(
                (element, index, self) =>
                  index === self.findIndex((e) => e.id === element.id)
              )
              .map((element) => (
                <Element
                  key={element.id}
                  {...element}
                  onDragStart={onDragStart}
                  onClick={(e) => onElementClick?.(e, element)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
