/*eslint-env browser*/
/*global $, fullpage_api, Parallax*/

$(document).ready(function () {
  'use strict';
  
  $('html').removeClass('no-js');
  
  $('#fullpage').fullpage({
		//options here
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    fitToSection: false,
//    controlArrows: false,
//    scrollOverflow: true
    scrollBar: true,
    onSlideLeave: function(section, origin, destination, direction){
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
  
  // SLIDESHOWS
  
  var $slideshowSection1 = $('#section-body-1'),
    $slideshowSection2 = $('#section-body-2');
  
  function updateSlideshowTotal(e) {
    var n = e.find('.slide').length;
    e.find('.slide-total').text(n);
  }
  
  updateSlideshowTotal($slideshowSection1);
  updateSlideshowTotal($slideshowSection2);
  
//  $('.slide-control').click(function(){
//    fullpage_api.moveSlideLeft();
//  });
  
  
//  function updateSlideCounter1() {
//    $('#slide-counter-1').text(fullpage_api.getActiveSlide().index + 1);
//  }
//  
////  function updateSlideCaption1() {
////    var t = $('.slide1.active').data("caption");
////    $('#slide-caption-1').text(t);
////  }
//
//  $('#slide-show-1 .slide-control-left').click(function(){
//    fullpage_api.moveSlideLeft();
//    updateSlideCounter1();
//  });
//  $('#slide-show-1 .slide-control-right').click(function(){
//    fullpage_api.moveSlideRight();
//    updateSlideCounter1();
//  });
//  
//  // SLIDESHOW 2
//  
//  function updateSlideCounter2() {
//    $('#slide-counter-2').text(fullpage_api.getActiveSlide().index + 1);
//  }
//  
//  function updateSlideCaption2() {
//    var t = $('.slide2.active').data("caption");
//    $('#slide-caption-2').text(t);
//  }
//
//  $('#slide-show-2 .slide-control-left').click(function(){
//    fullpage_api.moveSlideLeft();
//    updateSlideCounter2();
//    updateSlideCaption2();
//  });
//  $('#slide-show-2 .slide-control-right').click(function(){
//    fullpage_api.moveSlideRight();
//    updateSlideCounter2();
//    updateSlideCaption2();
//  });

  // PARALLAX
  
  var scene = document.getElementById('scene');
  new Parallax(scene);

  // GRADIENT ANIMATIONS
  
  $(document).on("mousemove", function (e) {

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

  // ANIMATE IN
    
  var $hideMe = $('.hide-me'),
      $backgroundChangeAnchor = $('#section-body-1');
  
  function animateMe() {
    $hideMe.each(function () {
      /* Check the location of each desired element */
     var top_of_window = $(window).scrollTop(),
         bottom_of_window = top_of_window + $(window).height();
      
      var top_of_object = $(this).offset().top,
        bottom_of_object = top_of_object + $(this).outerHeight();

      /* If the object is completely visible in the window, fade it in */
      if (bottom_of_window > top_of_object + 30 && top_of_object + 20 > top_of_window) {

        $(this).addClass('show');

      } else {
        
        $(this).removeClass('show');
      
      }
      
      if ($backgroundChangeAnchor.offset().top < bottom_of_window) {
        $('body').addClass('scrolled');
      } else {
        $('body').removeClass('scrolled');
      }

    });
    
  }
  
  animateMe();
  $(window).scroll(animateMe);
  
});

//background: linear-gradient(45deg, #f0f1f8 34%,#a1adff 77%,#000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */;