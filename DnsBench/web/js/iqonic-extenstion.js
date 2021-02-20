/*
Template: Xamin - Data science WordPress landing Page
Author: iqonicthemes.in
Version: 1.0
Design and Developed by: iqonicthemes.in
*/

/*----------------------------------------------
Index Of Script
------------------------------------------------

1.Page Loader
2.Isotope
3.Masonry
4.Slick
5.Swiper
6.Progress Bar
7.Counter
8.Coming soon
6.Timer
7.Back To Top
8.Accordion
9.Magnific Popup
10.Owl Carousel
11.Wow Animation
12.Skrollr
13.Tab

------------------------------------------------
Index Of Script
----------------------------------------------*/
(function(jQuery) {

    "use strict";
    jQuery(document).ready(function() {

        jQuery(window).on('load', function(e) {

            
            
             /*------------------------
                 Tool tip
            --------------------------*/

                // set the wrapper width and height to match the img size
                jQuery('#iq-tooltip').css({'width':jQuery('#iq-tooltip img').width(),
                    'height':jQuery('#iq-tooltip img').height()
                });

                //   jQuery('.map-marker').tooltip({
                //     animated: 'fade',
                //     placement: 'top',    
                //     html: true,
                //     container: 'body'
                    
                // });

              jQuery(".dot").popover({ trigger: "manual" , html: true, animation:false})
                .on("mouseenter", function () {
                    var _this = this;
                    jQuery(this).popover("show");
                    jQuery(".popover").on("mouseleave", function () {
                        jQuery(_this).popover('hide');
                    });
                }).on("mouseleave", function () {
                    var _this = this;
                    setTimeout(function () {
                        if (!jQuery(".popover:hover").length) {
                            jQuery(_this).popover("hide");
                        }
                    }, 300);
            });
                
                //tooltip direction
                var tooltipDirection;

                             
                for (var i=0; i<jQuery(".pin").length; i++) {               
                    // set tooltip direction type - up or down    


                    if (jQuery(".pin").eq(i).hasClass('pin-down')) {
                        tooltipDirection = 'tooltip-down  tooltip-down-'+i;
                    } else {
                        tooltipDirection = 'tooltip-up';
                    }
                    // append the tooltip
                    jQuery("#iq-tooltip").append(
                        "<div style='left:"+jQuery(".pin").eq(i).data('xpos')+"px;top:"+jQuery(".pin").eq(i).data('ypos')+"px' class='" + tooltipDirection +"'>\
                                <div class='tooltip'>" + jQuery(".pin").eq(i).html() + "</div>\
                        </div>"
                    );
                }    
                
                // show/hide the tooltip
                jQuery('.tooltip-up, .tooltip-down').mouseenter(function() {
                            jQuery(this).children('.tooltip').fadeIn(100);
                        }).mouseleave(function(){
                            jQuery(this).children('.tooltip').fadeOut(100);
                });
            /*----------------
            Counter
            ---------------------*/
            jQuery('.timer').countTo();

            jQuery('#iq-timeline-horizontal-2.timeline').timeline({
                forceVerticalMode: 800,
                 mode: 'horizontal',
                visibleItems: 3,
            });

            jQuery('#iq-timeline-vertical-2.timeline ').timeline({
                forceVerticalMode: 800,
                 mode: 'vertical',
                visibleItems: 2,
            });

            /*------------------------
            Isotope
            --------------------------*/
            jQuery('.isotope').isotope({
                itemSelector: '.iq-grid-item',
            });

            /*------------------------------
            filter items on button click
            -------------------------------*/
            jQuery('.isotope-filters').on('click', 'button', function() {
                var filterValue = jQuery(this).attr('data-filter');
                jQuery('.isotope').isotope({
                    resizable: true,
                    filter: filterValue
                });
                jQuery('.isotope-filters button').removeClass('show active');
                jQuery(this).addClass('show active');
            });


            /*------------------------
            Masonry
            --------------------------*/
            var jQuerymsnry = jQuery('.iq-masonry-block .iq-masonry');
            if (jQuerymsnry) {
                var jQueryfilter = jQuery('.iq-masonry-block .isotope-filters');
                jQuerymsnry.isotope({
                    percentPosition: true,
                    resizable: true,
                    itemSelector: '.iq-masonry-block .iq-masonry-item',
                    masonry: {
                        gutterWidth: 0
                    }
                });
                // bind filter button click
                jQueryfilter.on('click', 'button', function() {
                    var filterValue = jQuery(this).attr('data-filter');
                    jQuerymsnry.isotope({
                        filter: filterValue
                    });
                });

                jQueryfilter.each(function(i, buttonGroup) {
                    var jQuerybuttonGroup = jQuery(buttonGroup);
                    jQuerybuttonGroup.on('click', 'button', function() {
                        jQuerybuttonGroup.find('.active').removeClass('active');
                        jQuery(this).addClass('active');
                    });
                });
            }

            /*------------------------
            Effect Box
            --------------------------*/

           jQuery(".effect-box .effect-btn").click(function() {
                jQuery(this).parent().toggleClass("main");
            });


            /*------------------------
            Progress Bar
            --------------------------*/
            jQuery('.iq-progress-bar > span').each(function() {
                var jQuerythis = jQuery(this);
                var width = jQuery(this).data('percent');
                jQuerythis.css({
                    'transition': 'width 2s'
                });
                setTimeout(function() {
                    jQuerythis.appear(function() {
                        jQuerythis.css('width', width + '%');
                    });
                }, 500);
            });

            ToxProgress.create();
            ToxProgress.animate();

          

            /*------------------------
            Accordion
            --------------------------*/
            jQuery('.iq-accordion .iq-accordion-block .accordion-details').hide();
            jQuery('.iq-accordion .iq-accordion-block:first').addClass('accordion-active').children().slideDown('slow');
            jQuery('.iq-accordion .iq-accordion-block').on("click", function() {
                if (jQuery(this).children('div.accordion-details ').is(':hidden')) {
                    jQuery('.iq-accordion .iq-accordion-block').removeClass('accordion-active').children('div.accordion-details ').slideUp('slow');
                    jQuery(this).toggleClass('accordion-active').children('div.accordion-details ').slideDown('slow');
                }
            });

           /*------------------------
            Accordion
            --------------------------*/
            jQuery('.iq-faq .iq-block .iq-details').hide();
            jQuery('.iq-faq .iq-block:first').addClass('iq-active').children().slideDown('slow');
            jQuery('.iq-faq .iq-block').on("click", function() {
                if (jQuery(this).children('div').is(':hidden')) {
                    jQuery('.iq-faq .iq-block').removeClass('iq-active').children('div').slideUp('slow');
                    jQuery(this).toggleClass('iq-active').children('div').slideDown('slow');
                }
            });
            /*------------------------
            Magnific Popup
            --------------------------*/
            jQuery('.popup-gallery').magnificPopup({
                delegate: 'a.popup-img',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                    }
                }
            });


            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });

            /*------------------------
            Owl Carousel
            --------------------------*/
            jQuery('.owl-carousel').each(function() {
                var jQuerycarousel = jQuery(this);
                jQuerycarousel.owlCarousel({
                    items: jQuerycarousel.data("items"),
                    loop: jQuerycarousel.data("loop"),
                    margin: jQuerycarousel.data("margin"),
                    stagePadding: jQuerycarousel.data("padding"),
                    nav: jQuerycarousel.data("nav"),
                    dots: jQuerycarousel.data("dots"),
                    autoplay: jQuerycarousel.data("autoplay"),
                    autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
                    navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
                    responsiveClass: true,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: jQuerycarousel.data("items-mobile-sm"),
                            nav: false,
                            dots: true
                        },
                        // breakpoint from 480 up
                        480: {
                            items: jQuerycarousel.data("items-mobile"),
                            nav: false,
                            dots: true
                        },
                        // breakpoint from 786 up
                        768: {
                            items: jQuerycarousel.data("items-tab")
                        },
                        // breakpoint from 1023 up
                        1023: {
                            items: jQuerycarousel.data("items-laptop")
                        },
                        1199: {
                            items: jQuerycarousel.data("items")
                        }
                    }
                });
            });

             /*------------------------
            Slick Slider
            --------------------------*/
            
            

            jQuery('.slider.slider-nav').on('swipe', function(event, slick, direction) {              
               
            });

            jQuery('.slider.slider-nav').on('afterChange', function(event, currentSlide) {                
                
                jQuery('.slick-current').prev().addClass('near-item');
                jQuery('.slick-current').next().addClass('near-item');
            });


            jQuery('.slider.slider-nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                
                jQuery('.slick-current').prev().removeClass('near-item');
                jQuery('.slick-current').next().removeClass('near-item');
            });

            

            jQuery('.slider.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                centerMode: true,
                focusOnSelect: true,
                asNavFor: '.slider-nav',

            });
            jQuery('.slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                centerPadding: '60',
                asNavFor: '.slider-for',
                dots: false,
                arrows: true,
                centerMode: true,
                focusOnSelect: true,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '30',
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '15',
                        slidesToShow: 1
                    }
                }],

            });

            jQuery('.slick-current').prev().addClass('near-item');
            jQuery('.slick-current').next().addClass('near-item');

             /*------------------------
             Background images  Effect
            --------------------------*/
            jQuery(".iq_background_list_wrapper").each(function() {
                var parentDiv = jQuery(this);

                parentDiv.children('.iq_background_list_column').hover(function() {
                    parentDiv.find('.iq_background_list_column').removeClass('hover');
                    parentDiv.find('.iq_background_img').removeClass('hover');
                    jQuery(this).next('.iq_background_img').addClass('hover');
                    jQuery(this).addClass('hover');

                });


            });
        /*------------------------
        Tabs
        --------------------------*/
        // jQuery(window).on('scroll', function(e) {
        //     var nav = jQuery('#pills-tab');
        //     if (nav.length) {
        //         var contentNav = nav.offset().top - window.outerHeight;
        //         if (jQuery(window).scrollTop() >= (contentNav)) {
        //             e.preventDefault();
        //             jQuery('#pills-tab li a').removeClass('active');
        //             jQuery('#pills-tab li a[aria-selected=true]').addClass('active');
        //         }
        //     }
        // });
        jQuery(window).on('scroll', function(e) {
            var nav = jQuery('#features');
            if (nav.length) {
                var contentNav = nav.offset().top - window.outerHeight;
                if (jQuery(window).scrollTop() >= (contentNav)) {
                    e.preventDefault();
                    jQuery('#features .row li a').removeClass('active');
                    jQuery('#features .row li a[aria-selected=true]').addClass('active');
                }
            }
        });

        /*---------------------------
        Tabs
        ---------------------------*/
        jQuery(document).ready(function(){
            var a=jQuery('.nav.nav-pills').each(function(){
                var b =jQuery(this).find('a.active').attr('href');
                activaTab(b);
            })
        });

        function activaTab(pill){
            jQuery(pill).addClass('active show');
        };

        jQuery('.nav.nav-pills').click(function(){
            jQuery('.nav.nav-pills').children('.tab-title-desc').slideDown('slow');
            
        });

        
             /*----------------
                    Count Down Timer
            ---------------------*/
                jQuery('.iq-data-countdown-timer').each(function() {

                    var future_date = jQuery(this).attr('data-date') ;
                    var label = jQuery(this).attr('data-labels') ;
                    var displayFormat = jQuery(this).attr('data-format') ;
                    var l=true;
                    if(label == "true")
                    {
                        l= true;
                    }
                    else
                    {
                        l = false;
                    }
                        jQuery(this).countdowntimer({
                        dateAndTime : future_date,
                        labelsFormat : l,                
                        displayFormat : displayFormat,

                    });
          
                }); 
        });

    });
          
    
})(jQuery);
