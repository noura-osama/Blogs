const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User=require('../models/User');


const create = (user) => User.create(user);

const getprofile=(id)=> User.findById(id).exec();

const getById=(id)=>User.findById(id).exec();

const editone=(id,data)=>User.findByIdAndUpdate(id,data,{new:true}).exec();

const dele=(id)=>User.findByIdAndDelete(id).exec();

const pushfollowID = async(id, targetid)=>{
        const loggedUser = await User.findById(id).exec();
        if (targetid != id && !loggedUser.following.find(item => item == targetid)){
            User.updateOne({_id:id },{ $push : {following: targetid } } ,{new:true}).exec();
            User.updateOne({_id:targetid}, { $push: { followers: id } }, { new: true }).exec();
            return {"status":"followed"}
        } else {
            return {"status":"can't follow"}
        }
    }
const unfollowID = (id, targetid)=>{
    User.updateOne({_id:id },{ $pull : {following: targetid } } ,{new:true}).exec();
    User.updateOne({_id:targetid}, { $pull: { followers: id } }, { new: true }).exec();
        return {"status":"unfollowed"}
    }
    


const login=async({username,password})=>{
    const user= await User.findOne({username}).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED');
    }
    const isValidPass=user.validatePassword(password);
    if(!isValidPass){
        throw Error('UN_AUTHENTICATED');
    }
    //return user;
    const token = await asyncSign({
        username: user.username,
        id: user.id,
      }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
      return { ...user.toJSON(), token };
};



module.exports={create,getprofile,getById,editone,dele,login,pushfollowID,unfollowID}