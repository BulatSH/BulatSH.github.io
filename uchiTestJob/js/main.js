$(document).ready(function () {
    $('.task').html("Выбери все уравнения, " + `<br>` + "в которых решением является число 6");
    let btn = $('#btn');
    $(btn).attr('disabled', 'disabled').css('background-color', '#b9e0ed');

    const numberOfCorrectAnswers = 2;

    let answers = [
        {
            htmlAnswerText: '5 + x = 11',
            select: false,
            answer: true
        },
        {
            htmlAnswerText: '16 - x = 12',
            select: false,
            answer: false
        },
        {
            htmlAnswerText: 'x + 5 = 11',
            select: false,
            answer: true
        },
        {
            htmlAnswerText: 'x + 16 = 12',
            select: false,
            answer: false
        }
    ];


    let createAnswersValInHtml = function () {
        for (let i = 0; i < answers.length; i++) {
            $('.answers__list').append('<div class="answer">' + answers[i].htmlAnswerText + '</div>');
        }
    }

    createAnswersValInHtml();


    let answerButtons = $('.answer');


    let addAnswerHover = function (i) {
        $(answerButtons[i]).hover(function () {
            $(answerButtons[i]).css('background-color', '#f2f2f2');
        }, function () {
            $(answerButtons[i]).css('background-color', '#fff');
        });
    }

    for (let i = 0; i < answers.length; i++) {
        addAnswerHover(i);
    }


    let checkAll = function (i) {
        $(answerButtons[i]).click(function () {
            checkAnswerSelect(i);
            checkAnswerHover(i);
            checkBtnActive(i);
        });
    }


    for (let i = 0; i < answers.length; i++) {
        checkAll(i);
    }


    let checkAnswerSelect = function (i) {
        if (!answers[i].select) {
            $(answerButtons[i]).css('background-color', '#3a76a3');
            $(answerButtons[i]).css('color', '#fff');
            answers[i].select = true;
            countingTrueSelect(i);
            countingSelect(i);
        } else {
            $(answerButtons[i]).css('background-color', '#fff');
            $(answerButtons[i]).css('color', '#3a76a3');
            answers[i].select = false;
        }
    }

    let checkAnswerHover = function (i) {
        if (!answers[i].select) {
            $(answerButtons[i]).hover(function () {
                $(answerButtons[i]).css('background-color', '#f2f2f2');
            }, function () {
                $(answerButtons[i]).css('background-color', '#fff');
            });
        } else if (answers[i].select) {
            $(answerButtons[i]).unbind('mouseenter mouseleave');
        }
    }


    let checkBtnActive = function (i) {
        for (i = 0; i < answers.length; i++) {
            if (answers[i].select == true) {
                $(btn).css('background-color', '#70c5e2');
                $(btn).css('cursor', 'pointer');
                $(btn).removeAttr('disabled');
                $(btn).hover(function () {
                    $(btn).css('background-color', '#39b6e2');
                }, function () {
                    $(btn).css('background-color', '#70c5e2');
                });
                break;
            } else if (answers[i].select == false) {
                $(btn).attr('disabled', 'disabled').css('background-color', '#b9e0ed');
                $(btn).css('cursor', 'auto');
                $(btn).unbind('mouseenter mouseleave');
            }
        }
    }


    let countTrueSelect = 0;
    let countingTrueSelect = function (i) {
        if (answers[i].answer == true) {
            countTrueSelect++;
        }
        return countTrueSelect;
    }

    let countSelect = 0;
    let countingSelect = function (i) {
        if (answers[i].select == true) {
            countSelect++;
        }
        return countSelect;
    }

    let defaultSettings = function (i) {
        $(btn).attr('disabled', 'disabled');
        $(btn).css('cursor', 'auto');
        $(btn).css('background-color', '#b9e0ed');
        $(answerButtons[i]).css('background-color', '#fff');
        $(answerButtons[i]).css('color', '#3a76a3');
        countTrueSelect = 0;
        countSelect = 0;
        addAnswerHover(i);
    }

    let checkChoices = function (i) {
        $(btn).click(function () {
            $(btn).unbind('mouseenter mouseleave');
            if (answers[i].answer == false && answers[i].select == true) {
                $(btn).css('background-color', '#f05a69');
                $(answerButtons[i]).css('background-color', '#f05a69');
                setTimeout(function () {
                    defaultSettings(i);
                }, 1000);
                answers[i].select = false;
            } else if (answers[i].answer == true && answers[i].select == true && numberOfCorrectAnswers == countTrueSelect && countSelect == numberOfCorrectAnswers) {
                $(btn).css('background-color', '#8fbe83');
                setTimeout(function () {
                    defaultSettings(i);
                }, 1500);
                answers[i].select = false;
            } else if (answers[i].answer == true && answers[i].select == true) {
                $(btn).css('background-color', '#f05a69');
                setTimeout(function () {
                    defaultSettings(i);
                }, 1000);
                answers[i].select = false;
            }
        });
    }

    for (let i = 0; i < answers.length; i++) {
        checkChoices(i);
    }
});