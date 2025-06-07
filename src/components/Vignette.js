import React, { useState } from "react";

const styles = {
  storyEntry: {
    padding: "20px",
    backgroundImage: "url('/paper-light.png')",
    // background: "white",
    opacity: 0,
    animation: "fadeIn 1s ease-in forwards",
    position: "relative",
    width: "calc(100% - 40px)",
    height: "95%",
  },
  storyImage: (title) => ({
    // width: "50vh",
    height: "100%",
    backgroundImage: `url('scroll/${title.toLowerCase()}.png')`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    cursor: "pointer",
    // marginTop: "20vh",
    // marginLeft: "-5vh",
  }),
  storyText: {
    position: "absolute",
    right: "20px",
    top: "20px",
  },
  storyTextLeft: {
    right: "auto",
    left: "20px",
  },
  storyTitle: {
    fontSize: "50px",
    fontWeight: "bold",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    padding: "var(--spacing-sm)",
    // color: "transparent",
    // WebkitTextStroke: "0.001px black",
    fontFamily: "var(--font-family-handwriting)",
  },
  storyDescription: {
    fontSize: "var(--font-size-small)",
    lineHeight: "var(--line-height)",
    fontFamily: "var(--font-family-mono)",
    padding: "var(--spacing-sm)",
    background: "#fefefe",

    // backgroundColor: "white",
    position: "absolute",
    right: "20px",
    bottom: "20px",
    width: "25vh",
    border: "var(--border)",
    maxHeight: "120px",
    overflowY: "auto",
  },
  storyDescriptionLeft: {
    right: "auto",
    left: "20px",
  },
  cursor: {
    display: "inline-block",
    width: "2px",
    height: "1em",
    backgroundColor: "black",
    marginLeft: "2px",
    animation: "blink 1s step-end infinite",
  },
  clickableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    opacity: 0,
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.2,
    },
  },
};

// Add cursor blink animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

