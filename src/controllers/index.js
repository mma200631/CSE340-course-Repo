// Define  controller functions
const showHomePage = (req, res) => {
  const title = 'Home';
  res.render('home', { title });
};

// Export  controller functions
export { showHomePage };