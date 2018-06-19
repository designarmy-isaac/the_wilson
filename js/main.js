/* eslint-env browser */
/* global $ */


$(document).ready(function () {
 
  $(document).on("mousemove", function (e) {

    var xPos = e.pageX,
      width = window.innerWidth,
      divisions = 2,
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

  /* Every time the window is scrolled ... */
  $(window).scroll(function () {

    /* Check the location of each desired element */
    $('.hide-me').each(function () {

      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {

        $(this).addClass('show');

      }

    });

  });

});

//background: linear-gradient(45deg, #f0f1f8 34%,#a1adff 77%,#000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */;