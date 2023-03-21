$(function () {
  var displayedHour = dayjs().format("H");
  var currentHour = dayjs().format("H");

  // Global variables for the start and end times of the work day
  var startTime = 8;
  var endTime = 16;

  // Create the calendar, update the block colors, and load the local storag events
  createCalendar();
  updateBlockColor();
  loadSavedEvents();

  // Create asychronous loop to update the displayed time every second
  setInterval(updateClock, 1000);

});
