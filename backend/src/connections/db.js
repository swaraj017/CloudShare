import mongo from "mongoose";
import dotenv from "dotenv";


export async function conn()  
{
    try
    {
         await mongo.connect(process.env.MONGO_URL);
         return console.log("DB CONNECTED");
    }
    catch(err)
    {
        return console.log("DB Not connected")
    }
}

 