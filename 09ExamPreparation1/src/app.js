import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { HomeComponent } from './components/home/home.js';
import { homeTemplate } from './components/home/homeTemplate.js';
import { LoginComponent } from './components/login/login.js';
import { loginTemplate } from './components/login/loginTemplate.js';
import { NavComponent } from './components/nav/nav.js';
import { navTemplate } from './components/nav/navTemplate.js';
import { AuthService } from './services/AuthService.js';
import { BaseCrudApiService } from './services/BaseCrudApiService.js';
import { SessionService } from './services/SessionService.js';

const main = document.querySelector('#wrapper main'); // main content element render
const nav = document.querySelector('#wrapper header'); // nav rend point

// Router
let router = {
    navigate: page.show,
    redirect: page.redirect
}


//base URL 
const baseUrl = 'http://localhost:3030';


//Render handlers
let renderBody = (template) =>  render(template, main);
let renderNav = (template) =>  render(template, nav);


// Service
let sessionService = new SessionService();
let authService = new AuthService(baseUrl, sessionService);
let shoesService = new BaseCrudApiService(baseUrl, '/data/shoes', sessionService);


// Components
let navComponent = new NavComponent(authService, renderNav, navTemplate, router);
let homeComponent = new HomeComponent(renderBody, homeTemplate);
let loginComponent = new LoginComponent(authService, renderBody, loginTemplate, router);


// Routing 
page('/index.html', '/');
page(navComponent.showView);

page('/', homeComponent.showView);
page('/login', loginComponent.showView);
page.start();