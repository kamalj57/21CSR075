const {Router}=require("express");
const router=Router();
const Numbers=require('../controllers/number')
router.get('/numbers/:numberid',Numbers);

module.exports=router;