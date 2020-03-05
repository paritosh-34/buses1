let map;
let locs;
$(document).ready(function() {
  $("#myModal").modal("show");
  $("#butt").click(async function() {
    const name = $("#slct option:selected").text();
    console.log(name);
    await $.get("/testL/"+name, function(data, textStatus, jqXHR) {
      console.log("status: " + textStatus + ", data: " + data[0]);
      locs = data;
    });
    start();
  });
});
async function start() {
  var socket = io();

  for (let i = 0; i < locs.length; i++) {
    locs[i].lng = locs[i].lon;
    delete locs[i].lon;
  }

  let index = 0;
  for (let i = 0; i < locs.length; i++) {
    setTimeout(function() {
      console.log(locs[index]);

      const text =
        "<tr><td>" +
        locs[index].name +
        "</td><td>" +
        locs[index].lat +
        "</td><td>" +
        locs[index].lng +
        "</td></tr>";
      $("#tble").append(text);

      index = index + 1;

      socket.emit("test_socket", locs[index]);
    }, i * 2000);
  }
}
