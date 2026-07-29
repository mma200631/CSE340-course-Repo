// Import  needed model functions
import { getAllCategories, getCategoriesById,getCategoriesByProjectId , updateCategoryAssignments} from '../models/categories.js';
import { getProjectsByCategoryId, getProjectDetails } from '../models/project.js';

// Define  controller functions
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Project Categories';
  res.render('categories', { title, categories });
};

const showCategoriesByIdPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoriesById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = 'Category Details';
  res.render('category-details', { title: category.category_name, category, projects });
}

const showAssignCategoriesForm = async (req, res)=>{
  const projectId = req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories= await getCategoriesByProjectId(projectId);
  const assignedCategoryIds = assignedCategories.map(
    category => category.category_id
            );
  const title = 'Assign Categories to Project';
  res.render('assign-categories', {title, projectId, projectDetails, categories, assignedCategoryIds});

}

const processAssignCategoriesForm = async(req, res)=>{
  const projectId= req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);

}



//Export controller functions
export { showCategoriesPage, showCategoriesByIdPage, showAssignCategoriesForm, processAssignCategoriesForm };