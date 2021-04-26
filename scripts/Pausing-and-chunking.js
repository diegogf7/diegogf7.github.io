$(document).ready(function(){
  var go = $('#go');

go.click(function(e){
  e.preventDefault();
  startWrap();
  $("#next-container").empty;
});

function addNext() {
  var nextButton = '<button id="next">Next</button>';
  $("#next-container").append(nextButton);
  //var next = $('#next');
  $('#next').click(function(e) {
    e.preventDefault();
    nextPassage();
  });
}

function nextPassage(){
  var passages = [
    "The-dog-ate a-bunch-of-bones.",
    "The-man-looked out-at-the-beach.",
    "In-life-you-should try-to-maintain-a healthy-diet.",
    "Stop-eating-the-cookies! Cried-my-mother.",
    "I-think-that-Soccer is-the-best-sport. Said-Jimmy.",
    "Skateboarding-is-a-lot of-fun-when-you learn-how-to-do-it.",
    "I-love-it-when it-snows, because-I-can-make-snowmen!",
    "The-class-laughed-when the-student-made-the-joke.",
    "I-want-the-red-ruler! Cried-Randy.",
    "Tommy-constantly-found-himself in-trouble."
  ];
  var random = Math.floor(Math.random() * passages.length);
  var passage = passages[random];
  $("#text").empty();
  $("#text").append(passage);
}

function startWrap(){
  var speed = $('#speed').val();
  //timeStart = $.now();
  var text = $('#text').text();
  var textArray = text.split(" ");
  var textWrap = $('#text');
  var loopCount = 0;
  var arrCount = textArray.length;

  loopDat();

  function loopDat(){
    var pos = loopCount;
    if(loopCount == pos){
      setTimeout(function(){
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
          //done
          if ($("#next").length) {
            $("#next-container").empty;
          } else {
           addNext();
          }
        }

        loopCount++
        if(loopCount < arrCount){
          loopDat();
        }

      },speed);
    }
  }
}
});
