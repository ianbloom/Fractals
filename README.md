# Fractals

This repository holds my experiments with drawing fractals using the HTML5 SVG and Canvas element.

In the Koch Snowflake, often considered the simplest fractal of dimension greater than 1, D3.js is used to manipulate SVG line elements
efficiently by assigning each line a data element.  The program iterates over the array containing data information to create a new data
array, which is then used to create the next iteration of the snowflake.

In the Mandelbrot Set, the pixels of the canvas element are assigned a value in the complex plane.  For a complex number Z, Z is an
element of the Mandelbrot Set if Z<sub>n+1</sub>= Z<sub>n</sub><sup>2</sup> + C remains bounded for a fixed n.  Note that C is the 
coordinate's value in the complex plane.

An array of color values is randomly generated, and depending on the number of iterations "n" it takes for the norm of Z<sub>n</sub> to 
exceed the upper bound, it is assigned a color from this array.  If it does not exceed the upper bound, the point is colored black.

Open the .html files in your browser.
