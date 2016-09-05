var app = {
    init: function() {
        /* This function is called when jQuery initialized */
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
        app.connectEventViewMore();
        app.connectTeamPopup();
        app.wrapConnectTeam();
        app.sliceSlideBackground();
        app.objectFitPolyfill();
        app.checkIfOldIE();
    },
    detectIE: function() {
        var undef, v = 3,
            div = document.createElement('div');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
        );

        return v > 4 ? v : undef;
    },
    checkIfOldIE: function() {
        if (app.detectIE() < 10) {
            jQuery("body").addClass("old-browser");
        }
        jQuery(".browser-disclaimer a").click(function() {
            jQuery(".browser-disclaimer").hide();
        });
    },
    wrapConnectTeam: function() {
        jQuery(".connect-team .fancybox-thumb img").wrap("<div class=\"image\"></div>");
    },
    objectFitPolyfill: function() {
        var objectFitImages = function() {
            "use strict";

            function t(t) {
                for (var e, r = getComputedStyle(t).fontFamily, i = {}; null !== (e = n.exec(r));) i[e[1]] = e[2];
                return i
            }

            function e(e, i) {
                if (!e[c].parsingSrcset) {
                    var s = t(e);
                    if (s["object-fit"] = s["object-fit"] || "fill", !e[c].s) {
                        if ("fill" === s["object-fit"]) return;
                        if (!e[c].skipTest && l && !s["object-position"]) return
                    }
                    var n = e[c].ios7src || e.currentSrc || e.src;
                    if (i) n = i;
                    else if (e.srcset && !a && window.picturefill) {
                        var o = window.picturefill._.ns;
                        e[c].parsingSrcset = !0, e[o] && e[o].evaled || window.picturefill._.fillImg(e, {
                            reselect: !0
                        }), e[o].curSrc || (e[o].supported = !1, window.picturefill._.fillImg(e, {
                            reselect: !0
                        })), delete e[c].parsingSrcset, n = e[o].curSrc || n
                    }
                    if (e[c].s) e[c].s = n, i && (e[c].srcAttr = i);
                    else {
                        e[c] = {
                            s: n,
                            srcAttr: i || f.call(e, "src"),
                            srcsetAttr: e.srcset
                        }, e.src = c;
                        try {
                            e.srcset && (e.srcset = "", Object.defineProperty(e, "srcset", {
                                value: e[c].srcsetAttr
                            })), r(e)
                        } catch (t) {
                            e[c].ios7src = n
                        }
                    }
                    e.style.backgroundImage = 'url("' + n + '")', e.style.backgroundPosition = s["object-position"] || "center", e.style.backgroundRepeat = "no-repeat", /scale-down/.test(s["object-fit"]) ? (e[c].i || (e[c].i = new Image, e[c].i.src = n), function t() {
                        return e[c].i.naturalWidth ? void(e[c].i.naturalWidth > e.width || e[c].i.naturalHeight > e.height ? e.style.backgroundSize = "contain" : e.style.backgroundSize = "auto") : void setTimeout(t, 100)
                    }()) : e.style.backgroundSize = s["object-fit"].replace("none", "auto").replace("fill", "100% 100%")
                }
            }

            function r(t) {
                var r = {
                    get: function() {
                        return t[c].s
                    },
                    set: function(r) {
                        return delete t[c].i, e(t, r), r
                    }
                };
                Object.defineProperty(t, "src", r), Object.defineProperty(t, "currentSrc", {
                    get: r.get
                })
            }

            function i() {
                u || (HTMLImageElement.prototype.getAttribute = function(t) {
                    return !this[c] || "src" !== t && "srcset" !== t ? f.call(this, t) : this[c][t + "Attr"]
                }, HTMLImageElement.prototype.setAttribute = function(t, e) {
                    !this[c] || "src" !== t && "srcset" !== t ? g.call(this, t, e) : this["src" === t ? "src" : t + "Attr"] = String(e)
                })
            }

            function s(t, r) {
                var i = !A && !t;
                if (r = r || {}, t = t || "img", u && !r.skipTest) return !1;
                "string" == typeof t ? t = document.querySelectorAll("img") : t.length || (t = [t]);
                for (var n = 0; n < t.length; n++) t[n][c] = t[n][c] || r, e(t[n]);
                i && (document.body.addEventListener("load", function(t) {
                    "IMG" === t.target.tagName && s(t.target, {
                        skipTest: r.skipTest
                    })
                }, !0), A = !0, t = "img"), r.watchMQ && window.addEventListener("resize", s.bind(null, t, {
                    skipTest: r.skipTest
                }))
            }
            var c = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                n = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
                o = new Image,
                l = "object-fit" in o.style,
                u = "object-position" in o.style,
                a = "string" == typeof o.currentSrc,
                f = o.getAttribute,
                g = o.setAttribute,
                A = !1;
            return s.supportsObjectFit = l, s.supportsObjectPosition = u, i(), s
        }();

        return objectFitImages();
    },
    sliceSlideBackground: function() {
        var slide = jQuery(".home .slideshow .slide");
        slide.each(function() {
            var bg = jQuery(this).css('background-image');
            bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            jQuery(this).append("<div class=\"slide-bg\" style=\"background-image: url(" + bg + ")\"></div>");
            jQuery(this).css({
                backgroundImage: "none"
            });
            jQuery(this).data("background-image", bg);
        });
    },
    onResize: function() {
        /* This function called everytime user change the screen size */
        app.heroCaptionPadding();
        app.detectMobile();
    },
    onOrientationChange: function() {
        app.heroCaptionPadding();
        app.detectMobile();
    },
    connectTeamPopup: function() {
        /* This will show change the popup text on connect team */
        jQuery(".connect-team .fancybox-thumb").click(function() {
            var name = jQuery(this).find(".team-name").text();
            var desc = jQuery(this).data("desc");
            var url = jQuery(this).data("url");
            var image = jQuery(this).find("img").attr("src");

            // Init to popup
            // name
            jQuery("#connect-team-popup").find(".name").text(name);
            // Desc
            jQuery("#connect-team-popup").find(".desc").html(desc);
            // url
            jQuery("#connect-team-popup").find(".url a").text(url).attr("href", "http://" + url);
            // Imaage
            jQuery("#connect-team-popup").find(".image img").attr("src", image);
        });
    },
    connectEventViewMore: function() {
        // Wrap last 2 item
        var lastItem = jQuery(".connect-events [class^=\"col-md-\"]:last-child");
        var lastTwoItem = lastItem.prev();
        var className = "event-item-wrapper";
        lastTwoItem.andSelf().wrapAll("<div class=\"" + className + "\"></div>").parent().hide();

        // Handle click
        var button = jQuery(".connect-events-view-more");
        var text = button.text();
        button.click(function() {
            if (!jQuery(this).hasClass("collapsed")) {
                jQuery(this).addClass("collapsed");
                jQuery(this).text("View less");

                // slideDown
                jQuery("." + className).show();
            } else {
                jQuery(this).removeClass("collapsed");
                jQuery(this).text(text);

                jQuery("." + className).hide();

                // Back to top
                var headerHeight = jQuery("#header").outerHeight();
                jQuery('html, body').animate({
                    scrollTop: jQuery(".connect-events").offset().top - headerHeight
                }, 500);

            }
            return false;
        });
    },
    detectIsHeroImageLoaded: function() {
        /*
         * Text on homepage hero need to have left padding dinamically set depending on
         * the width of vertical logo to avoid image stacked above the text
         * so first it need to detect if the image is loaded or not
         * we cannot get the image width if it is not fully loaded yet
         */
        if (!jQuery("body").hasClass("home")) {
            return false; // Only apply on homepage
        }
        var $img = jQuery(".hero .hero-logo"); // The image element
        var img = new Image();
        img.onload = function() {
            // If image is fully loaded. execute these:
            app.heroCaptionPadding(); // Add padding to text
            jQuery("body").addClass("hero-caption-padding-ready"); // Add class to tell padding on text is set
        }
        img.src = $img.attr('src');
    },
    animateHeroText: function() {
        /* Add class to tell if document is ready, which means jQuery is loaded */
        setTimeout(function() {
            jQuery("body").addClass("document-ready");
        }, 100);
    },
    detectMobile: function() {
        /* Detect if on mobile and add class to body */
        var isMobile = window.matchMedia("only screen and (max-width: 769px)");
        var isMobileLandscape = window.matchMedia("only screen and (max-width: 1024px) and (orientation: landscape)");

        if (isMobile.matches || isMobileLandscape.matches) {
            jQuery("body").addClass("is-on-mobile")
        } else {
            jQuery("body").removeClass("is-on-mobile")
        }
    },
    initParalax: function() {
        /* Add paralax to hero for each page */
        var paralaxElm = jQuery(".homepage .hero, .page-hero");
        if (!paralaxElm.length) {
            // Check if the element not found, dismiss function
            return false;
        }

        // Get the image source by reading the background-image of element
        var bg = paralaxElm.css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
        // Init jQuery pralax plugin
        paralaxElm.parallax({
            imageSrc: bg
        });
        // Add class to body to tell paralax is ready
        jQuery("body").addClass("paralax-active");
    },
    heroCaptionPadding: function() {
        /*
         * This function to calculate the amount of padding it need to
         * avoid hero logo stacked on the hero text
         */
        if (!jQuery("body").hasClass("home")) {
            // Only apply on homepage
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
        /*
         * Insert HTML of icon to toggle the bullet point on
         * Connect Approach section and handle the click event
         */
        var $list = jQuery(".connect-approach ul");
        $list.before("<i class=\"icon-plus-circled\">"); // Insert toogle bullet icon

        // Handle when click on icon
        jQuery(document).on("click", ".icon-plus-circled", function() {
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
        /* Init slideshow on homepage */
        jQuery('.connect-highlight .slideshow').cycle({
            speed: 1000,
            manualSpeed: 1000,
            slides: "> .slide",
            fx: "scrollHorz",
            next: "> .right",
            prev: "> .left",
            timeout: 10000,
            pauseOnHover: true
        });
    },
    fancyBoxInit: function() {
        /* Init lightbox on homepage */
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
        /* Handle the submenu anchor. Animating scrolling to element when anchor clicked */
        jQuery(".go-to-link, #connect-contact--team").click(function() {
            var target = jQuery(this).data("target"); // Get target from data-target
            var headerHeight = jQuery("#header").outerHeight();

            jQuery('html, body').animate({
                scrollTop: $(target).offset().top - headerHeight
            }, 500);

            return false;
        })
    },
    backToTopAnimation: function() {
        // Back to Top animation
        var button = "#back-to-top";
        jQuery(button).click(function(event) {
            event.preventDefault();
            jQuery('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    },
    onTopDetect: function() {
        /* Detect if user is on the top of the page */
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
    window.addEventListener("orientationchange", function() {
        app.onOrientationChange();
    }, false);
});
