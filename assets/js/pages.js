window.onload = () => {
    document.querySelectorAll("button[data-page]").forEach(element => {
        const page = element.dataset.page;
        element.onclick = () => {
            if(element.classList.contains("active")) return;
            window.location.href = `/${page}.html`;
        }
    });
}