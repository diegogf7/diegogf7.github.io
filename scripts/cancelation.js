import { findAll } from "highlight-words-core";

const textToHighlight = "This is some text to highlight.";
const searchWords = ["This", "i"];

const chunks = findAll({
  searchWords,
  textToHighlight
});

const highlightedText = chunks
  .map(chunk => {
    const { end, highlight, start } = chunk;
    const text = textToHighlight.substr(start, end - start);
    if (highlight) {
      return `<mark>${text}</mark>`;
    } else {
      return text;
    }
  })
