$(document).ready(function(){
var go = $('#go');

go.click(function(e){
  e.preventDefault();
  startWrap();
});

function startWrap(){
  var speed = $('#speed').val();
  //timeStart = $.now();
  var text = $('#text').text();
  var textArray = text.split(" ");
  var textWrap = $('#text');
  var loopCount = 0;

  var arrCount = textArray.length;
  loopDat();
  var i = loopCount;

  function loopDat(){
    var pos = loopCount;
    if(loopCount == pos){
      setTimeout(function(){;
        // bold current word
        textArray[pos] = '<mark>'+textArray[pos]+'</mark>';

        // unbold previous word
        if(pos < arrCount && pos > 0){
          var oldPos = pos - 1;
          var length = textArray[oldPos].length;
          textArray[oldPos] = textArray[oldPos].slice(6,(length - 7));
        }

        // create new statement
        var words = textArray.join(" ");
        textWrap.html(words);

        if(pos == (arrCount - 1)) {
          // done
        }
        loopCount++
        if(loopCount < arrCount){
          loopDat();
        }
      }, speed);

    }
  }
}

});
