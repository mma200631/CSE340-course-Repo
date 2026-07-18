// Import  needed model functions
import { getAllCategories, getCategoriesById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/project.js';

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



//Export controller functions
export { showCategoriesPage, showCategoriesByIdPage };