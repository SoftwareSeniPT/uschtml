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
    },
    wrapConnectTeam: function(){
      jQuery(".connect-team .fancybox-thumb img").wrap("<div class=\"image\"></div>");
    },
    onResize: function() {
        /* This function called everytime user change the screen size */
        app.heroCaptionPadding();
        app.detectMobile();
    },
    connectTeamPopup: function(){
      /* This will show change the popup text on connect team */
      jQuery(".connect-team .fancybox-thumb").click(function(){
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
        jQuery("#connect-team-popup").find(".url a").text(url).attr("href", url);
        // Imaage
        jQuery("#connect-team-popup").find(".image img").attr("src", image);
      });
    },
    connectEventViewMore: function() {
        // Wrap last 2 item
        var lastItem = jQuery(".connect-events [class^=\"col-md-\"]:last-child");
        var lastTwoItem = lastItem.prev();
        var className = "event-item-wrapper";
        lastTwoItem.andSelf().wrapAll("<div class=\""+className+"\"></div>").parent().hide();

        // Handle click
        var button = jQuery(".connect-events-view-more");
        var text = button.text();
        button.click(function(){
          if (!jQuery(this).hasClass("collapsed")){
            jQuery(this).addClass("collapsed");
            jQuery(this).text("View less");

            // slideDown
            jQuery("." + className).show();
          } else {
            jQuery(this).removeClass("collapsed");
            jQuery(this).text(text);

            jQuery("." + className).hide();
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
        var isMobile = window.matchMedia("only screen and (max-width: 760px)");

        if (isMobile.matches) {
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
        /* Init slideshow on homepage */
        jQuery('.connect-highlight .slideshow').cycle({
            speed: 1000,
            manualSpeed: 1000,
            slides: "> .slide",
            fx: "scrollHorz",
            next: "> .right",
            prev: "> .left",
            timeout: 6000
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
        jQuery("#single-page-scroll a").click(function() {
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
});
