import React, { useState, useEffect } from "react";
import Element from "./Element";

// Style variables
const BORDER_STYLE = "1px solid #333";
const FONT_FAMILY = "'Noto Serif TC', serif";

const styles = {
  gameContainer: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: FONT_FAMILY,
  },
  sidePanel: {
    width: "250px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    borderRight: BORDER_STYLE,
  },
  mainArea: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  canvas: {
    flex: 1,
    backgroundColor: "white",
    border: BORDER_STYLE,
    position: "relative",
    backgroundImage:
      "linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  elementInfo: {
    position: "absolute",
    padding: "10px",
    backgroundColor: "white",
    border: BORDER_STYLE,
    fontSize: "14px",
    maxWidth: "200px",
    zIndex: 1000,
    fontFamily: FONT_FAMILY,
  },
  connectingLine: {
    position: "absolute",
    backgroundColor: "#333",
    zIndex: 1,
    transformOrigin: "0 0",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#333",
    fontFamily: FONT_FAMILY,
  },
  elementsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "10px",
  },
};

const initialElements = [
  {
    id: "fire",
    name: "Fire",
    chineseName: "火",
    icon: "🔥",
    description: "The element of heat and energy",
  },
  {
    id: "water",
    name: "Water",
    chineseName: "水",
    icon: "💧",
    description: "The element of fluidity and life",
  },
  {
    id: "earth",
    name: "Earth",
    chineseName: "土",
    icon: "🌍",
    description: "The element of stability and growth",
  },
  {
    id: "air",
    name: "Air",
    chineseName: "气",
    icon: "💨",
    description: "The element of movement and freedom",
  },
];

