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

/**
 * Given an HTML Element, determine if that element should be processed based on the defined configuration
 * @param {HTMLElement} element 
 * @returns boolean - should the element be processed for text 
 */
const shouldElementBeProcessed = (element) => conversionTargetTags.includes(element.tagName.toLowerCase())

/**
 * Given a word, split the word for onic processing
 * @param {string} word 
 * @returns 
 */
const splitWordForOnic = (word) => 
 [ word.substring(0, onicChars), word.substring(onicChars)];

/**
 * This function will return the header text for the current document.
 * The preferred source of this text is the `h1` of the page (ideally there should only be one!)
 * If an h1 is not available, the title of the document is used
 * @returns An H1 element with the document header
 */
const createDocumentHeader = () => {
  const originalH1 = document.getElementsByTagName("h1");
  const headerText = originalH1[0] ? originalH1[0].innerText : document.title;
  const onicH1 = document.createElement("h1")
  const onicH1Text = document.createTextNode(headerText);
  onicH1.appendChild(onicH1Text);
  return onicH1;
};

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

/**
 * Given a CSS Selector, this function will replace the contents of the target page with 
 * a Bionic Reader version of the text contained in the specified element.
 * 
 * @param {*} textContentContainerSelector 
 */
const diyOnicConverter = (textContentContainerSelector = 'body') => {
  const container = document.querySelector(textContentContainerSelector);
  const body = textContentContainerSelector === 'body' ? container : document.querySelector('body')

  if (container === null) {
    console.error(`Invalid selector, no element matching ${textContentContainerSelector} located`);
    return;
  }

  if (container.children.length === 0) {
    console.error(`Target element is empty, cannot process`);
    return;
  }

  console.log(`Performing bionic reading conversion on: ${textContentContainerSelector}`);

  // onic-ified text will be placed in a parent div for styling
  const div = document.createElement('div');
  div.setAttribute("style",getDivStyles());
  // set header for the document
  div.appendChild(createDocumentHeader())

  // create onic-ified versions of every child element that is eligible
  let matchedElements = 0;
  for (element of container.children) {
    if (shouldElementBeProcessed(element)) {
      div.appendChild(elementOnicConverter(element));
      matchedElements++;
    }
  }

  // if we don't find any matching elements for the conversion, leave the document as is
  if (matchedElements > 0) {
    body.replaceChildren(div);
    container.setAttribute("style", getContainerStyles());
  } else {
    console.error(`No eligible elements located as children of selector "${textContentContainerSelector}". Provided selector must contain children of any of the following types: ${conversionTargetTags.join(",")}`)
  }
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
