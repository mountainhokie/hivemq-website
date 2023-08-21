$(document).ready(function () {
    var downloadForm = $('#download-form');
    if (!downloadForm || downloadForm.length < 1) {
        return;
    }

    downloadForm.on("submit", function () {
        try {

            if ($(downloadForm).find('#subscribe-checkbox').is(':checked')) {
                setCookie("subscribed", "true");
                return true;
            }

            let mailField = $(downloadForm).find("#business-mail");

            if (!mailField || mailField.length < 1) {
                setCookie("subscribed", "false");
                return true;
            }

            var email = mailField.val();
            if (email.length > 0) {
                setCookie("subscriber", email);
            }

            setCookie("subscribed", "false");
            return true;

        } catch (e) {
            //ignore
        }
        setCookie("subscribed", "false");
        return true;
    })
});

$(document).ready(function () {
    try {
        var afterDownload = $('#newsletter-after-download');
        if (!afterDownload || afterDownload.length < 1) {
            return;
        }

        var cookie = getCookie("subscribed");

        if (typeof cookie != "string") {
            afterDownload.show();
            deleteCookie("subscribed");
            deleteCookie("subscriber");
            return;
        }

        if (cookie === "true") {
            deleteCookie("subscribed");
            deleteCookie("subscriber");
            return;
        }

        var subscriber = getCookie("subscriber");

        if (typeof subscriber == "string" && subscriber.length > 0) {
            $('#mce-EMAIL-footer').val(subscriber);
        }

        afterDownload.show();

    } catch (e) {
        //ignore
    }
    deleteCookie("subscribed");
    deleteCookie("subscriber");
});

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function deleteCookie(key) {
    document.cookie = key + '=;expires=-1;path=/';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}