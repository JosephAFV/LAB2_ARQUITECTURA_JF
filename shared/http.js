const express = require('express');
const winston = require('winston');
const prom = require('prom-client');
const {attachEvents}=require('./events');
const logger = winston.createLogger({format:winston.format.combine(winston.format.timestamp(),winston.format.json()),transports:[new winston.transports.Console()]});
const wrap = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
function createApp(name,ready=async()=>{}) {
 const app=express(); attachEvents(app,name,logger); const registry=new prom.Registry(); prom.collectDefaultMetrics({register:registry});
 const counter=new prom.Counter({name:'http_requests_total',help:'Peticiones HTTP',labelNames:['servicio','metodo','estado'],registers:[registry]});
 app.use((req,res,next)=>{res.on('finish',()=>{counter.inc({servicio:name,metodo:req.method,estado:res.statusCode});logger.info({servicio:name,metodo:req.method,ruta:req.path,estado:res.statusCode});});next();});
 app.get('/health',wrap(async(_,res)=>{await ready();res.json({servicio:name,status:'ok'});}));
 app.get('/metrics',wrap(async(_,res)=>res.type(registry.contentType).send(await registry.metrics())));return app;
}
function finish(app){app.use((_,res)=>res.status(404).json({error:'Ruta no encontrada'}));app.use((err,req,res,next)=>{if(res.headersSent)return next(err);logger.error(err.message);const conflict=err.name==='SequelizeUniqueConstraintError'||err.code===11000;const invalid=['ValidationError','CastError','SequelizeValidationError'].includes(err.name)||err.type==='entity.parse.failed';res.status(conflict?409:err.status||(invalid?400:500)).json({error:conflict?'Registro duplicado':invalid||err.status?err.message:'Error interno del servicio'});});}
function fail(message,status=400){throw Object.assign(new Error(message),{status});}
function pick(body,keys){return Object.fromEntries(keys.filter(k=>Object.hasOwn(body,k)).map(k=>[k,body[k]]));}
module.exports={express,createApp,finish,wrap,fail,pick,logger};
