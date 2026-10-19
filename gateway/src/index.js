require('dotenv').config();
const {express,createApp,finish}=require('../../shared/http');
if(!process.env.JWT_SECRET)throw new Error('Configura JWT_SECRET');
const app=createApp('gateway');
app.use(require('./middlewares/rateLimit'));
app.use(express.json());
app.use('/auth/login',require('./routes/auth'));
for(const name of ['empleados','nomina','reclutamiento'])app.use('/api/'+name,require('./middlewares/auth'),require('./routes/'+name));
finish(app);app.listen(process.env.PORT||3000,'0.0.0.0');
