const Student = require("../model/student");
const fs=require('fs')
const bcrypt = require("bcrypt");
// home page
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome manish in Express js using router");
  } catch (error) {
    console.log(error);
  }
};
// register
const register = async (req, res) => {
  
  try {
   
    
    const {username,email,card,name,course,classes,rollno,dob,address,blood,year,gender, phone, password } = req.fields;
    const {image}=req.files;
   
    const StudentExist = await Student.findOne({ email });
    if (StudentExist) {
      return res.status(400).json({ message: "student already exist" });
    }
    const Studentdata = new Student({...req.fields});
    if (image) {
      Studentdata.image.data = fs.readFileSync(image.path);
      Studentdata.image.contentType = image.type;
    }
   
    await Studentdata.save();
  
    res.status(201).json({
      status: true,
      message: "registration successfull!",
      token: await Studentdata.generateToken(),
      userId: Studentdata._id.toString(),
      Studentdata
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const StudentExist = await Student.findOne({ email });
    if (!StudentExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //compare password in usermode with schema

    const user = await StudentExist.comparePassword(password);

    if (user) {
      res.status(201).json({
        msg: "Login successfull!",
        token: await StudentExist.generateToken(),
        userId: StudentExist._id.toString(),
        
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// to send user data user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

 const studentPhotoController = async (req, res) => {
  try {
    const student = await Student.findById(req.params.sid).select(
      "image"
    );
    // console.log(student);
    if (student.image.data) {
      res.set("Content-type", student.image.contentType);
      res.status(200).send(student.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "erorr while getting student photo",
    });
  }
};

module.exports = { home, register, login, user,studentPhotoController };
