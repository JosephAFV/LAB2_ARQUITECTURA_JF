const proxy=require('./proxy');
module.exports=proxy(process.env.RECLUTAMIENTO_URL||'http://localhost:3003','reclutamiento');
