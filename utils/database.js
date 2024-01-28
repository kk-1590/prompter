import mongoose from "mongoose";

//track the connection
let isConnected = false;

export const connectToDB = async () => {
    //kk123
    // 2P8CfCZ2MgIDco0j
    console.log("gtutuy");
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : "prompter",
            // useNewUrlParser: true,
            // useUnifiedTopology : true,
        });
        isConnected = true;

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}



 