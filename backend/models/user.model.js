const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: { type: String, required: true, trim: true, index: { unique: true } },
    password: { type: String, required: true },
    first_name: { type: String, required: true, trim: true, minlength: 2 },
    last_name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true }
},{
    timestamps: true
})

userSchema.pre('save', function(next){
    let user = this;

    // hashing password only if it is new or modified
    if(!user.isModified('password')) return next();

    // generating a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        // hashing password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            // overriding the plain text password with hash
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;