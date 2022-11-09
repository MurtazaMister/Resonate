const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: { type: String, required: true, maxLength: 20, trim: true, index: { unique: true } },
    password: { type: String, required: true },
    first_name: { type: String, required: true, trim: true, minlength: 2 },
    last_name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true },
    room: {type: mongoose.Types.ObjectId, required: false, default: null},
},{
    timestamps: true
})

userSchema.statics.signup = async function(username, password, first_name, last_name, email){

    if(!username?.trim().length || !password?.trim().length || !first_name?.trim().length || !last_name?.trim().length || !email?.trim().length){
        throw Error('All fields are required');
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid Email');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }

    const exists_username = await this.findOne({username});
    const exists_email = await this.findOne({email});
    if(exists_email || exists_username){
        if(exists_username){
            throw Error('Username already in use');
        }
        else if(exists_email){
            throw Error('Email already in use');
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({username,first_name,last_name,password:hash,email});

    return user;
}

userSchema.statics.login = async function(username, password){
    if(!username?.trim().length || !password?.trim().length){
        throw Error('Invalid credentials');
    }

    const user = await this.findOne({username});

    if(!user){
        throw Error('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Invalid credentials');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;