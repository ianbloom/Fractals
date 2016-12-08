// Initialize Canvas Context

can = document.getElementById('myCanvas');
ctx = can.getContext('2d');

width = can.width;
height = can.height;

centerX = width/2.0;
centerY = height/2.0;

xTranslate = -1024/2.0;
xScale = 4.0/1024;

yTranslate = -1024/2.0;
yScale = -4.0/1024;

// Initialize ImageData object and calculate byte count of ImageData array

imgData = ctx.createImageData(width, height);

numBytes = imgData.data.length;
pixel = imgData.data;
pixelCount = numBytes/4;

colorData = new Array(pixelCount);

toleranceSquared = 2;

iterations = 80;

colorArray = [];
for(var i=0; i<iterations; i++) {
	colorArray.push([Math.floor(255*Math.random()), Math.floor(255*Math.random()), Math.floor(255*Math.random())]);
}
colorArray.push([0,0,0]);


function squareNorm(zReal, zIm) {
	return zReal * zReal + zIm * zIm;
}

/*
function square(zReal, zIm) {
	var realResult = zReal * zReal + zIm * zIm;
	var imResult = 2 * zReal * zIm;
	return [realResult, imResult];
}
*/

/* Iterates through mandelbrot condition
 * 
 * When norm exceeds toleranceSquared, record number of iterations and record in colorData
 * When count reaches iter, exit mandelIter
 *
 */

function mandelIter(zReal, zIm, iter) {
	var count = 0;
	var xN = 0;
	var yN = 0;

	while(count < iter && squareNorm(xN, yN) < toleranceSquared) {
		xN = xN * xN - yN * yN + zReal;
		yN = 2 * xN * yN + zIm;
		count++;
	}

	return count;
}

/*function mandelIter(zReal, zIm, iter, idx) {
	var count = 0;
	colorData[idx] = 0;
	var zRealTemp = zReal;
	var zImTemp = zIm;
	while(count < iter && squareNorm(zRealTemp, zImTemp) < toleranceSquared) {
		colorData[idx] = count;
		zRealTemp = square(zRealTemp, zImTemp)[0] + zReal;
		zImTemp = square(zRealTemp, zImTemp)[0] + zIm;
		count++;
	}
}*/

function getReal(index) {
	var x0 = (index % (width * 4))/4.0;
	var translatedR = xScale * (x0 + xTranslate);
	return translatedR;
}


function getImaginary(index) {
	var y0 = Math.floor(index / (width * 4));
	var translatedI = yScale * (y0 + yTranslate);
	return translatedI;
}


function draw(c, imageData) {
	for(var i=0; i<numBytes; i = i + 4) {

		// Find value of pixel in complex plane with origin centered at 0
		var trueReal = getReal(i);
		var trueIm = getImaginary(i);

		// Update colorData with number of iterations it takes for this particular pixel to exit the set
		var colorChoice = mandelIter(trueReal, trueIm, iterations);

		// Color the pixel according to its values in colorArray
		pixel[i] = colorArray[colorChoice][0];
		pixel[i+1] = colorArray[colorChoice][1];
		pixel[i+2] = colorArray[colorChoice][2];
		pixel[i+3] = 255;
	}

	c.putImageData(imageData,0,0);
}

draw(ctx,imgData);