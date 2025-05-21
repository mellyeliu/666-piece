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
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    borderRight: BORDER_STYLE,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  elementsContainer: {
    flex: 1,
    overflowY: "auto",
    border: BORDER_STYLE,
    padding: "10px",
    backgroundColor: "#fafafa",
  },
  comboBox: {
    height: "300px",
    border: BORDER_STYLE,
    padding: "10px",
    backgroundColor: "#fafafa",
  },
  mainArea: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  storyContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
    border: BORDER_STYLE,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  storyEntry: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    backgroundColor: "white",
    border: BORDER_STYLE,
    opacity: 0,
    animation: "fadeIn 1s ease-in forwards",
  },
  storyImage: {
    width: "400px",
    height: "400px",
    backgroundColor: "#eee",
    border: BORDER_STYLE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  storyText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  storyTitle: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  storyDescription: {
    fontSize: "20px",
    lineHeight: "1.6",
  },
  elementsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "10px",
  },
  comboGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    height: "100%",
  },
  comboSlot: {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityLog: {
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
    borderLeft: BORDER_STYLE,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
  },
  activityEntry: {
    padding: "10px",
    border: BORDER_STYLE,
    backgroundColor: "#fafafa",
    fontSize: "14px",
    opacity: 0,
    animation: "fadeIn 0.5s ease-in forwards",
  },
};

// Add keyframes for fade-in animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

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
    const savedElements = localStorage.getItem("discoveredElements");
    return savedElements ? JSON.parse(savedElements) : [];
  });
  const [canvasElements, setCanvasElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
  const [comboSlots, setComboSlots] = useState([null, null]);
  const [storyEntries, setStoryEntries] = useState(() => {
    const savedEntries = localStorage.getItem("storyEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [activityLog, setActivityLog] = useState(() => {
    const savedLog = localStorage.getItem("activityLog");
    return savedLog ? JSON.parse(savedLog) : [];
  });

  // Save discovered elements and story entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "discoveredElements",
      JSON.stringify(discoveredElements)
    );
  }, [discoveredElements]);

  useEffect(() => {
    localStorage.setItem("storyEntries", JSON.stringify(storyEntries));
  }, [storyEntries]);

  useEffect(() => {
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [activityLog]);

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

  const addActivityLog = (message) => {
    setActivityLog((prev) => [
      ...prev,
      {
        message,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleComboDrop = (e, slotIndex) => {
    e.preventDefault();
    const droppedElement = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Update the combo slot
    setComboSlots((prev) => {
      const newSlots = [...prev];
      newSlots[slotIndex] = droppedElement;
      return newSlots;
    });

    // Add to activity log
    addActivityLog(
      `Added ${droppedElement.name} (${droppedElement.chineseName}) to slot ${
        slotIndex + 1
      }`
    );

    // Check if we have both slots filled
    const newSlots = [...comboSlots];
    newSlots[slotIndex] = droppedElement;

    if (newSlots[0] && newSlots[1]) {
      const newElement = combineElements(newSlots[0], newSlots[1]);
      if (newElement) {
        // Add to discovered elements if not already there
        if (!discoveredElements.some((el) => el.id === newElement.id)) {
          setDiscoveredElements((prev) => [...prev, newElement]);

          // Add new story entry
          setStoryEntries((prev) => [
            ...prev,
            {
              title: newElement.name,
              chineseTitle: newElement.chineseName,
              description: generateStoryDescription(newElement),
              icon: newElement.icon,
            },
          ]);

          // Add to activity log
          addActivityLog(
            `Created new element: ${newElement.name} (${newElement.chineseName})`
          );
        }

        // Clear the combo slots
        setComboSlots([null, null]);
      } else {
        addActivityLog("No combination found between these elements");
      }
    }
  };

  const generateStoryDescription = (element) => {
    const stories = {
      steam: `In the ancient scrolls of alchemy, the meeting of fire and water was considered a sacred moment. When the fierce heat of fire (火) embraces the gentle flow of water (水), a new form emerges - steam (蒸汽). This ethereal substance, neither solid nor liquid, represents the perfect balance of opposing forces. The ancient masters wrote that steam carries with it the promise of transformation, a reminder that from the union of opposites comes new life.`,
      mud: `The earth (土) and water (水) dance together in an eternal embrace, creating mud (泥) - the primordial substance from which life springs forth. This humble mixture, often overlooked, holds within it the secrets of creation. The ancient texts speak of mud as the womb of the world, where the first seeds of life took root.`,
      dust: `When the wind (气) caresses the earth (土), it lifts tiny particles into the air, creating dust (灰尘). This seemingly insignificant phenomenon was considered by the ancients to be a metaphor for the cycle of life and death. Each particle of dust, they believed, carried the memory of the earth from which it came.`,
      lava: `The heart of the earth (土) meets the breath of fire (火), giving birth to lava (岩浆). This molten substance, flowing like water yet burning like fire, represents the raw power of creation. The ancient scrolls tell of how lava shapes the world, creating new lands and destroying old ones in an endless cycle of transformation.`,
    };
    return stories[element.id] || element.description;
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
                  onDragStart={handleDragStart}
                  onClick={(e) => handleElementClick(e, element)}
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
                onDragOver={handleDragOver}
                onDrop={(e) => handleComboDrop(e, index)}
              >
                {comboSlots[index] ? (
                  <Element
                    {...comboSlots[index]}
                    onDragStart={handleDragStart}
                  />
                ) : (
                  `Drop element ${index + 1} here`
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.mainArea}>
        <div style={styles.storyContainer}>
          {storyEntries.map((entry, index) => (
            <div key={index} style={styles.storyEntry}>
              <div style={styles.storyImage}>{entry.icon}</div>
              <div style={styles.storyText}>
                <div style={styles.storyTitle}>
                  {entry.chineseTitle} - {entry.title}
                </div>
                <div style={styles.storyDescription}>{entry.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.activityLog}>
        {activityLog.map((entry, index) => (
          <div key={index} style={styles.activityEntry}>
            <div style={{ color: "#666", fontSize: "12px" }}>
              {entry.timestamp}
            </div>
            <div>{entry.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
