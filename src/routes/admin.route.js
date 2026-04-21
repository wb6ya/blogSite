import { Router } from "express";

const adminRouter = Router();
import {readFile, saveFile} from '../data/read.js';


adminRouter.get("/", async (req, res) => {
  const blogs = await readFile();
  res.render("home", { title: "Home", blogs: blogs, isAdminAuthorized: true });
});

adminRouter.get("/edit/:id", async (req, res) => {
  const blogs = await readFile();
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));

  if (!blog) {
    return res.status(404).render("error", { title: "Blog Not Found" });
  }
  res.render("edit", { title: "Edit Blog", blog: blog, action: `/admin/edit/${blog.id}` });
});

adminRouter.post("/edit/:id", async (req, res) => {
  const blogs = await readFile();
  const blogIndex = blogs.findIndex((b) => b.id === parseInt(req.params.id));

  if (blogIndex === -1) {
    return res.status(404).render("error", { title: "Blog Not Found" });
  }
  
  if (!req.body.content) {
    res.render("edit", { title: "Edit Blog", blog: blogs[blogIndex], action: `/admin/edit/${blogs[blogIndex].id}` });
  }

  blogs[blogIndex] = {
    ...blogs[blogIndex],
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    updatedAt: new Date().toISOString().split('T'),
  };

  console.log(blogs[blogIndex].content);
  

  await saveFile(blogs);
  res.redirect("/admin");
});

adminRouter.post("/delete/:id", async (req, res) => {
  const blogs = await readFile();
  const blogIndex = blogs.findIndex((b) => b.id === parseInt(req.params.id));

  if (blogIndex === -1) {
    return res.status(404).render("error", { title: "Blog Not Found" });
  }

  blogs.splice(blogIndex, 1);
  await saveFile(blogs);
  res.redirect("/admin");
  // Delete blog logic here
});

adminRouter.get("/new", async (req, res) => {
    const blogs = await readFile();
    res.render("edit", { title: "New Blog", blogs: blogs, action: "/admin/new" });
});

adminRouter.post("/new", async (req, res) => {
    const blogs = await readFile();
    console.log("Body Received:", req.body);
    const newBlog = {
        id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    blogs.push(newBlog);
    await saveFile(blogs);
    res.redirect("/admin");
});
export default adminRouter;
