export default function notFoundPage() {
    const parent = document.createElement('div');
    parent.innerHTML = `<h1>404 - Page Not Found</h1>`
    return parent;
}