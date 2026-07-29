import express from 'express';

import {showHomePage} from './controllers/index.js';
import {showNewOrganaizationForm, showOrganizationPage, showOrganizationDetailsPage,processNewOrganizationForm , organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organization.js';
import {showProjectPage} from './controllers/project.js';
import {showCategoriesPage, showCategoriesByIdPage, showAssignCategoriesForm, processAssignCategoriesForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/error.js';
import { showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm  } from './controllers/project.js';
const route = express.Router();

route.get('/', showHomePage);
route.get('/organization', showOrganizationPage);
route.get('/organization/:id', showOrganizationDetailsPage);
route.get('/project', showProjectPage);
route.get('/project/:id', showProjectDetailsPage);
route.get('/categories', showCategoriesPage);
route.get('/category/:id', showCategoriesByIdPage);
route.get('/new-organization', showNewOrganaizationForm);
route.post('/new-organization', organizationValidation, processNewOrganizationForm );
// Route to display the edit organization form
route.get('/edit-organization/:id', showEditOrganizationForm);
route.post('/edit-organization/:id',organizationValidation, processEditOrganizationForm);
route.get('/new-project', showNewProjectForm);
route.post('/new-project',projectValidation, processNewProjectForm);
route.get('/assign-categories/:projectId', showAssignCategoriesForm);
route.post('/assign-categories/:projectId', processAssignCategoriesForm);
route.get('/edit-project/:id', showEditProjectForm);
route.post('/edit-project/:id', processEditProjectForm)



//error handling route 
route.get('/test-error', testErrorPage);

export default route;