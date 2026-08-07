import { addVolunteer, removeVolunteer} from "../models/volunteer.js";

const volunteerForProject = async(req, res)=> {
    const userId= req.session.user.user_id;
    const projectId= req.params.id;
    const volunteerAdd= await addVolunteer(userId, projectId);
    if (volunteerAdd) {
        req.flash('success', 'You have successfully volunteered for this project.');
        
    }
    return res.redirect(`/project/${projectId}`);


};

const VolunteerRemoved = async(req, res)=>{
    const userId= req.session.user.user_id;
    const projectId= req.params.id;
    const removingVolunteer= await removeVolunteer(userId, projectId);
    if(removingVolunteer){
        req.flash('success', 'Volunteer Removed');     
    } 
    return res.redirect(`/project/${projectId}`);
    
}

export{volunteerForProject, VolunteerRemoved}