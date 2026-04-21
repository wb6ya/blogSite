import { env } from "../data/env.js";

export const isAdminAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.set("WWW-Authenticate", 'Basic realm="Admin Area"');
        return res.status(401).send("Unauthorized");
    }
    const [scheme, credentials] = authHeader.split(" ");
    if (scheme !== "Basic") {
        return res.status(400).send("Bad Request");
    }
    const decodedCredentials = Buffer.from(credentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    if (username === env.adminUsername && password === env.adminPassword) {
        req.isAdminAuthorized = true;
        next();
    } else {
        res.set("WWW-Authenticate", 'Basic realm="Admin Area"');
        return res.status(401).send("Unauthorized");
    }
    
}

export const redirectIfAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return next(); 
    }
    
    const [scheme, credentials] = authHeader.split(" ");
    
    if (scheme !== "Basic") {
        return next();
    }
    
    const decodedCredentials = Buffer.from(credentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    
    if (username === env.adminUsername && password === env.adminPassword) {
        return res.redirect("/admin");
    } else {
        return next();
    }
}