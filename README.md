# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

Start by reading the challenge instructions in [INTERVIEW.md](./INTERVIEW.md). When you are finished, you can edit this file to include any documentation for your work.

_or…_

**Sta**rt **b**y **read**ing **th**e **challen**ge **instructio**ns **i**n **[INTERVIEW.](./INTERVIEW.md)**[md](./INTERVIEW.md). **Whe**n **yo**u **ar**e **finish**ed, **yo**u **ca**n **edi**t **thi**s **fil**e **t**o **inclu**de **an**y **documentat**ion **fo**r **you**r **wor**k.

## How it Works

This application provides a function that can be invoked in the browser developer tools. It will accept a CSS selector and process any text in `p` and `small` elements that are children of that element - and present that text in an easier to read, distraction free Bionic Reader mode.

Note that the entire document is replaced to improve your reading experience. If you want to return to the original document, just refresh the browser page.

## Usage Notes

* Load a page with text in your browser
* Copy and paste the entire contents of the `./public/diy-onic-converter.js` into the console.
* Run the script:
```
diyOnicConverter();
```
By default, the conversion will happen on the entire `body` element, but you can choose to target a specific element based on any selector.

For example: `diyOnicConverter('#some-specific-section');`

### BETA: Real world sites
This script provides limited support for loading real-world sites, with the primary caveat being that it is up to the user to determine the parent element containing the text content to be converted.

For example, on this news article:

https://www.cbc.ca/news/world/florida-milton-landfall-preps-1.7346974

The content is contained in an element with the class `.story`, so running the function with `diyOnicConverter('.story')` will correctly render the article in Bionic reading mode.

Future updates will include the ability to dynamically detect the text within any structure of document.

## Feature Backlog

The following features did not make it into V1 of this (awesome!) application, but are next up in our feature backlog:
* Supporting anchor tags in the Bionic Reader Text
* Broader support for a wider range of text in documents
* Improve handling of special characters
  * Brackets "(" at the start of a word should not be bolded
  * Numbers starting a word should not be bolded
* Support Images inline in the document

