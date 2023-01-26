const app = require("./server");

const port = 5222;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});