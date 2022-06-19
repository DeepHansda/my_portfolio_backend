const { mailService } = require("../services/contact.service");
const ContactModel = require("../db/models/contacts.model");
module.exports = {
  createContact: async (req, res) => {
    const { fullName, email, contactNumber, message } = req.body;
    const data = {
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      message: message,
    };

    await mailService(data,(error,result)=>{
      if(error){
        res.status(400).json({ success: 0, message: "someting went wrong",error: error});

      }

      if(result){
        console.log(result);

        const contact =  ContactModel(data);

    contact.save((err, result) => {
      if (err) {
        res.status(400).json({ success: 0, message: "someting went wrong" });
      }
      if (result) {
        res
          .status(200)
          .json({ success: 1, message: "message created", data: result });
      }
    });
      }
    })
    
  },

  showContacts: async (req, res) => {
    await ContactModel.find({}).exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(401).json({
          success: 0,
          message: "something went wrong",
        });
      } else if (!result || result.length === 0) {
        res.status(401).json({
          success: 0,
          message: "contacts not found",
        });
      } else {
        res.status(200).json({
          success: 1,
          message: "success",
          result: result,
        });
      }
    });
  },

  deleteContact: async (req, res) => {
    const id = req.params.id;
    await ContactModel.findByIdAndDelete({_id:id}).exec((error, result) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          success: 0,
          message: error.message,
        });
      } else if (!result || result.length==0) {
        res.json({
          success: 0,
          message: "contact not found",
        });
      } else {
        res.status(200).json({
          success: 1,
          message: "contact deleted",
          result: result,
        });
      }
    });
  },
};
