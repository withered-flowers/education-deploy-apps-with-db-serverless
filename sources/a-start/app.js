if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const cors = require("cors");

const express = require("express");
const app = express();

const port = process.env.PORT || 10000;

const { User } = require("./models/index.js");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      code: 200,
      message: {
        secret: process.env.SECRET,
        data: users,
      },
    });
  } catch (err) {
    res.status(400).json({ code: 400, message: err });
  }
});

app.listen(port, () => console.log(`Application is working at port ${port}`));
