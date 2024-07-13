import connectDb from './config/db.js';
import app from './index.js'

const port=5454;
app.listen(port,async ()=>{
    await connectDb();
    console.log(`server is running on port ${port}`);
})