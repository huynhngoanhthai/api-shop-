const express = require("express");
require("dotenv").config();
const cors = require("cors");

// import file
const mysql = require("./config/mysql");
const { POST } = require("./config/constant");
const catchError = require("./middlewares/catchError");
const authRouter = require("./routers/authRouter");

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
app.get('/', (req, res) => {
    res.send('Xin chào, đây là trang chủ của ứng dụng của bạn!');
  });
app.use("/api/v1/auth", authRouter);

// middlewares 
app.use(catchError);
// start server
app.listen(POST, () => {
    console.log(`Server is running on port ${POST} `);
});
