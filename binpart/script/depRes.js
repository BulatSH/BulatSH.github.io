$(document).ready(function() {
    let $element = $('input[type="range"]');
    let $depCount = $('#dep-count span');
    let $depCountAlt = $('#dep-count-alt');
    let $plural = $('#plural');

    $element
        .rangeslider({
            polyfill: false,
            onInit: function() {
                updateDep();
                isPlural();
                isLast();
                isFirst();
            },
        })
        .on('input', function() {
            updateDep();
            isPlural();
            isLast();
            isFirst();
        });

    function updateDep() {
        $depCount.text($element.val());
        $depCountAlt.text($element.val());
    }

    function isPlural() {
        if ($element.val() > 1) {
            $plural.text("перводепов");
        } else {
            $plural.text("перводепа");
        }
    }

    function isLast() {
        if ($element.attr('max') == $depCount.text()) {
            $("#dep-count").addClass('dep-count-last');
        } else {
            $("#dep-count").removeClass('dep-count-last');
        }
    }
    isLast();

    function isFirst() {
        if ($element.attr('min') == $depCount.text()) {
            $("#dep-count").addClass('dep-count-first');
        } else {
            $("#dep-count").removeClass('dep-count-first');
        }
    }
    isFirst();
});