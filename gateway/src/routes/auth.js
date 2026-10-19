const jwt=require('jsonwebtoken');
const {Router}=require('express');
const router=Router();
router.post('/',(req,res)=>{const {usuario,password}=req.body||{};if(!['admin','rrhh'].includes(usuario)||password!=='1234')return res.status(401).json({error:'Credenciales invalidas'});const rol=usuario;res.json({token:jwt.sign({usuario,rol},process.env.JWT_SECRET,{expiresIn:'8h',algorithm:'HS256'}),usuario,rol});});
module.exports=router;
