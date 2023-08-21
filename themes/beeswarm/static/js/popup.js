$(document).ready(function () {
    try {

        var closer = $("#nlClose");
        var nlPopup = $("#nlPopup");

        if (!(closer && closer.length > 0)) {
            return;
        }

        if (!(nlPopup && nlPopup.length > 0)) {
            return;
        }

        closer.click(function () {
            setCookie("newsletter-popup-shown", "true");
            nlPopup.fadeOut();
        });

        var cookieValue = getCookie("newsletter-popup-shown");
        if (cookieValue !== "true") {
            $(window).scroll(function () {
                var popup = $("#nlPopup");
                if (this.scrollY / document.body.scrollHeight * 100 > 33) {
                    popup.animate({
                        display: "show",
                        right: "20px"
                    }, 1000, function () {
                    });
                    // remove that scroll function as soon as popup is shown
                    $(window).off("scroll");
                }
            });
        }


    } catch (e) {
        console.log(e);
    }
});

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}