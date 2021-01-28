$('.js-tabs-wrap').on('click', '.js-tab', function () {
  var idElem = $(this).attr("data-menu");
  switchTab($(this));

  idElem && switchDesc(idElem);
  switchElemModal('[data-menu = "' + idElem.slice(1) + '"]');
  return false;
});

$('.desc__item').on('click', '.desc__header', function () {
  var elemSelect = '[data-menu = "' + $('.js-cont-active').attr('id') + '"]';
  switchElemModal(elemSelect);
  showModal('.modal-menu');

  $('.modal-menu').on('click', '.desc__header', function () {
    var elemID = "#" + $(this).attr('data-menu');

    if ($(elemID).length == 0) return;

    closeModal('.modal-menu');
    switchDesc("#" + $(this).attr('data-menu'));
    switchTab('[data-menu="#' + $(this).attr('data-menu') + '"]');
  });

  // $('.modal-menu').on('click', '.modal-menu-bg', function () {
  //   closeModal('.modal-menu');
  // });

  setTimeout( close, 100);
  
});

function close() {
  $('body').on('click', function () {
    closeModal('.modal-menu');
  })
}

function switchDesc(elem) {
  cont = $('.js-tabs-wrap .js-tab-cont');
  cont.removeClass('js-cont-active');
  $(elem).addClass('js-cont-active  animated fadeInUp faster');
}

function switchTab($elem) {
  console.log($elem);
  $('.js-tabs-wrap .js-tab').removeClass('js-tab-active');
  $($elem).addClass('js-tab-active');
}

function switchElemModal (elem) {
  $('.modal-menu .desc__header').removeClass('active');
  $(elem).addClass('active');
}

function showModal(elem) {
  console.log(elem);
  $(elem).addClass('_open');
};

function closeModal(elem) {
  $(elem).removeClass('_open');
  $('.modal-menu').off('click','.desc__header');
  $('body').off('click');
}