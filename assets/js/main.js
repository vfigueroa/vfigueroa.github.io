/**
* Template Name: Personal - v2.2.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

// Typed Text from https://usefulangle.com/post/75/typing-effect-animation-javascript-css
  // List of sentences
  var _CONTENT = [
  "Determined",
  "Passionate",
  "Inovative",
  "Learning Every Day",
  "a Student",
  "a Software Engineer",
  "Victor Figueroa",
  ];

  // Current sentence being processed
  var _PART = 0;

  // Character number of the current sentence being processed
  var _PART_INDEX = 0;

  // Holds the handle returned from setInterval
  var _INTERVAL_VAL;

  // Element that holds the text
  var _ELEMENT = document.querySelector("#text");

  // Implements typing effect
  function Type() {
    // Get substring with 1 characater added
    var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if(text === _CONTENT[_PART]) {
      // Hide the cursor

      clearInterval(_INTERVAL_VAL);
      setTimeout(function() {
        _INTERVAL_VAL = setInterval(Delete, 50);
      }, 1000);
    }
  }

  // Implements deleting effect
  function Delete() {
    // Get substring with 1 characater deleted
    var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX--;

    // If sentence has been deleted then start to display the next sentence
    if(text === '') {
      clearInterval(_INTERVAL_VAL);

      // If current sentence was last then display the first one, else move to the next
      if(_PART == (_CONTENT.length - 1))
        _PART = 0;
      else
        _PART++;

      _PART_INDEX = 0;

      // Start to display the next sentence after some time
      setTimeout(function() {
        _INTERVAL_VAL = setInterval(Type, 100);
      }, 200);
    }
  }

  // Start the typing effect on load
  _INTERVAL_VAL = setInterval(Type, 100);

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);
