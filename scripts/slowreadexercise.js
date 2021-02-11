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
    "Dave found joy in the daily routine of life. He awoke at the same time, ate the same breakfast and drove the same commute. He worked at a job that never seemed to change and he got home at 6 pm sharp every night. It was who he had been for the last ten years and he had no idea that was all about to change.",
    "It was a nice beautiful day but then it started to rain.",
    "To pass the time Daniel played sports such as soccer and tennis.",
    "The peacock is the national bird of India. They have colourful feathers, two legs and a small beak. They are famous for their dance. When a peacock dances it spreads its feathers like a fan. It has a long shiny dark blue neck. Peacocks are mostly found in the fields they are very beautiful birds. The females are known as ‘Peahen1. Their feathers are used for making jackets, purses etc. We can see them in a zoo.",
    "The stars are tiny points of light in the space. On a clear night we can see around 2,000 to 3,000 stars without using a telescope. Stars look tiny in the sky because they are far away from the Earth. In ancient times the sky watchers found patterns of stars in the sky.These astronauts Neil Armstrong and patterns of people and the creatures from the myths and the legends. As the Earth spins from east to west the stars also appear to cross from east to west. The stars are made up of gases."
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
