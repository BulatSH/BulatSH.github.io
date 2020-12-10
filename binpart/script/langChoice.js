document.addEventListener("DOMContentLoaded", () => {
    let langSelect = document.querySelector("#language-select");
    let langArrow = document.querySelector(".language__arrow");
    let langWrap = document.querySelector(".languages-list-wrap");
    let langList = document.querySelector(".languages-list");
    let langListItem = document.querySelectorAll(".languages-list__item");

    langSelect.addEventListener("click", function() {
        langSelect.classList.toggle("open");
        langSelect.classList.toggle("close");

        if (langSelect.classList.contains("open")) {
            langArrow.classList.add("language__arrow_alt");
            langWrap.style.height = langList.getBoundingClientRect().height + "px";
        } else {
            langArrow.classList.remove("language__arrow_alt");
            langWrap.style.height = "0px";
        }
    })

    function replaceLangs(i) {
        langListItem[i].addEventListener("click", function() {
            let tempVariable = "";
            tempVariable = langSelect.querySelector("#language").textContent;
            langSelect.querySelector("#language").textContent = langListItem[i].textContent;
            langListItem[i].textContent = tempVariable;
        });
    }

    for (let i = 0; i < langListItem.length; i++) {
        replaceLangs(i);
    }
});