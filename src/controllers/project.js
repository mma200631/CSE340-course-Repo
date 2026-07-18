// Import  needed model functions
import { getUpcomingProjects,getProjectDetails} from '../models/project.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5; // Number of upcoming projects to display

// Define  controller functions
const showProjectPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); // Get the upcoming projects
    const title = 'Upcoming Service Projects';
    res.render('project', { title,projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';
    res.render('project-details', { title, projectDetails, categories });
}


//Export controller functions
export { showProjectPage, showProjectDetailsPage};