require('dotenv').config();
const {Sequelize,DataTypes}=require('sequelize');
const {express,createApp,finish,wrap,fail,pick}=require('../../../shared/http');
const db=new Sequelize(process.env.DATABASE_URL,{logging:false});
const Empleado=db.define('Empleado',{
 cedula:{type:DataTypes.STRING(10),allowNull:false,unique:true,validate:{is:/^\d{10}$/}},
 ...Object.fromEntries(['nombre','apellido','cargo','departamento'].map(k=>[k,{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}}])),
 fecha_ingreso:{type:DataTypes.DATEONLY,defaultValue:DataTypes.NOW},salario_base:{type:DataTypes.DECIMAL(10,2),allowNull:false,validate:{min:0,isDecimal:true}},activo:{type:DataTypes.BOOLEAN,defaultValue:true}
},{tableName:'empleados'});
const app=createApp('empleados',()=>db.authenticate());app.use(express.json());
const fields=['cedula','nombre','apellido','cargo','departamento','fecha_ingreso','salario_base','activo'];
app.param('id',(req,res,next,id)=>{if(!/^[1-9]\d*$/.test(id))return res.status(400).json({error:'ID invalido'});next();});
const find=async id=>await Empleado.findByPk(id)||fail('Empleado no encontrado',404);
app.get('/empleados',wrap(async(req,res)=>res.json(await Empleado.findAll({where:req.query.departamento?{departamento:req.query.departamento}:{},order:[['id','ASC']]}))));
app.get('/empleados/:id',wrap(async(req,res)=>res.json(await find(req.params.id))));
app.post('/empleados',wrap(async(req,res)=>res.status(201).json(await Empleado.create(pick(req.body,fields)))));
app.put('/empleados/:id',wrap(async(req,res)=>res.json(await(await find(req.params.id)).update(pick(req.body,fields)))));
app.delete('/empleados/:id',wrap(async(req,res)=>{await(await find(req.params.id)).update({activo:false});res.json({mensaje:'Empleado desactivado'});}));
finish(app);db.sync().then(()=>app.listen(process.env.PORT||3001,'0.0.0.0')).catch(err=>{console.error(err);process.exit(1);});
