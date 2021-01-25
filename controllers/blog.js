const Blog = require('../models/Blog');

//Home page function
const home = () => {
    const date = new Date();
    let prevyear=parseInt((date.toLocaleString().split('/'))[2].split(',')[0]);
    let prevmonth=(date.toLocaleString().split('/'))[1];
    let prevdate=(date.toLocaleString().split('/'))[0]-1;
    if(prevdate==0){
        prevdate=12;
        prevyear -=1;
    }
    datesting=`${prevyear}-${prevdate}-${prevmonth}T00:00:00.000Z`
    return Blog.find({ createdAt: { $gte: datesting, $lt: date } }).exec();
}

//create new blog with the login user function
const create = (blog) => {
    return Blog.create(blog);
}

//get all blogs for the login user function
const getAll = (author) => {
    return Blog.find(author).exec();
}

//get all blogs for an author function
const getById = (id) => {
    return Blog.findById( id).exec();
}

//search by title and tags function
const search = (ser) => {
    return Blog.find({ $or: [{ tags: new RegExp(ser, 'i') }, { title: new RegExp(ser, 'i') }] }).exec();
}

//edit my owen blog function
const editById = (id, editid, body) => {
    Blog.updateOne({ $and: [{ _id: editid }, { author: id }] }, { $set: body  }).exec();
    return {"blog":"edited"}
};

//delete my owen blog function
const deleteById = (id, delid) => {
    Blog.find({ $and: [{ _id: delid }, { author: id }] }).remove();
    return {"blog":"deleted"}
};

module.exports = { home, create, getAll, getById, editById, deleteById, search }