// document.addEventListener("DOMContentLoaded", () => {
//     const anchors = document.querySelectorAll('a[href*="#"]');

//     for (let anchor of anchors) {
//         anchor.addEventListener("click", function(event) {
//             event.preventDefault();
//             const blockID = anchor.getAttribute('href');
//             document.querySelector('' + blockID).scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//             });
//         })
//     }
// });

$(document).ready(function() {
    $('a[href*="#"]').click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 1000,
            easing: "swing"
        });
        return false;
    });
});