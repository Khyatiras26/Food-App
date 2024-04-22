const userModel = require('../Models/userModel')

module.exports.getUser = async function getUsers (req,res){
    
    let id = req.params.id
    let user = await userModel.findById(id)

    if(user){
        res.json(user)
    }
    else{
        res.json({
            message : "user not found"
        })
    }
}
// module.exports.postUsers = function postUser (req,res){
//     users = req.body;
//     res.json({
//         message : "data recieved successfully",
//         user : req.body
//     })
// }

module.exports.getAllUsers = async function getUserById (req,res) {
    let users = await userModel.find();
    if(users){
        res.json({
            message : "List of all users",
            data : users
        })
    }
    else{
        res.json({
            message : "No user registered",
        })
    }
}

module.exports.updateUser = async function updateUser (req,res) {

    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        // let user = await userModel.findOneAndUpdate({email : "khyati2609@gmail.com"} , dataToBeUpdated);
        // // for(key in dataToBeUpdated){
        //     users[key] = dataToBeUpdated[key];
        // }
        if(user){
            let keys =[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }

            for(let i=0; i<keys.length(); i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();
            res.json({
                message : "Data updated successfully",
                data : user
            })
        }

        else{
            res.json({
                message : "Data not updated"
                
            })

        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }

    
}

module.exports.deleteUser =async function deleteUser (req,res) {

    try{
        let id = req.params.id
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message : "user to be deleted not found",
            })
        }
        res.json({
            message : "data has been deleted",
            data : user
        })
    }
    catch(err){
        res.json({
            message : err.message,
        })
    }
}



// function setCookies(req , res){
//     // res.setHeader('Set-Cookie' , 'isLoggedIn : true')
//     res.cookie('isLoggedIn' , true ,{maxAge : 1000*60*60*24 , secure : true ,httpOnly : true});
//     res.send('cookie has been set');

// }

// function getCookies(req ,res){
//     let cookies = req.cookies;
//     console.log(cookies)
//     res.send('cookies recieved')

// }