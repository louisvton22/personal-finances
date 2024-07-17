import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({status: "Success"});
})

app.get("/api", (req, res) => {
    res.type("html")
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
</head>
<body>
  <header>
    <h1>Welcome to Your Website</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h2>Section Heading</h2>
      <p>This is a paragraph of text.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Your Website. All rights reserved.</p>
  </footer>
</body>
    </html>`)
})



app.listen(process.env.PORT || 3000, () => {
    console.log("server started at port 3000.")
})