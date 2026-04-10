
$(document).ready(function(){
    $('.slider').slick({
    //   setting-name: setting-value
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:'.slide_to_left',
    nextArrow:'.slide_to_right',
    autoplay:true,
    autoplayspeed:3000,
    });
  });