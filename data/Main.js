setInterval(startTime,500);
const ID = document.getElementById('ID');
const Inf_1 = document.getElementById('Inf_1');
const Inf_2 = document.getElementById('Inf_2');
const Pic = document.getElementById('Pic');

function startTime() {
    var today= new Date();
    var Time = today.toLocaleString();
    document.getElementById('Date').innerHTML = Time;
}

function Help_f() {
    ID.innerHTML = "PARIS";
    Inf_1.innerHTML = "The city is a major railway, highway and air-transport hub served by two international airports: Paris-Charles de Gaulle (the second busiest airport in Europe).";
    Inf_2.innerHTML = "Modern Tokyo is categorized as an alpha+ city by the Globalization and World Cities Research Network. As of 2019, the population of Tokyo was estimated to be over 13.9 million, making it Japan's most populous prefecture.";
    Pic.src = "https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/du-lich-paris-3-ngay-2-dem-1-new.jpg";
}