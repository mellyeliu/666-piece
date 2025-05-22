import React, { useState, useEffect } from "react";
import Element from "./Element";
import Vignette from "./Vignette";
import Inventory from "./Inventory";
import ActivityLog from "./ActivityLog";
import Scroll from "./Scroll";
import ComboBox from "./ComboBox";
import CharacterBox from "./CharacterBox";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../styles/global.css";

// Style variables
const BORDER_STYLE = "1px solid #333";
const FONT_FAMILY = "'Noto Serif TC', serif";

const styles = {
  gameContainer: {
    display: "flex",
    height: "100vh",
    fontFamily: "var(--font-family)",
    justifyContent: "center",
    alignItems: "center",
    gap: "var(--window-gap)",
    backgroundImage: "url('/paper-light.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
    height: "calc(100vh - var(--spacing-md) * 2)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-secondary)",
    boxShadow: "var(--shadow-md)",
    borderRadius: "var(--border-radius)",
    border: "var(--border-double)",
    overflow: "hidden",
    paddingTop: 50,
  },
  storyContainer: {
    flex: 1,
    backgroundColor: "var(--bg-secondary)",
    padding: "var(--spacing-sm)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
    overflowY: "auto",
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
    border: "1px solid black",
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
  scrollHandle: {
    position: "absolute",
    top: "calc(50% - 300px)", // Move it higher above the scroll
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },
  handleLine: {
    width: "1px",
    height: "20px",
    backgroundColor: "#333",
    transform: "rotate(45deg)",
    margin: "0 -10px",
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
  const [gridElements, setGridElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
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

    const targetElement = gridElements.find((canvasEl) => {
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
        setGridElements((prev) =>
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
      setGridElements((prev) =>
        prev.map((el) => (el.id === droppedElement.id ? { ...el, x, y } : el))
      );
    } else {
      if (!gridElements.some((el) => el.id === droppedElement.id)) {
        setGridElements((prev) => [...prev, { ...droppedElement, x, y }]);
      }
    }
  };

  const handleElementMove = (e, element) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update element position
    setGridElements((prev) =>
      prev.map((el) => (el.id === element.id ? { ...el, x, y } : el))
    );
  };

  const handleElementClick = (e, element) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Calculate position relative to the viewport
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    // Calculate info box position based on window width
    const infoWidth = Math.min(200, windowWidth * 0.15); // 15% of window width, max 200px
    const infoX = Math.max(20, elementX - infoWidth - 150); // Slightly closer
    const infoY = elementY - 50;

    setSelectedElement(element);
    setInfoPosition({
      x: infoX,
      y: infoY,
      elementX,
      elementY,
      infoWidth,
      elementRect: rect, // Store the element's rect for resize calculations
    });
  };

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (selectedElement) {
        // Find the element in the DOM
        const element = document.querySelector(
          `[data-element-id="${selectedElement.id}"]`
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowWidth = window.innerWidth;

          // Calculate new positions
          const elementX = rect.left + rect.width / 2;
          const elementY = rect.top + rect.height / 2;
          const infoWidth = Math.min(200, windowWidth * 0.15);
          const infoX = Math.max(20, elementX - infoWidth - 150);
          const infoY = elementY - 50;

          // Update info position
          setInfoPosition((prev) => ({
            ...prev,
            x: infoX,
            y: infoY,
            elementX,
            elementY,
            infoWidth,
          }));
        }
      }
    };

    // Add resize observer to track element position changes
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (selectedElement) {
      const element = document.querySelector(
        `[data-element-id="${selectedElement.id}"]`
      );
      if (element) {
        resizeObserver.observe(element);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [selectedElement]);

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
    setGridElements((prev) => {
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
    const newSlots = [...gridElements];
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
        setGridElements([null, null]);
      } else {
        addActivityLog("No combination found between these elements");
      }
    }
  };

  const generateStoryDescription = (element) => {
    const stories = {
      steam: `In the ancient scrolls of alchemy, the meeting of fire and water was considered a sacred moment. When the fierce heat of fire (火) embraces the gentle flow of water (水), a new form emerges - steam (蒸汽). This ethereal substance, `,
      mud: `The earth (土) and water (水) dance together in an eternal embrace, creating mud (泥) - the primordial substance from which life springs forth. This humble mixture, often overlooked, holds within it the secrets of creation. `,
      dust: `When the wind (气) caresses the earth (土), it lifts tiny particles into the air, creating dust (灰尘). This seemingly insignificant phenomenon was considered by the ancients to be a metaphor for the cycle of life and death.`,
      lava: `The heart of the earth (土) meets the breath of fire (火), giving birth to lava (岩浆).  When the fierce heat of fire (火) embraces the gentle flow of water (水), a new form emerges `,
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
        chineseName: "蒸汽蒸汽",
        icon: "💨",
        description: "The result of heat meeting water",
      },
      "water-fire": {
        id: "steam",
        name: "Steam",
        chineseName: "蒸汽灰尘汽",
        icon: "💨",
        description: "The result of heat meeting water",
      },
      "water-earth": {
        id: "mud",
        name: "Mud",
        chineseName: "泥汽蒸泥",
        icon: "🌊",
        description: "The mixture of earth and water",
      },
      "earth-water": {
        id: "mud",
        name: "Mud",
        chineseName: "泥蒸泥",
        icon: "🌊",
        description: "The mixture of earth and water",
      },
      "earth-air": {
        id: "dust",
        name: "Dust",
        chineseName: "灰尘汽蒸汽",
        icon: "💨",
        description: "Air carrying earth particles",
      },
      "air-earth": {
        id: "dust",
        name: "Dust",
        chineseName: "灰尘蒸汽",
        icon: "💨",
        description: "Air carrying earth particles",
      },
      "fire-earth": {
        id: "lava",
        name: "Lava",
        chineseName: "岩尘汽汽浆",
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

  const handleWindowDrop = (e) => {
    // Remove the activity log position update since we don't need it anymore
  };

  const handleGridDrop = (e, x, y) => {
    e.preventDefault();
    const droppedElement = JSON.parse(e.dataTransfer.getData("text/plain"));
    const isMove = e.dataTransfer.getData("isMove") === "true";

    // Check for nearby elements to combine with
    const nearbyElements = gridElements.filter((element) => {
      const dx = element.x - x;
      const dy = element.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 60; // 60px threshold for combination
    });

    if (nearbyElements.length > 0) {
      const targetElement = nearbyElements[0];
      const newElement = combineElements(targetElement, droppedElement);

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
            `Created new element: ${newElement.name} (${newElement.chineseName}) from combining ${targetElement.name} and ${droppedElement.name}`
          );

          // Remove the combined elements
          setGridElements((prev) =>
            prev.filter(
              (el) => el.id !== targetElement.id && el.id !== droppedElement.id
            )
          );
        }
        return;
      }
    }

    // If no combination, add the element to the grid
    if (isMove) {
      setGridElements((prev) =>
        prev.map((el) => (el.id === droppedElement.id ? { ...el, x, y } : el))
      );
    } else {
      if (!gridElements.some((el) => el.id === droppedElement.id)) {
        setGridElements((prev) => [...prev, { ...droppedElement, x, y }]);
        addActivityLog(
          `Added ${droppedElement.name} (${droppedElement.chineseName}) to the grid`
        );
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={styles.gameContainer}
        onDragOver={handleDragOver}
        onDrop={handleWindowDrop}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-md)",
          }}
        >
          <Inventory
            elements={elements}
            discoveredElements={discoveredElements}
            onDragStart={handleDragStart}
            onElementClick={handleElementClick}
          />
          <ComboBox
            gridElements={gridElements}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onGridDrop={handleGridDrop}
          />
        </div>
        <Scroll entries={storyEntries} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-md)",
          }}
        >
          <ActivityLog entries={activityLog} />
          <CharacterBox />
        </div>
        {selectedElement && (
          <>
            <svg
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 998,
              }}
            >
              <line
                x1={infoPosition.elementX}
                y1={infoPosition.elementY}
                x2={infoPosition.x + infoPosition.infoWidth / 2 - 20}
                y2={infoPosition.y + infoPosition.infoWidth / 2 - 20}
                stroke="var(--border-color)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                position: "fixed",
                left: infoPosition.x,
                top: infoPosition.y,
                backgroundColor: "white",
                padding: "15px",
                border: "var(--border)",
                borderRadius: "4px",
                boxShadow: "var(--shadow-md)",
                zIndex: 999,
                width: infoPosition.infoWidth,
                height: infoPosition.infoWidth,
                fontFamily: "var(--font-family-mono)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setSelectedElement(null)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "4px",
                  lineHeight: "1",
                  color: "var(--text-secondary)",
                }}
              >
                ×
              </button>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                {selectedElement.icon}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-medium)",
                  marginBottom: "8px",
                }}
              >
                {selectedElement.name}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-medium)",
                  marginBottom: "8px",
                }}
              >
                {selectedElement.chineseName}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--text-secondary)",
                }}
              >
                {selectedElement.description}
              </div>
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default Game;
