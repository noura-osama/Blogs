const express=require ('express');
const router =express. Router();
const multer=require('multer');
const path=require('path');
const authMiddleware = require('../middlewares/auth');
const {home,create,getAll,getById,editById,deleteById,search}=require('../controllers/blog');

//home page 
router.get('/home', async (req, res, next) => {
    try {
        const blog = await home();
        res.json(blog);
    } catch (e) { next(e) }
    //res.send('Hello World')
});

const storage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,'images/');
},
filename:function(req,file,cb){
    cb(null,file.originalname+'-'+Date.now()+path.extname(file.originalname));
}
})

const upload=multer({storage:storage})
//create new blog with the login user
router.post('/',authMiddleware,upload.single('photo'),async(req,res,next)=>{
    const {body,user :{id}}=req;
    const _file=req.file.filename;
    try{
        const blog=await create ({...body,photo:_file, author:id});
        res.json(blog);
    } catch(e){
        next(e)
    }
})

//get all blogs for the login user
router.get('/',authMiddleware, async (req, res,next)=> {
    const {user:{id}}=req;
    try{
        const blog=await getAll({author:id});
        res.json(blog);
    } catch(e){next(e)}
})

//get all blogs for an author
router.get('/:id',authMiddleware, async (req, res,next)=> {
    const id=req.params.id;
    try{
        const blog=await getById(id);
        res.json(blog);
    } catch(e){next(e)}
})
//edit my owen blog
router.patch('/:editid', authMiddleware,async (req, res,next)=> {
    const {user:{id},params:{editid},body}=req;
    const update=Date.now();
    try{
        const blog=await editById(id,editid,{...body,updatedAt:update});
        res.json(blog);
    } catch(e){next(e)}
})

//delete my owen blog
router.delete('/:deleteid',authMiddleware, async (req, res,next)=> {
    const {user:{id},params:{deleteid}}=req;
    try{
        const blog=await deleteById(id,deleteid);
        res.json(blog);
    } catch(e){next(e)}
})

//search by title and tags
router.get('/search/:ser',authMiddleware, async (req, res,next)=> {
    const {params:{ser}}=req;
    try{
        const blog=await search(ser);
        res.json(blog);
    } catch(e){next(e)}
})

module.exports=router;
