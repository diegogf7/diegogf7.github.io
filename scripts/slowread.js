var go = $('#go');

go.click(function(e){
  e.preventDefault();
  console.log("button pressed");
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
        textArray[pos] = '<b>'+textArray[pos]+'</b>';

        // unbold previous word
        if(pos < arrCount && pos > 0){
          var oldPos = pos - 1;
          var length = textArray[oldPos].length;
          textArray[oldPos] = textArray[oldPos].slice(3,(length - 4));
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
