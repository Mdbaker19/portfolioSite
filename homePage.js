$("#mainPage").hide();
$(document).ready(function(){

   const seeSiteBtn = document.getElementById("siteButton");
   const canvas = document.getElementById("canvasArt");
   const cc = canvas.getContext("2d");
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   let particles = [];
   const particleCount = 30;
   let running = true;
   let mouse = {
      x: null,
      y: null
   }
   seeSiteBtn.addEventListener("click", () => {
      running = false;
      $("#mainPage").show();
      document.getElementById("homeTopCanvas").style.display = "none";
   });

   window.addEventListener("mousemove", (e) =>{
      mouse.x = e.x;
      mouse.y = e.y;
   });

   setInterval(() => {
      mouse.x = undefined;
      mouse.y = undefined;
   }, 100);

   class Particle {
      constructor(x, y, s, c, wgt) {
         this.x = x;
         this.y = y;
         this.s = s;
         this.c = c;
         this.wgt = wgt;
      }
      draw() {
         cc.beginPath()
         cc.arc(this.x, this.y, this.s, 0, Math.PI * 2, false);
         cc.fillStyle = this.c;
         cc.fill();
      }
      update() {
         this.s -= .05;
         if (this.s < 0) {
            this.x = (mouse.x + (Math.random() * 20) + 10);
            this.y = (mouse.y + (Math.random() * 20) + 10);
            this.s = (Math.random() * 10) + 2;
            this.wgt = (Math.random() * 2) + .5;
         }
         this.y += this.wgt;
         this.wgt += .1;

         if(this.y > canvas.height - this.s){
            this.wgt *= -1.85;
         }
      }

   }

   function init(){
      particles = [];
      for(let i = 0; i < particleCount; i++){
         particles.push(new Particle(((Math.random() * canvas.width)), canvas.height - 20, ((Math.random() * 10) + 5), "#c2e8e8", ((Math.random() * 10) + 10)));
      }
   }

   function animate(){
      cc.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
         particles[i].update();
         particles[i].draw();
      }
      if(running) {
         requestAnimationFrame(animate);
      }
   }

   init();
   animate();


});


