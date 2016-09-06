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
        // app.checkIfOldIE();
        app.submenuToggle();
        app.browserDetect.init(function(info){
          console.log("Info", info);
        });
    },
    submenuToggle: function() {
        function checkIfOpen(elm, notOpen, open) {
            if (!jQuery(elm).hasClass("opened")) {
                jQuery(elm).addClass("opened");
                notOpen();
            } else {
                jQuery(elm).removeClass("opened");
                open();
            }
        }

        jQuery("#navbar .menu > li:first-child").click(function() {
            if (!app.detectMobileCore()) {
                return false;
            }

            var $self = this;
            checkIfOpen($self, function() {
                jQuery($self).addClass("opened");
            }, function() {
                jQuery($self).removeClass("opened");
            });

            return false;
        });

        // Close submenu when click outside the submenuToggle
        jQuery(document).on('click', function(e) {
            var elm = "#navbar .menu > li:first-child";
            if (jQuery(e.target).closest(elm).length === 0) {
                app.closeSubmenu();
            }
        });
    },
    checkIfOldIE: function() {
        if (isOnOldIE) {
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
            var e = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
            var t = /(object-fit|object-position)\s*:\s*([^;$"'\s]+)/g;
            var i = "object-fit" in document.createElement("i").style;
            var n = false;

            function r(e) {
                var i = getComputedStyle(e).fontFamily;
                var n;
                var r = {};
                while ((n = t.exec(i)) !== null) {
                    r[n[1]] = n[2]
                }
                return r
            }

            function o(t, i) {
                var n = r(t);
                if (!n["object-fit"] || n["object-fit"] === "fill") {
                    return
                }
                i = i || t.currentSrc || t.src;
                if (t.srcset) {
                    t.srcset = ""
                }
                if (!t[e]) {
                    t.src = e;
                    a(t)
                }
                t[e] = t[e] || {
                    s: i
                };
                t.style.backgroundImage = "url(" + i + ")";
                t.style.backgroundPosition = n["object-position"] || "center";
                t.style.backgroundRepeat = "no-repeat";
                if (n["object-fit"].indexOf("scale-down") < 0) {
                    t.style.backgroundSize = n["object-fit"].replace("none", "auto")
                } else {
                    if (!t[e].i) {
                        t[e].i = new Image;
                        t[e].i.src = i
                    }(function o() {
                        if (t[e].i.naturalWidth) {
                            if (t[e].i.naturalWidth > t.width || t[e].i.naturalHeight > t.height) {
                                t.style.backgroundSize = "contain"
                            } else {
                                t.style.backgroundSize = "auto"
                            }
                            return
                        }
                        setTimeout(o, 100)
                    })()
                }
            }

            function a(t) {
                var i = {
                    get: function() {
                        return t[e].s
                    },
                    set: function(i) {
                        delete t[e].i;
                        return o(t, i)
                    }
                };
                Object.defineProperty(t, "src", i);
                Object.defineProperty(t, "currentSrc", {
                    get: i.get
                })
            }

            function c(e) {
                window.addEventListener("resize", f.bind(null, e))
            }

            function u(e) {
                if (e.target.tagName === "IMG") {
                    o(e.target)
                }
            }

            function f(e, t) {
                if (i) {
                    return false
                }
                var r = !n && !e;
                t = t || {};
                e = e || "img";
                if (typeof e === "string") {
                    e = document.querySelectorAll("img")
                } else if (!e.length) {
                    e = [e]
                }
                for (var a = 0; a < e.length; a++) {
                    o(e[a])
                }
                if (r) {
                    document.body.addEventListener("load", u, true);
                    n = true;
                    e = "img"
                }
                if (t.watchMQ) {
                    c(e)
                }
            }
            return f
        }();
        objectFitImages();
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
    detectMobileCore: function() {
        if (window.matchMedia === undefined) {
          return;
        }

        var isMobile = window.matchMedia("only screen and (max-width: 769px)");
        var isMobileLandscape = window.matchMedia("only screen and (max-width: 1024px) and (orientation: landscape)");

        if (isMobile.matches || isMobileLandscape.matches) {
            return true;
        }
        return false;
    },
    detectMobile: function() {
        if (app.detectMobileCore()) {
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
            imageSrc: bg,
            positionY: "top"
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
    closeSubmenu: function() {
        jQuery("#navbar .menu > li:first-child").removeClass("opened");
    },
    singlePageScroll: function() {
        /* Handle the submenu anchor. Animating scrolling to element when anchor clicked */
        jQuery(".go-to-link, #connect-contact--team").click(function() {
            var target = jQuery(this).data("target"); // Get target from data-target
            var headerHeight = jQuery("#header").outerHeight();

            // Close if submenu is opened
            app.closeSubmenu();

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
    },
    browserDetect: {
        init: function (callback) {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
            callback({browser: this.browser, version: this.version});
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },
        dataBrowser: [
            {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
            {string: navigator.userAgent, subString: "OPR", identity: "Opera"},
            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
        ]
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
