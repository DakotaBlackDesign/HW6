
var drops = []; //create array of drop objects
var fft
var feedback = 0.7
var time = 0.4
function setup() {
  	createCanvas(800,500)
  	colorMode(HSB,100)
	polysynth = new p5.PolySynth();
	polysynth.disconnect()
	delay = new p5.Delay();
	delay.process(polysynth, time, feedback, 2300);
	reverb = new p5.Reverb();
	reverb.process(delay)
	fft = new p5.FFT();
	for (var index = 0; index < 7; index = index + 1){// add drops to array
    		drops[index] = {
		x: 100,  //starting x
		y: random(height), //starting y
		Ya: random(0,20),
		Xa: random(-0.2,3), //starting x velocity
		t: millis(), //current time 
		t1:0, //starting time 
		d: random(5,10), // diameter
		b: 60
    		}
    	}
}


function draw() {
  	background(0);
	noStroke();
	xpos = mouseX
	ypos = mouseY
	fft.analyze()
	feedback = map(mouseY,0,height,0.1,0.9)
	time = map(mouseX,0,width,0.1,0.9)
	for (var index = 0; index < 7; index = index + 1) {
		var drop = drops[index]	 
		var centroid = fft.getEnergy(300)
		var cent = map(centroid,0,255,0,100)
		fill(cent,255,255)
		print(centroid)
		ellipse(drop.x, drop.y, drop.d,drop.d*drop.t/1000);// draw drip
		drop.t = millis() - drop.t1 // time drop has been falling 
		drop.Ya =map(drop.d,5,15,1,1.5)*(1/2 * 8.9 * sq(drop.t/1000))
		drop.y = drop.y + drop.Ya;
		drop.x = drop.x + drop.Xa;
		if (drop.y > height-10) { // reset  
			drop.b = int(map(drop.x,0,width,30,2000));
			drop.t1 = millis(); // set t1 to current time elapsed
			drop.y = ypos;      // set  location
			drop.x = xpos;
			polysynth.play(drop.b,0.4,0,0.004);
		}
    	}
}
