const Sidebar = () => {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="user-info">
            <div class="user-avatar" style="margin: 0 auto 10px;"></div>
            <h3>Mostafa Rhazlani</h3>
            <p>Doctor</p>
        </div>
        <div class="nav-menu">
            <h4 class="nav-title">MAIN</h4>
        </div>
        <button class="logout-btn"><img src="../../img/logout.svg"><span>Logout</span></button>
    `;

    const navMenu = sidebar.querySelector('.nav-menu');
    const logoutBtn = sidebar.querySelector('.logout-btn');

    const menu = [
        { name: 'Dashboard', icon: '../../img/dashboard.svg', path: '/' },
        { name: 'Appointments', icon: '../../img/appointment.svg', path: '/appointments' },
        { name: 'Patients', icon: '../../img/patient.svg', path: '/patients' },
        { name: 'Expenses', icon: '../../img/expense.svg', path: '/expenses' },
    ];

    const ul = document.createElement('ul');
    menu.forEach(el => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `<img width="40" src="${el.icon}"><span class="nav-text">${el.name}</span>`;
        li.addEventListener('click', () => {
            window.navigateTo(el.path);
        });
        ul.appendChild(li);
    });
    navMenu.appendChild(ul);

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authUser');
        window.navigateTo('/login');
    });

    return sidebar;
};

export default Sidebar;