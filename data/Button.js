setInterval(startTime,500);
setInterval(Button,500);
var myData=[],myJSON=[];
var Counter=0,flgBegin=0;
//var ws=null;
const BTName = document.getElementById('Btname');
const BTColor = document.getElementById('ColorBt');
const Idport = document.getElementById('PortBt');
const CreatBT = document.getElementById('creatBt');
const RemoveBT = document.getElementById('removeBt');
const RemoveAll = document.getElementById('removeAll');
const SelectBox = document.getElementById('PortBt');
const database = firebase.database();
const usersRef = database.ref('/button');


function Help_f(){
    let Inf_1,Inf_2,Inf,Pic,InfMode;
    document.getElementById('ID').innerHTML = "PARIS";
    Inf_1 = '<p id="Inf_1"  class="txt">The city is a major railway, highway and air-transport hub served by two international airports: Paris-Charles de Gaulle (the second busiest airport in Europe).</p>';
    Inf_2 = '<p id="Inf_2" class="txt">Modern Tokyo is categorized as an alpha+ city by the Globalization and World Cities Research Network. As of 2019, the population of Tokyo was estimated to be over 13.9 million, making it Japan\'s most populous prefecture.</p>';
    Pic = '<img id="Pic" src="https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/du-lich-paris-3-ngay-2-dem-1-new.jpg" alt="Paris picture">';
    Inf = Inf_1 + Inf_2 + Pic;
    InfMode = document.getElementById("Inf");
    InfMode.insertAdjacentHTML("beforeend", Inf);
    document.getElementById("buttonMode").innerHTML = "";
    document.getElementById("Output").innerHTML = "";
}
//Creat Database on Firebase
CreatBT.addEventListener('click',(e)=>{
    let num = SelectBox.selectedIndex;
    let Arr = SelectBox.options;
    let deviceName = Arr[num].text;
    flgBegin=1;
    if(BTName.value.trim()!=="" && checkBT(BTName.value.trim(),Idport.value)) {
        creatBT(deviceName);
        e.preventDefault();
        usersRef.child(deviceName).set({
            nameBT: BTName.value.trim(),
            statusBT: "Disable",
            colorBT: BTColor.value,
            portBT: Number(Idport.value),
            Begin: "",
            End:""
        });
       /* database.ref('/Counter').set({
            TotalBT: Counter
        });*/
        BTName.value="";
    }
});
//Remove Database on Firebase
RemoveBT.addEventListener('click', e => {
    let num = SelectBox.selectedIndex;
    let Arr = SelectBox.options;
    let deviceName = Arr[num].text;
    removeBT();
    e.preventDefault();
    usersRef.child(deviceName).remove();
    /*database.ref('/Counter').set({
        TotalBT: Counter
    });*/
    location.reload();
});

RemoveAll.addEventListener('click',e =>{
   e.preventDefault();
   usersRef.remove();
   //Counter=0;
   /*database.ref('/Counter').set({
       TotalBT: Counter
   });*/
   location.reload();
});
usersRef.orderByKey().on('value', snapshot => {
   let name,color,idport,timer1,timer2,stt,key;
   let obj = snapshot.val();
   let ShowDevice = Object.getOwnPropertyNames(obj);
   myJSON = Object.values(obj);
   if(flgBegin===0){
       flgBegin=1;
       for(Counter=0;Counter<myJSON.length;Counter++){
           key = ShowDevice[Counter];
           name= myJSON[Counter].nameBT;
           stt= myJSON[Counter].statusBT;
           color= myJSON[Counter].colorBT;
           idport= myJSON[Counter].portBT;
           timer1= myJSON[Counter].Begin;
           timer2= myJSON[Counter].End;
           myData[Counter]= new Infor(key,name,stt,color,idport,timer1,timer2);
           addObject(name,color,ShowDevice[Counter]);
           document.getElementById(name+'-S').innerHTML = stt;
       }
       document.getElementById("Count").innerHTML = String(Counter);
   }
});



// Information a button
function Infor(key,name,stt,color,portid,Bgtimer,Endtimer) {
    this.Keyword = key;
    this.nameBT = name.trim();
    this.statusBT = stt;
    this.colorBT = color;
    this.portBT = Number(portid);
    this.BeginT = Bgtimer;
    this.EndT = Endtimer;
}

