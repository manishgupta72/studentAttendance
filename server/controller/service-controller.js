const Service = require("../model/service");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      return res.status(404).json({ message: "No Service Found" });
    }
    res.status(200).json({msg: response });
  } catch (error) {
    return console.log("services", error);
  }
};

module.exports = services;
