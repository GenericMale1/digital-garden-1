let a;
let flowers=[];
let grass=[];
let grass1=[];
let cutscene;
//let counter;
//let flowerPicked=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  pickFlag=0;
  counter=0;

  for(x=0; x<50; x++)
  {
    flowers[x]=new flower(random(width), random(height), x);
  }
  console.log(flowers);

  for(x=0; x<width; x++)
  {
    grass[x]=new ground(x, random(height));
  }

  for(x=width; x>0; x--)
  {
    grass1[x]=new ground(x, random(height/2));
  }

  cutscene=new cutscenes(width/2, height/2, 1);

  frameRate(2);
  //a=new flower(100, 100);
  a=new ground(100, 100);
}

function draw() {

  background(color(200, 150, 150));

  grass.forEach(bl => {
    bl.disp();
  });

  grass1.forEach(bl => {
    bl.disp();
  });

  flowers.forEach(fl => {
    fl.mousePosx=mouseX;
    fl.mousePosy=mouseY;
    if(fl.flag==1)
    {
      fl.undisp();
      //flowerPicked.push(fl.flwr);
    }
    else
    {
      fl.disp();
    }
    fl.updates();
  });

  //console.log(flowerPicked);

  //a.disp();
  //noLoop();
  frame();
  //console.log(frameCount);

  push();

  if(frameCount<10)
  {
    cutscene.switchcase=1;
  }
  else if(frameCount>10 && frameCount<20)
  {
    cutscene.switchcase=2;
  }
  else if(frameCount>20 && frameCount<30)
  {
    cutscene.switchcase=3;
  }
  else
  {
    cutscene.switchcase=4;
  }
  cutscene.updates();
  pop();
}

function frame()
{
  push();
  rect(0, height/2, 30, height);
  rect(width, height/2, 30, height);
  rect(width/2, 0, width, 30);
  rect(width/2, height, width, 30);
  pop();
}

// function mouseClicked()
// {
//   pickFlag=1;
//   console.log(pickFlag);
// }

// function mouseReleased()
// {
//   pickFlag=0;
// }

class flower
{
  constructor(bx, by, x)
  {
    this.bot=createVector(bx, by);
    this.flwr=x;
    //this.arrayOfPicked=[];
    this.mousePosx;
    this.mousePosy;
    //console.log(this.mousePosx, this.mousePosy);
  }

  updates()
  {
    //console.log(this.mousePosx, this.mousePosy);
    this.hitBoxw=10;
    this.hitBoxh=85;
    this.a=this.bot.x+random(-5, 5);
    this.b=this.bot.y+random(-80, -120);
    //this.box=rect(this.a, this.b+20, this.hitBoxw, this.hitBoxh);
    //console.log(this.a, this.b);
    //console.log(this.mousePos.x, this.mousePos.y);

    if(mouseIsPressed)
    {
      //ellipse(this.a, this.b, 50);
      if((this.mousePosx>=(this.a-this.hitBoxw/2) && this.mousePosx<=(this.a+this.hitBoxw/2)) && (this.mousePosy>=(this.b+20-this.hitBoxh/2) && this.mousePosy<=(this.b+20+this.hitBoxh/2)))
      {
        //this.arrayOfPicked.push(this.flwr);
        //console.log(this.flwr);
        this.flag=1;
      }

      //console.log(this.arrayOfPicked);
    }
  }

  disp()
  {
    // this.a=this.bot.x+random(-5, 5);
    // this.b=this.bot.y+random(-80, -120);
    push();
    line(this.bot.x, this.bot.y, this.a, this.b);

    for(x=72; x<=360; x+=72)
    {
      push();
      translate(this.a, this.b);
      push();
      rotate(x+random(-15, 15));
      translate(10, 0);
      ellipse(0, 0, 20, 8);
      pop();
      pop();
    }

    ellipse(this.a, this.b, 6);
    pop();
  }

  undisp()
  {
    push();
    //line(this.bot.x, this.bot.y, this.a, this.b);
    pop();
  }


}

class ground
{
  constructor(x, y)
  {
    this.point=createVector(x, y);
    this.rand=random(-10, 10);
  }

  disp()
  {
    push();
    //rotate(randomGaussian(-10, 10));
    rotate(this.rand);
    beginShape();
    line(this.point.x-5, this.point.y+5, this.point.x, this.point.y);
    line(this.point.x, this.point.y, this.point.x+5, this.point.y+5);
    endShape();
    pop();
  }
}

class cutscenes
{
  constructor(x, y)
  {
    this.switchcase;
    this.x=x;
    this.y=y;
  }

  updates()
  {
    switch(this.switchcase)
    {
      case 1:
        {
          push();
          fill(255);
          rect(this.x, this.y, 500, 200);
          push();
          fill(0);
          textFont("georgia");
          textSize(32);
          textAlign("center");
          
          text("welcome to the digital garden", this.x, this.y);
          pop();
          pop();
          break;
        }
      case 2:
        {
          push();
          fill(255);
          rect(this.x, this.y, 500, 200);
          push();
          fill(0);
          textFont("georgia");
          textSize(32);
          textAlign("center");
          
          text("pick a flower", this.x, this.y);
          text("pick two", this.x, this.y+32);
          pop();
          pop();
          break;
        }
      case 3:
        {
          push();
          fill(255);
          rect(this.x, this.y, 500, 200);
          push();
          fill(0);
          textFont("georgia");
          textSize(32);
          textAlign("center");
          
          text("just dont get greedy", this.x, this.y);
          pop();
          pop();
          break;
        }
      default:
        {break;}  
    }
  }
}