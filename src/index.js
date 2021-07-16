import './style.css';

let test = {
  started: false,
  text: {
    full: "",
    spaceSeperated: []
  },
  input: {
    full: "",
    spaceSeperated: []
  },
  time: {
    totalTime: 60,
    timeElapsed: 0,
    timer: null
  },
  data: {
    WPM: 0,
    incorrectWords: 0,
    adjustedWPM: 0,
    text: []
  }
};

//functions
const setupTestText = () => {
  let text =
    "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.";
  return text;
};
const setupTestTime = () => {
  return document.querySelector("#time-input").value * 60;
};
const setupTextData = (spaceSeperatedText) => {
  return spaceSeperatedText.map((word) => ({
    word: word,
    spelling: undefined,
    status: undefined
  }));
};
const renderTestText = () => {
  const textContainerElement = document.querySelector("#text-container");
  let result = "";
  test.data.text.forEach((word) => {
    result += `<span style="color: ${
      word.status === "incorrect"
        ? "#F25F5C"
        : word.status === "correct"
        ? "#2FBF71"
        : word.status === "current"
        ? "blue"
        : "black"
    }">${word.word}</span><span> </span>`;
  });
  textContainerElement.innerHTML = result;
};
const renderTimeLeft = (time) => {
  const timeLeftContainer = document.querySelector("#time-left")
  timeLeftContainer.textContent = `Time Left: ${time} seconds`
}
const renderResults = () => {
  document.querySelector("#WPM").textContent = test.data.WPM
  document.querySelector("#incorrect-words").textContent = test.data.incorrectWords
  document.querySelector("#adjusted-WPM").textContent = test.data.adjustedWPM
}

//
const getTestResults = () => {
  const incorrectWords = test.data.text.reduce((acc, curr) => (curr.status === "incorrect" ? acc + 1 : acc), 0)
  test.data = {
    ...test.data,
    WPM: (test.input.full.length / 5) / (test.time.totalTime / 60),
    incorrectWords: incorrectWords,
    adjustedWPM: ((test.input.full.length / 5) - incorrectWords) / (test.time.totalTime / 60),
  }
};

//Test Functions
const initializeTest = () => {
  console.log("test started");
  resetTest();
  //Render the test text
  renderTestText();
  //Initialize timer
  test.time.timer = setInterval(() => {
    //
    getTestResults();
    //Render change in the amount of time left
    renderTimeLeft(test.time.totalTime - test.time.timeElapsed)
    console.log(test.data.WPM)
    //Check if time limit has been reached
    if (test.time.timeElapsed === test.time.totalTime || test.started === false) {
      endTest();
      clearInterval(test.time.timer);
      test.time.timer = 0;
      return;
    }
    test.time.timeElapsed++;
  }, 1000);
};

const endTest = () => {
  console.log("test ended");
  //Set Properties of test object
  test.started = false;
  test.time.timeElapsed = test.time.totalTime
  //render results
  renderResults();

  document.querySelector("#text-input").disabled = true;
  //Reverse Buttons
  document.querySelector("#start-button").classList.remove("hidden")
  document.querySelector("#cancel-button").classList.add("hidden")
  //Reverse results
  document.querySelector("#results").classList.remove("hidden")
};

const resetTest = () => {
  test.started = true;
  test.results = {};
  //Reset Text Value
  test.text.full = setupTestText();
  test.text.spaceSeperated = test.text.full.split(" ");
  //Reset Input Value
  test.input.full = "";
  test.input.spaceSeperated = [];
  document.querySelector("#text-input").value = "";
  //Reset Time Values
  test.time.totalTime = setupTestTime();
  test.time.timeElapsed = 0;
  //Reset data
  test.data.text = setupTextData(test.text.spaceSeperated);
  //reset DOM elements
  document.querySelector("#text-container").textContent = "";
  document.querySelector("#text-input").disabled = false;
  //Reverse Buttons
  document.querySelector("#start-button").classList.add("hidden")
  document.querySelector("#cancel-button").classList.remove("hidden")
  //Results
  document.querySelector("#results").classList.add("hidden")
};

//text-input Event Handlers
const textInputElement = document.querySelector("#text-input");
textInputElement.addEventListener("paste", (Event) => {
  Event.preventDefault();
});

textInputElement.addEventListener("keyup", (Event) => {
  //
  if (!test.started) return null;
  //Set Input Values
  test.input.full = Event.target.value;
  test.input.spaceSeperated = test.input.full.split(" ");
  //Check space seperated input value against space seperated text
  test.text.spaceSeperated.forEach((word, wordIdx) => {
    const currentWordIdx = test.input.spaceSeperated.length - 1;
    if (wordIdx === currentWordIdx) {
      //If its the current word (the word where the user input is up to)
      test.data.text[wordIdx] = {
        ...test.data.text[wordIdx],
        spelling: test.input.spaceSeperated[wordIdx],
        status: "current"
      };
    } else if (
      word !== test.input.spaceSeperated[wordIdx] &&
      test.input.spaceSeperated[wordIdx]
    ) {
      //If it is an incorrect word
      test.data.text[wordIdx] = {
        ...test.data.text[wordIdx],
        spelling: test.input.spaceSeperated[wordIdx],
        status: "incorrect"
      };
    } else if (word === test.input.spaceSeperated[wordIdx]) {
      //If it is a correct word
      test.data.text[wordIdx] = {
        ...test.data.text[wordIdx],
        spelling: test.input.spaceSeperated[wordIdx],
        status: "correct"
      };
    } else {
      test.data.text[wordIdx] = {
        ...test.data.text[wordIdx],
        spelling: undefined,
        status: undefined
      };
    }
  });
  renderTestText();
});

//start Button Event Handlers
document.querySelector("#start-button").addEventListener("click", (Event) => {
  initializeTest();
});

document.querySelector("#cancel-button").addEventListener("click", (Event) => {
  endTest();
});

document.querySelector("#text-input").addEventListener("change", (Event) => {
  renderTimeLeft(Event.target.value * 60)
})