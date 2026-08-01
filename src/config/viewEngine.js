import express from 'express';
const viewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs"); // công nghệ để tạo giao diện
    app.set("views", "./src/views"); // nơi chứa file giao diện

}
export default viewEngine; 