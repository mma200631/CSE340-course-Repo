import {fileURLToPath} from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import route from './src/route.js';
import session from 'express-session';
import flash from './src/middleware/flash.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() ||'production';
const PORT = process.env.PORT ||3000;
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_SECRET= process.env.SESSION_SECRET;
/**
  * Configure Express middleware
  */
 

// Serve static files from the public directory
const app = express();

// Set up session management
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Use flash message middleware
app.use(flash);


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Allow Express to receive and process common POST data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
     res.locals.isLoggedIn = false;
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }
    res.locals.user = req.session.user || null;
    
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

app.use( route);

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
  //log error details
   console.error ('Error Occurred:', err.message);
   console.error ('Stack Trace:', err.stack);

   //Determine status and template
   const status= err.status || 500;
   const template= status=== 404 ? '404' : '500';

   //prepare data for the template
   const context = {
    title: status === 404 ? 'Page Not Found' : 'Internal Server Error',
    error:err.message,
    stack: err.stack

   };

   //Render the appoprite error template
   res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});