const Game = () => {
  const [elements, setElements] = useState(initialElements);
  const [discoveredElements, setDiscoveredElements] = useState(() => {
    // Load discovered elements from localStorage on initial render
    const savedElements = localStorage.getItem("discoveredElements");
    return savedElements ? JSON.parse(savedElements) : [];
  });
  const [canvasElements, setCanvasElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });

  // Save discovered elements to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "discoveredElements",
      JSON.stringify(discoveredElements)
    );
  }, [discoveredElements]);

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(element));
    e.dataTransfer.setData(
      "isMove",
      element.x !== undefined ? "true" : "false"
    );

    // If this is the selected element, update the info box position
    if (selectedElement && selectedElement.id === element.id) {
      const rect = e.currentTarget.getBoundingClientRect();
      const canvasRect = e.currentTarget
        .closest('[style*="position: relative"]')
        .getBoundingClientRect();

      const elementX = rect.left - canvasRect.left + rect.width / 2;
      const elementY = rect.top - canvasRect.top + rect.height / 2;

      const infoX = elementX + 100;
      const infoY = elementY - 50;

      setInfoPosition({
        x: infoX,
        y: infoY,
        elementX,
        elementY,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedElement = JSON.parse(e.dataTransfer.getData("text/plain"));
    const isMove = e.dataTransfer.getData("isMove") === "true";
    const rect = e.currentTarget.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const elementSize = 80;
    x = Math.max(0, Math.min(x, rect.width - elementSize));
    y = Math.max(0, Math.min(y, rect.height - elementSize));

    // If this is the selected element, update the info box position
    if (selectedElement && selectedElement.id === droppedElement.id) {
      const elementX = x + elementSize / 2;
      const elementY = y + elementSize / 2;
      const infoX = elementX + 100;
      const infoY = elementY - 50;

      setInfoPosition({
        x: infoX,
        y: infoY,
        elementX,
        elementY,
      });
    }

    const targetElement = canvasElements.find((canvasEl) => {
      const elementRect = {
        left: canvasEl.x,
        right: canvasEl.x + elementSize,
        top: canvasEl.y,
        bottom: canvasEl.y + elementSize,
      };
      return (
        x >= elementRect.left &&
        x <= elementRect.right &&
        y >= elementRect.top &&
        y <= elementRect.bottom
      );
    });

    if (targetElement) {
      const newElement = combineElements(targetElement, droppedElement);
      if (newElement) {
        setCanvasElements((prev) =>
          prev
            .filter(
              (el) => el.id !== targetElement.id && el.id !== droppedElement.id
            )
            .concat({
              ...newElement,
              x: targetElement.x,
              y: targetElement.y,
            })
        );

        if (!discoveredElements.some((el) => el.id === newElement.id)) {
          setDiscoveredElements((prev) => [...prev, newElement]);
        }
        return;
      }
    }

    if (isMove) {
      setCanvasElements((prev) =>
        prev.map((el) => (el.id === droppedElement.id ? { ...el, x, y } : el))
      );
    } else {
      if (!canvasElements.some((el) => el.id === droppedElement.id)) {
        setCanvasElements((prev) => [...prev, { ...droppedElement, x, y }]);
      }
    }
  };

  const handleElementMove = (e, element) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update element position
    setCanvasElements((prev) =>
      prev.map((el) => (el.id === element.id ? { ...el, x, y } : el))
    );
  };

  const handleElementClick = (e, element) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasRect = e.currentTarget
      .closest('[style*="position: relative"]')
      .getBoundingClientRect();

    // Calculate position relative to canvas
    const elementX = rect.left - canvasRect.left + rect.width / 2;
    const elementY = rect.top - canvasRect.top + rect.height / 2;

    // Position the info box 100px to the right of the element
    const infoX = elementX + 100;
    const infoY = elementY - 50; // Center vertically relative to the element

    setSelectedElement(element);
    setInfoPosition({
      x: infoX,
      y: infoY,
      elementX,
      elementY,
    });
  };

  const combineElements = (element1, element2) => {
    const elements = [element1.id, element2.id].sort();
    const combinationKey = elements.join("-");

    const combinations = {
      "fire-water": {
        id: "steam",
        name: "Steam",
        chineseName: "蒸汽",
        icon: "💨",
        description: "The result of heat meeting water",
      },
      "water-fire": {
        id: "steam",
        name: "Steam",
        chineseName: "蒸汽",
        icon: "💨",
        description: "The result of heat meeting water",
      },
      "water-earth": {
        id: "mud",
        name: "Mud",
        chineseName: "泥",
        icon: "🌊",
        description: "The mixture of earth and water",
      },
      "earth-water": {
        id: "mud",
        name: "Mud",
        chineseName: "泥",
        icon: "🌊",
        description: "The mixture of earth and water",
      },
      "earth-air": {
        id: "dust",
        name: "Dust",
        chineseName: "灰尘",
        icon: "💨",
        description: "Air carrying earth particles",
      },
      "air-earth": {
        id: "dust",
        name: "Dust",
        chineseName: "灰尘",
        icon: "💨",
        description: "Air carrying earth particles",
      },
      "fire-earth": {
        id: "lava",
        name: "Lava",
        chineseName: "岩浆",
        icon: "🌋",
        description: "Molten earth created by fire",
      },
      "earth-fire": {
        id: "lava",
        name: "Lava",
        chineseName: "岩浆",
        icon: "🌋",
        description: "Molten earth created by fire",
      },
    };

    return combinations[combinationKey] || null;
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.sidePanel}>
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
                onDragStart={handleDragStart}
                onClick={(e) => handleElementClick(e, element)}
              />
            ))}
        </div>
      </div>
      <div style={styles.mainArea}>
        <div
          style={styles.canvas}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {canvasElements.map((element, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: element.x,
                top: element.y,
                cursor: "move",
                zIndex: 100,
                backgroundColor: "white",
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, element)}
              onClick={(e) => handleElementClick(e, element)}
            >
              <Element
                {...element}
                onDragStart={(e) => handleDragStart(e, element)}
                onClick={(e) => handleElementClick(e, element)}
              />
            </div>
          ))}
          {selectedElement && (
            <>
              <div
                style={{
                  ...styles.connectingLine,
                  left: infoPosition.elementX,
                  top: infoPosition.elementY,
                  width: "100px",
                  height: "1px",
                  transform: "rotate(0deg)",
                }}
              />
              <div
                style={{
                  ...styles.elementInfo,
                  left: infoPosition.x,
                  top: infoPosition.y,
                }}
              >
                <div>{selectedElement.chineseName}</div>
                <div>{selectedElement.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {selectedElement.description}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
