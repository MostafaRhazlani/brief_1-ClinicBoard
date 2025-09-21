export default function Dashboard() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h1>Dashboard Page</h1>
    `
    return container;
}