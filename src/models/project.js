import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT sp.project_id,  
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o 
        ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          sp.project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date
        FROM public.service_project sp
        WHERE sp.organization_id = $1
        ORDER BY sp.project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT sp.project_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        sp.organization_id,
        o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o 
        ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
          sp.project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date,
          o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o 
        ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    // Return the first row, or null if no project is found
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id,
        sp.title
        FROM public.service_project sp
        JOIN public.project_category pc 
        ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.title ASC;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async(title, description, location , project_date, organizationId )=>{
    const query= `
        INSERT INTO service_project (title, description, location, project_date, organization_id)
        VALUES($1, $2, $3, $4, $5)
        RETURNING project_id;


    
    `;

    const queryParams= [title, description, location, project_date, organizationId];
    const result= await db.query(query, queryParams);

    if (result.rows.length===0){
        throw new Error('Failed to create projects')

    }

    if (process.env.ENABLE_SQL_LOGGING=='true'){
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}


const updateProject = async( project_id, title, description, location, project_date, organizationId)=>{
   const query= `
        UPDATE service_project
        set title=$1, description= $2, location= $3, project_date= $4, organization_id= $5
        WHERE project_id= $6
        RETURNING project_id;
   `

   const queryparams= [title, description, location, project_date, organizationId, project_id]
   const result= await db.query(query, queryparams);

   if(result.rows.length===0) {
        throw new Error('Service project not found');
        
    }

    if(process.env.ENABLE_SQL_LOGGING==='true'){
        console.log('Updated project with id', project_id);

    }

    return result.rows[0].project_id;
};



export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId, createProject, updateProject };