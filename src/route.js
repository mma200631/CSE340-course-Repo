import express from 'express';

import {showHomePage} from './controllers/index.js';
import {showNewOrganaizationForm, showOrganizationPage, showOrganizationDetailsPage,processNewOrganizationForm , organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organization.js';
import {showProjectPage} from './controllers/project.js';
import {showCategoriesPage, showCategoriesByIdPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, showEditCategoryForm, categoryValidation, processNewCategoryForm, processEditCategoryForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/error.js';
import { showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm  } from './controllers/project.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm,processLoginForm,logOutUser, requireLogin, showDashboard, requireRole, showUserPage  } from './controllers/users.js';
import { volunteerForProject, VolunteerRemoved } from './controllers/volunteer.js';
const route = express.Router();

route.get('/', showHomePage);
route.get('/organization', showOrganizationPage);
route.get('/organization/:id', showOrganizationDetailsPage);
route.get('/project', showProjectPage);
route.get('/project/:id', showProjectDetailsPage);
route.get('/categories', showCategoriesPage);
route.get('/category/:id', showCategoriesByIdPage);
route.get('/new-organization',requireRole('admin'), showNewOrganaizationForm);
route.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm );
// Route to display the edit organization form
route.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
route.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
route.get('/new-project', requireRole('admin'), showNewProjectForm);
route.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
route.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
route.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
route.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
route.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);
route.get('/new-category', requireRole('admin'), showNewCategoryForm);
route.post('/new-category',requireRole('admin'),categoryValidation, processNewCategoryForm );
route.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
route.post('/edit-category/:id', requireRole('admin'), categoryValidation,processEditCategoryForm);
route.get('/register', showUserRegistrationForm);
route.post('/register', processUserRegistrationForm);
route.get('/login', showLoginForm);
route.post('/login', processLoginForm);
route.get('/logout', logOutUser);
route.get('/dashboard', requireLogin, showDashboard);
route.get('/users', requireLogin, requireRole('admin'), showUserPage);
route.post('/project/:id/volunteer', requireLogin, volunteerForProject);
route.post('/project/:id/remove-volunteer', requireLogin, VolunteerRemoved);
//error handling route 
route.get('/test-error', testErrorPage);

export default route;