/* ==========================================================================

    Project: test
    Author: XHTMLized
    Last updated: @@timestamp

   ========================================================================== */

(function($) {

  'use strict';

  var App = {

    /**
     * Init Function
     */
    init: function() {
      App.addClickableHeader();
      App.addColorboxSlideShow();
    },

    /**
     * Add Clickable Header on mobile size
     */
    addClickableHeader: function() {
      
      var newsContainer = $('.widget-news');
      newsContainer.find('header .col-6').on("click", function(){
        if( $(window).width() < 768 ) {
          var $clickedItem = $(this);
          if( !$clickedItem.hasClass('active') ) {
            var idTabToOpen = $clickedItem.attr('data-href');
            var $tabToOpen = newsContainer.find(idTabToOpen);
            $tabToOpen.siblings('div').hide();
            $tabToOpen.show();
            $clickedItem.siblings('div').removeClass('active');
            $clickedItem.addClass('active');
          }
        }
      });
    },

    /**
     * Add colorbox SlideShow to news section images. Add features to colorbox.
     */
    addColorboxSlideShow: function() {
      var $images = $(".image");
      var imagesArrayLength = $images.length;
      var showedAll = false;
      var slideTimeout;
      $images.colorbox({
        rel: 'image',
        transition: "elastic",
        width: "50%",
        height: "30%",
        current: "{current} / {total}",
        previous: "<",
        next: ">",
        close: "close",
        onComplete: function(){
          var indexArray = $('#cboxCurrent').text().split("/");
          var currentPage =  indexArray[0].trim();
          var totalPages =  indexArray[1].trim();
          if ( currentPage ==  totalPages  ) {
            showedAll = true;
          };
         
          if ( currentPage == 1 && showedAll ) {
            $.colorbox.close();
          }
        },
        onLoad: function(){
          clearTimeout(slideTimeout);
          slideTimeout = setTimeout($.colorbox.next, 2000);
        },
        onClosed: function() {
          clearTimeout(slideTimeout);
          showedAll = false;
        }
      });
      
      //open Colorbox on load ( inelegant, but work fine :)
      $(window).load(function(){
          $(".image").eq(0).trigger( "click");
          
      });
    }

  };

  $(function() {
    App.init();
  });

})(jQuery);
