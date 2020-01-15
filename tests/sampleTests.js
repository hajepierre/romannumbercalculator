const assert = require("assert");
const { computeRomanExpression } = require("../utils/utils");

describe("Simple addition", () => {
  it("It evaluates addition of two numbers", () => {
    const result = computeRomanExpression("XXIV + XI");
    assert.equal(result, "XXXV");
  });
});
