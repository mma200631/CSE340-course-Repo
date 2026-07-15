// Import any needed model functions
import { getAllOrganizations } from '../models/organization.js';

// Define  controller functions
const showOrganizationPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';
  res.render('organization', { title, organizations });
};

//Export controller functions
export { showOrganizationPage };