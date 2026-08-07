import db from "./db.js";

const addVolunteer = async(userId, projectId)=>{
    const query= `
    INSERT INTO volunteer(user_id, project_id)
    VALUES($1, $2)
    RETURNING volunteer_id 
    `
    const queryParams= [userId, projectId];
    const result= await db.query(query, queryParams);
    return result.rows[0].volunteer_id;
};

const removeVolunteer = async(userId, projectId)=>{
    const query=`
    DELETE FROM volunteer
    WHERE user_id= $1 
    AND project_id=$2
    `
    const queryParams= [userId, projectId];
    const result= await db.query(query, queryParams);
    return result.rows.length > 0;
};

const getVolunteerProject= async(userId)=>{
    const query =`
        SELECT sp .*
        FROM volunteer v
        JOIN service_project sp 
        ON sp.project_id= v.project_id
        WHERE v.user_id=$1
        ORDER BY sp.project_date DESC
    `;
    const queryParams = [userId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const isVolunteered = async(userId, projectId)=>{
    const query=`
    SELECT *
    FROM volunteer
    WHERE user_id = $1
    AND project_id= $2  
    `;

    const queryParams= [userId, projectId];
    const result= await db.query(query, queryParams);
    return result.rows.length >0;
}
 export{addVolunteer, removeVolunteer, getVolunteerProject, isVolunteered};
