window.addEventListener('load', function(){
    // obtain plugin
    let cc = initCookieConsent();

    // run plugin with your configuration
    cc.run({
        current_lang: 'en',
        autoclear_cookies: true,                   // default: false
        theme_css: '/dist/cookieconsent.css',      // replace with a valid path
        page_scripts: true,                        // default: false
        delay: 200,                                // default: 0
        // auto_language: false,                   // default: false
        // autorun: true,                          // default: true
        force_consent: true,                   // default: false
        // hide_from_bots: false,                  // default: false
        // remove_cookie_tables: false             // default: false
        cookie_name: 'consent_cookie',             // default: 'cc_cookie'
        //cookie_expiration: 182,                 // default: 182 (days)
        // cookie_domain: location.hostname,       // default: current domain
        // cookie_path: '/',                       // default: root
        // cookie_same_site: 'Lax',                // default: 'Lax'
        // use_rfc_cookie: false,                  // default: false
        // revision: 0,                            // default: 0

        onAccept: function (cookie) {
            if (cookie.level.indexOf("necessary") >= 0) {
                cc.loadScript(
                    "//js.hs-scripts.com/5867930.js"
                );
            }
        },

        onChange: function (cookie, changed_preferences) {
            // ...
        },
        // ...
        gui_options: {
            consent_modal: {
                layout: 'box',               // box/cloud/bar
                position: 'middle center',     // bottom/middle/top + left/right/center
                transition: 'slide'             // zoom/slide
            },
            settings_modal: {
                layout: 'box',                 // box/bar
                // position: 'left',           // left/right
                transition: 'zoom'            // zoom/slide
            }
        },
        languages: {
            'en': {
                consent_modal: {
                    title: 'We use cookies!',
                    description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. Learn more in our <a href="/privacy-policy">Privacy Policy</a>.',
                    primary_btn: {
                        text: 'Accept',
                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Settings',
                        role: 'settings'        // 'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie preferences',
                    save_settings_btn: 'Save settings',
                    accept_all_btn: 'Accept all',
                    reject_all_btn: 'Reject all',
                    close_btn_label: 'Close',
                    cookie_table_headers: [
                        {col1: 'Name'},
                        {col2: 'Domain'},
                        {col3: 'Expiration'},
                        {col4: 'Description'}
                    ],
                    blocks: [
                        {
                            title: 'Cookie usage',
                            description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/privacy-policy" class="cc-link">privacy policy</a>.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'These cookies are essential for the proper functioning of my website. These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set for services like storing your privacy preferences, filling in or submitting forms. You can set your browser to block, but than cause parts of the site to stop working.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                            }
                        }, {
                            title: 'Advertisement and Targeting cookies',
                            description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            },
                        },
                    ]
                }
            }
        }
    });

});