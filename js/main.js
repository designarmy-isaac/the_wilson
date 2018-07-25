/*eslint-env browser*/
/*global $, _, fullpage_api, Parallax*/

$(document).ready(function () {
  'use strict';

  /**
   * Remove No JS and No Flash Of Unstyled Content classes
   */ 
  
  $('.no-fouc').removeClass('no-fouc');
  $('html').removeClass('no-js');
  
  /**
   * Init Parallax.js
   */

  var scene = document.getElementById('parallax-scene');
  new Parallax(scene);

  /**
   * Animate Gradient
   */

  $('#section-body-1').on("mousemove", function (e) {

    var xPos = e.pageX,
      width = window.innerWidth,
      divisions = 1,
      per = divisions * 100 * (xPos / width),
      a1 = 0,
      a2;

    function moveGradient(color) {
      return (color + per) % 100;
    }

    a2 = moveGradient(a1);

    $('.gradient-image').css({
      'background': 'linear-gradient(45deg, #f0f1f8 ' + a2 + '%,#a1adff 100%)'
    });

  });

  
 /**
   * Init Fullpage.js
   */
  
  $('#fullpage').fullpage({
    //options here
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    fitToSection: false,
    scrollBar: true,
    onSlideLeave: function (section, origin, destination, direction) {
      var e = section.item, // select section
        counter = $(e).find('.slide-counter'); // find section's slide counter
      counter.text(destination.index + 1);
      if ($(e).find('slide-caption')) {
        var $caption = $(e).find('.slide-caption');
        var t = $(destination.item).data('caption');
        $caption.text(t);
      }
    },
  });


  /**
   * Update Slideshow Slide Totals
   */

  var $slideshowSection1 = $('#section-body-1'),
      $slideshowSection2 = $('#section-body-2');

  function updateSlideshowTotal(e) {
    var n = e.find('.slide').length;
    e.find('.slide-total').text(n);
  }

  updateSlideshowTotal($slideshowSection1);
  updateSlideshowTotal($slideshowSection2);

  /**
   * Execute Changes Triggered by Scrolling
   */
  
  var $animateIn               = $('.hide-me'),
      $backgroundChangeAnchor1  = $('#background-change-anchor-1'),
      $backgroundChangeAnchor2  = $('#background-change-anchor-2'),
      $backgroundChangeAnchor3  = $('#background-change-anchor-3'),
      $header                   = $('.header'),
      $background               = $('#parallax-background');

  function doThisStuffOnScroll() {
    
    var top_of_window = $(window).scrollTop(),
      bottom_of_window = top_of_window + $(window).height(),
      middle_of_window = top_of_window + ((bottom_of_window - top_of_window) / 2);

    $animateIn.each(function () {
      /* Check the location of each desired element */
      var top_of_object = $(this).offset().top,
        bottom_of_object = top_of_object + $(this).outerHeight();
//        middle_of_object = top_of_object + ((bottom_of_object - top_of_object) / 2);

      /* If the object is completely visible in the window, fade it in */
      if (bottom_of_window > top_of_object + 40 && top_of_window < bottom_of_object - 20) {
        $(this).addClass('show');
      } else {
        $(this).removeClass('show');
      }

    });
    
    checkBackgroundAnchor1(top_of_window, middle_of_window);
    checkBackgroundAnchor3(top_of_window);
    checkHeader(top_of_window);

  }
  
  function checkBackgroundAnchor1(top_of_window, middle_of_window) {
    if (($backgroundChangeAnchor1.offset().top < top_of_window) ? !($backgroundChangeAnchor2.offset().top < middle_of_window) : ($backgroundChangeAnchor2.offset().top < middle_of_window)) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  }
  
  function checkBackgroundAnchor3(top_of_window) {
         if ($backgroundChangeAnchor3.offset().top < top_of_window) {
      $background.addClass('opacity-zero');
    } else {
      $background.removeClass('opacity-zero');
    }
  }
  
  function checkHeader(top_of_window) {
    if ($header.offset().top == top_of_window) {
      $header.addClass('top');
    } else {
      $header.removeClass('top');
    }
  }
  
  doThisStuffOnScroll();
  window.addEventListener('scroll', _.throttle(doThisStuffOnScroll, 200, {
    trailing: true,
    leading: true
  }));
  
});

