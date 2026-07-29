import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.category;
    `;

    const result = await db.query(query);
    return result.rows;
};

// Function to get categories by ID
const getCategoriesById = async (categoryId) => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        WHERE category_id=$1
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

//Get all categories for a service project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM public.category c
        JOIN public.project_category pc 
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

const assignCategoryToProject = async(projectId, categoryId)=>{
    const query = `
    INSERT INTO project_category(project_id, category_id)
    VALUES($1, $2);
    
    `;
    await db.query(query, [projectId, categoryId]);
}

const updateCategoryAssignments = async(projectId, categoryIds )=>{
    const deletQuery = `
    DELETE FROM project_category
    WHERE project_id= $1;
    `;
    await db.query(deletQuery, [projectId]);

    for (const categoryId of categoryIds){
        await assignCategoryToProject(projectId, categoryId);
    }
}
export { getAllCategories, getCategoriesById, getCategoriesByProjectId, assignCategoryToProject, updateCategoryAssignments };