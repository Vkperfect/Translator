const express = require("express");
const bodyParser = require("body-parser");
const translate = require("translate-google");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Invalid request. 'text' key not found in the request body.",
      });
    }

    const translatedText = await translate(text, { to: "fr" });
    return res.status(200).json({
      success: true,
      message: "Translation successful",
      French: translatedText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
