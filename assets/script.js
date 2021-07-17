//Current Date
/* PseudoCode
   // Get current time with moment()
   // Format to Day, Month DateOrdinal
   // Update currentDay p with date
 */
$("#currentDay").text(moment().format("dddd, MMMM Do"));

//Refresh every day
setInterval(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
}, 1000 * 60 * 60 * 24);

//Current Time
function currTime() {
  var timeSpan = $('<span id="timeNow">');
  var jumbo = $(".jumbotron");
  setInterval(function () {
    timeSpan.text(moment().format("hh: mm A"));
    jumbo.append(timeSpan);
  }, 1000);
}
currTime();

//Time Blocks 9am-5pm (9 10 11 12 1 2 3 4 5)
var timeBlocks = [
  {
    time: "9AM",
    number: "09:00",
    id: "0",
  },
  {
    time: "10AM",
    number: "10:00",
    id: "1",
  },
  {
    time: "11AM",
    number: "11:00",
    id: "2",
  },
  {
    time: "12PM",
    number: "12:00",
    id: "3",
  },
  {
    time: "1PM",
    number: "13:00",
    id: "4",
  },
  {
    time: "2PM",
    number: "14:00",
    id: "5",
  },
  {
    time: "3PM",
    number: "15:00",
    id: "6",
  },
  {
    time: "4PM",
    number: "16:00",
    id: "7",
  },
  {
    time: "5PM",
    number: "17:00",
    id: "8",
  },
];

//Make Table Variables
var tableBox = $(".container");
var hourTable = $("<table>");

//Make Rows for each Time Block
for (block of timeBlocks) {
  var currHourRow = $(`<tr class="row">`);

  currHourRow.append(`<td class="hour">${block.time}`);
  currHourRow.append(`<textarea id="${block.id}">`);
  currHourRow.append(`<button class="saveBtn ${block.id}"><i class="far fa-save">`);

  hourTable.append(currHourRow);
  tableBox.append(hourTable);
}

//Past Present Future Color Coding
function colorText() {
  var currTime = moment().format("HH:00");
  // var currTime = "12:00";

  for (block of timeBlocks) {
    /* //Console Logs
      console.log(currTime);
      console.log(currTime > timeBlocks[0].number);
     */
    var blockMilitaryTime = block.number;

    /* //PseudoCode
     if(blockTime < currTime) grey color
     else if(blockTime === currTime) red color
     else if(blockTime > currTime) green color
     */

    if (currTime > blockMilitaryTime) {
      $(`#${block.id}`).addClass("past");
      $(`#${block.id}`).attr("readonly", true);
      $(`#${block.id}`).removeClass("present");
      $(`#${block.id}`).removeClass("future");
      /* //Console Logs
        console.log(block);
        console.log("past");
        console.log(currTime);
        console.log(block.number);
        console.log("past check " + (currTime > blockMilitaryTime));
        console.log("future check " + (currTime < blockMilitaryTime));
        console.log("present check " + (blockMilitaryTime === currTime));
       */
    }
    if (currTime < blockMilitaryTime) {
      $(`#${block.id}`).addClass("future");
      $(`#${block.id}`).attr("readonly", false);
      $(`#${block.id}`).removeClass("past");
      $(`#${block.id}`).removeClass("present");

      /* //Console Logs
        console.log(block);
        console.log("future");
        console.log(currTime);
        console.log(block.number);
        console.log("past check " + (currTime > blockMilitaryTime));
        console.log("future check " + (currTime < blockMilitaryTime));
        console.log("present check " + (blockMilitaryTime === currTime));
       */
    }
    if (currTime === blockMilitaryTime) {
      $(`#${block.id}`).addClass("present");
      $(`#${block.id}`).attr("readonly", false);
      $(`#${block.id}`).removeClass("past");
      $(`#${block.id}`).removeClass("future");

      /* //Console Logs
        console.log(block);
        console.log("present");
        console.log(currTime);
        console.log(block.number);
        console.log("past check " + (currTime > blockMilitaryTime));
        console.log("future check " + (currTime < blockMilitaryTime));
        console.log("present check " + (currTime === blockMilitaryTime)); 
       */
    }
  }
}
colorText();
setInterval(colorText, 1000 * 60 * 60);

// Text Input for Time Blocks (table with eventlistener, pops up prompt, get value, set to text)
// Validation (Cant edit past events/time blocks)

var storageList = JSON.parse(localStorage.getItem("eventList")) || ["", "", "", "", "", "", "", ""];

function renderText() {
  for (var i = 0; i < storageList.length; i++) {
    $(`#${timeBlocks[i].id}`).val(storageList[i]);
  }
}
renderText();

//Save Text in Time Blocks with Local Storage
$(".saveBtn").on("click", function () {
  // Set textbox value to a variable
  var saveID = $(this).attr("class").split(" ").pop();
  console.log(saveID);

  for (block of timeBlocks) {
    var textValue = $(`textarea[id="${block.id}"]`).val().trim();
    var blockID = `${block.id}`;
    // console.log(blockID);
    if (blockID.match(`${saveID}`)) {
      // add new value to list
      storageList.splice(saveID, 1, textValue);

      // save to localStorage
      localStorage.setItem("eventList", JSON.stringify(storageList));
      console.log("Changed Box is " + blockID + " Changed Value is: " + textValue);
    }
  }
  renderText();
});

var dateP = document.querySelector("#currentDay");
dateP.addEventListener("DOMNodeInserted", function () {
  // window.localStorage.clear();
  storageList = ["", "", "", "", "", "", "", ""];
  localStorage.setItem("eventList", JSON.stringify(storageList));
  renderText();
});

//Add Styles *Dynamically*
$("head").append(`
<style>
.container {
  display: flex;
  width: 100%;
}

textarea {
  width: 50rem;
}

.hour {
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
}

i {
  width: 50px;
}
`);
