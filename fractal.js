$(document).ready(function () {
	var squareData = [0];

	var svgHeight = '768';
	var svgWidth = '1024';
	var midx = svgWidth/2.0;
	var midy = svgHeight/2.0;
	var twoPi = 2*Math.PI;
	var sixty = twoPi/6.0;

	var cos60 = Math.cos(sixty);
	var sin60 = Math.sin(sixty);
	var degree = 2;
	
	var rotation = [[Math.cos(sixty),-Math.sin(sixty)],[Math.sin(sixty),Math.cos(sixty)]];

	// Seed initial points for iterative process on points matrix
	var points = [[0,svgHeight-10],[svgWidth,svgHeight-10]];


	var count = 0;

	function createSvg(parent, height, width) {
	  return d3.select(parent)
	  		   .append('svg')
	  		   .attr('height', height)
	  		   .attr('width', width);
	}
	
	function multiply(matrix,vector) {
		var result = new Array(vector.length);
		for(var i=0; i<matrix.length; i++) {
			result[i] = 0;
			for(var j=0; j<matrix[i].length; j++) {
				result[i] += matrix[i][j] * vector[j];
			}
		}
		return result;
	}
	
	function lineSplit(array) {
		var temp = [];
		for(var i=0; i<array.length-1; i++) {
			var point1 = [array[i][0], array[i][1]];
			var point5 = [array[i+1][0], array[i+1][1]];
			
			var distanceX = (point5[0]-point1[0])/3;
			var distanceY = (point5[1]-point1[1])/3;
			
			var point2 = [point1[0]+distanceX, point1[1]+distanceY];
			var point4 = [point5[0]-distanceX, point5[1]-distanceY];
			//var point2 = [(2/3)*array[i][0]+(1/3)*array[i+1][0], (1/3)*array[i][1]+(2/3)*array[i+1][1]];
			//var point4 = [(1/3)*array[i][0]+(2/3)*array[i+1][0], (2/3)*array[i][1]+(1/3)*array[i+1][1]];
			
			//var twoFour = [point4[0]-point2[0],point4[1]-point2[1]];
			//var mid = multiply(rotation,twoFour);
			//var point3 = [point2[0]+mid[0], point2[1]+mid[1]];
			var point3 = [point2[0] + (distanceX*cos60 + distanceY*sin60), point2[1] + (distanceY*cos60 - distanceX*sin60)];

			if(i==0) {
				temp.push(point1);
				temp.push(point2);
				temp.push(point3);
				temp.push(point4);
				temp.push(point5);
			}
			
			else {
				temp.push(point2);
				temp.push(point3);
				temp.push(point4);
				temp.push(point5);
			}
			/*
			temp.push(point1);
			temp.push(point2);
			temp.push(point3);
			temp.push(point4);
			temp.push(point5);
			*/

		}
		array = temp;
		return array
	}
	
	function repeat(iter, array) {
		var i=0;
		while(i<iter) {
			var test = lineSplit(array);
			array = test;
			i++;
		}
		return array
	}
	
	function reflect(array) {
		var result = [];
		for(var i=0; i<array.length; i++) {
			result[i] = [];
			for(var j=0; j<array[i].length; j++) {
				if(j==0) {
					result[i].push(array[i][j]);
				}
				else {
					result[i].push(768 - array[i][j]);
				}
				;
			}
		}
		return result;
	}

	function stringPoints(array) {
		string = '';
		for(var i=0; i<array.length; i++) {
			string += array[i][0] + ',' + array[i][1] + ' ';
		}
		return string;
	}
	
	var test = [20,20];
	
	var pointsReal = repeat(6, points);
	var pointsReal2 = reflect(pointsReal);
	
	console.log(pointsReal);	
	console.log(pointsReal2);
	
	var stringData = [stringPoints(pointsReal), stringPoints(pointsReal2)];

	//Initialize SVG
	var svg = createSvg('body', svgHeight, svgWidth);

	//Color background black
	svg.selectAll('rect')
	   .data(squareData)
	   .enter()
	   .append('rect')
	   .attr('fill', 'rgb(0,0,0)')
	   .attr('x', 0)
	   .attr('y',0)
	   .attr('width',svgWidth)
	   .attr('height',svgHeight);

	//Draw polyline from points in stringData
	svg.selectAll('polyline')
	   .data(stringData)
	   .enter()
	   .append('polyline')
	   .attr('points', function(d) {
	   		return d;
	   })
	   .attr('style', "fill:none;stroke:white;stroke-width:1");

});