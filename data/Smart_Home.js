setInterval(startTime,500);
setInterval(Button,500);
var myData=[];
var myJSON;
var Counter=0;
var key=[1,1,0];
const ID = document.getElementById('ID');
const Inf_1 = document.getElementById('Inf_1');
const Inf_2 = document.getElementById('Inf_2');
const Pic = document.getElementById('Pic');

// Choose window
function Paris_f() {
    if(key[0]===1){
        ID.innerHTML = "PARIS";
        Inf_1.innerHTML = "The city is a major railway, highway and air-transport hub served by two international airports: Paris-Charles de Gaulle (the second busiest airport in Europe).";
        Inf_2.innerHTML = "Modern Tokyo is categorized as an alpha+ city by the Globalization and World Cities Research Network. As of 2019, the population of Tokyo was estimated to be over 13.9 million, making it Japan's most populous prefecture.";
        Pic.src= "https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/du-lich-paris-3-ngay-2-dem-1-new.jpg";
        key=[0,1,0];
    }
}
function Button_f() {
    var InputName,InputColor,InputPort,CreatBt,RemoveBt,ClearBt,InputButton,Mode,btMode;
    if(key[1]===1) {
        ID.innerHTML = "BUTTON";
        Inf_1.remove();
        Inf_2.remove();
        Pic.remove();
        InputName = '<span class="txt">Button name:</span><input style="margin-left:10px;" id="Btname" type="text">';
        InputColor = '<span style="margin-left:10px;" class="txt">Color: </span><input type="color" id="ColorBt" value="#ff0000">';
        InputPort = '<span style="margin-left: 10px;" class="txt">GPIO: </span><select id ="PortBt"><option value=2>GPIO2</option><option value=4>GPIO4</option><option value=5>GPIO5</option><option value=6>GPIO6</option><option value=7>GPIO7</option><option value=8>GPIO8</option></select>';
        CreatBt = '<button style="margin-left:10px;" id="creatBt" onclick="CreatBT()">Creat</button>';
        RemoveBt = '<button style="margin-left:10px;" id="removeBt" onclick="RemoveBT()">Remove</button>';
        ClearBt = '<button style="margin-left:10px;" onclick="clearStorage()">Clear all</button>';
        InputButton = '<div class="txt">Buttons were created:<span id="Count">0</span></div>';
        Mode = InputName + InputColor + InputPort + CreatBt + RemoveBt + ClearBt +InputButton;
        btMode = document.getElementById("buttonMode");
        btMode.insertAdjacentHTML("beforeend", Mode);
        loadWeb();
        key=[0,0,1];
    }
}
function Reset_f(){
    var Inf_1,Inf_2,Inf,Pic,InfMode;
    if(key[2]===1) {
        ID.innerHTML = "LONDON";
        Inf_1 = '<p id="Inf_1"  class="txt">London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>';
        Inf_2 = '<p id="Inf_2" class="txt">Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>';
        Pic = '<img id="Pic" src="https://duhocnamphong.vn/images/news/2019/11/original/thanh-pho-london-uk_1574412943.jpg" alt="London picture">';
        Inf = Inf_1 + Inf_2 + Pic;
        InfMode = document.getElementById("Inf");
        InfMode.insertAdjacentHTML("beforeend", Inf);
        document.getElementById("buttonMode").innerHTML = "";
        document.getElementById("Output").innerHTML = "";
        key=[1,1,0];
    }
}

// Information a button
function Infor(name,color,portid,timer) {
    this.nameBT = name;
    this.colorBT = color;
    this.portBT = portid;
    this.setTimer = timer;
}

// Creat button
function CreatBT() {
    var name = document.getElementById('Btname');
    var color = document.getElementById('ColorBt');
    var idport = document.getElementById('PortBt');
    if(name.value!="" && checkBT(name.value,idport.value)){
        document.getElementById('Count').innerHTML = Counter+1;
        myData[Counter]= new Infor(name.value,color.value,idport.value,"");
        addObject(name.value,color.value,idport.value);
        saveWeb();
        //idport.remove(idport.selectedIndex);
        Counter++;
    }
}

// Disable creat same button.
function checkBT(name,portid){
    var i;
    var check=1;
    for(i=0;i<myData.length;i++){
        if(myData[i].nameBT==name||myData[i].portBT==portid){alert("Select same name of button or GPIO port! Please choose other!"); check=0; break;}
    }
    return check;
}

// Add Object
function addObject(name,color,portid){
    var State,TimeUp,BtElem,BtObj,addObj;
    State = '<div id="'+name+'" ><br><div class="box left" style="background-color: yellow;"><p>'+'GPIO'+portid+':OFF</p></div>';
    TimeUp = '<div class="box middle Timeup">Time up:<input type="time" id="'+name+'-T'+'"></div>';
    BtElem = '<div class="box right"><a name="'+name+'"class="button" id="'+Counter+'" onclick="SendData(this.name,this.id)" style="background-color:'+color+'; width:100%;">'+name+'</a></div></div>';
    BtObj = State + TimeUp + BtElem;
    addObj= document.getElementById("Output");
    addObj.insertAdjacentHTML("beforeend",BtObj);
}

// Remove button
function RemoveBT(){
    if(Counter > 0){
        Counter--;
        document.getElementById('Count').innerHTML = Counter;
        var name = document.getElementById('Btname').value;
        document.getElementById(name).remove();//remove Button
        removeObject(name);// remove data
        saveWeb();
    }
}
/*function addOption(portBT) {
    var Opt = '<option value='+portBT+'>'+'GPIO'+portBT+'</option>';
    var addOp = document.getElementById("PortBt");
    addOp.insertAdjacentHTML("beforeend",Opt);
}*/

//Remove Object
function removeObject(name){
    var i;
    for(i=0;i<myData.length;i++){
        if(myData[i].nameBT==name){
            myData.splice(i,1);
            break;
        }
    }
}

// Creat data in array.
function SendData(nameBt,value){
    var colorName = nameBt + '-T';
    var cout = Number(value);
    var Timer = document.getElementById(colorName).value;
    myData[cout].setTimer= Timer;
    saveWeb();
}

// Database


//Storge web
function saveWeb(){
    myJSON = JSON.stringify(myData);
    alert("Save: "+myJSON);
    localStorage.setItem("testJSON", myJSON);
}
function loadWeb(){
    var obj,load,name,color,idport,timer;
    load = localStorage.getItem("testJSON");
    obj= JSON.parse(load);
    //alert("Data: " + obj[0].nameBT + " " + obj[0].colorBT);
    if(obj.length>0){
        for(Counter=0;Counter<obj.length;Counter++){
            name= obj[Counter].nameBT;
            color= obj[Counter].colorBT;
            idport= obj[Counter].portBT;
            timer= obj[Counter].setTimer;
            myData[Counter]= new Infor(name,color,idport,timer);
            addObject(name,color,idport);
        }
        //Counter-=1;
        document.getElementById("Count").innerHTML = Counter;
    }
}

//Clear storge
function clearStorage(){
    localStorage.clear();
    location.reload();
}

// Disable remove button
function Button() {
    if(Counter==0){document.getElementById("removeBt").disabled = true;}
    else {document.getElementById("removeBt").disabled = false;}
}
function startTime() {
    var today= new Date();
    var Time = today.toLocaleString();
    document.getElementById('Date').innerHTML = Time;
}