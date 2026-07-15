// Import any needed model functions
import {getAllOrganizations, getOrganizationDetails} from '../models/organization.js';
import {getProjectsByOrganizationId} from '../models/project.js';
// Define  controller functions
const showOrganizationPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';
  res.render('organization', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organizations', {title, organizationDetails, projects});
};
//Export controller functions
export { showOrganizationPage, showOrganizationDetailsPage };