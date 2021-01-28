;
  function startLoadPage() {
    var
      title = document.querySelector('.load .indicator__title'),
      line = document.querySelector('.load .indicator__bar-line'),
      shadow = document.querySelector('.load .indicator__bar-shadow'),
      delay = 12;
    
    var
      timeInterval = delay*1000/100;
      count = 0;

    var timeId = setTimeout(renderProgress, timeInterval);

    function renderProgress() {
      if (count > 100) {
        setTimeout(loadNextPage, 1000);
        return;
      }
  
      title.innerHTML= count + '%';
      line.style.width = count + '%';
      shadow.style.width = count + '%';
  
      ++count;
      timeId = setTimeout(renderProgress, timeInterval);
    }
  
    function loadNextPage() {
      toogleDisplay('#result');
    } 
  };

