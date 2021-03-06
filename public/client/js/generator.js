//todo list to return:
//color
//play these notes
//play these chords

var coords = [];
var outputNotes = [];

//sort ascending x
function sortX(a, b) {
	return a.x - b.x;
}

//sort ascending y
function sortY(a, b) {
	return a.y - b.y;
}


function getMeanInRange(low, high) {
	var sum = 0;
	var count = 1;
	
	for(var i = 0; i < coords.length; i++){
		if(coords[i].x > low && coords[i].x < high){
			sum += coords[i].y;
			count++;
		}
	}
	var mean = sum/count;
	//console.log(Math.floor(mean))
	return Math.floor(mean);
}

function getMaxInRange(low, high) {
	var curMax = 0;
	
	for(var i = 0; i < coords.length; i++){
		if(coords[i].x > low && coords[i].x < high){
			if(coords[i].y > curMax){
				curMax = coords[i].y;
			}
		}
	}
	return curMax;
}

function getMinInRange(low, high) {
	var curMin = 9999;
	
	for(var i = 0; i < coords.length; i++){
		if(coords[i].x > low && coords[i].x < high){
			if(coords[i].y < curMin){
				curMin = coords[i].y;
			}
		}
	}
	return curMin;
}

function convertMeanToNum(minY, maxY, mean){
	//divide into n sections
	var n = 10;
	var sectionsize = (maxY-minY)/n;
	var num = 1;
	for(var i = minY; i < maxY; i+=sectionsize){

		if(mean > i && mean < (i + sectionsize)){
			//console.log(num);
			return num;
		}
		num++;
	}
	return num;
}

function parseCanvas() {
	coords.sort(sortX);
	
	var minX = coords[0].x;
	var maxX = coords[coords.length-1].x;
	var range = maxX - minX;

	coords.sort(sortY);
	var minY = coords[0].y;
	var maxY = coords[coords.length-1].y;

	outputNotes = [];

	//split signature range into n parts for n notes
	var sectionsize = range/16;
	for(var i = minX; i < maxX; i += sectionsize){
		var curmean = getMeanInRange(i, i+sectionsize);
	}

	
	for(var j = minX; j < maxX; j += sectionsize){
		var notecurmean = getMeanInRange(j, j+sectionsize);
		if(Math.random() > 0.6){
			outputNotes.push(0);
		}
		outputNotes.push(convertMeanToNum(getMinInRange(j, j+sectionsize), getMaxInRange(j, j+sectionsize), notecurmean));
	}

	console.log(outputNotes);
}


