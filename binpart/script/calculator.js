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
});