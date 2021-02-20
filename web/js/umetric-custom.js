/*
Template: umetric - Modern Web Applications WordPress Theme
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
    jQuery(window).on('load', function(e) {


            /*------------------------
            Circle Chart
            --------------------------*/

            jQuery('.circlechart').circlechart(); // Initialization

            /*------------------------
            Page Loader
            --------------------------*/
            jQuery("#load").fadeOut();
            jQuery("#loading").delay(0).fadeOut("slow");

            /*------------------------
            Back To Top
            --------------------------*/
            jQuery('#back-to-top').fadeOut();
            jQuery(window).on("scroll", function() {
                if (jQuery(this).scrollTop() > 250) {
                    jQuery('#back-to-top').fadeIn(1400);
                } else {
                    jQuery('#back-to-top').fadeOut(400);
                }
            });

            // scroll body to 0px on click
            jQuery('#top').on('click', function() {
                jQuery('top').tooltip('hide');
                jQuery('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

            /*------------------------
            Header
            --------------------------*/
            //console.log(jQuery('header').hasClass('has-sticky'));
            if (jQuery('header').hasClass('has-sticky')) {


            function headerHeight() {
                var height = jQuery(".header1").height();
                jQuery('.iq-height').css('height', height + 'px');
            }

            jQuery(function() {
                var header = jQuery(".header1"),
                    yOffset = 0,
                    triggerPoint = 80;
                headerHeight();

                jQuery(window).resize(headerHeight);
                jQuery(window).on('scroll', function() {

                    yOffset = jQuery(window).scrollTop();

                    if (yOffset >= triggerPoint) {
                        header.addClass("menu-sticky animated slideInDown");
                    } else {
                        header.removeClass("menu-sticky animated slideInDown");
                    }

                });
            });



                jQuery(window).on('scroll', function() {
                    if (jQuery(this).scrollTop() > 10) {

                        jQuery('.has-sticky .logo').addClass('logo-display');
                    } else {

                        jQuery('.has-sticky .logo').removeClass('logo-display');
                    }
                });

            }

                     jQuery('.sub-menu').css('display', 'none');
            jQuery('.sub-menu').prev().addClass('isubmenu');
            jQuery(".sub-menu").before('<i class="fa fa-angle-down toggledrop" aria-hidden="true"></i>');


            jQuery('.widget .fa.fa-angle-down, #main .fa.fa-angle-down').on('click', function() {
                jQuery(this).next('.children, .sub-menu').slideToggle();
            });

            jQuery("#top-menu .menu-item .toggledrop").off("click");
            if (jQuery(window).width() < 992) {
                jQuery('#top-menu .menu-item .toggledrop').on('click', function(e) {
                    e.preventDefault();
                    jQuery(this).next('.children, .sub-menu').slideToggle();
                });
            }


        jQuery(window).on('resize', function() {
            "use strict";
            jQuery('.widget .fa.fa-angle-down, #main .fa.fa-angle-down').on('click', function() {
                jQuery(this).next('.children, .sub-menu').slideToggle();
            });

            jQuery("#top-menu .menu-item .toggledrop").off("click");
            if (jQuery(window).width() < 992) {
                jQuery('#top-menu .menu-item .toggledrop').on('click', function(e) {
                    e.preventDefault();
                    jQuery(this).next('.children, .sub-menu').slideToggle();
                });
            }
        });



            /*------------------------
            Wow Animation
            --------------------------*/
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();


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



        });





    jQuery(document).ready(function() {





        /*---------------------------
        Tabs
        ---------------------------*/
        jQuery(document).ready(function() {
            var a = jQuery('#iq-features .nav.nav-tabs').each(function() {
                var b = jQuery(this).find('a.active').addClass('active');
                activaTab(b);
            })
        });

        function activaTab(pill) {
            jQuery(pill).addClass('active show');
        };


        /*------------------------
                Searchstyle Bar
            --------------------------*/

            if (jQuery(".search__input").length > 0 && jQuery('.search').length > 0) {
                var openCtrl = document.getElementById('btn-search'),
                    closeCtrl = document.getElementById('btn-search-close'),
                    searchContainer = document.querySelector('.search'),
                    inputSearch = searchContainer.querySelector('.search__input');

                function init() {
                    initEvents();
                }

                function initEvents() {
                    openCtrl.addEventListener('click', openSearch);
                    closeCtrl.addEventListener('click', closeSearch);
                    document.addEventListener('keyup', function(ev) {
                        // escape key.
                        if (ev.keyCode === 27) {
                            closeSearch();
                        }
                    });
                }

                function openSearch() {
                    searchContainer.classList.add('search--open');
                    inputSearch.focus();
                }

                function closeSearch() {
                    searchContainer.classList.remove('search--open');
                    inputSearch.blur();
                    inputSearch.value = '';
                }

                init();
            }

        /*---------------------------
        Sidebar
        ---------------------------*/
        jQuery( "#menu-btn-side-open" ).click(function() {
            jQuery( "body" ).toggleClass("side-bar-open");

        });

        jQuery( "#menu-btn-side-close" ).click(function() {
            jQuery( "body" ).toggleClass("side-bar-open");
        });

         jQuery('body').mouseup(function (e) { 
            if (jQuery(e.target).closest(".iq-menu-side-bar").length === 0) { 
                jQuery( "body" ).removeClass("side-bar-open"); 
            } 
        });

        let options;
        let ScrollbarSidebar = window.Scrollbar; 

        jQuery(window).scroll(function() {    
            let scroll = jQuery(window).scrollTop();    
            if (scroll >= 10 && jQuery( "body" ).hasClass("side-bar-open")) {
                jQuery( "body" ).removeClass("side-bar-open");
            }
        });

        if (jQuery('#sidebar-scrollbar').length)
        {
            ScrollbarSidebar.init(document.querySelector('#sidebar-scrollbar'), {continuousScrolling: false} );
        }
        
        /*---------------------------
        Vertical Menu
        ---------------------------*/
        let ScrollbarMenu = window.Scrollbar;
        if (jQuery('#menu-sidebar-scrollbar').length){
            ScrollbarMenu.init(document.querySelector('#menu-sidebar-scrollbar'), {continuousScrolling: false});

        }
        if(jQuery('.vertical').length > 0 ){

            jQuery('.vertical ul .sub-menu').addClass('iq-has-sub-menu');
            jQuery('.vertical ul').removeClass('sub-menu');
            jQuery('#vertical-menu > li > ul').attr('data-parent','#vertical-menu');
           
            jQuery(".vertical li.menu-item-has-children").each(function() {

                
            let href = jQuery(this).find('a:first').attr('href');
            let id = href.replace('#','');

            if(id == '')
            { 
                id = 'menuId-'+Math.floor((Math.random() * 100000) + 1);
                jQuery(this).find('a:first').attr('href','#'+id);
            }

            jQuery(this).find('a:first').prepend( "<i class='fa fa-angle-right iq-arrow-right'></i>" );
            jQuery(this).find('a:first').attr('data-toggle','collapse');
            jQuery(this).find('a:first').attr('aria-expanded','false');
            jQuery(this).find('a:first').addClass('iq-waves-effect');
            jQuery(this).find('ul.iq-has-sub-menu:first').addClass('collapse');
            jQuery(this).find('ul.iq-has-sub-menu:first').attr('id',id);

            });

        }

        jQuery(document).on("click", '#vertical-menu > li > a', function() {
            jQuery('#vertical-menu > li > a').parent().removeClass('active');
            jQuery(this).parent().addClass('active');
            if(jQuery(this).hasClass('collapsed'))
            {
                jQuery(this).parent().removeClass('active');
            }
              
        });

        jQuery( "#vertical-menu-btn-close" ).click(function() {
            jQuery( "body" ).toggleClass("vertical-menu-close");

        });

        jQuery( "#vertical-menu-btn-open" ).click(function() {
            jQuery( "body" ).toggleClass("vertical-menu-close");
        });

         jQuery('body').mouseup(function (e) { 
            if (jQuery(e.target).closest(".style-vertical").length === 0) {
                  jQuery( "body" ).removeClass("vertical-menu-close");
            } 
        });

        /*---------------------------------------------------------------------
        Ripple Effect
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', ".iq-waves-effect", function(e) {
            // Remove any old one
            jQuery('.ripple').remove();
            // Setup
            let posX = jQuery(this).offset().left,
                posY = jQuery(this).offset().top,
                buttonWidth = jQuery(this).width(),
                buttonHeight = jQuery(this).height();

            // Add the element
            jQuery(this).prepend("<span class='ripple'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            let x = e.pageX - posX - buttonWidth / 2;
            let y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            jQuery(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });


    });
})(jQuery);
