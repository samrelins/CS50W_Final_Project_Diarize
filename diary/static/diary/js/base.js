$(document).ready(add_menu_actions())
    
function add_menu_actions() {
    $('.menu-button').click(() => {
        $('.menu').toggleClass('toggled')
    })
}
