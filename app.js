const express = require("express");
const app = express();

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`The App has been started and running... http://localhost:${PORT}`);
})