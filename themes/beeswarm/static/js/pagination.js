$(document).ready(function () {
    try {
        //set cookie on blog post list page on link click
        var blogPostLinks = $('.post-preview a');
        if (blogPostLinks && blogPostLinks.length > 0) {
            blogPostLinks.on('click', function () {
                var activePage = $('.page-item.active');
                if (activePage && activePage.length > 0) {
                    var topActiveLink = $(activePage[0]).find('a');
                    if (topActiveLink && topActiveLink.length > 0) {
                        setCookie("blog-page", topActiveLink.text());
                    }
                }
            });
        }

        //set href for overview on blog post single page
        var link = $('#back-to-overview-a');
        if (link && link.length > 0) {
            link.attr("href", getBlogPage());
        }

    } catch (e) {
        console.log(e);
    }
});

function setCookie(key, value) {
    try {
        var expires = new Date();
        expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    } catch (e) {
        console.log(e);
    }
}

function getBlogPage() {
    try {
        var keyValue = document.cookie.match('(^|;) ?' + 'blog-page' + '=([^;]*)(;|$)');
        return keyValue ? "/blog/page/" + keyValue[2] : "/blog";
    } catch (e) {
        console.log(e);
    }
}