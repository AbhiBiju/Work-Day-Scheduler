//Current Date
// Get current time with moment()
// Format to Day, Month DateOrdinal
// Update currentDay p with date
setInterval(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do hh:mm A"));
}, 1000);

//Time Blocks 9am-5pm (9 10 11 12 1 2 3 4 5)
var timeBlocks = [
  {
    time: "9AM",
    event: "",
  },
  {
    time: "10AM",
    event: "",
  },
  {
    time: "11AM",
    event: "",
  },
  {
    time: "12PM",
    event: "",
  },
  {
    time: "1PM",
    event: "",
  },
  {
    time: "2PM",
    event: "",
  },
  {
    time: "3PM",
    event: "",
  },
  {
    time: "4PM",
    event: "",
  },
  {
    time: "5PM",
    event: "",
  },
];

//Make Table Variables
var tableBox = $(".container");
var hourTable = $("<table>");

//Make Rows for each Time Block
for (block of timeBlocks) {
  var currHourRow = $(`<tr class="row">`);

  currHourRow.append(`<td class="hour">${block.time}`);
  currHourRow.append(`<textarea id="${block.time}">`);
  currHourRow.append(`<button class="saveBtn"><i class="far fa-save">`);

  hourTable.append(currHourRow);
  tableBox.append(hourTable);

  // Text Input for Time Blocks (table with eventlistener, pops up prompt, get value, set to text)
  // Validation (Cant edit past events/time blocks)

  //Past Present Future Color Coding
  var currTime = moment().format("hA");
  var blockTime = block.time;

  // if(blockTime < currTime) grey color
  //  else if(blockTime === currTime) red color
  //  else if(blockTime > currTime) green color
  if (currTime < blockTime) {
    $("textarea").addClass("past")
  } else if (currTime === blockTime) {
    $("textarea").addClass("present")
  } else if (currTime > blockTime) {
    $("textarea").addClass("future")
  }
}
//Save Text in Time Blocks with Local Storage
// use document.on(click .timeBlock)
// Set textbox value to a variable
// add new value to list
// save to localStorage

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
