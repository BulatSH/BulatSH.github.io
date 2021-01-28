var saitePage = ['#genders', '#stp1', '#stp2', '#stp3', '#stp4', '#stp5', '#load', '#result', '#pay'];

function toogleDisplay(targetObj, gender) {
  if (gender && (gender === 'man')) {
    var img = document.querySelectorAll('.img-box .woman2');
    for (var k =0 ; k < img.length; k++ ) {
      img[k].className = "mann2";
      img[k].setAttribute('src', './img/mann2.png')
    }
  };

  for(var i=0; i < saitePage.length; i++) {
    if(targetObj === saitePage[i]) {
      document.querySelector(targetObj).classList.remove('_hidden');
    } else {
      document.querySelector(saitePage[i]).classList.add('_hidden');
    };
  }

  if (targetObj.slice(1,4) === 'stp') {
    document.querySelector('body').className = 'stp ' + targetObj.slice(1);
  }

  if (targetObj.slice(1) === 'load') {
    document.querySelector('body').className = 'stp load';
    startLoadPage();
  }

  if (targetObj.slice(1) === 'result') {
    document.querySelector('body').className = 'result';
  }

  if (targetObj.slice(1) === 'pay') {
    document.querySelector('body').className = 'pay';    
  }

  document.body.scrollTop=0;
  document.body.scrollTo(0,0);
}