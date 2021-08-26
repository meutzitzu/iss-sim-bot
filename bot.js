function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
let go = false;

document.addEventListener('keypress', logKey);

function logKey(e) {
  console.log(e.code);
  if(e.code=='Enter'){
    go = !go;
    if(go){
      control();
    }
  } 
} 

async function control()
{
  
  let q = { 
  	P : 1,
  	I : 0.0,
  	D : 10.1
  };
  
  let active = { 
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
  let target = {
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
  let current = {
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
  let e = {
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
  let i = {
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
  let d = {
    x : 0.0,
    y : 0.0,
    z : 0.0,
    p : 0.0,
    w : 0.0,
    r : 0.0
  };
  
	function update ()
  {
   	current.x = parseFloat(document.getElementById("x-range").children[0].innerHTML);
    //console.log(current.x);
    current.y = parseFloat(document.getElementById("y-range").children[0].innerHTML);
    //console.log(current.y);
    current.z = parseFloat(document.getElementById("z-range").children[0].innerHTML);
    //console.log(current.z);
    current.p = parseFloat(document.getElementById("pitch").children[0].innerHTML);
    //console.log(current.z);
    current.w = parseFloat(document.getElementById("yaw").children[0].innerHTML);
    //console.log(current.w);
    current.r = parseFloat(document.getElementById("roll").children[0].innerHTML);
    //console.log(current.r);
    
    
    
    e.x = target.x - current.x;
    e.y = target.y - current.y;
    e.z = target.z - current.z;
    e.p = target.p - current.p;
    e.w = target.w - current.w;
    e.r = target.r - current.r;
    
    i.x += e.x;
    i.y += e.y;
    i.z += e.z;
    i.p += e.p;
    i.w += e.w;
    i.r += e.r;
    
    d.x = e.x - d.x; ///TO DO: TEST SYNTAX
    d.y = e.y - d.y;
    d.z = e.z - d.z;
/*
    d.p = e.p - d.p;
    d.w = e.w - d.w;
    d.r = e.r - d.r;
*/
    d.p = parseFloat(document.getElementById("pitch").children[1].innerHTML)
		d.w = parseFloat(document.getElementById("yaw").children[1].innerHTML)
		d.r = parseFloat(document.getElementById("roll").children[1].innerHTML)
    
    
    active.x = q.P * e.x + q.I * i.x + q.D * d.x;
    active.y = q.P * e.y + q.I * i.y + q.D * d.y;
    active.z = q.P * e.z + q.I * i.z + q.D * d.z;
    active.p = q.P * e.p + q.I * i.p + q.D * d.p;
    active.w = q.P * e.w + q.I * i.w + q.D * d.w;
    active.r = q.P * e.r + q.I * i.r + q.D * d.r;
    
    console.log(active.p)
    
    active.p >  1.0 && pitchUp();
    active.p < -1.0 && pitchDown();
    active.w >  1.0 && yawLeft();
    active.w < -1.0 && yawRight();
    active.r >  1.0 && rollLeft();
    active.r < -1.0 && rollRight();
   
  }  
  
  while(go){
    update();
    console.log("tick");
  	//translateForward();
    //yawLeft();
		//pitchUp();
    await sleep(500);
  }
}
