import Dashboard from './pages/dashboard.js';
import Appointments from './pages/appointments.js';
import Patients from './pages/patients.js';
import Expenses from './pages/expenses.js';
import Register from './pages/auth/register.js';
import Login from './pages/auth/login.js';
import page_404 from './pages/page_404.js';
import Sidebar from './pages/layout/sidebar.js';
import Navbar from './pages/layout/navbar.js';

import { getData } from './localStorage.js';

const root = document.getElementById('root');


const mainPage = document.createElement('div');
mainPage.setAttribute("id", "main-page");
root.appendChild(mainPage);

const container = document.createElement('div');
container.className = 'container';
mainPage.appendChild(container);
    

const routes = [
    { 'path' : '/', 'page': Dashboard},
    { 'path' : '/appointments', 'page': Appointments},
    { 'path' : '/patients', 'page': Patients},
    { 'path' : '/expenses', 'page': Expenses},
    { 'path' : '/register', 'page': Register},
    { 'path' : '/login', 'page': Login},
];

const protectedPages = ['/', '/appointments', '/patients', '/expenses'];

function navigateTo(path, addToHistory = true) {
    const authUser = getData('authUser');
    
    if (protectedPages.includes(path) && !authUser) {
        path = '/login';
    }

    let route = routes.find(route => route.path === path);

    const sidebar = root.querySelector('.sidebar');
    // sidebar for secure pages
    if (protectedPages.includes(path)) {
        if(!sidebar) root.insertBefore(Sidebar(), mainPage)
    } else {
        if(sidebar) sidebar.remove();
    }
    
    
    container.innerHTML = '';
    container.appendChild(Navbar());
    if (route) {
        container.appendChild(route.page());
    } else {
        container.appendChild(page_404());
    }

    if(addToHistory) history.pushState({}, '', path);
}
window.navigateTo = navigateTo

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
        navigateTo(currentPath);
});

window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname
    navigateTo(currentPath, false);
})