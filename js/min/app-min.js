var app={init:function(){app.initHomeCycle(),app.fancyBoxInit(),app.singlePageScroll(),app.backToTopAnimation(),app.onTopDetect(),app.connectApproachPointToggle(),app.heroCaptionPadding(),app.initParalax(),app.animateHeroText(),app.detectMobile(),app.detectIsHeroImageLoaded(),app.connectEventViewMore(),app.connectTeamPopup(),app.wrapConnectTeam(),app.sliceSlideBackground(),app.objectFitPolyfill(),app.checkIfOldIE(),app.submenuToggle()},submenuToggle:function(){function e(e,t,n){jQuery(e).hasClass("opened")?(jQuery(e).removeClass("opened"),n()):(jQuery(e).addClass("opened"),t())}jQuery("#navbar .menu > li:first-child").click(function(){if(!app.detectMobileCore())return!1;var t=this;return e(t,function(){jQuery(t).addClass("opened")},function(){jQuery(t).removeClass("opened")}),!1}),jQuery(document).on("click",function(e){var t="#navbar .menu > li:first-child";0===jQuery(e.target).closest(t).length&&app.closeSubmenu()})},checkIfOldIE:function(){app.browserDetect.init(function(e){"Explorer"===e.browser&&e.version<10&&jQuery(".browser-disclaimer").show()}),jQuery(".browser-disclaimer a").click(function(){return jQuery(".browser-disclaimer").hide(),!1})},wrapConnectTeam:function(){jQuery(".connect-team .fancybox-thumb img").wrap('<div class="image"></div>')},objectFitPolyfill:function(){if(void 0!==window.getComputedStyle&&void 0!==window.addEventListener){var e=function(){"use strict";function e(e){for(var t=getComputedStyle(e).fontFamily,n,r={};null!==(n=c.exec(t));)r[n[1]]=n[2];return r}function t(t,r){var i=e(t);i["object-fit"]&&"fill"!==i["object-fit"]&&(r=r||t.currentSrc||t.src,t.srcset&&(t.srcset=""),t[a]||(t.src=a,n(t)),t[a]=t[a]||{s:r},t.style.backgroundImage="url("+r+")",t.style.backgroundPosition=i["object-position"]||"center",t.style.backgroundRepeat="no-repeat",i["object-fit"].indexOf("scale-down")<0?t.style.backgroundSize=i["object-fit"].replace("none","auto"):(t[a].i||(t[a].i=new Image,t[a].i.src=r),function o(){return t[a].i.naturalWidth?void(t[a].i.naturalWidth>t.width||t[a].i.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"):void setTimeout(o,100)}()))}function n(e){var n={get:function(){return e[a].s},set:function(n){return delete e[a].i,t(e,n)}};Object.defineProperty(e,"src",n),Object.defineProperty(e,"currentSrc",{get:n.get})}function r(e){window.addEventListener("resize",o.bind(null,e))}function i(e){"IMG"===e.target.tagName&&t(e.target)}function o(e,n){if(s)return!1;var o=!u&&!e;n=n||{},e=e||"img","string"==typeof e?e=document.querySelectorAll("img"):e.length||(e=[e]);for(var a=0;a<e.length;a++)t(e[a]);o&&(document.body.addEventListener("load",i,!0),u=!0,e="img"),n.watchMQ&&r(e)}var a="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",c=/(object-fit|object-position)\s*:\s*([^;$"'\s]+)/g,s="object-fit"in document.createElement("i").style,u=!1;return o}();e()}},sliceSlideBackground:function(){var e=jQuery(".home .slideshow .slide");e.each(function(){var e=jQuery(this).css("background-image");e=e.replace("url(","").replace(")","").replace(/\"/gi,""),jQuery(this).append('<div class="slide-bg" style="background-image: url('+e+')"></div>'),jQuery(this).css({backgroundImage:"none"}),jQuery(this).data("background-image",e)})},onResize:function(){app.heroCaptionPadding(),app.detectMobile()},onOrientationChange:function(){app.heroCaptionPadding(),app.detectMobile()},connectTeamPopup:function(){jQuery(".connect-team .fancybox-thumb").click(function(){var e=jQuery(this).find(".team-name").text(),t=jQuery(this).data("desc"),n=jQuery(this).data("url"),r=jQuery(this).find("img").attr("src");jQuery("#connect-team-popup").find(".name").text(e),jQuery("#connect-team-popup").find(".desc").html(t),jQuery("#connect-team-popup").find(".url a").text(n).attr("href","http://"+n),jQuery("#connect-team-popup").find(".image img").attr("src",r)})},connectEventViewMore:function(){var e=jQuery('.connect-events [class^="col-md-"]:last-child'),t=e.prev(),n="event-item-wrapper";t.andSelf().wrapAll('<div class="'+n+'"></div>').parent().hide();var r=jQuery(".connect-events-view-more"),i=r.text();r.click(function(){if(jQuery(this).hasClass("collapsed")){jQuery(this).removeClass("collapsed"),jQuery(this).text(i),jQuery("."+n).hide();var e=jQuery("#header").outerHeight();jQuery("html, body").animate({scrollTop:jQuery(".connect-events").offset().top-e},500)}else jQuery(this).addClass("collapsed"),jQuery(this).text("View less"),jQuery("."+n).show();return!1})},detectIsHeroImageLoaded:function(){if(!jQuery("body").hasClass("home"))return!1;var e=jQuery(".hero .hero-logo"),t=new Image;t.onload=function(){app.heroCaptionPadding(),jQuery("body").addClass("hero-caption-padding-ready")},t.src=e.attr("src")},animateHeroText:function(){setTimeout(function(){jQuery("body").addClass("document-ready")},100)},detectMobileCore:function(){if(void 0!==window.matchMedia){var e=window.matchMedia("only screen and (max-width: 769px)"),t=window.matchMedia("only screen and (max-width: 1024px) and (orientation: landscape)");return!(!e.matches&&!t.matches)}},detectMobile:function(){app.detectMobileCore()?jQuery("body").addClass("is-on-mobile"):jQuery("body").removeClass("is-on-mobile")},initParalax:function(){var e=jQuery(".homepage .hero, .page-hero");if(!e.length)return!1;var t=e.css("background-image");t=t.replace("url(","").replace(")","").replace(/\"/gi,""),e.parallax({imageSrc:t,positionY:"top"}),jQuery("body").addClass("paralax-active")},heroCaptionPadding:function(){if(!jQuery("body").hasClass("home"))return!1;var e=jQuery(".hero-wrapper .container"),t=jQuery(".hero-logo"),n=t.outerWidth(),r=e.outerWidth(),i=e.offset().left,o=50;if(n>i){var a=n-i+o;e.css({paddingLeft:a})}else e.css({paddingLeft:o})},connectApproachPointToggle:function(){var e=jQuery(".connect-approach ul");e.before('<i class="icon-plus-circled">'),jQuery(document).on("click",".icon-plus-circled",function(){jQuery(this).hasClass("opened")?(jQuery(this).removeClass("opened"),jQuery(this).next().slideUp()):(jQuery(this).addClass("opened"),jQuery(this).next().slideDown())})},initHomeCycle:function(){jQuery(".connect-highlight .slideshow").cycle({speed:1e3,manualSpeed:1e3,slides:"> .slide",fx:"scrollHorz",next:"> .right",prev:"> .left",timeout:1e4,pauseOnHover:!0})},fancyBoxInit:function(){jQuery(".fancybox-thumb").fancybox({prevEffect:"none",nextEffect:"none",closeBtn:!0,helpers:{title:{type:"inside"},buttons:{}}})},closeSubmenu:function(){jQuery("#navbar .menu > li:first-child").removeClass("opened")},singlePageScroll:function(){jQuery(".go-to-link, #connect-contact--team").click(function(){var e=jQuery(this).data("target"),t=jQuery("#header").outerHeight();return app.closeSubmenu(),jQuery("html, body").animate({scrollTop:$(e).offset().top-t},500),!1})},backToTopAnimation:function(){var e="#back-to-top";jQuery(e).click(function(e){e.preventDefault(),jQuery("html,body").animate({scrollTop:0},500)})},onTopDetect:function(){jQuery(window).scroll(function(){var e=jQuery(document).scrollTop();e>0?jQuery("body").addClass("not-on-top"):jQuery("body").removeClass("not-on-top")})},browserDetect:{init:function(e){this.browser=this.searchString(this.dataBrowser)||"Other",this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"Unknown",e({browser:this.browser,version:this.version})},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;if(this.versionSearchString=e[t].subString,-1!==n.indexOf(e[t].subString))return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(-1!==t){var n=e.indexOf("rv:");return"Trident"===this.versionSearchString&&-1!==n?parseFloat(e.substring(n+3)):parseFloat(e.substring(t+this.versionSearchString.length+1))}},dataBrowser:[{string:navigator.userAgent,subString:"Edge",identity:"MS Edge"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer"},{string:navigator.userAgent,subString:"Trident",identity:"Explorer"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Opera",identity:"Opera"},{string:navigator.userAgent,subString:"OPR",identity:"Opera"},{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"Safari",identity:"Safari"}]}};jQuery(document).ready(function(){app.init(),jQuery(window).resize(function(){app.onResize()}),window.addEventListener("orientationchange",function(){app.onOrientationChange()},!1)});