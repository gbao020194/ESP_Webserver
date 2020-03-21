var myUpload = setInterval(startTime,500);
var checkBt = setInterval(Button,500);
var myData=[];
var myJSON;
var Counter=0;

		function Paris_f() { 
  			document.getElementById("ID").innerHTML = "PARIS";
			document.getElementById("Inf_1").innerHTML = "The city is a major railway, highway and air-transport hub served by two international airports: Paris-Charles de Gaulle (the second busiest airport in Europe).";
			document.getElementById("Inf_2").innerHTML = "Modern Tokyo is categorized as an alpha+ city by the Globalization and World Cities Research Network. As of 2019, the population of Tokyo was estimated to be over 13.9 million, making it Japan's most populous prefecture.";
			document.getElementById("Pic").src= "https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/du-lich-paris-3-ngay-2-dem-1-new.jpg";
		}

		function Button_f() {
  			document.getElementById("ID").innerHTML="BUTTON";
			document.getElementById("Inf_1").remove();
			document.getElementById("Inf_2").remove();
			document.getElementById("Pic").remove();
			var t = '<span class="txt">Button name:</span><input style="margin-left:10px;" name="Btname" type="text"><span style="margin-left:10px;" class="txt">Color: </span><input type="color" name="ColorBt" value="#ff0000"><button style="margin-left:10px;" id="creatBt" onclick="CreatBT()">Creat</button><button style="margin-left:10px;" id="removeBt" onclick="RemoveBT()">Remove</button><button style="margin-left:10px;" onclick="clearStorage()">Clear all</button><div class="txt">Buttons were created:<span id="Count">0</span></div>';
			var b= document.getElementById("buttonMode");
			b.insertAdjacentHTML("beforeend",t);
			loadWeb();
			/*x= document.getElementsByClassName("clearfix");
			for(var i=0;i<x.length;){
				x.item(i).remove();
			}*/
		}
		function Reset_f(){
			document.getElementById("ID").innerHTML="LONDON";
			var t = '<p id="Inf_1"  class="txt">London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p><p id="Inf_2" class="txt">Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p><img id="Pic" src="https://duhocnamphong.vn/images/news/2019/11/original/thanh-pho-london-uk_1574412943.jpg" alt="London picture">';
			var b= document.getElementById("Inf");
			b.insertAdjacentHTML("beforeend",t);
			document.getElementById("buttonMode").innerHTML="";
			document.getElementById("Output").innerHTML="";
		}
		// Information a button
		function Infor(name,color,time) {
  			this.nameBT = name;
			this.colorBT = color;
			this.setTime = time;
		}
		
		// Creat button
		function CreatBT() {
  			var x = document.getElementsByName("Btname")[0].value;
  			var y = document.getElementsByName("ColorBt")[0].value;  
			if(x!="" && checkBT(x)){
				Counter++;
				document.getElementById("Count").innerHTML = Counter;
				myData[Counter]= new Infor(x,y);
				addObject(x,y,"");
				saveWeb();
			}
		}
		// Disable creat 2 same button.
		function checkBT(name){
			var i;
			var check=1;
			for(i=1;i<myData.length;i++){
				if(myData[i].nameBT==name){check=0; break;}
			}
			return check;
		}
		// Add Object
		function addObject(name,color){
			var t = '<div id="'+name+'" ><br><div class="box left" style="background-color: yellow;"><p>State:OFF</p></div><div class="box middle Timeup">Time up:<input type="time" id="'+name+'-T'+'"></div><div class="box right"><a name="'+name+'"class="button" id="'+Counter+'" onclick="SendData(this.name,this.id)" style="background-color:'+color+'; width:100%;">'+name+'</a></div></div>';
			var b= document.getElementById("Output");
			b.insertAdjacentHTML("beforeend",t);
		}
		// Remove button
		function RemoveBT(){
			if(Counter > 0){
				Counter--;
				document.getElementById("Count").innerHTML = Counter;
				var x = document.getElementsByName("Btname")[0].value;
				document.getElementById(x).remove();
				removeObject(x);
				saveWeb();
			}
		}
		//Remove Object
		function removeObject(name){
			var i;
			for(i=1;i<myData.length;i++){
				if(myData[i].nameBT==name){
					myData.splice(i,1);
					break;
				}
			}
		}
		// Creat data in array.
		function SendData(nameBt,value){
			var y = nameBt + '-T';
			var n = Number(value);
			var x = document.getElementById(y).value;
			myData[n].setTime= x;
			saveWeb();
			//alert("Data: " + myData[n].nameBT + " " + myData[n].colorBT+" "+ myData[n].setTime);
		}
		//Storge web
		function saveWeb(){
			myJSON = JSON.stringify(myData);
			alert(myJSON);
			localStorage.setItem("testJSON", myJSON);
		}
		function loadWeb(){
			var obj,load,name,color;
			load = localStorage.getItem("testJSON");
			obj= JSON.parse(load);
			//alert("Data: " + obj[1].nameBT + " " + obj[1].colorBT);
			if(obj.length>1){
				for(Counter=1;Counter<obj.length;Counter++){
					name= obj[Counter].nameBT;
					color= obj[Counter].colorBT;
					time= obj[Counter].setTime;
					myData[Counter]= new Infor(name,color,time);
					addObject(name,color);
				}
				Counter-=1;
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