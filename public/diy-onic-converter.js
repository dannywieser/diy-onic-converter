
const diyOnicConverter = (textContentContainerSelector) => {
  const conversionTargetTag = "p"
  const container = document.querySelector(textContentContainerSelector);
  // TODO: iterate over array of candidate tags vs single
  const conversionElements =  container.getElementsByTagName(conversionTargetTag)
  console.log(`Performing bionic reading conversion on: ${textContentContainerSelector}, located ${conversionElements.length} elements to process`);
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
