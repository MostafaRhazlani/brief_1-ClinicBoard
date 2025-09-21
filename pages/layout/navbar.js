const Navbar = () => {
    const navbar = document.createElement('div');

    navbar.className = 'navbar';
    navbar.innerHTML = `
        <div class="user-info-nav">
            <h3>Mostafa Rhazlani</h3>
            <div class="user-avatar"></div>
        </div>
    `
    return navbar
}

export default Navbar