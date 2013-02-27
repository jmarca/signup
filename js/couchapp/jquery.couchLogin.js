// Copyright Chris Anderson 2011
// Apache 2.0 License
// jquery.couchLogin.js
//
// Example Usage (loggedIn and loggedOut callbacks are optional):
//    $("#mylogindiv").couchLogin({
//        loggedIn : function(userCtx) {
//            alert("hello "+userCtx.name);
//        },
//        loggedOut : function() {
//            alert("bye bye");
//        }
//    });

(function($) {
    $.fn.couchLogin = function(opts) {
        var elem = $(this);
        opts = opts || {};
        function initWidget() {
            $.couch.session({
                success : function(session) {
                    var userCtx = session.userCtx;
                    if (userCtx.name) {
                        elem.empty();
                        elem.append(loggedIn(session));
                        if (opts.loggedIn) {opts.loggedIn(session)}
                    } else if (userCtx.roles.indexOf("_admin") != -1) {
                        elem.html(templates.adminParty);
                    } else {
                        elem.html(templates.loginForm);
                        if (opts.loggedOut) {opts.loggedOut()}
                    };
                }
            });
        };
        initWidget();
        function doLogin(name, pass) {
            $.couch.login({name:name, password:pass, success:initWidget});
        };
        elem.delegate("a[href=#logout]", "click", function() {
            $.couch.logout({success : initWidget});
            return false;
        });
        elem.delegate("form.login", "submit", function() {
            doLogin($('input[name=name]', this).val(),
                $('input[name=password]', this).val());
            return false;
        });
    }
    var templates = {
        adminParty : '<p><strong>Admin party, everyone is admin!</strong> Fix this in <a href="/_utils/index.html">Futon</a> before proceeding.</p>',
        loggedOut : '<a href="#signup">Signup</a> or <a href="#login">Login</a>',
        loginForm : '<form class="login navbar-form"><input class="span2" type="text" name="name" value="" autocapitalize="off" autocorrect="off" placeholder="username"><input type="password" name="password" value="" placeholder="password"><button type="submit" class="btn">Sign in</button></form>'
    };
    function loggedIn(r) {
        var auth_db = encodeURIComponent(r.info.authentication_db)
        , uri_name = encodeURIComponent(r.userCtx.name)
        , span = $('<span>'+r.userCtx.name+' <a href="#logout">Logout</a></span>');
        return span;
    }
})(jQuery);
