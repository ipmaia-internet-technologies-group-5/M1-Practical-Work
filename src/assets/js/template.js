// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function($) {
    "use strict"

    /* 1. sticky And Scroll UP */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
            $(".header-sticky").removeClass("sticky-bar");
            $('#back-top').fadeOut(500);
        } else {
            $(".header-sticky").addClass("sticky-bar");
            $('#back-top').fadeIn(500);
        }
    });

    // Scroll Up
    $('#back-top a').on("click", function() {
        $('body,html').animate({
            scrollTop: 0
        }, 100);
        return false;
    });


    /* 2. slick Nav */
    // mobile_menu
    var menu = $('ul#navigation');
    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: '+',
            openedSymbol: '-'
        });
    };


    /* 3. MainSlider-1 */
    // h1-hero-active
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 8000,
            dots: true,
            fade: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false
                    }
                }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();


    // 4. Single Img slder
    $('.services1-active').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 400,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
        ]
    });

    /* 5. Testimonial Active*/
    var testimonial = $('.h1-testimonial-active');
    if (testimonial.length) {
        testimonial.slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            loop: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrow: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }
            ]
        });
    }


    /* 6. Nice Selectorp  */
    var nice_Select = $('select');
    if (nice_Select.length) {
        nice_Select.niceSelect();
    }

    /* 7. data-background */
    $("[data-background]").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });

    // 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
    if (popUp.length) {
        popUp.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    // 12 Pop Up Video
    var popUp = $('.popup-video');
    if (popUp.length) {
        popUp.magnificPopup({
            type: 'iframe'
        });
    }


    // Contact Form

    jQuery.validator.addMethod('answercheck', function(value, element) {
        return this.optional(element) || /^\\bcat\\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                first_name: {
                    required: true,
                    minlength: 2
                },
                last_name: {
                    required: true,
                    minlength: 2
                },
                name: {
                    required: true,
                    minlength: 2
                },
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                first_name: {
                    required: "come on, you have a first name, don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                last_name: {
                    required: "come on, you have a last name, don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                name: {
                    required: "come on, you have a name, don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                subject: {
                    required: "come on, you have a subject, don't you?",
                    minlength: "your subject must consist of at least 4 characters"
                },
                number: {
                    required: "come on, you have a number, don't you?",
                    minlength: "your Number must consist of at least 5 characters"
                },
                email: {
                    required: "you must have a email, don't you?"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo("slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    });


    const counterUp = window.counterUp.default;

    const callback = entries => {
        entries.forEach(entry => {
            const el = entry.target
            if (entry.isIntersecting && !el.classList.contains('is-visible')) {
                counterUp(el, {
                    duration: 2000,
                    delay: 16,
                })
                el.classList.add('is-visible')
            }
        })
    }

    const IO = new IntersectionObserver(callback, { threshold: 1 });

    Array.from(document.getElementsByClassName('counter')).forEach((element) => {
        IO.observe(element);
    });

    $("form:not(#contactForm)").submit(function(e) {
        alert("Currently unavailable, please try later.");
        e.preventDefault();
    });

    /* Easter Egg */
    const easterEggElement = document.getElementById("easter_egg");

    easterEggElement.addEventListener("click", function() {
        easterEggElement.innerHTML = "";

        const img = document.createElement("img");

        img.width = 100;
        img.src = "assets/img/easter-egg.png";

        easterEggElement.appendChild(img);
    });


})(jQuery);