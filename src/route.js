import express from 'express';

import {showHomePage} from './controllers/index.js';
import {showOrganizationPage} from './controllers/organization.js';
import {showProjectPage} from './controllers/project.js';
import {showCategoriesPage} from './controllers/categories.js';
import { testErrorPage } from './controllers/error.js';

const route = express.Router();

route.get('/', showHomePage);
route.get('/organization', showOrganizationPage);
route.get('/project', showProjectPage);
route.get('/categories', showCategoriesPage);

//error handling route 
route.get('/test-error', testErrorPage);

export default route;