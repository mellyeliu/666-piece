import React from "react";

const styles = {
  elementContainer: {
    width: "75px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fefefe",
    border: "var(--border)",
    cursor: "move",
    zIndex: 1000,
    userSelect: "none",
    fontFamily: "var(--font-family-mono)", //"'Noto Serif TC', serif",
  },
  elementContainerHover: {
    // transform: "scale(1.02)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  elementContainerDragging: {
    opacity: 0.5,
  },
  icon: {
    width: "32px",
    height: "32px",
    marginBottom: "4px",
    backgroundImage: "url('/dragon2.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  name: {
    fontSize: "12px",
    textAlign: "center",
  },
  chineseName: {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "2px",
  },
  elementImage: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // filter: "grayscale(100%)",
  },
};

const Element = ({
  id,
  name,
  chineseName,
  icon,
  onDragStart,
  onClick,
  description,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ id, name, chineseName, icon, description })
    );
    onDragStart(e, { id, name, chineseName, icon, description });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const containerStyle = {
    ...styles.elementContainer,
    ...(isHovered && styles.elementContainerHover),
    ...(isDragging && styles.elementContainerDragging),
  };

  return (
    <div
      style={containerStyle}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-element-id={id}
    >
      <div style={styles.elementImage}>{icon}</div>
      <div style={styles.chineseName}>{chineseName}</div>
      <div style={styles.name}>{name}</div>
    </div>
  );
};

export default Element;