// Creat button
function creatBT(deviceName) {
    document.getElementById('Count').innerHTML = String(Counter+1);
    myData[Counter]= new Infor(deviceName,BTName.value,"Disable",BTColor.value,Idport.value,"","");
    addObject(BTName.value,BTColor.value,deviceName);
    Counter++;
    //Payload();
}

// Disable creat same button.
function checkBT(name,portid){
    let isLike = myData.some(f => f.nameBT===name || f.portBT===Number(portid));
    if (isLike) alert("Select same Button name or GPIO port! Please choose another!");
    return !isLike;
}

// Add Object
function addObject(name,color,deviceName){
    let State,TimeUp,BtElem,BtObj,addObj;
    State = '<div id="'+name+'" ><br><div class="box left" style="background-color: yellow;"><p>'+deviceName+':<span id="'+name+'-S'+'">Disable</span></p></div>';
    TimeUp = '<div class="box middle Timeup">Begin:<input type="time" id="'+name+'-T1'+'"><span style="margin-left: 30px;">End:</span><input type="time" id="'+name+'-T2'+'"></div>';
    BtElem = '<div class="box right"><a class="button" id="'+Counter+'" name="'+ name +'" onclick="SetTimer(this.name,this.id)" style="background-color:'+color+'; width:100%;">'+name+'</a></div></div>';
    BtObj = State + TimeUp + BtElem;
    addObj= document.getElementById("Output");
    addObj.insertAdjacentHTML("beforeend",BtObj);
}

// Remove button
function removeBT(){
    Counter--;
    document.getElementById('Count').innerHTML = String(Counter);
}

// Update SetTime to myData.
function SetTimer(nameBt,value){
    let Timer1 = nameBt + '-T1';
    let Timer2 = nameBt + '-T2';
    let SttName = nameBt + '-S';
    let cout = Number(value);
    let BG = document.getElementById(Timer1);
    let EN = document.getElementById(Timer2);
    if((BG.value===EN.value) && (BG.value!=="") && (EN.value!=="")){
        alert("Error! Begin time = End time.");
    }
    else {
        myData[cout].BeginT= BG.value;
        myData[cout].EndT= EN.value;
        if(myData[cout].statusBT === "Disable") {
            myData[cout].statusBT = "Enable";
            document.getElementById(SttName).innerText= myData[cout].statusBT;
            BG.value=""; EN.value="";
        }
        else if(myData[cout].statusBT === "Enable") {
            myData[cout].statusBT = "Disable";
            document.getElementById(SttName).innerText= myData[cout].statusBT;
            myData[cout].BeginT=""; myData[cout].EndT= "";
            BG.value=""; EN.value="";
        }
    //Update setTime to Firebase.
        const newData = {
            Begin: myData[cout].BeginT,
            End: myData[cout].EndT,
            statusBT: myData[cout].statusBT
        };
        usersRef.child(myData[cout].Keyword).update(newData);
    }
}

// Send over Websocket
/*function onpenWS(cout,sttName){
    let flg = 0;
    ws = new WebSocket("ws://esp32.local/test");
    ws.onopen = function() {
        flg = 1;
        alert("Sending!");
    };
    ws.onclose = function() {
        if(flg===0){
            alert("Fail! Try again...");
            setTimeout(Payload,500);
        }
        else{
            alert("Successful!");
            flg=0;
        }
    };
}
function closeWS() {
    ws.close();
}
function SendDatabase(){
    let textToSend = JSON.stringify(myData);
    ws.send(textToSend);
    setTimeout(closeWS,500);
}
function Payload(cout,sttName){
    onpenWS(cout,sttName);
    setTimeout(SendDatabase, 500);
}*/

// Disable remove button
function Button() {
    let i;
    document.getElementById("removeBt").disabled = Counter <= 0;
    for(i=0;i<myData.length;i++){
        let time1= myData[i].nameBT + '-T1';
        let time2= myData[i].nameBT + '-T2';
        if(myData[i].statusBT === "Enable"){
            document.getElementById(time1).disabled = true;
            document.getElementById(time2).disabled = true;
        }
        if(myData[i].statusBT === "Disable"){
            document.getElementById(time1).disabled = false;
            document.getElementById(time2).disabled = false;
        }
    }
}
function startTime() {
    let today= new Date();
    document.getElementById('Date').innerHTML = today.toLocaleString();
}