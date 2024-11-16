function toggleNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('is-active');
}

function closeNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    if (navbarMenu.classList.contains('is-active')) {
        navbarMenu.classList.remove('is-active');
    }
}
