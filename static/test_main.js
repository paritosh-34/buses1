let map;
let locs;
async function start() {
  var socket = io();

  await $.get("/testL", function(data, textStatus, jqXHR) {
    console.log("status: " + textStatus + ", data: " + data[0]);
    locs = data;
  });

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
start();
