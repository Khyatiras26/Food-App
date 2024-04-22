const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



app.use(express.json());
app.listen(8003);
app.use(cookieParser())



// app.get('/users',(req,res) => {
//     res.send(users);
// });

// app.post('/users', (req,res) => {
//     users = req.body;
//     res.json({
//         message : "data recieved successfully",
//         user : req.body
//     })
// })

// app.patch('/users' , (req,res) => {
//     let dataToBeUpdated = req.body;
//     for(key in dataToBeUpdated){
//         users[key] = dataToBeUpdated[key];
//     }

//     res.json({
//         message : "Data updated successfully"
//     })
// })


// app.delete('/users' , (req,res) => {
//     users = {}
//     res.json({
//         message : "data has been deleted"
//     })
// })

const userRouter=require('./Routers/userrouter');
// const authRouter = require('./Routers/authrouter')

app.use("/user",userRouter);
// app.use("/auth", authRouter);






// app.get('/users/:id' , (req,res) => {
//     console.log(req.params.id);
//     res.send("user id recieved")
// })






