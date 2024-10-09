// configuration
const conversionTargetTags = ["p", "small"];
const boldNode = "b";
const onicChars = 3;

// CSS Styles
// Super hacky take on css-in-js 
// The trouble with adding these into an external CSS file is how to load that file when the script is run in the console.
const containerStyles = [
  "background-color:rgba(28, 28, 30, 0.1)",
  "display:flex",
  "flex-direction:column",
  "justify-content:center",
]

const divStyles = [
  "font-size:18px",
  "text-align: center",
  "max-width: 60%",
  "margin: auto",
  "line-height: 165%",
]

const getContainerStyles = () => containerStyles.join(";")
const getDivStyles = () => divStyles.join(";")

const gatherElementsToProcess = (targetContainer) => {
  const elementsToProcess = []
  // TODO: I'd love to have this be a .map, but can't figure out the syntax :)
  conversionTargetTags.forEach((tagName) => elementsToProcess.push(...targetContainer.getElementsByTagName(tagName)))
  return elementsToProcess;
}


/**
 * Given a word, split the word for onic processing
 * @param {string} word 
 * @returns 
 */
const splitWordForOnic = (word) => 
 [ word.substring(0, onicChars), word.substring(onicChars)];


/**
 * Given a segment of a word, create a b element to draw attention to these characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
 * @param {string} onicWordSegment 
 * @returns HTMLElement of type "b"
 */
const onicifyChars = (onicWordSegment) => {
  const onicNode = document.createElement(boldNode);
  const onicText = document.createTextNode(onicWordSegment);
  onicNode.appendChild(onicText);
  return onicNode;
}

/**
 * Given some text, create an HTML text node allowing that text to be appended to the DOM
 * @param {*} word 
 * @param options: addSpacing: true will add a trailing space to the word
 * @returns HTML Text Node
 */
const createTextNode = (text, { addSpacing = false}) => {
  const spacing = addSpacing ? ' ' : ''
  return document.createTextNode(`${text}${spacing}`);
}

/**
 * Given an HTML element:
 *   - extract the raw inner text with no tags
 *   - split apart the words in the text
 *   - apply a bold style to the defined number of characters in each word
 *  
 * @param element 
 */
const elementOnicConverter = (element) => {
  const textArr = element.innerText.split(' ');

  // create a replacement element to 
  const updatedElement = document.createElement("p")
  textArr.map((word) => {
    const splitWord = splitWordForOnic(word)

    // Create the onic text node as bold and append to the new replacement element
    updatedElement.appendChild(onicifyChars(splitWord[0]));
    // append the rest of the word, with the spacing restored
    updatedElement.appendChild(createTextNode(splitWord[1], { addSpacing: true}))
  });

  return updatedElement;
}

const diyOnicConverter = (textContentContainerSelector = 'body') => {
  const container = document.querySelector(textContentContainerSelector);
  const conversionElements =  gatherElementsToProcess(container)

  console.log(`Performing bionic reading conversion on: ${textContentContainerSelector}, located ${conversionElements.length} elements to process`);

  // onic-ified text will be placed in a parent div for styling
  const div = document.createElement('div');
  div.setAttribute("style",getDivStyles());

  // create onic-ified versions of every candidate element
  // TODO: order of elements is not being respected!
  for (element of conversionElements) {
    div.appendChild(elementOnicConverter(element));
  }

  container.replaceChildren(div);
  container.setAttribute("style", getContainerStyles());
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
