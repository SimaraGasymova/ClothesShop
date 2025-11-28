function toggleMenu() {
    const menu = document.getElementById('menuList');
    menu.classList.toggle('active');
}

// Закрытие меню при клике вне его
document.addEventListener('click', function(event) {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.getElementById('menuList');
    if (!menuBtn.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Активация текущей страницы в меню
function setActiveMenu(page) {
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.menu-list a[href="${page}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
