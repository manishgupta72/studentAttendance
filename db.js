const mongoose=require('mongoose')

// const uri="mongodb://127.0.0.1:27017/userAdmin";

const URI=process.env.MOGNO_DB_URI;

const connectToDB=async ()=>
{
  try {
    await mongoose.connect(URI);
    const db=mongoose.connection;
    console.log('Database connected');
  } catch (error) {
    console.error("database connection failed!")
    
  }
}

module.exports=connectToDB;