setInterval(startTime,500);
setInterval(RandomNumber,3000);
function RandomNumber() {
    var value1 = Math.floor(Math.random() * 38); ;
    var value2 = Math.floor(Math.random() * 100); ;
    setTemperature(value1);
    setHumidity(value2);
}

function Help_f(){
    var Inf_1,Inf_2,Inf,Pic,InfMode;
    document.getElementById('ID').innerHTML = "PARIS";
    Inf_1 = '<p id="Inf_1"  class="txt">The city is a major railway, highway and air-transport hub served by two international airports: Paris-Charles de Gaulle (the second busiest airport in Europe).</p>';
    Inf_2 = '<p id="Inf_2" class="txt">Modern Tokyo is categorized as an alpha+ city by the Globalization and World Cities Research Network. As of 2019, the population of Tokyo was estimated to be over 13.9 million, making it Japan\'s most populous prefecture.</p>';
    Pic = '<img id="Pic" src="https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/du-lich-paris-3-ngay-2-dem-1-new.jpg" alt="Paris picture">';
    Inf = Inf_1 + Inf_2 + Pic;
    InfMode = document.getElementById("Inf");
    InfMode.insertAdjacentHTML("beforeend", Inf);
    document.getElementById("Tempt").innerHTML = "";
}

function setTemperature(curVal){
    //set range for Temperature in Celsius -5 Celsius to 38 Celsius
    var minTemp = -5.0;
    var maxTemp = 38.0;
    //set range for Temperature in Fahrenheit 23 Fahrenheit to 100 Fahrenheit
    //var minTemp = 23;
    //var maxTemp = 100;

    var newVal = scaleValue(curVal, [minTemp, maxTemp], [0, 180]);
    $('.gauge--1 .semi-circle--mask').attr({
        style: '-webkit-transform: rotate(' + newVal + 'deg);' +
            '-moz-transform: rotate(' + newVal + 'deg);' +
            'transform: rotate(' + newVal + 'deg);'
    });
    document.getElementById('temp').innerHTML= curVal;
}

function setHumidity(curVal){
    //set range for Humidity percentage 0 % to 100 %
    var minHumi = 0;
    var maxHumi = 100;

    var newVal = scaleValue(curVal, [minHumi, maxHumi], [0, 180]);
    $('.gauge--2 .semi-circle--mask').attr({
        style: '-webkit-transform: rotate(' + newVal + 'deg);' +
            '-moz-transform: rotate(' + newVal + 'deg);' +
            'transform: rotate(' + newVal + 'deg);'
    });
    document.getElementById('humi').innerHTML=curVal;
}

function scaleValue(value, from, to) {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
}
function startTime() {
    var today= new Date();
    var Time = today.toLocaleString();
    document.getElementById('Date').innerHTML = Time;
}