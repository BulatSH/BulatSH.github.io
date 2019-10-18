$(document).ready(function () {
    let informationDisclosureBtn = $('.information__disclosure-item__wrapper');
    let informationDisclosureList = $('.information__disclosure-list');
    let informationDisclosureItem = $('.information__disclosure-item');
    let informationDisclosureIcon = $('.information__disclosure-icon');

    let clickinformationDisclosureItem = []
    for (let i = 0; i < informationDisclosureBtn.length; i++) {
        clickinformationDisclosureItem[i] = false;
    }

    let informationDisclosure = function (i) {
        $(informationDisclosureBtn[i]).click(function () {
            if (!clickinformationDisclosureItem[i]) {
                $(informationDisclosureItem[i]).css('background-color', '#5c9800');
                $(informationDisclosureItem[i]).css('color', '#fff');
                $(informationDisclosureIcon[i]).css('background-color', '#4a7b00');
                $(informationDisclosureIcon[i]).addClass('information__disclosure-icon__click');
                clickinformationDisclosureItem[i] = true;
            } else if (clickinformationDisclosureItem[i]) {
                $(informationDisclosureItem[i]).css('background-color', '#f3f1f1');
                $(informationDisclosureItem[i]).css('color', '#000');
                $(informationDisclosureIcon[i]).css('background-color', '#e9e6e6');
                $(informationDisclosureIcon[i]).removeClass('information__disclosure-icon__click');
                clickinformationDisclosureItem[i] = false;
            }

            $(this).parent().find(informationDisclosureList[i]).slideToggle(200);
            return false;
        });
    }

    for (let i = 0; i < informationDisclosureBtn.length; i++) {
        informationDisclosure(i);
    }
});