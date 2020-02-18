$(document).ready(add_overlay_links())

function add_overlay_links() { 
    $('.view-overlay').each((idx, overlay) => {
        $(overlay).click(() => {
            window.location.assign(overlay.id)
        })
    })
};
