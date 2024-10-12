const router=require('express').Router();

router.get("/",(req,res)=>{
    res.send("SignUp");
});

module.exports=router;  