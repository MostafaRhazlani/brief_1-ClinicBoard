import home from './pages/home.js';
import about from './pages/about.js';
import page_404 from './pages/page_404.js';

const root = document.getElementById('root');
const pathNameList = document.querySelectorAll('.pathName li');
    
const parentElement = document.createElement('div');
parentElement.setAttribute("id", "main-page");
root.appendChild(parentElement);

const routes = [
    {
        'path' : '/',
        'page': home,
    },

    {
        'path' : '/about',
        'page': about,
    },
];


document.addEventListener('DOMContentLoaded', () => {
    
    const currentPath = window.location.pathname
    const route = routes.find(route => route.path === currentPath);

    parentElement.innerHTML = '';

    // render default page based on current url
    if(route) {
        parentElement.appendChild(route.page());
    } else {
        parentElement.appendChild(page_404());
    }

    pathNameList.forEach((li, i) => {
        li.addEventListener('click', () => {
            const path = routes[i].path;
            history.pushState({}, '', path);
            
            parentElement.innerHTML = '';
            parentElement.appendChild(routes[i].page());
        });
    });
});

window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname
    const route = routes.find(route => route.path === currentPath);
    console.log();
    
    parentElement.innerHTML = '';
    parentElement.appendChild(route.page());
    
})