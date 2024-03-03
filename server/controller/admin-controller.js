const Student = require("../model/student");
const Contact = require("../model/contact");
const { response } = require("express");
const attendance = require("../model/attendance");

const getAllUsers = async (req, res) => {
  try {
    const users = await Student.find({}, { password: 0 });
    if (!Student || Student.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const userData = await Student.findOne({ _id: id }, { password: 0 });
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.log("in console del");
    return res.status(401).json({ message: error });
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const updatedUserData = req.body;

    const updatedData = await Student.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );

    return res.status(200).json(updatedData);
  } catch (error) {
    console.log("in console del");
    return res.status(401).json({ message: error });
  }
};
//create attendace
// const createAttendance = async (req, res) => {
//   try {
//     const response = req.body;
//     await attendance.create(response);
//     return res.status(200).json({message:"atteance create successfully"})
//   } catch (error) {
//     return res.status(500).json({ msg: "attendance not delivered" });
//   }
// };

//get attendace
const getAttendance = async (req, res) => {
  try {
    const id = req.params.card;
    console.log("userid", id);
    if (id) {
      const Atdata = await attendance.findOne({ card: id });
      if (!Atdata || Atdata.length === 0) {
        return res.status(404).json({ message: "attendance not found" });
      }
      return res.status(200).json(Atdata);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (id) {
      const DeletedUser = await Student.deleteOne({ _id: id });
      return res.status(200).json({ message: "User Deleted Successfully" });
    }
  } catch (error) {
    console.log("in console del");
    next(error);
  }
};
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const DeletedContact = await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    }
  } catch (error) {
    console.log("in console del");
    next(error);
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "contacts not found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
  getAttendance,
};
