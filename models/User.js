const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const {Schema}=mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        minlength:8,
        maxlength:140,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        minlength:3,
        maxlength:15,
        required:true,
    },
    dob:Date,  //date of birth
    followers:[{type:Schema.Types.ObjectId,
        ref:'users'}],
    following:[{type:Schema.Types.ObjectId,
        ref:'users'}],
},
{
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
})

userSchema.pre('save',function preSave(next){
    this.password=bcrypt.hashSync(this.password,8);
    next();
})

userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
      return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  });

userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;