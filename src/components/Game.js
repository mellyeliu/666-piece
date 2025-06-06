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
    backgroundImage: "url('/haze2.png')",
    backgroundSize: "120% 120%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    animation: "floatBackground 80s ease-in-out infinite",
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

  @keyframes floatBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(styleSheet);

const initialElements = [
  {
    id: "east666",
    name: "East",
    chineseName: "东",
    icon: "🌅",
    image: "dragon1",
    description: "The eastern heritage and traditions",
  },
  {
    id: "west666",
    name: "West",
    chineseName: "西",
    icon: "🌇",
    image: "dragon2",
    description: "The western culture and opportunities",
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
    const parsedLog = savedLog ? JSON.parse(savedLog) : [];

    if (parsedLog.length === 0) {
      return [
        {
          message:
            "Welcome to 水彩 Storybook! You can start by dragging the elements onto the canvas.",
          timestamp: "12:00:00 AM",
        },
      ];
    }

    return parsedLog;
  });

  console.log(activityLog);
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

    console.log("Combo drop:", { droppedElement, slotIndex });

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
      console.log("Attempting combo box combination:", newSlots);
      const newElement = combineElements(newSlots[0], newSlots[1]);

      if (newElement) {
        console.log("Combo box combination successful:", newElement);
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
              imageKey: newElement.image,
            },
          ]);

          // Add to activity log
          addActivityLog(
            `Created new element: ${newElement.name} (${newElement.chineseName}) from combining ${newSlots[0].name} and ${newSlots[1].name}`
          );
        }

        // Clear the combo slots
        setGridElements([null, null]);
      } else {
        console.log("No valid combo box combination found");
        addActivityLog("No combination found between these elements");
      }
    }
  };

  const generateStoryDescription = (element) => {
    const stories = {
      identity: `The journey of finding oneself between two cultures is never easy. When roots (根) meet language (语), a new identity (身份) emerges - one that must navigate the delicate balance between honoring tradition and embracing change.`,
      tradition: `The roots (根) of family history intertwine with memories (忆) of the past, creating traditions (传统) that serve as anchors in a sea of change. These customs become the threads that connect generations across oceans and time.`,
      ambition: `When dreams (梦) take root (根) in fertile soil, ambition (抱负) grows. It's the drive to succeed not just for oneself, but for the family that sacrificed so much to make these dreams possible.`,
      stories: `Language (语) carries memories (忆) like vessels across time, transforming them into stories (故事) that bridge the gap between generations. These tales become the currency of cultural exchange.`,
      opportunity: `The language (语) of dreams (梦) speaks of opportunity (机会) - the chance to build a better life while honoring the sacrifices of those who came before.`,
      legacy: `Memories (忆) and dreams (梦) combine to create a legacy (传承) - the responsibility to honor the past while building a future that bridges two worlds.`,
      belonging: `Identity (身份) and tradition (传统) merge to create a sense of belonging (归属) - the feeling of being at home in both cultures, yet uniquely positioned between them.`,
      success: `Ambition (抱负) meets opportunity (机会) to create success (成功) - not just in material terms, but in the fulfillment of the immigrant dream through perseverance and hard work.`,
      wisdom: `Stories (故事) and legacy (传承) combine to form wisdom (智慧) - the understanding that comes from learning from both cultures and finding value in each.`,
      harmony: `Belonging (归属) and success (成功) together create harmony (和谐) - the delicate balance between preserving cultural heritage and embracing new opportunities.`,
      enlightenment: `Wisdom (智慧) and harmony (和谐) culminate in enlightenment (觉悟) - the profound understanding that comes from fully embracing the richness of both cultures.`,
    };
    return stories[element.id] || element.description;
  };

  const combineElements = (element1, element2) => {
    // Make sure we have valid elements
    if (!element1 || !element2) {
      console.error("Invalid elements:", { element1, element2 });
      return null;
    }

    // Get the IDs
    const id1 = element1.id || element1;
    const id2 = element2.id || element2;

    // Create both possible combination keys
    const combinationKey1 = `${id1}-${id2}`;
    const combinationKey2 = `${id2}-${id1}`;

    console.log("Combining elements:", {
      element1: id1,
      element2: id2,
      combinationKey1,
      combinationKey2,
    });

    const combinations = {
      "east666-west666": {
        id: "melissa",
        name: "Melly",
        chineseName: "思源",
        icon: "��",
        image: "scroll",
        description:
          "I grew up in a town called Markham, Ontario. My parents were studying in Canada when they were granted asylum visas due to 天安门广场 in 1989.",
      },
      "internet-east666": {
        id: "internet-east",
        name: "Taobao",
        chineseName: "东方网络",
        icon: "🌐",
        image: "scroll",
        description:
          "A partner of mine introduced me to fashion replicas, purchased through Taobao.",
      },
      "internet-west666": {
        id: "internet-west",
        name: "Neopets",
        chineseName: "西方网络",
        icon: "🌐",
        image: "scroll",
        description:
          "My dad used to help me cheat on Maths Nightmares. My life goal at the time to make it on the leaderboard.",
      },
      "school-east666": {
        id: "school-east",
        name: "Abacus",
        chineseName: "东方学校",
        icon: "🏫",
        image: "scroll",
        description:
          "My grandma would write out the answers to my abacus sums and hide it from my mom so I'd have more time to play outside.",
      },
      "school-west666": {
        id: "school-west",
        name: "Catholic School",
        chineseName: "西方学校",
        icon: "🏫",
        image: "scroll",
        description:
          "Back then, only public Catholic schools had Kindergarten. My parents tried to convert, but my mom kept falling asleep during Bible class.",
      },
      "food-east666": {
        id: "hotpot",
        name: "Hotpot",
        chineseName: "火锅",
        icon: "🍲",
        image: "scroll",
        description:
          "Gathering around a bubbling pot of soup, sharing stories and dipping fresh ingredients into the communal broth.",
      },
      "food-west666": {
        id: "mcdonalds",
        name: "McDonald's",
        chineseName: "麦当劳",
        icon: "🍔",
        image: "scroll",
        description:
          "The golden arches became a symbol of western culture, where we'd celebrate small victories with Happy Meals.",
      },
      "mom-school": {
        id: "gifted",
        name: "Gifted",
        chineseName: "天才",
        icon: "🎯",
        image: "scroll",
        description:
          "My mom trained me for the gifted screening, making me practice pattern recognition and spatial reasoning tests every day after school.",
      },
    };

    // Try both possible combination keys
    const result =
      combinations[combinationKey1] || combinations[combinationKey2];
    console.log("Combination result:", result);
    return result || null;
  };

  const handleWindowDrop = (e) => {
    // Remove the activity log position update since we don't need it anymore
  };

  const handleGridDrop = (e, x, y) => {
    e.preventDefault();
    const droppedElement = JSON.parse(e.dataTransfer.getData("text/plain"));
    const isMove = e.dataTransfer.getData("isMove") === "true";

    console.log("Grid drop:", { droppedElement, x, y, isMove });

    // Check for nearby elements to combine with
    const nearbyElements = gridElements.filter((element) => {
      const dx = element.x - x;
      const dy = element.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 60; // 60px threshold for combination
    });

    console.log("Nearby elements:", nearbyElements);

    if (nearbyElements.length > 0) {
      const targetElement = nearbyElements[0];
      console.log("Attempting combination:", { targetElement, droppedElement });
      const newElement = combineElements(targetElement, droppedElement);

      if (newElement) {
        console.log("Combination successful:", newElement);
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
              imageKey: newElement.image,
            },
          ]);

          // Add to activity log
          addActivityLog(
            `Created new element: ${newElement.name} (${newElement.chineseName}) from combining ${targetElement.name} and ${droppedElement.name}`
          );

          // Remove the combined elements and add the new one
          setGridElements((prev) => {
            const filtered = prev.filter(
              (el) => el.id !== targetElement.id && el.id !== droppedElement.id
            );
            return [...filtered, { ...newElement, x, y }];
          });
        }
        return;
      } else {
        console.log("No valid combination found");
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

  const handleDiscoverElement = (newElement) => {
    console.log("handleDiscoverElement called with:", newElement);

    // Add to both elements and discoveredElements if not already there
    if (!elements.some((el) => el.id === newElement.id)) {
      console.log("Adding new element to elements");
      setElements((prev) => [...prev, newElement]);
    }

    if (!discoveredElements.some((el) => el.id === newElement.id)) {
      console.log("Adding new element to discoveredElements");
      setDiscoveredElements((prev) => [...prev, newElement]);

      // Only create story entries for elements that should have vignettes
      const shouldCreateVignette = [
        "internet-east",
        "internet-west",
        "school-east",
        "school-west",
        "dad",
        "grandma",
        "mom",
        "bullying",
        "hotpot",
        "mcdonalds",
      ].includes(newElement.id);

      if (shouldCreateVignette) {
        console.log("Creating vignette for element:", newElement.id);
        setStoryEntries((prev) => [
          ...prev,
          {
            title: newElement.name,
            chineseTitle: newElement.chineseName,
            description: newElement.description,
            icon: newElement.icon,
            imageKey: newElement.image,
          },
        ]);
      }

      // Add to activity log
      addActivityLog(
        `Discovered new element: ${newElement.name} (${newElement.chineseName})`
      );
    } else {
      console.log("Element already discovered:", newElement.id);
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
            onComboDrop={handleComboDrop}
          />
        </div>
        <Scroll
          entries={storyEntries}
          onDiscoverElement={handleDiscoverElement}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-md)",
          }}
        >
          <ActivityLog entries={activityLog} />
          <CharacterBox
            discoveredElements={discoveredElements}
            storyEntries={storyEntries}
          />
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
