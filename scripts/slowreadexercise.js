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
    "The fox jumped over the fence, the chickens ran away.",
    "She didn't understand how changed worked. When she looked at today compared to yesterday, there was nothing that she could see that was different. Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.",
    "Dave found joy in the daily routine of life. He awoke at the same time, ate the same breakfast and drove the same commute. He worked at a job that never seemed to change and he got home at 6 pm sharp every night. It was who he had been for the last ten years and he had no idea that was all about to change.",
    "It was a nice beautiful day but then it started to rain.",
    "To pass the time Daniel played sports such as soccer and tennis.",
    "The red glint of paint sparkled under the sun. He had dreamed of owning this car since he was ten, and that dream had become a reality less than a year ago. It was his baby and he spent hours caring for it, pampering it, and fondling over it. She knew this all too well, and that's exactly why she had taken a sludge hammer to it.",
    "Out of another, I get a lovely view of the bay and a little private wharf belonging to the estate. There is a beautiful shaded lane that runs down there from the house. I always fancy I see people walking in these numerous paths and arbors, but John has cautioned me not to give way to fancy in the least. He says that with my imaginative power and habit of story-making a nervous weakness like mine is sure to lead to all manner of excited fancies and that I ought to use my will and good sense to check the tendency. So I try.",
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
