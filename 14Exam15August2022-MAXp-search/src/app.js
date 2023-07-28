import page from  '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
// // import { myBooksPage } from './views/my-books.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js'

// TO DO change render root depending on project HTML structure
const root = document.getElementById('wrapper');  // <body> --> <div id="wrapper">
// const body = document.body; // alternatively attach content to body

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/dashboard', dashboardPage);
page('/create', createPage);
// // page('/my-books', myBooksPage);
page('/details/:id', detailsPage); // go to see details of 1 book 
page('/edit/:id', editPage);
page('/search', searchPage);

page.start();


function decorateContext(ctx, next) {
    ctx.render = renderView;

    next();
}


// TO DO injects dependencies
function renderView(content){
    const userData = getUserData();
    //console.log('userData', userData);
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/');
}





