const fs = require("fs");
const { cloudinaryUploads } = require("../services/projects.service");

const ProjectModel = require("../db/models/project.model");
module.exports = {
  uploadProjects: async (req, res) => {
    if (req.method === "POST") {
      const imgUrlList = [];
      // console.log(req.files)
      var folderName = "portfolio_images";
      for (let i = 0; i < req.files.length; i++) {
        const path = req.files[i].path;
        const result = await cloudinaryUploads(path, folderName);
        if (result.error) {
          console.log(error);
          res
            .status(401)
            .json({
              success: 0,
              message: "Error when uploading",
              error: error,
            });
        } else {
          imgUrlList.push({ img: result.url });
        }
      }
      // console.log(result);

      const { type, title, description, tech_list, visit_link,git_link,duration } = req.body;

      // console.log(tech_list);
      let techList = [];

      for (let tech of tech_list) {
        const parsedTech = JSON.parse(tech);
        techList.push(parsedTech);
      }
      const data = {
        type: type,
        project_img: imgUrlList,
        title: title,
        description: description,
        tech_list: techList,
        visit_link: visit_link,
        git_link: git_link,
        duration: duration,
      };
      const project = await ProjectModel(data);

      project.save((err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            success: 0,
            message: "project adding failed",
            error: err,
          });
        }

        res.status(200).json({
          success: 1,
          message: "project added successfully",
          data: result,
        });
      });
    }
  },

  showProjects: async (req, res) => {
    await ProjectModel.find({}).exec((error, result) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          success: 0,
          message: "something went wrong",
          error: error,
        });
      } else if (!result || result.length == 0) {
        res.status(401).json({
          success: 0,
          message: "projects not found!",
        });
      } else {
        res.status(200).send(result);
      }
    });
  },

  deleteProject: async (req, res) => {
    const id = req.params.id;
    await ProjectModel.findByIdAndDelete({ _id: id }).exec((error, result) => {
      if (error) {
        console.log(error);
        res
          .status(401)
          .json({ success: 0, message: "deletation failed", error: error });
      } else if (!result || result.length == 0) {
        res.status(401).json({ success: 0, message: "projects not found" });
      } else {
        res
          .status(200)
          .json({ success: 1, message: "deleted successfully", data: result });
      }
    });
  },
};
