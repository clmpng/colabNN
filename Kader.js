
async function yourFunction() { 
const model = await tf.loadLayersModel("/colabnn/model/model.json")
}

yourFunction();

/* // Notice there is no 'import' statement. 'tf' is available on the index-page
      // because of the script tag above.
 
      // Define a model for linear regression.
  
      
 
      // Prepare the model for training: Specify the loss and the optimizer.
      model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
 
      // Generate some synthetic data for training.
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
      const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
 
      // Train the model using the data.
      model.fit(xs, ys).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        // Open the browser devtools to see the output
        model.predict(tf.tensor2d([5], [1, 1])).print();
      }); */

/* var access_token = 'ALexfNLaV053SX8h+iC9XvVow9sgeKiz7JrY94ufMhW4GZGWoExvVG9cz789dVGsMarOHnbW9wjh0CGTDVC4p169XAySvYJtJvGoMaNalHbXcxotSzFCCYYPwB8YOtvIvTM5quyI7KaqqyZbKnlcqM\u002FMqGekw8LSb3v\u002FTHSmyiI0ECuu1ChJVhYTHrkIU1ET'
var spielerArray = [];
var MarketValues = [];
var selectedPlayers = [];

var panel = document.createElement("panel");
	panel.innerHTML = "<div class = 'panel' id='panel'>"
						+"<div class = 'panelheadline' id='panelheadline'> Sortieren: </div>"  
						+"<div class = 'sort_buttons' id='sort_buttons'>"  
							+"<button onclick='sort(spielerArray, 0)';>Nach ID</button>" 
							+"<button onclick='sort(spielerArray, 5)';>Nach Punkten</button>"
							+"<button onclick='sort(spielerArray, 6)';>Nach Preis</button>"
							+"<button onclick='sort(spielerArray, 12)';>Nach Wertentwicklung</button>"
						+"</div>"
						+"<div class = 'control_buttons' id='control_buttons'>"
							+"<button onclick='buyAll(spielerArray)';>Auf alle bieten</button>"
							+"<button onclick='getHighestBit(2038)';>Höchste Gebote</button>"
						+"</div>"
						+ "<div class = 'selectbox' id='select'>"
							+ "<input type='text' id='SelectValue' value='Kaufkriterium' size='15'>" + "<button type='button' class = 'button' onclick='BuySelectedPlayers(spielerArray, 8, undefined)'> Kaufen </button>"     
						+ "</div>"
					 +"</div>"
			   		
var head = document.getElementById("head2");
head2.appendChild(panel); 

function getPlayers(callback){  //erstellt das spielerArray mit allen Daten der Spieler im Kader 
var request = new XMLHttpRequest();
request.open("GET","https://api.kickbase.com/leagues/646518/lineupex", true);
request.responseType = 'json';
request.setRequestHeader("Authorization", "Bearer  "+ access_token);
request.addEventListener('load', function(event) {
   if (request.status >= 200 && request.status < 300) {
		for (var i = 0; i < request.response.players.length; i++){
				var id = request.response.players[i].id;
				var teamId = request.response.players[i].teamId;
				var vorname = request.response.players[i].firstName;
				var nachname = request.response.players[i].lastName;
			if(typeof request.response.players[i].profile === "string"){		
				var picture = "https://kkstr.s3.amazonaws.com/pool/playersbig/" + id +".png";
			} else var picture = "https://kkstr.s3.amazonaws.com/pool/teamsdummies/"+ teamId +".png";
				var value = request.response.players[i].marketValue;
				var valueAsString = value.toLocaleString()
				var points = request.response.players[i].totalPoints;
			switch (request.response.players[i].position) {
					case 1:
						var position = "Tor";
						break;
					case 2:
						var position = "Abwehr";
						break;
					case 3:
						var position = "Mittelfeld";
						break;
					case 4:
						var position = "Sturm";	
						break;
			}
			var valueTrendNumber = request.response.players[i].marketValueTrend;
			switch (valueTrendNumber) {
					case 0:
						var valueTrend = "Neutral";
						break;
					case 1:
						var valueTrend = "Steigend";
						break;
					case 2:
						var valueTrend = "Fallend";
						break;
			}
			var innerArray =[id, vorname, nachname, teamId, picture, position, points, value, valueAsString, valueTrend, valueTrendNumber];
			spielerArray.push(innerArray);	
			console.log(innerArray);
		} callback();
   } else {
      console.warn(request.statusText, request.responseText);
   } 
});
request.send();
}

function getPlayerStats(id, callback){
var request2 = new XMLHttpRequest();
request2.open("GET", "https://api.kickbase.com/leagues/646518/players/" + id + "/stats",  true);
request2.responseType = 'json';
request2.setRequestHeader("Authorization", "Bearer  "+ access_token);
request2.addEventListener('load', function(event) {
   if (request2.status >= 200 && request2.status < 300) {
	   for (i=0; i<spielerArray.length; i++){
		   if(spielerArray[i][0] == id){         // Wertearray eines Spielers anhand seiner ID auswählen
			   var innerArray = spielerArray[i];
			   innerArray.push(request2.response.marketValues); // Für jeden Spieler den Marktwerverlauf an das Wertearray anhängen	
		   }
	   }
		callback(); 

   }
});
request2.send();
}

function getPlayerPoints(id, callback){
var request3 = new XMLHttpRequest();
request3.open("GET", "https://api.kickbase.com/players/" + id + "/points",  true);
request3.responseType = 'json';
request3.setRequestHeader("Authorization", "Bearer  "+ access_token);
request3.addEventListener('load', function(event) {
	console.log(request3.response);
   if (request3.status >= 200 && request3.status < 300) {
	   for (i=0; i<spielerArray.length; i++){
		   if(spielerArray[i][0] == id){         // WerteArray eines Spielers anhand seiner ID auswählen
			   var innerArray = spielerArray[i];
				innerArray.push(request3.response.s); // Für jeden Spieler die bisherigen Punkte/Spiele an das WerteArray anhängen
			}
	   }
		callback(); 

   }
});
request3.send();
}


function getLatestMatches(innerArray){  // Funktion um die letzten drei Spiele zu bestimmen
	var lastMatches = [];
    if (innerArray[11].length > 0){
	 var seasonMatches = innerArray[11][innerArray[11].length-1].m.length; // Anzahl Spiele dieser Saison bestimmen 
		if (seasonMatches < 3){
			for (i= innerArray[11][innerArray[11].length-2].m.length - (3-seasonMatches); i< innerArray[11][innerArray[11].length-2].m.length; i++){
				lastMatches.push(innerArray[11][innerArray[11].length-2].m[i]);
			}
			for (i= 0; i< seasonMatches; i++){
				lastMatches.push(innerArray[11][innerArray[11].length-1].m[i]);
			}
		}else{
			for (i= seasonMatches-3; i< seasonMatches; i++){
				lastMatches.push(innerArray[11][innerArray[11].length-1].m[i]);
			}
		}
		console.log(innerArray[11])
		innerArray[14]= lastMatches[2].p;
		console.log(lastMatches[2].p)
		return lastMatches;
	}				
}
	
	

function createBox(innerArray, callback) { //wird für jeden Spieler aufgerufen und erstellt die SpielerBox
getPlayerPoints(innerArray[0], function(){
	getPlayerStats(innerArray[0], function (){  // der folgende Teil wird an der callback() stelle in getPlayerStats ausgeführt 
		getLatestMatches(innerArray)
		var valueday = (innerArray[12][innerArray[12].length-1].m)-(innerArray[12][innerArray[12].length-2].m);
		var valueweek = (innerArray[12][innerArray[12].length-1].m)-(innerArray[12][innerArray[12].length-8].m); 
		innerArray.push(valueday); // Tages- und Wochenveränderungen werden berechnet und die Tagesveränderung an das Wertearray angehängt
		var playerbox = document.createElement("playerbox");
			playerbox.innerHTML = "<div class = 'box' id=" + innerArray[0] + ">"
						+ "<div class = 'nummer'>"
						  + innerArray[0]
						+ "</div>"
						+ "<div class = 'picture' id='Bild'>"
						+ "<img src='" + innerArray[4] + "' height='250px' width='290px' alt=" + innerArray[4] + "/>" 
						+ "</div>"
						+ "<div class = 'playername' id='Spielername'>"
						  + innerArray[1] + " " + innerArray[2]
						+ "</div>"
						+ "<div class = 'info' id='Infos'>"
						  + "<p> Position: " + innerArray[5] + "</p>"  
						  + "<p> Punkte: " + innerArray[6] + "</p>"
						  + "<p> Punkte letztes Spiel: " + innerArray[14] + "</p>"
						  + "<p> Marktwerttendenz: " + innerArray[9] + "</p>"
						+ "</div>"
						+ "<div class = 'value' id='Wert'>"
						  + "Wert: € " + innerArray[8]      
						+ "</div>"
						+ "<div class = 'valuesheadline' id='Wertentwicklung'>"
						  + "Wertentwicklung"     
						+ "</div>"
						+ "<img src='https://kkstr.s3.amazonaws.com/pool/teamscover_web/" + innerArray[3] +".svg' height='250px' width='290px' alt=" + innerArray[3] + " />" 
						+ "<div class = 'valuehistory' id='Veränderung'>"
						  +  innerArray[12][innerArray[12].length-1].m.toLocaleString() 
						  + "<p>"  + innerArray[12][innerArray[12].length-2].m.toLocaleString() 
						  + "<p>"  + innerArray[12][innerArray[12].length-3].m.toLocaleString() + "</p>"
						  + "<p> Tag: " + valueday.toLocaleString() + " | " + "Woche: " + valueweek.toLocaleString() + "</p>"
						+ "</div>"
						+ "<div class = 'buttonbox' id='Angebot'>"
						  + "<input type='number' id='buy_" + innerArray[0] +"' value='" + innerArray[7] +"' size='15'>" + "<button type='button' class = 'button' onclick='spielerKauf(" + innerArray[0] + ",0) ' id=" + innerArray[0] + ">Kaufen</button>"     
						+ "</div>"
					+ "</div>" 
	
	var body = document.getElementById("body");
	body.appendChild(playerbox);  // bis hierhin ist noch nichts sichtbar. erst jetzt wird festgelegt dass das neue element "div" ein child vom div player sein soll.
	callback();
 });
});
}

function createBody(spielerArray){
	var i = 0;
    function step() {
        if (i < spielerArray.length) {
            createBox(spielerArray[i], function() {
                i++;
                step();
            });
        }
    }
    step();
}

function run(){
getPlayers(function (){
	createBody(spielerArray);
});
} */

//run();

