const {
  romanToArab,
  arabToRoman,
  isValidArab,
  isValidRoman
} = require("roman-numbers");

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

const isSpecialCharacter = value => {
  return specialCharacters.includes(value);
};

const getContainedSpecialCharacters = text => {
  const result = [];
  for (let c of specialCharacters) {
    if (text.includes(c)) {
      result.push(c);
    }
  }
  return result;
};

// const containsSpecialCharacters = (text, chars = specialCharacters) => {
//   const result = false;
//   for (let c of chars) {
//     if (text.includes(c)) {
//       result = true;
//       break;
//     }
//   }
//   return result;
// };

const romanToMathExpression = text => {
  //Find contained special characters in the text first
  const symbols = getContainedSpecialCharacters(text);
  if (symbols.length > 0) {
    let result = "";
    for (let c of symbols) {
      //Tokenize based on the found special characters
      const splits = text.split(c);
      //Loop through all obtained splits to create a math expression
      for (let s of splits) {
        if (isSpecialCharacter(s)) {
          result += s;
        } else {
          result += romanToMathExpression(s);
        }
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
  text=text.toUpperCase();
};
