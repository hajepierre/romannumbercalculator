const { romanToArab, arabToRoman, isValidRoman } = require("roman-numbers");

const math = require("mathjs");

const specialCharacters = [
  "(",
  ")",
  "^",
  "/",
  "*",
  "+",
  "-",
  "{",
  "}",
  "[",
  "]",
  "."
];

const getContainedSpecialCharacters = text => {
  const result = [];
  for (let c of specialCharacters) {
    if (text.includes(c)) {
      result.push(c);
    }
  }
  return result;
};

/**
 * In the opposition of split function which removes the target symbol from the array,
 * this method will split the string but will keep the target symbol as part of the resulting array
 *
 * @param {*} text
 * @param {*} target
 */
const tokenize = (text, target) => {
  const index = text.indexOf(target);
  let result = [];
  const firstPart = text.slice(0, index);
  let secondPart = "";

  if (firstPart) {
    result.push(firstPart);
  }

  result.push(target);
  if (index + 1 < text.length) {
    secondPart = text.slice(index + 1, text.length);
    if (secondPart.includes(target)) {
      result = result.concat(tokenize(secondPart, target));
    } else {
      result.push(secondPart);
    }
  }

  return result;
};

const romanToMathExpression = text => {
  //Find contained special characters in the text first
  const symbols = getContainedSpecialCharacters(text);

  if (symbols.length > 0) {
    let result = "";
    const specialChar = symbols[0];
    const tokens = tokenize(text, specialChar);

    for (let t of tokens) {
      if (t === specialChar) {
        result += t;
      } else {
        result += romanToMathExpression(t);
      }
    }
    return result;
  } else {
    if (isValidRoman(text)) {
      return `${romanToArab(text)}`;
    }
    return "";
  }
};

const replaceAll = (text, search, target = "") => {
  const regex = new RegExp(search, "gi");
  return text.replace(regex, target);
};

const computeRomanExpression = text => {
  //Remove spaces in the expression first
  text = replaceAll(text, " ");

  //Put everything to upper case before continuing
  text = text.toUpperCase();

  //Get Math expression
  const mathExpression = romanToMathExpression(text);
  //Evaluation the math expression
  const result = math.evaluate(mathExpression);

  //Return roman result
  return arabToRoman(result);
};

module.exports = {
  computeRomanExpression
};
