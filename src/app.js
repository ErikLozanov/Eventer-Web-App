import { logout } from "./api/api.js";
import { getUserData } from "./util.js";
import page from "../node_modules/page/page.mjs";
import { loginPage } from "./views/login.js";
import { html,render } from "../node_modules/lit-html/lit-html.js";
import { registerPage } from "./views/register.js";
import { homePage } from "./views/home.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";




let root = document.querySelector('main');

function decorateContent(ctx,next) {
    ctx.render = (content) => render(content,root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav() {
    let userData = getUserData();
    
    if(userData) {
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.guest').style.display = 'inline-block';
        document.querySelector('.user').style.display = 'none';
    }
}


document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logout();
    updateUserNav();
    page.redirect('/');
})


page(decorateContent);
page('/', homePage);
page('/login',loginPage);
page('/register',registerPage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
updateUserNav();
page.start();