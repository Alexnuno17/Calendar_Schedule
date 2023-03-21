$(document).ready(function () {
  var displayedHour = dayjs().format("H");
  var currentHour = dayjs().format("H");
  var startTime = 8;
  var endTime = 16;
  createCalendar();
  updateBlockColor();
  loadSavedEvents();

  setInterval(updateClock, 1000);
  $(".saveBtn").on("click", function () {
    let calendarBlock = $(this).parent().attr("id");
    if ($(this).parent().find("textarea").val() == "") {
      localStorage.removeItem(calendarBlock);
      return;
    } else if ($(this).parent().find("textarea").val() == localStorage.getItem(calendarBlock)) { 
      return;
     } else {
      localStorage.setItem(calendarBlock, $(this).parent().find("textarea").val());
      window.alert("Event saved!");
    }
  });
  function updateClock() {
    // Gather current time and display it in the header
    let currentTime = dayjs().format("MMMM D YYYY, h:mm:ss a");
    $("#currentTime").html(currentTime);
    currentHour = dayjs().format("H");
    if (currentHour != displayedHour) {
      displayedHour = currentHour;
      updateBlockColor();
    }
  }
  function createCalendar() {
    for (let i = startTime; i <= endTime; i++) {
      let calendar = document.getElementById("calendar");

      let timeBlock = document.createElement("div");
      timeBlock.setAttribute("class", "time-block row ");
      timeBlock.setAttribute("id", "hour-" + i);
      calendar.appendChild(timeBlock);
      let timeText = document.createElement("div");
      timeText.setAttribute("class", "hour col-2 col-md-1 text-center py-3");
      timeText.innerText = dayjs().hour(i).format("hA");
      timeBlock.appendChild(timeText);
      let textArea = document.createElement("textarea");
      textArea.setAttribute("class", "eventText col-8 col-md-10");
      textArea.setAttribute("rows", "3");
      timeBlock.appendChild(textArea);
      let saveButton = document.createElement("button");
      saveButton.setAttribute("class", "saveBtn btn col-2 col-md-1");
      saveButton.setAttribute("aria-label", "save");
      timeBlock.appendChild(saveButton);
      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-save");
      icon.setAttribute("aria-hidden", "true");
      saveButton.appendChild(icon);
    }
  }
  function updateBlockColor() {
    $(".time-block").each(function () {
      // Get the hour from the id of the time block
      let calendarBlockHour = parseInt($(this).attr("id").split("-")[1]);
      if (calendarBlockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (calendarBlockHour > currentHour) {
        $(this).addClass("future");
        $(this).removeClass("past present");
      } else {
        $(this).addClass("present");
        $(this).removeClass("past future");
      }
    });
  }

  function loadSavedEvents() {
    $(".time-block").each(function () {
      let calendarBlock = $(this).attr("id");
      let savedEvent = localStorage.getItem(calendarBlock);
      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }
});