const Vignette = ({
  title,
  chineseTitle,
  description,
  index = 0,
  onDiscoverElement,
}) => {
  const [clickedElements, setClickedElements] = useState([]);
  const isEven = index % 2 === 0;

  const storyTextStyle = {
    ...styles.storyText,
    ...(isEven ? styles.storyTextLeft : {}),
  };

  const storyDescriptionStyle = {
    ...styles.storyDescription,
    ...(isEven ? styles.storyDescriptionLeft : {}),
  };

  const getNewElement = (title, clickCount) => {
    const elements = {
      melly: [
        {
          id: "internet",
          name: "Internet",
          chineseName: "网络",
          icon: "🌐",
          image: "scroll",
          description: "The digital bridge between cultures",
        },
        {
          id: "school",
          name: "School",
          chineseName: "学校",
          icon: "🏫",
          image: "scroll",
          description: "The place of learning and growth",
        },
      ],
      gender: [
        {
          id: "gender",
          name: "Gender",
          chineseName: "性别",
          icon: "⚧",
          image: "scroll",
          description:
            "My parents always struggled with using the correct pronouns in English. 他, 她, 它. It was all the same to them",
        },
      ],
      internet: [
        {
          id: "internet",
          name: "Internet",
          chineseName: "网络",
          icon: "🌐",
          image: "scroll",
          description: "The digital bridge between cultures",
        },
      ],
      school: [
        {
          id: "school",
          name: "School",
          chineseName: "学校",
          icon: "🏫",
          image: "scroll",
          description: "The place of learning and growth",
        },
      ],
      mom: [
        {
          id: "mom",
          name: "Mom",
          chineseName: "妈妈",
          icon: "👩",
          image: "scroll",
          description:
            "My mom was a pharmaceutical chemist. Intense and driven, soft and careless. She had a 10 year monotropic obsession with Steve Jobs.",
        },
      ],
      grandma: [
        {
          id: "grandma",
          name: "Grandma",
          chineseName: "奶奶",
          icon: "👵",
          image: "scroll",
          description:
            "My grandma was bubbly and fun. The president of a congregation of all the Asian grannies in our neighbourhood. She made the best 饅頭.",
        },
      ],
      bullying: [
        {
          id: "bullying",
          name: "Bullying",
          chineseName: "霸凌",
          icon: "😢",
          image: "scroll",
          description:
            "I was a problem child. Small and awkward, I was bullied relentlessly. In Asian suburbia. I couldn't even write it off as racist.",
        },
      ],
      food: [
        {
          id: "food",
          name: "Food",
          chineseName: "食物",
          icon: "🍳",
          image: "scroll",
          description:
            "My grandma was bubbly and fun and cooked my favourite food. The president of a congregation of all the Asian grannies in our neighbourhood. She made the best 饅頭.",
        },
      ],
      dad: [
        {
          id: "dad",
          name: "Dad",
          chineseName: "爸爸",
          icon: "👨",
          image: "scroll",
          description:
            "He was a computer engineer. He was always in his room, reading light novels or eating sunflower seeds. I learned chess, bike riding.",
        },
      ],
      markham: [
        {
          id: "markham",
          name: "Markham",
          chineseName: "万锦",
          icon: "🏘️",
          image: "scroll",
          description:
            "Markham was a picture of Asian suburbia. Good food, good education. My school was a 5 minute walk from our house.",
        },
      ],
      catholic: [
        {
          id: "catholic",
          name: "Catholic",
          chineseName: "天主教",
          icon: "⛪",
          image: "scroll",
          description:
            "I didn't know what to make of Catholicism. Every open door led to more questions on faith, gender, family, sexuality.",
        },
        {
          id: "family",
          name: "Family",
          chineseName: "家庭",
          icon: "👨‍👩‍👧‍👦",
          image: "scroll",
          description: "The traditional family structure and its evolution.",
        },
      ],
      // "gender-east": [
      //   {
      //     id: "gender-east",
      //     name: "Traditional Roles",
      //     chineseName: "传统角色",
      //     icon: "👘",
      //     image: "scroll",
      //     description:
      //       "The traditional gender roles and expectations in Eastern culture.",
      //   },
      // ],
      // "gender-west": [
      //   {
      //     id: "gender-west",
      //     name: "Modern Identity",
      //     chineseName: "现代身份",
      //     icon: "🌈",
      //     image: "scroll",
      //     description:
      //       "The modern understanding and expression of gender identity in Western culture.",
      //   },
      // ],
      "family-east": [
        {
          id: "family-east",
          name: "Extended Family",
          chineseName: "大家庭",
          icon: "🏮",
          image: "scroll",
          description:
            "The importance of extended family and community in Eastern culture.",
        },
      ],
      "family-west": [
        {
          id: "family-west",
          name: "Nuclear Family",
          chineseName: "核心家庭",
          icon: "🏠",
          image: "scroll",
          description:
            "For a while I loved the idea of individualism. I wanted differentiation. But somewhere behind my actualization was a profound loneliness.",
        },
      ],
      "internet-east": [
        {
          id: "online_community",
          name: "Online Community",
          chineseName: "网络社区",
          icon: "👥",
          image: "scroll",
          description: "Finding connection in digital spaces",
        },
      ],
      "internet-west": [
        {
          id: "dad",
          name: "Dad",
          chineseName: "爸爸",
          icon: "👨",
          image: "scroll",
          description:
            "He was a computer engineer. He was always in his room, reading light novels or eating sunflower seeds. I learned chess, bike riding.",
        },
      ],
      "school-east": [
        {
          id: "grandma",
          name: "Grandma",
          chineseName: "奶奶",
          icon: "👵",
          image: "scroll",
          description:
            "My grandma would write out the answers to my abacus sums and hide it from my mom so I'd have more time to play outside.",
        },
      ],
      "school-west": [
        {
          id: "new_opportunities",
          name: "New Opportunities",
          chineseName: "新机会",
          icon: "✨",
          image: "scroll",
          description: "Opening doors to future possibilities",
        },
      ],
      neopets: [
        {
          id: "dad",
          name: "Dad",
          chineseName: "爸爸",
          icon: "👨",
          image: "scroll",
          description:
            "He was a computer engineer. He was always in his room, reading light novels or eating sunflower seeds. I learned chess, bike riding.",
        },
      ],
      abacus: [
        {
          id: "grandma",
          name: "Grandma",
          chineseName: "奶奶",
          icon: "👵",
          image: "scroll",
          description:
            "My grandma was bubbly and fun. The president of a congregation of all the Asian grannies in our neighbourhood. She made the best 饅頭.",
        },
      ],
      "catholic school": [
        {
          id: "mom",
          name: "Mom",
          chineseName: "妈妈",
          icon: "👩",
          image: "scroll",
          description:
            "My mom tried to convert to Catholicism but kept falling asleep during Bible class.",
        },
        {
          id: "bullying",
          name: "Bullying",
          chineseName: "霸凌",
          icon: "😢",
          image: "scroll",
          description:
            "The challenges of being different in a Catholic school environment.",
        },
      ],
      "food-east": [
        {
          id: "hotpot",
          name: "Hotpot",
          chineseName: "火锅",
          icon: "🍲",
          image: "scroll",
          description:
            "Gathering around a bubbling pot of soup, sharing stories and dipping fresh ingredients into the communal broth.",
        },
      ],
      "food-west": [
        {
          id: "mcdonalds",
          name: "McDonald's",
          chineseName: "麦当劳",
          icon: "🍔",
          image: "scroll",
          description:
            "My sister and I would get so excited when my Grandma would take us to McDonalds.",
        },
      ],
    };

    console.log("Looking for elements with title:", title);

    // Convert title to lowercase for case-insensitive comparison
    const titleKey = title.toLowerCase();
    const availableElements = elements[titleKey] || [];

    if (clickCount < availableElements.length) {
      return availableElements[clickCount];
    }
    return null;
  };

  const handleWordClick = (word) => {
    console.log("Word clicked:", word);
    const newElement = getNewElement(word, 0); // Always get the first element for the word
    console.log("New element from getNewElement:", newElement);

    if (newElement) {
      console.log("Creating new element:", newElement);
      if (typeof onDiscoverElement === "function") {
        onDiscoverElement(newElement);
        setClickedElements((prev) => [...prev, newElement.id]);
        console.log("Element created and added to clicked elements");
      } else {
        console.error(
          "onDiscoverElement is not a function:",
          onDiscoverElement
        );
      }
    } else {
      console.log("No more elements to discover for this word");
    }
  };

  const renderClickableDescription = () => {
    const words = description.split(" ");
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase().replace(/[.,!?]/g, "");
      if (
        [
          "dad",
          "grandma",
          "mom",
          "bullying",
          "food",
          "internet",
          "school",
          "catholic",
          "markham",
          "gender",
          "family",
        ].includes(lowerWord)
      ) {
        return (
          <span
            key={index}
            onClick={() => handleWordClick(lowerWord)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div style={styles.storyEntry}>
      <div style={styles.storyImage(title)} />
      <div style={storyDescriptionStyle}>{renderClickableDescription()}</div>
      <div style={storyTextStyle}>
        <div style={styles.storyTitle}>{chineseTitle}</div>
      </div>
    </div>
  );
};

export default Vignette;
