
function initElement()
{
  var p = document.getElementById("m1");
  p.onclick = getStations("metros", "1");
};

document.getElementById('stations').style.display = "none";
document.getElementById('schedule').style.display = "none";
document.getElementById('rera')
document.getElementById('rerb')
document.getElementById('m1').addEventListener('click', getStationForLne )
document.getElementById('m2').addEventListener('click', getStationForLne )
document.getElementById('m3').addEventListener('click', getStationForLne )
document.getElementById('m4').addEventListener('click', getStationForLne )
document.getElementById('m5').addEventListener('click', getStationForLne )
document.getElementById('m6').addEventListener('click', getStationForLne )
document.getElementById('m7').addEventListener('click', getStationForLne )
document.getElementById('m8').addEventListener('click', getStationForLne )
document.getElementById('m9').addEventListener('click', getStationForLne )
document.getElementById('m10').addEventListener('click', getStationForLne )
document.getElementById('m11').addEventListener('click', getStationForLne )
document.getElementById('m12').addEventListener('click', getStationForLne )
document.getElementById('m13').addEventListener('click', getStationForLne )
document.getElementById('m14').addEventListener('click', getStationForLne )
document.getElementById('m7b').addEventListener('click', getStationForLne )

document.getElementById('station-name').addEventListener('click', function(event){
  if(event.target.tagName == 'SPAN'){
    document.getElementById('schedule').style.display = "block";
    var slug = event.target.id;
    console.log(slug)
    var line = document.querySelector('.line').id
    var code = document.querySelector('.code').id
    console.log(slug)
    console.log(code)
    console.log(line)
    getTime(line,code,slug)
  }
  
})

function getTime(line, code,slug) {
  async function getData(a, b, c) {
    let response = await fetch(
      "https://api-ratp.pierre-grimaud.fr/v4/schedules/" + a + "/" + b + "/"+ c +"/A%2BR"
    );
    let data = await response.json();
    return data;
  }
  console.log('time')
  getData(line, code,slug).then(data =>{
    console.log(data)
    var array = data.result.schedules
    array.forEach(element=>{
      var s_line = document.createElement('LI')
      s_line.innerHTML = "<span>"+element.message+"</span> <span>-></span><span>"+ element.destination+"</span>"
      document.getElementById('schedules').appendChild(s_line)
    })
  
  })
}

function getStations(line, code) {
  async function getData(a, b) {
    let response = await fetch(
      "https://api-ratp.pierre-grimaud.fr/v4/stations/" + a + "/" + b + "?way=A"
    );
    let data = await response.json();
    return data;
  }
  getData(line, code).then(data =>{
    document.getElementById('station-name').innerHTML = ""
    console.log(data)
    var array = data.result.stations
    document.getElementById('stations').style.display = "block";
    array.forEach(element => {
    var station = document.createElement("span")
    station.setAttribute("id",element.slug)
    station.innerHTML = element.name
    document.getElementById('station-name').appendChild(station)
    console.log(element.name)
  });
  });
}

function getStationForLne(event){
  var id = event.target.id;
  var type= id.charAt(0)
  var line = ""
  switch(type){
    case "r":
      line =  "rers"
      break
    case "m":
      line = "metros"
      break
    case "t":
      line = "tramways"
      break
  }
  var code = id.substr(id.length - 1)
  document.querySelector('.line').setAttribute("id",line)
  document.querySelector('.code').setAttribute("id",code)
  getStations(line,code)
}