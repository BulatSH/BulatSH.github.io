let $inp = $('.form_input'),
    $passview = $('a.password-control')

if ($inp.length) {
  $inp.each(function (i, el) {
    !$(el).val() && $(el).addClass('empty');
    // !$(el).val() && $(el).css('border-color', '#000');
  });

  $inp.on('input', function () {
    if (!$(this).val()) {
      $(this).addClass('empty');
      // $(this).css('border-color', '#000');
    } else {
      $(this).removeClass('empty');
      // $(this).css('border-color', '');
    }
  });
}

if ($passview.length) {
  $passview.on('click', function () {
    let $btn = $(this),
      $pass = $(this).prev();
    if ($pass.attr('type') === 'password') {
      // $btn.addClass('view');
      $pass.attr('type', 'text');
    } else {
      // $btn.removeClass('view');
      $pass.attr('type', 'password');
    }
    return false;
  });
}

$('.modal-wrapper').modal();

if ($('.registration').length) colorBtnSend('.registration .btn');

function colorBtnSend(btnColor) {
  $inp.on('input', function(){
    var isValid = true;
    $inp.each(function (index, elem) {
      console.log(elem.checkValidity());
      isValid &= elem.checkValidity();
    })
    isValid ? $(btnColor).addClass('_valid') : $(btnColor).removeClass('_valid');
  });
}

function dropDown(targetObj, thisObj) {
  $(thisObj).css({
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    'user-select': 'none',
    '-o-user-select': 'none',
    '-khtml-user-select': 'none',
  });
  $(thisObj).toggleClass('hide');
  $(targetObj).stop().slideToggle('slow');
}









