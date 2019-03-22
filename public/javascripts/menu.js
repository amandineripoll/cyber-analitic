$('#burger-menu').click(function() {
    if($('#navbar-burger').css('display') == "none"){
        $('#navbar-burger').fadeIn();
    } else {
        $('#navbar-burger').fadeOut();
    }
});

function resizing() {
    if (!window.matchMedia("(max-width: 890px)").matches) {
        $('#navbar-burger').hide();
    }
}

window.addEventListener('resize', resizing, false);