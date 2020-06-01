$(".search-form__button--op").click(function(){
    $(".search-form").toggleClass("active");
  });

  $(function(){
    $(document).click(function(event) {
      if ($(event.target).closest(".search-form").length) return;
      $(".search-form").removeClass("active");
      event.stopPropagation();
    });
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) { 
        $('.search-form').removeClass("active");
    }
});
  $(".header-top__burger").click(function(){
    $(this).toggleClass("active");
    $(".main-menu").toggleClass("active");
  });

  $(".teams__button").click(function(){
    $(this).toggleClass("active");
    $(".teams__item-container:nth-child(n+10)").slideToggle(300);
  });
  $('.select-js').wSelect();
  // $('.events__container .swiper-container').each(function(){
  //   var events_slider = new Swiper(this, {
  //     slidesPerView: 'auto',
  //     speed:1000,
  //     slidesPerGroup: 1,
  //     spaceBetween: 10,
  //     autoplay: {
  //       delay: 5000,
  //     },
  //     loop:true,
  //     navigation: {
  //         nextEl: $(this).parent().find('.swiper-button-next'),
  //         prevEl: $(this).parent().find('.swiper-button-prev'),
  //     },
    
  //   breakpoints: {
  //       640: {
  //         slidesPerGroup: 1,
  //         spaceBetween: 20,
  //       },
  //       900: {
  //         slidesPerGroup: 2,
  //         spaceBetween: 20,
  //       },
  //       1200: {
  //         slidesPerGroup: 3,
  //         spaceBetween: 20,
  //       },
  //     } 
  // });
  // });

  $('.events__container .swiper-wrapper').slick({
    nextArrow: '<div class="swiper-arrow swiper-button-next"><svg><use xlink:href="images/sprite.svg#icon-slider-arrow" /></svg></div>',
    prevArrow: '<div class="swiper-arrow swiper-button-prev"><svg><use xlink:href="images/sprite.svg#icon-slider-arrow" /></svg></div>',
    variableWidth: true,
    autoplay:true,
    slidesToScroll:4,
    speed:700,
    loop:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.similar-news__slider .swiper-container').each(function(){
    var events_slider = new Swiper(this, {
      slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 15,
    // autoplay:true,
    loop:true,
    // navigation: {
    //     nextEl: $(this).parent().find('.swiper-button-next'),
    //     prevEl: $(this).parent().find('.swiper-button-prev'),
    // },
    
    breakpoints: {
        640: {
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        767: {
          slidesPerGroup: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
      } 
  });
  });
  $('.players__slider .swiper-container').each(function(){
    var events_slider = new Swiper(this, {
      watchOverflow:true,
      slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 10,
    autoplay:true,
    loop:false,
    navigation: {
        nextEl: $(this).parent().find('.swiper-button-next'),
        prevEl: $(this).parent().find('.swiper-button-prev'),
    },
    
    breakpoints: {
      450: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
        640: {
          slidesPerGroup: 5,
          slidesPerView: 5,
          spaceBetween: 20,
        },
        850: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 8,
          slidesPerGroup: 8,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 20,
        },
        1150: {
          slidesPerView: 8,
          slidesPerGroup: 8,
          spaceBetween: 20,
        },
        1280: {
          slidesPerGroup: 9,
          spaceBetween: 20,
          slidesPerView: 9,
        },
      } 
  });
  });
  $('.ticker__text').simplemarquee({
    speed: 100,
    cycles: Infinity,
    space: 100,
    delayBetweenCycles: 0,
    handleHover: false,
    handleResize: true
});

(function($) {
  $(function() {
   
    $('div.tabs').on('click', 'li.tabs__caption:not(.active)', function() {
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
   
  });
  })(jQuery);


  windowSize = $(window).width(); 
  $(window).on('resize', function(event){
    windowSize = $(window).width(); 
});

$(".main-menu> ul > li > span").on('click', function(){

  
  if(windowSize < 1025){
  if ($(this).hasClass("js-active")) {
      $(this).removeClass("js-active");
      $(this).next().next().removeClass("js-active");
      $(this).next().next().slideToggle();
      
  } else {
    
    $(this).closest(".main-menu").find("ul.js-active").slideToggle();
    $(this).closest(".main-menu").find("ul.js-active").removeClass("js-active");
    $(".main-menu > ul > li > span").removeClass("js-active");
    $(this).addClass("js-active");
    $(this).next().next().addClass("js-active");
    $(this).next().next().slideToggle();
  }
  }  
});





$(".comments__form").validate({
  rules:{
     login:{
       required: true,
       minlength: 4,
       maxlength: 16,
     },
     pswd:{
       required: true,
       minlength: 6,
       maxlength: 16,
     },
  },
});

// $(".team-page__tabs-caption").click(function(){  // задаем функцию при нажатиии на элемент <button> 
//   $(this).text(function(index, text){ // передаем функцию в качестве параметра метода 	
//     return "Этот элемент имеет индекс - " + index + (". Старое содержимое: " + text);  // возвращаем значение индекса элемента и старое содержимое элемента
// });
// });

$(".team-page__tabs-select").click(function(){ 
  $(this).toggleClass("open");
  $(this).next().slideToggle();
 });


 $(".team-page__tabs-caption").click(function(){ 
 
 

  if(windowSize < 851){
    $(this).parent().slideToggle();
    val = $(this).text();
    $(this).parent().prev().text(val);
  }
 });


 

 var top_show = 500; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
  var delay = 1000; // Задержка прокрутки
  $(document).ready(function() {
    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
      /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
      if ($(this).scrollTop() > top_show) $('.button-up').fadeIn();
      else $('.button-up').fadeOut();
    });
    $('.button-up').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 0
      }, delay);
    });
  });

  $(function(){
    $(".article__desc").dotdotdot({
      height:72
    });
});
  

