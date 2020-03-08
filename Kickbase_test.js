var access_token = 'Fply5ePWgV2CChrs6twm5OrsEIB6rbK5XEQqqEdlhFG6hs1UsQ5NUMWq6JPex1Y2A5ASqzzNMiwr5tkOOh87pauO9ROo2G1AaKXSotgQTTBSNECeX3\u002FL+iAc\u002F1WUYrnoG\u002FqtXMgSIPm62sxl5qIHUb2R9m2Uq8NHABLV3Bjvw9KYZRHYmV1WsyPHFt79lOS7'
var spielerArray = [37,43,8,15,51,49,60,69,72,44,77,81,78,89,96,102,118,152,157,163,168,173,181,213,211,223,229,237,239,241,283,285,292,293,299,300,304,312,317,318,326,330,337,348,352,354,355,370,374,378,377,387,383,388,392,393,394,396,399,401,406,410,415,420,422,429,432,438,436,447,450,454,455,459,463,464,461,470,477,482,486,493,497,496,512,513,524,529,530,533,542,544,547,554,557,570,579,583,581,600,607,608,605,613,616,617,620,623,624,651,653,663,660,668,670,672,684,688,691,694,693,703,712,715,717,726,727,732,736,737,734,748,798,849,976,1070,1116,1138,1183,1192,1196,1208,1204,1212,1217,1223,1225,1229,1230,1239,1245,1246,1249,1256,1262,1257,1293,1298,1295,1308,1312,1330,1333,1350,1359,1387,1398,1399,1400,1407,1429,1529,1538,1540,1553,1555,1556,1564,1566,1570,1568,1581,1583,1590,1595,1618,1620,1623,1637,1639,1645,1653,1654,1659,1664,1671,1680,1685,1686,1703,1710,1716,1725,1726,1738,1739,1763,1764,1766,1767,1761,1773,1774,1778,1781,1789,1790,1796,1804,1809,1810,1811,1817,1823,1815,1841,1826,1851,1862,1856,1867,1865,1869,1876,1877,1878,1881,1883,1885,1892,1896,1899,1900,1903,1906,1908,1910,1909,1913,1914,1916,1919,1926,1936,1953,1950,1957,1961,1963,1978,1985,1991,1990,1996,1999,2047,2000,2046,2006,2009,2052,2020,2029,2035,2038,2036,2054,2056,2053,2057,2059,2063,2065,2068,2077,2083,2084,2089,2092,2091,2097,2106,2109,2118,2122,2134,2135,2139,2141,2144,2153,2152,2151,2159,2157,2176,2179,2181,2182,2188,2189,2191,2193,2195,2194,2206,2209,2213,2212,2226,2229,2230,2234,2239,2240,2241,2246,2244,2254,2255,2257,2256,2261,2263,2268,2274,2273,2275,2276,2279,2280,2278,2281,2282,2283,2284,2285,2287,2288,2289,2291,2297,2302,2305,2306,2307,2308,2309,2314,2315,2321,2322,2323,2331,2330,2335,2337,2339,2341,2343,2349,2358,2359,2357,2361,2365,2366,2368,2371,2373,2374,2381,2376,2375,2384,2383,2392,2394,2395,2396,2400,2404,2409,2426,2450,2457,2463,2462,2468,2471,2483,2501,2502,2532,2539,2552,2553,2639,2638,2640,2642,2641,2643,2644,2645,2646,2648,2647,2649,2650,2652,2653,2656,2651,2660,2658,2661,2662,2664,2665,2663,2672,2676,2678,2684,2685,2687,2683,2686,2688,2693,2703,2704,2705,2707,2714,2718,2724,2717,2725,2728,2729,2727,2726,2731,2732,2735,2736,2738,2737,2740,2742,2743,2741,2744,2745,2747,2746,2757,2756,2759,2758
];
var PunkteArray = [];

