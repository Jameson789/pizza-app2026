import express from "express";

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`)
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});