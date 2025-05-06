(function($) {
    "use strict";
    var $body = $("body"),
        $window = $(window),
        $document = $(document);
    var ST = {
        init: function() {
            this.headerSticky();
            this.sideToggler();
            this.switchClick();
            this.backTop();
        },
        headerSticky: function() {
            $.fn.fixedHeader = function(options) {
                var defaults = {
                    HeaderTarget: $(this)
                };
                options = $.extend(defaults, options);
                return this.each(function() {
                    var HeaderTarget = options.HeaderTarget;
                    var createSticky = function() {
                        var targetHeight = HeaderTarget.outerHeight();
                        function updatePadding() {
                            $("body").css({
                                "padding-top": targetHeight
                            });
                            $("aside").css({
                                "top": targetHeight
                            });
                        }
                        updatePadding();
                        $(window).on("resize", function() {
                            targetHeight = HeaderTarget.outerHeight();
                            updatePadding();
                        });
                    };
                    createSticky();
                });
            };
            $("header").fixedHeader();
        },
        sideToggler: function() {
            var $sideToggler = $("button.side-toggler"),
                $sideMenu = $("aside"),
                $sideMenuClose = $("button.side-menu-close-btn");
            $sideToggler.on("click", function() {
                $sideMenu.addClass("active");
            });
            $sideMenuClose.on("click", function() {
                $sideMenu.removeClass("active");
            });
        },
        switchClick: function() {
            var $switchClick = $(".theme-switch");
            $switchClick.on("click", function() {
                var $themeSwitch = $("#themeSwitch");
                if ($themeSwitch.is(":checked") == true) {
                    $(this).parents("html").attr("data-theme","light");
                } else {
                    $(this).parents("html").attr("data-theme","dark");
                }
            });
        },
        backTop: function() {
            var $back_top = $("#top"),
                $html_body = $("html, body");
            $window.scroll(function() {
                if($(this).scrollTop() > 600) {
                    $back_top.removeClass("opacity-0 invisible").addClass("opacity-100 visible");
                } else {
                    $back_top.addClass("opacity-0 invisible").removeClass("opacity-100 visible");
                }
            });
            $back_top.click(function() {
                $html_body.animate({
                    scrollTop: 0
                }, 100);
                return false;
            });
        }
    };
    ST.animateTemplate = {
        aDelay: 50,
        aQueue: [],
        aTimer: null,
        aBody: null,
        init: function() {
            var $at = this;
                $at.aBody = $body;
                $at.aQueue = [];
                $at.aTimer = null;
            if(typeof aDelay !== 'undefined') {
                $at.aDelay = aDelay;
            }
            $at.aQueue["animate__animated_0"] = [];
            $body.find("#main").find(">div, >section").each(function(index) {
                $(this).attr("data-animated-id", (index + 1));
                $at.aQueue["animate__animated_" + (index + 1)] = [];
            });
            setTimeout(function() {
                $at.registerAnimation();
            }, 200);
        },
        registerAnimation: function() {
            var $at = this;
            $("[data-animate]:not(.animate__animated)", $at.aBody).waypoint(function() {
                var $at_el = this.element ? this.element : this,
                    $this = $($at_el);
                if($this.is(":visible")) {
                    var $at_animated_wrap = $this.closest("[data-animated-id]"),
                        $at_animated_id = '0';
                    if($at_animated_wrap.length) {
                        $at_animated_id = $at_animated_wrap.data("animated-id");
                    }
                    $at.aQueue["animate__animated_" + $at_animated_id].push($at_el);
                    $at.processItemQueue();
                } else {
                    $this.addClass($this.data("animate")).addClass("animate__animated");
                }
            }, {
                offset: '90%',
                triggerOnce: true
            });
        },
        processItemQueue: function() {
            var $at = this;
            if($at.aTimer) {
                return;
            }
            $at.aTimer = window.setInterval(function() {
                var $at_queue = false;
                for(var $at_animated_id in $at.aQueue) {
                    if($at.aQueue[$at_animated_id].length) {
                        $at_queue = true;
                        break;
                    }
                }
                if($at_queue) {
                    for(var $at_animated_id in $at.aQueue) {
                        var $at_item = $($at.aQueue[$at_animated_id].shift());
                        $at_item.addClass($at_item.data("animate")).addClass("animate__animated");
                    }
                    $at.processItemQueue();
                } else {
                    window.clearInterval($at.aTimer);
                    $at.aTimer = null
                }
            }, $at.aDelay);
        }
    };
    document.addEventListener("DOMContentLoaded", () => {
        ST.init();
        ST.animateTemplate.init();
    });
})(jQuery);
