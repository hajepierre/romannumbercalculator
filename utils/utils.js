const {
  romanToArab,
  arabToRoman,
  isValidArab,
  isValidRoman
} = require("roman-numbers");

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
  const textChars = text.split("");

  for (let c of textChars) {
    if (specialCharacters.includes(c)) {
      result.push(c);
    }
  }
  return result;
};


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
    console.log(tokens);
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

computeRomanExpression = text => {
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

console.log(computeRomanExpression("(XXIV + XI)"));
