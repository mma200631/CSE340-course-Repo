import bcrypt from 'bcrypt';
import {createUser, authenticateUsers} from '../models/users.js';

const showUserRegistrationForm = async(req, res) => {
    const title = 'Register';
    res.render('register' , {title});
}

const processUserRegistrationForm = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt= await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        
        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');

    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = async(req, res)=>{
    const title= 'Login';
    res.render('login', {title});
};

const processLoginForm = async(req, res)=> {
    const{email, password}= req.body;
   
    const user= await authenticateUsers(email, password);
    // If authentication is successful
    if(user) {
        req.session.user= user; // store user info in session
        req.flash('Success', 'Login successful!');
        if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

        res.redirect('/dashboard'); // redirect to dashboard

    } 
    else{
        req.flash('error', 'Invalid email or password. Please try again.');
        res.redirect('/login');
    }
} 


const logOutUser= async(req, res)=>{
        if(req.session.user){
            delete req.session.user;
        }

        req.flash('Success', 'Logout successful');
        res.redirect('/login');
}

const requireLogin= async(req, res, next)=>{
    if(!req.session.user){
        req.flash('error', 'Please log in to access this page.');
        res.redirect('/login');
    }
    next();
}

const showDashboard = async(req, res)=>{
    const user = req.session.user;
    const title= 'Dashboard';
    res.render('dashboard', {
        title,
        name: user.name,
        email: user.email,
    });
}

const requireRole= (role)=>{
    return (req, res, next)=>{
        // Check if user is logged in first
        if(!req.session.user){
            req.flash('error', 'Please log in to access this page.');
             return res.redirect('/login');
            
        }

        // Check if user's role matches the required role
        if(req.session.user.role_name !== role){
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
            
        }
    
        // User has required role, continue
        next();
    }
}

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, logOutUser, requireLogin, showDashboard, requireRole };