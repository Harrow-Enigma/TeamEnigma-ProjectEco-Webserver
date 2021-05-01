// we gonna add a mongoose plugin here soon, but here's some fake data for now.

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var datename = (randomDate(new Date(2012, 0, 1), new Date()))

var i;
data = []
for (i = 0; i < 100; i++) {
  datename.setSeconds(datename.getSeconds() + 1);

    data.push({
      [(datename.toISOString())] : {
        "SampleLocation1" : {
          "Temperature":getRndInteger(14, 28),
          "Pressure":getRndInteger(1000, 1015),
          "Humidity":getRndInteger(25,35),
          "CO2":getRndInteger(400,420)
          },
        "SampleLocation2" : {
          "Temperature":getRndInteger(14, 28),
          "Pressure":getRndInteger(1000, 1015),
          "Humidity":getRndInteger(25,35),
          "CO2":getRndInteger(400,420)
          }
      }
    });
}

exports.api = JSON.stringify(data);