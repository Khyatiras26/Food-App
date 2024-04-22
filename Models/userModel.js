
const { default: mongoose } = require('mongoose');
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')

const db_link = "mongodb+srv://khyati2609:K2VjdNofBIniUfFk@cluster0.vrpgzm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(db_link)
.then(function(db){
    console.log('Db connected')
})
.catch(function(err){
    console.log(err)
})

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate : function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate : function(){
            return this.confirmPassword == this.password
        }
    },
    role:{
        type : String,
        enum : ['admin' , 'user' , 'restaurantOwner' , 'deliveryBoy'],
        default : 'user'
    },
    profileImage :{
        type : String,
        default : ''
    }

})

// userSchema.pre('save' , function(){
//     console.log('before saving to db' , this);
// })

// userSchema.post('save' , function(doc){
//     console.log('after saving to db' , doc);
// })

userSchema.pre('save' , function() {
    this.confirmPassword = undefined;
})

userSchema.pre('save' , async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password , salt);

    // console.log(hashedString);
    this.password = hashedString;
})


 const userModel = mongoose.model('userModel' , userSchema);
 module.exports = userModel; 

// (async function createUser() {
//     let user = {
//         name : 'Khyati',
//         email : 'khyati@ll.nn',
//         password : '12345678',
//         confirmPassword : '12345678'
//     }

//     let data = await userModel.create(user);
//     console.log(data);
// })();

