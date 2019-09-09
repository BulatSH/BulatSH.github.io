window.addEventListener('DOMContentLoaded', () => {
    const loadContent = async/*ассинхронная*/ (url, callback) => {
        await /*подожди, пока сформируются карточки*/ fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.goods))
    
        callback();
    }
    
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
    
        arr.forEach(function(item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('js/db.json', () => {
        const cartWrapper = document.querySelector('.cart__wrapper'),//обертка для корзины
            cart = document.querySelector('.cart'), //корзина
            close = document.querySelector('.cart__close'), //крестик
            open = document.querySelector('#cart'), //открытый
            goodsBtn = document.querySelectorAll('.goods__btn'), //добавленные в корзину
            products = document.querySelectorAll('.goods__item'), //каждая карточка товара
            confirm = document.querySelector('.confirm'); //подтверждение
            badge = document.querySelector('.nav__badge'), //счетчик корзины
            totalCost = document.querySelector('.cart__total > span'), //общая сумма
            titles = document.querySelectorAll('.goods__title'); //описания
            empty = cartWrapper.querySelector('.empty');
    
        function openCart() {
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden'; //отменяет прокрутку страницы при открытом модальном окне
        }
    
        function closeCart() {
            cart.style.display = 'none';
            document.body.style.overflow = ''; //по умолчанию
        }
    
        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);
    
        goodsBtn.forEach(function(btn, i) {
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true), //все что внутри
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div');
    
                trigger.remove();
    
                showConfirm();
                calcGoods(1);
    
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times'; //добавляем верстку в нтмл
                item.appendChild(removeBtn);
    
                cartWrapper.append(item);
    
                if(empty) {
                    empty.style.display = 'none';
                }
    
                calcTotal();
                removeFromCart();
            });
        });
    
        function sliceTitle() {
            titles.forEach(function(item) {
                if (item.innerText.length < 50) {
                    return;
                } else {
                    const str = item.textContent.slice(0, 51) + '...';
                    item.textContent = str;
                }
            });
        }
        sliceTitle();
    
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10); //10 потому что сломалась бы opacity
            function frame() {
                if(counter == 10) {
                    clearInterval(id); //останавливает setInterval с идентификатором id
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    confirm.style.opacity = '.' + counter;
                    confirm.style.transform = `translateY(-${counter}px)`;
                }   
            }
        }
    
        function calcGoods(i) {
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = i + items.length;
        }
    
        function calcTotal() {
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item) {
                total += +item.textContent; //+ (+item.textContent) превращает строку в число
            });
            totalCost.textContent = total;
        }
    
        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            
            removeBtn.forEach(function(btn) {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    calcGoods(0);
                    calcTotal();
                    if(cartWrapper.querySelectorAll('.goods__item').length == 0) {
                        empty.style.display = 'block';
                    }
                });
            });
        }
    });
});

// fetch('https://jsonplaceholder.typicode.com/todos/1') // метод (глобальный), который позволяет взаимодействовать с сервером
// //основан на основе промисов (обещиний). Это строчка отдает обещание либо выполнится, либо не выполнится
//   .then(response => response.json()) // ответ, который мы получили от сервера в положительном исходе
//   //то же самое что и //.then(function(response) {return response.json()}) по ES5
//   //response.json() - превратит полученный (responce) json формат в объект
//   .then(json => console.log(json)) // выводит в консоль лог json объект

//   fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: "POST",
//       body: JSON.stringify(example)
//   }) 
//   .then(response => response.json())
//   .then(json => console.log(json))

