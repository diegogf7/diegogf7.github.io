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
    "The peacock is the national bird of India. They have colourful feathers, two legs and a small beak. They are famous for their dance. When a peacock dances it spreads its feathers like a fan. It has a long shiny dark blue neck. Peacocks are mostly found in the fields they are very beautiful birds. The females are known as ‘Peahen'. Their feathers are used for making jackets, purses etc. We can see them in a zoo.",
    "The stars are tiny points of light in the space. On a clear night we can see around 2,000 to 3,000 stars without using a telescope. Stars look tiny in the sky because they are far away from the Earth. In ancient times the sky watchers found patterns of stars in the sky.These astronauts Neil Armstrong and patterns of people and the creatures from the myths and the legends. As the Earth spins from east to west the stars also appear to cross from east to west. The stars are made up of gases.",
    "Ernest Hemingway is considered one of the most successful writers in American history. He wrote many successful books such as The Old Man and The Sea which follows an Old Man as he fights a marlin for multiple days and nights in open water. Ernest Hemingway however, is also famous for his writing strategies. For example, he normally used short sentences to be effective.",
    "What is the stock market? The stock market is as in the name a market. However, with this market you're not trading goods such as jewlery, you're trading parts of companies! When you buy a stock or a share of a company you're buying a tiny piece of the company. Each year new companies join the stock market. The stock market is interesting!",
    "What is the most dangerous volcanoe in the world? According to Americans it's the Yellowstone volcanoes. The Yellowstone volcaneos have been dormant for thousands of years. However, because of this there is a lot of built of pressure inside of them. That means that when if the volcanoe were to explode it would be on a giant scale, as all the pressure that as been built up for thousands of years is being released.",
    "If your interested in the reading, fictional books you should read The Lord of The Rings. The Lord of The Rings is considered one of the most famous fictional books ever made, and that's for good reasons. The Lord of The Rings trilogy is made of three books, but has multiple spin offs. Because of this there's so much to read about, and through that you can become really invested and immersed into the story.",
    "There are 50 states in the United States of America. An interesting fact about these states, is that there are states such as Kentucky that border eight other states! Then there's also other states such as Alaska and Hawaii that don't border any other U.S states."
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
  var textArray = text.split("|");
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
