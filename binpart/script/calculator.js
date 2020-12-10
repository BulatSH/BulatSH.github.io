$(document).ready(function() {

    let $element = $('input[type="range"]');
    let $calcCount = $('#calc-count .calc-count__res');

    $element
        .rangeslider({
            polyfill: false,
            onInit: function() {
                updateHandle();
            },
        })
        .on('input', function() {
            $calcCount.text("540");
            updateHandle();
        });

    function updateHandle() {
        $calcCount.text($calcCount.text() * $element.val());
    }

    let calcActiveWrap = $(".rangeslider__fill");
    calcActiveWrap.append("<div id='calc-active'><img src='img/calcActive.svg' alt='calcActive' style></div>");

    let calcActive = $('#calc-active');

    let calcActiveImg = $('#calc-active img');



    function calcCalcActiveWidth () {
        calcActive.width($('#js-rangeslider-0').outerWidth());
        calcActiveWrap.height(calcActiveImg.outerHeight());
            calcActiveImg.on('load', function() {
            calcActiveWrap.height($(this).outerHeight());
        });
    }

    $(window).resize(function() {
        calcCalcActiveWidth();
    });

    calcCalcActiveWidth();

    let img = $('#calc-active img');
    img.onload = function(){
        alert( img.height );
    }

});