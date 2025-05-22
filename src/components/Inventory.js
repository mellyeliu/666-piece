import React from "react";
import Element from "./Element";

const styles = {
  sidePanel: {
    width: "var(--sidebar-width)",
    height: "calc(75vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url('/paper-light.png')",
    // backgroundColor: "var(--bg-white)",
    boxShadow: "var(--shadow-sm)",
    border: "var(--border-double)",
  },
  title: {
    padding: "var(--spacing-xs)",
    borderBottom: "var(--border)",
    fontSize: "var(--font-size-medium)",
    fontFamily: "var(--font-family-mono)",
    backgroundImage: "url('/paper-dark.png')",
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
  comboBox: {
    height: "150px",
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    display: "float",
    border: "var(--border)",
    padding: "var(--spacing-xs)",
  },
  elementsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(var(--element-size), 1fr))",
    gap: "var(--spacing-xs)",
  },
  comboGrid: {
    display: "grid",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "var(--spacing-sm)",
    height: "100%",
    fontSize: "var(--font-size-small)",
  },
  comboSlot: {
    border: "1px dashed var(--border-color)",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--bg-white)",
  },
};

const Inventory = ({
  elements = [],
  discoveredElements = [],
  comboSlots = [null, null],
  onDragStart,
  onDragOver,
  onComboDrop,
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
        <div style={styles.comboBox}>
          <div style={styles.comboGrid}>
            {[0, 1].map((index) => (
              <div
                key={index}
                style={styles.comboSlot}
                onDragOver={onDragOver}
                onDrop={(e) => onComboDrop?.(e, index)}
              >
                {comboSlots[index] ? (
                  <Element {...comboSlots[index]} onDragStart={onDragStart} />
                ) : (
                  `${index % 2 === 1 ? "East" : "West"}`
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
