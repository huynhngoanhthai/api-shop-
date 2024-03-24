const express = require("express");
require("dotenv").config();
const cors = require("cors");

// import file
const mysql = require("./config/mysql");
const { POST } = require("./config/constant");
const catchError = require("./middlewares/catchError");
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");

mysql.getConnection((err) => {
    if (err) {
        console.error('Lỗi kết nối: ' + err.stack);
        return;
    }
    console.log('Kết nối mysql thành công' );
});
const app = express();
app.use(express.json());
app.use(cors());
// routers 

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
// middlewares 
app.use(catchError);
// start server
app.listen(POST, () => {
    console.log(`Server is running on port ${POST} `);
});
