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

document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.subtitle span');
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.01}s`;
  });
});
