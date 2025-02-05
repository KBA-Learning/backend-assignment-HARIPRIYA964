import express,{json} from 'express';
import dotenv from 'dotenv';
import { adminroute } from './Routes/adminroute.js';
import { adminauth } from './Routes/adminauth.js';

dotenv.config()
const port = process.env.Port
const app = express();
app.use(express.json());

app.use('/',adminroute)
app.use('/',adminauth)

app.listen( port,()=>{
    console.log(`server is running on port ${port}`)
})