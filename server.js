import {fileURLToPath} from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organization.js';
import { getAllProjects } from './src/models/project.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() ||'production';
const PORT = process.env.PORT ||3000;
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
  * Configure Express middleware
  */

// Serve static files from the public directory
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organization',async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';
  res.render('organization', { title, organizations });
});
app.get('/project',async (req, res) =>{
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('project', { title,projects });
});
app.get('/categories', (req, res) => {
  const title = 'Project Categories';
  res.render('categories', { title });
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});