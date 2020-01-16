const assert = require("assert");
const { computeRomanExpression } = require("../utils/utils");

describe("Simple addition", () => {
  it("It evaluates addition of two numbers", () => {
    const result = computeRomanExpression("XXIV + XI");
    assert.equal(result, "XXXV");
  });
});

describe("Complexe operation", () => {
  it("It evaluates addition of two numbers", () => {
    const result = computeRomanExpression("((x*v)+x)/VI-V");
    assert.equal(result, "V");
  });
});
