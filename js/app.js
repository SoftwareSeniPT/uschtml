var app = {
    init: function() {
        app.initHomeCycle();
        app.fancyBoxInit();
        app.singlePageScroll();
        app.backToTopAnimation();
        app.onTopDetect();
        app.connectApproachPointToggle();
        app.heroCaptionPadding();
        app.initParalax();
        app.animateHeroText();
        app.detectMobile();
        app.detectIsHeroImageLoaded();
    },
    onResize: function() {
        app.heroCaptionPadding();
        app.detectMobile();
    },
    detectIsHeroImageLoaded: function() {
        if (!jQuery("body").hasClass("home")) {
            return false;
        }
        var $img = jQuery(".hero .hero-logo");
        var img = new Image();
        img.onload = function() {
            app.heroCaptionPadding();
            jQuery("body").addClass("hero-caption-padding-ready");
        }
        img.src = $img.attr('src');
    },
    animateHeroText: function() {
        setTimeout(function() {
            jQuery("body").addClass("document-ready");
        }, 100);
    },
    detectMobile: function() {
        var isMobile = window.matchMedia("only screen and (max-width: 760px)");

        if (isMobile.matches) {
            jQuery("body").addClass("is-on-mobile")
        } else {
            jQuery("body").removeClass("is-on-mobile")
        }
    },
    initParalax: function() {
        var paralaxElm = jQuery(".homepage .hero, .page-hero");
        if (!paralaxElm.length) {
            return false;
        }

        var bg = paralaxElm.css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
        paralaxElm.parallax({
            imageSrc: bg
        });
        jQuery("body").addClass("paralax-active");
    },
    heroCaptionPadding: function() {
        if (!jQuery("body").hasClass("home")) {
            return false;
        }
        var $container = jQuery(".hero-wrapper .container");
        var $img = jQuery(".hero-logo");
        var imgWidth = $img.outerWidth();
        var containerWidth = $container.outerWidth();
        var containerLeftOffset = $container.offset().left;
        var factor = 50;

        if (containerLeftOffset < imgWidth) {
            var leftPadding = (imgWidth - containerLeftOffset) + factor;

            // Apply left padding
            $container.css({
                paddingLeft: leftPadding
            });
        } else {
            $container.css({
                paddingLeft: factor
            });
        }
    },
    connectApproachPointToggle: function() {
        var $list = jQuery(".connect-approach ul");
        $list.before("<i class=\"icon-plus-round\">"); // Insert toogle bullet icon

        // Handle when click on icon
        jQuery(document).on("click", ".icon-plus-round", function() {
            if (!jQuery(this).hasClass("opened")) {
                jQuery(this).addClass("opened")
                jQuery(this).next().slideDown();
            } else {
                jQuery(this).removeClass("opened")
                jQuery(this).next().slideUp();
            }
        });
    },
    initHomeCycle: function() {
        jQuery('.connect-highlight .slideshow').cycle({
            speed: 600,
            manualSpeed: 600,
            slides: "> .slide",
            fx: "scrollHorz",
            next: "> .right",
            prev: "> .left"
        });
    },
    fancyBoxInit: function() {
        jQuery(".fancybox-thumb").fancybox({
            prevEffect: 'none',
            nextEffect: 'none',
            closeBtn: true,
            helpers: {
                title: {
                    type: 'inside'
                },
                buttons: {}
            }
        });
    },
    singlePageScroll: function() {
        jQuery("#single-page-scroll a").click(function() {
            var target = jQuery(this).data("target");
            var headerHeight = jQuery("#header").outerHeight();

            jQuery('html, body').animate({
                scrollTop: $(target).offset().top - headerHeight
            }, 500);

            return false;
        })
    },
    backToTopAnimation: function() {
        var button = "#back-to-top";
        jQuery(button).click(function(event) {
            event.preventDefault();
            jQuery('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    },
    onTopDetect: function() {
        jQuery(window).scroll(function() {
            var top = jQuery(document).scrollTop();
            if (top > 0) {
                jQuery('body').addClass('not-on-top');
            } else {
                jQuery('body').removeClass('not-on-top');
            }
        });
    }
}

jQuery(document).ready(function() {
    app.init();
    jQuery(window).resize(function() {
        app.onResize();
    });
});
