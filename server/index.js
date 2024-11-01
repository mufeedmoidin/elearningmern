const express = require('express');
const dbConnection= require('./db');
const cors = require('cors');

const app = express();

app.use(express.json());    

app.use(cors());

dbConnection();


const PORT = 5000;

app.use('/api/admin',require('./route/adminRoute'));
app.use('/api/user',require('./route/userRoute'));


app.use("/api/image/",express.static("./upload"))


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
