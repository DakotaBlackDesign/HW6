
var drops = []; //create array of drop objects

function setup() {
  createCanvas(800,500)
  colorMode(HSB,100)
	
	polysynth = new p5.PolySynth();
	polysynth.disconnect()
	delay = new p5.Delay();
	delay.process(polysynth, 0.3, 0.7, 2300);
	reverb = new p5.Reverb();
	reverb.process(delay)

	
	for (var index = 0; index < 10; index = index + 1){// add drops to array
    drops[index] = {
      x: 100,  //starting x
      y: random(height), //starting y
      Ya: random(0,20),
      Xa: random(-0.2,3), //starting x velocity
      t: millis(), //current time 
      t1:0, //starting time 
			d: random(5,10), // diameter
			b: 60,
    }
  }
}


function draw() {
  background(255);
	noStroke();
	fill(0)
  xpos = mouseX
	ypos = mouseY
	
  for (var index = 0; index < 10; index = index + 1) {
    var drop = drops[index]
    ellipse(drop.x, drop.y, drop.d,drop.d*drop.t/1000);// draw drip
    drop.t = millis() - drop.t1 // time drop has been falling 
		drop.Ya =map(drop.d,5,15,1,1.5)*(1/2 * 8.9 * sq(drop.t/1000))
		drop.y = drop.y + drop.Ya;
    drop.x = drop.x + drop.Xa;
    if (drop.y > height-10) { // reset  
			drop.b = int(map(drop.x,0,width,30,2000));
      drop.t1 = millis(); // set t1 to current time elapsed
			drop.y = ypos;      // set to pipe location
      drop.x = xpos;
			polysynth.play(drop.b,0.4,0,0.005);
		}
  }
}
