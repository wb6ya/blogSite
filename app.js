import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

import homeRouter from './src/routes/home.route.js';
import blogRouter from './src/routes/blog.route.js';
import adminRouter from './src/routes/admin.route.js';
import {isAdminAuthorized} from './src/middlewire/auth.js';


const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view'));
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRouter);
app.use('/blog', blogRouter);
app.use('/admin', isAdminAuthorized, adminRouter);

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
