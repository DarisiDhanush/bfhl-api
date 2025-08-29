const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// GET handler (optional, just for testing)
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// POST handler
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' must be an array",
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach((raw) => {
      const item = String(raw);

      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Concatenated alternating caps string from reversed alphabets
    const letters = alphabets.join("").split("");
    const concat_string = letters
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.json({
      is_success: true,
      user_id: "darisi_venktasaidhanush_04052005", // <-- lowercase fullname_ddmmyyyy
      email: "dhanush.22bce20023@vitapstudent.ac.in",
      roll_number: "22BCE20023",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(), // return as string
      concat_string,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: "Internal Server Error",
    });
  }
});


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Export Express app for Vercel
module.exports = app;
