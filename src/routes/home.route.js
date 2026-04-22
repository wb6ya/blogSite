import { Router } from "express";

const homeRouter = Router();
import {readFile} from '../data/read.js';
import { redirectIfAdmin } from "../middlewire/auth.js";


homeRouter.get("/",redirectIfAdmin, async (req, res) => {
  const blogs = await readFile();
  
  res.render("home", { title: "Home", blogs: blogs, isAdminAuthorized: req.isAdminAuthorized || false });
});

export default homeRouter;
