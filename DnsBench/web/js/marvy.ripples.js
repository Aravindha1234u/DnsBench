(function( $ ) {
    'use strict';
    var previousRipple = {};
    var styleRipple = document.createElement('style');
    var sheetRipple = document.head.appendChild(styleRipple).sheet;
    var i, j, hw_gap, left, right, top, bottom, eleft, eright, etop, ebottom;
    var VisualRipplesAnimation = {
        initRipples: function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/section', VisualRipplesAnimation.initRipplesWidget);
        },
        initRipplesWidget: function ($scope) {
            var sectionId = $scope.data('id');
            var target = '.elementor-element-' + sectionId;
            var settings = {};
            if (window.isEditMode || window.elementorFrontend.isEditMode()) {
                var editorElements = null;
                var rippleAnimationArgs = {};

                if (!window.elementor.hasOwnProperty('elements')) {
                    return false;
                }

                editorElements = window.elementor.elements;

                if (!editorElements.models) {
                    return false;
                }

                $.each(editorElements.models, function (i, el) {
                    if (sectionId === el.id) {
                        rippleAnimationArgs = el.attributes.settings.attributes;
                    } else if (el.id === $scope.closest('.elementor-top-section').data('id')) {
                        $.each(el.attributes.elements.models, function (i, col) {
                            $.each(col.attributes.elements.models, function (i, subSec) {
                                rippleAnimationArgs = subSec.attributes.settings.attributes;
                            });
                        });
                    }
                    settings.switch = rippleAnimationArgs.marvy_enable_ripples_animation;
                    settings.color = rippleAnimationArgs.marvy_ripples_animation_circle_color;
                    settings.gap = rippleAnimationArgs.marvy_ripples_animation_circle_gap;
                    settings.position = rippleAnimationArgs.marvy_ripples_animation_circle_position;
                });

            } else {
                settings.switch = $scope.data("marvy_enable_ripples_animation");
                settings.color = $scope.data("marvy_ripples_animation_circle_color");
                settings.position = $scope.data("marvy_ripples_animation_circle_position");
            }

            if (settings.switch) {
                var sectionKey = 'ripple-'+sectionId;
                if (!previousRipple.hasOwnProperty(sectionKey)){
                    previousRipple[sectionKey] = settings;
                }

                var result = rippleAnimation(target, settings, sectionId, sectionKey);
                if (result){

                    previousRipple[sectionKey] = settings;
                }
            } else {
                previousRipple = {};
                if (sheetRipple.cssRules.length !== 0){
                    for (var j = sheetRipple.cssRules.length - 1; j >= 0; j--) {
                        if(sheetRipple.cssRules[j].selectorText.includes(sectionId) ){
                            sheetRipple.deleteRule(j);
                        }
                    }
                }
            }
        }
    };

    function addRule(selector, css, i) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheetRipple.insertRule(selector + "{" + propText + "}", i);
    }

    function rippleAnimation(target,settings,sectionId, sectionKey) {
        var checkElement = document.getElementsByClassName("marvy-ripples-section-" + sectionId);
        if (checkElement.length >= 0) {

            var ripple_div = document.createElement('div');
            var delay_duration = 0.3;
            ripple_div.classList.add("marvy-ripples-section-" + sectionId);
            document.querySelector(target).appendChild(ripple_div);
            document.querySelector(target).classList.add("marvy-custom-ripples-animation-section-" + sectionId);

            // Set Z-index for section container
            var ripplesZindex = document.querySelector('.marvy-custom-ripples-animation-section-'+sectionId+' .elementor-container');
            ripplesZindex.style.zIndex = '99';

            // Set min height
            var ripplesMinHeight = document.querySelector(".elementor-element-"+sectionId);
            ripplesMinHeight.closest('.elementor-top-section').style.minHeight = "400px";

            hw_gap = 300;
            left = right = top = bottom = eleft = eright = etop = ebottom = 'unset';

            if (settings.position === 'left') {
                left = 0; top = 350;  eleft = etop = 1;
            } else if (settings.position === 'top') {
                top = 0; left = 750; eleft = etop = 1;
            } else if (settings.position === 'right') {
                right = 0; top = 350; eright = etop = 1;
            } else if (settings.position === 'bottom') {
                bottom=0; left = 750; eleft = ebottom = 1;
            } else if (settings.position === 'topLeft') {
                top=left=0;eleft = etop = 1;
            } else if (settings.position === 'topRight') {
                eright = etop = 1;top=right=0;
            } else if (settings.position === 'bottomRight') {
                eright = ebottom = 1;right=bottom =0;
            } else if (settings.position === 'bottomLeft') {
                eleft = ebottom = 1; left=bottom =0;
            }

            i = 0;
            var appendRule = true;
            while (i <= 4){
                var child_div_el = document.createElement('div');
                child_div_el.classList.add("marvy-ripples-circle-" + sectionId + '-' + i);
                document.querySelector(".marvy-ripples-section-" + sectionId).appendChild(child_div_el);

                if (JSON.stringify(previousRipple[sectionKey]) !== JSON.stringify(settings)){
                    appendRule = false;
                    for (j = sheetRipple.cssRules.length-1; j >= 0; j--) {
                        if(sheetRipple.cssRules[j].selectorText.includes(sectionId) ){
                            sheetRipple.deleteRule(j);
                        }
                        if (j === 0){
                            appendRule = true;
                            previousRipple[sectionKey] = settings;
                        }
                    }
                }

                if(appendRule){
                    addRule(".marvy-ripples-circle-" + sectionId + '-' + i, {
                        width: (hw_gap * (i+1)) + 'px',
                        height: (hw_gap * (i+1)) + 'px',
                        left: left - (150 * (i+1) * eleft) + 'px',
                        top: top - (150 * (i+1) * etop) + 'px',
                        bottom: bottom - (150 * (i+1) * ebottom) + 'px',
                        right: right - (150 * (i+1) * eright) + 'px',
                        "animation-delay": (delay_duration * (i+1)) + 's',
                        background: settings.color,
                        "z-index": 1
                    },i);
                    i++;
                }
            }
        }
        return true;
    }

    $( window ).on('elementor/frontend/init', VisualRipplesAnimation.initRipples);
})( jQuery );