function getPoints(id, callback){ 
	var request = new XMLHttpRequest();
	request.open("GET", "https://api.kickbase.com/players/" + id + "/points",  true);
	request.responseType = 'json';
	request.setRequestHeader("Authorization", "Bearer  "+ access_token);
	request.addEventListener('load', function(event) {
		if(request.response.s[request.response.s.length-1].t=="2019/2020"){
			//console.log(request.response);
			//downloadXMLFromJSON(JSON.stringify(request.response.s[0]));
			//spielerArray.push(id);
			var data = request.response.s[request.response.s.length-1];
			var innerArray =[id, data];
			PunkteArray.push(innerArray);
		} callback();
	});
request.send();
}


function getInfo(id, callback){
getPoints(id, function (){
var request2 = new XMLHttpRequest();
request2.open("GET", "https://api.kickbase.com/leagues/646518/players/" + id + "/stats",  true);
request2.responseType = 'json';
request2.setRequestHeader("Authorization", "Bearer  "+ access_token);
request2.addEventListener('load', function(event) {
   if (request2.status >= 200 && request2.status < 300) {
	   for (i=0; i<PunkteArray.length; i++){
			if(PunkteArray[i][0] == id){         // PunkteArray eines Spielers anhand seiner ID auswählen
			  var innerArray = PunkteArray[i];
			  innerArray.push(request2.response)
			}
	   }
	} 
	callback();
});
request2.send();
});
}



function download(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

function downloadXMLFromJSON(jsonString) {
  let fileName = 'sample.xml';
  let xmlStr = new X2JS().json2xml_str(JSON.parse(jsonString));
  let a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(new File([xmlStr], fileName, {type: 'text/xml'}));
  a.click();
}

/* var x = 0;
var loopArray = function(arr) {
    getInfo(spielerArray[x],function () {
        // set x to next item
        x++;
		console.log(x);
        // any more items in array? continue loop
        if(x < 30) {
            loopArray(arr);   
        }else{
				//download(PunkteArray, 'json');
				Suche();
		}
    }); 

} */

function getData(callback){
loopArray(spielerArray);
}


function Suche(){ 
	console.log(PunkteArray);
	var max = 0; // Suche nach meisten Punkten am ersten Spieltag
    // Traverse array elements  
    // from second and compare 
    // every element with current max  
    for (var i = 1; i < PunkteArray.length; i++){
	 if (typeof(PunkteArray[i][1].m[1].p) =="number"){
        if (PunkteArray[i][1].m[1].p > max){ 
            max = PunkteArray[i][1].m[1].p; 
			var maxName = PunkteArray[i][2].lastName;
		}
	 }
    }
    console.log(maxName +" " + max); 
}

function test(){ 
var data = {
                   email: "chrissi95@msn.com",
				   password: "Formel1#K"	
                };
	var requestT = new XMLHttpRequest();
	requestT.open("POST", "https://api.kickbase.com/v1/user/login",  true);
	requestT.responseType = 'json';
	requestT.setRequestHeader("Authorization", "Bearer  "+ access_token);
	//requestT.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
	//requestT.setRequestHeader("Origin", "https://www.ligainsider.de");
	requestT.addEventListener('load', function(event) {
		console.log(requestT.response)
	});
requestT.send(JSON.stringify(data));
}



//getPoints(455);
test();



// Links:
// https://api.kickbase.com/leagues/646518/live gibt die SPiele des aktuellen bzw letzten SPieltags und auch die Were der einzelnen aufgestellen Spieler!
// https://api.kickbase.com/leagues/646518/stats liefert die Ergebnisse der Spieltage (Ergebnisse der user)
// https://api.kickbase.com/players/" + id + "/points statistiken der spieler für jedes Spiel 
// https://api.kickbase.com/competition/best?position=0 Beste spieler nach Position bzw. nur /best sind alle besten Spieler
// https://api.kickbase.com/competition/matches?matchDay=4 Spielergebnisse von jedem Spieltag (nur ergebnis und videolink)
// https://api.kickbase.com/competition/table?matchDay=4 Tabelle je spieltag und Punkte der jeweiligen Mannschaften