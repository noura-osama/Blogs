const express= require('express');

const user=require('./user');
const blog=require('./blog');
const authMiddleware = require('../middlewares/auth');

const router=express. Router();

router.use('/users',user);
router.use ('/blogs',authMiddleware,blog);

module.exports=router;