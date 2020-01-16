const express = require("express");
const router = express.Router();
const { computeRomanExpression } = require("../utils/utils");
const title = "CALCULATOR";

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title, calc: { result: "XLV" } });
});

router.post("/", (req, res) => {
  console.log(req.body.expression);
  const result = computeRomanExpression(req.body.expression);
  res.render("index", { title, calc: { result } });
});

module.exports = router;
