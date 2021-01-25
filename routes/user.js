const express=require('express');
const {create,getprofile,getById,editone,dele,login,pushfollowID,unfollowID}=require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const router=express.Router();

router.post('/',async(req,res,next)=>{
    const {body}=req;
    try{
        const user=await create(body);
        res.json(user);
    }catch(e){next(e)}
});

router.get('/profile',authMiddleware,async(req,res,next)=>{
    const {user:{id}}=req;
    try {
      const userfollowID = await getprofile(id);
      res.json(userfollowID);
    } catch (e) {
      next(e);
    }
  })

router.get('/:id',async(req,res,next)=>{
    const id=req.params.id;
    try{
        const user=await getById(id);
        res.json(user);
    }catch(e){next(e)}
});

router.patch('/',authMiddleware,async(req,res,next)=>{
    const {user:{id},body}=req;
    try{
        const user=await editone(id,body);
        res.json(user);
    }catch(e){next(e)}
});

router.delete('/',authMiddleware,async(req,res,next)=>{
    const {user:{id}}=req;
    try{
        const user=await dele(id);
        res.json(user);
    }catch(e){next(e)}
});

router.post('/login',async(req,res,next)=>{
    const {body}=req;
    try{
        const user=await login(body);
        res.json(user);
    }catch(e){next(e)}
})

router.post('/follow/:fid',authMiddleware,async(req,res,next)=>{
    const {user: { id }, params: { fid } } = req;
    try {
      const userfollowID = await pushfollowID(id,fid);
      res.json(userfollowID);
    } catch (e) {
      next(e);
    }
  })
  router.post('/unfollow/:fid',authMiddleware,async(req,res,next)=>{
    const {user: { id }, params: { fid } } = req;
    try { 
        // debugger;
      const userfollowID = await unfollowID(id,fid);
      res.json(userfollowID);
    } catch (e) {
      next(e);
    }
  })

module.exports=router;