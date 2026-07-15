// Import  needed model functions
import { getAllProjects } from '../models/project.js';

// Define  controller functions
const showProjectPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('project', { title,projects });
};

//Export controller functions
export { showProjectPage };