import { Router } from "express";
import {readFile} from '../data/read.js';

const blogRouter = Router();

blogRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const blogs = await readFile();
    const blog = blogs.find((b) => b.id === parseInt(id));
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
    res.render("blog", { title: blog.title || `Blog ${id}`, blog: blog });
});

export default blogRouter;
