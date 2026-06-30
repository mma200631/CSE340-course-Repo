import {fileURLToPath} from 'url';
import path from 'path';
import express from 'express';

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

app.get('/organization', (req, res) => {
  const title = 'Our Partner Organizations';
  res.render('organization', { title });
});
app.get('/project', (req, res) =>{
    const title = 'Service Projects';
    res.render('project', { title });
});
app.get('/categories', (req, res) => {
  const title = 'Project Categories';
  res.render('categories', { title });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});