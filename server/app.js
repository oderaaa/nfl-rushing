const createError = require("http-errors");
const express = require("express");

const { json, urlencoded } = express;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));



app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next){
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
  
module.exports = { app };