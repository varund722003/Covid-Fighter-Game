 //Game loop
 function load_images()
 {

     //player, enemy image and gem image
     enemy_image = new Image;
     enemy_image.src = "https://github.com/coding-blocks-archives/data-structures-in-real-life/blob/master/Covid%20Fighter/Assets/v2.png?raw=true";
     player_image = new Image;
     player_image.src = "https://github.com/coding-blocks-archives/data-structures-in-real-life/blob/master/Covid%20Fighter/Assets/superhero.png?raw=true";
     gem_image = new Image;
     gem_image.src ="https://raw.githubusercontent.com/coding-blocks-archives/data-structures-in-real-life/13a9fa49f69724f6da3ed94ea66cb0ed48eec77c/Covid%20Fighter/Assets/gem.svg";


 }
     function init()
     {
         //define objects of the game
         canvas= document.getElementById("mycanvas");
         console.log(canvas);
         W = 700;
         H = 400; 

         canvas.width = W;
         canvas.height = H;

         // create a context
         pen = canvas.getContext('2d');
         console.log(pen);
         game_over = false;

         //creating enemies
         e1 = {
             x: 150,
             y: 50,
             w: 60,
             h: 60,
             speed: 20,
         };
         e2 = {
             x: 300,
             y: 150,
             w: 60,
             h: 60,
             speed: 30,
         };
         e3 = {
             x: 450,
             y: 20,
             w: 60,
             h: 60,
             speed: 40,
         };

        
         enemy =[e1,e2,e3];

         player = {
             x : 20, // player at the beginning of the game
             y : H/2,
             w : 60,
             h : 60,
             speed : 20,
             moving : false,
             health : 100,
         };
         gem = {
                x : W-100,    //gem at the end of the game
                y : H/2,
                w : 60,
                h : 60,

         };
         //listen to events on the canvas
         canvas.addEventListener('mousedown',function(){
             console.log("Mouse pressed");
             player.moving = true;
         });
         canvas.addEventListener('mouseup',function(){
             console.log("Mouse released");
             player.moving = false;
         });
         

     }
     function isOverlap(rect1,rect2)
     {
         if(rect1.x < rect2.x + rect2.w && 
             rect1.x + rect1.w > rect2.x && 
             rect1.y < rect2.y + rect2.h &&
             rect1.y + rect1.h > rect2.y){
                 return true;

             }
             
             return false;
             
     }
      function draw()
     {
        

         //clear the canvas area for the old frame
         pen.clearRect(0,0,W,H);
         pen.fillStyle = "red";
        // pen.fillRect(box.x,box.y,box.w,box.h);
        //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h); //drawImage is used to draw the required image 
          //draw the player 
        
          pen.drawImage(player_image,player.x,player.y,player.w,player.h);
          pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

        for(let i =0;i<enemy.length;i++){
         pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);

        }
       
        pen.fillStyle = "black";
        pen.fillText("Score "+player.health,10,10);
        pen.fillStyle =  "solid";
        
     }
     function update()
     {
         //if the player is moving
         if (player.moving==true)
         {
             player.x +=player.speed;
             player.health += 20;
         }
         for(let i = 0;i<enemy.length;i++)
         {
         if(isOverlap(enemy[i],player))
         {
             player.health -= 50;
             if(player.health<0){
                 console.log(player.health);
                 game_over = true;
                 alert("Game Over!!!" + player.health);
             }
         }
     }

         //overlap
         if(isOverlap(player,gem)){
             console.log("You Won");
             alert("You Won The Game!!");
             game_over = true;
             return;

         }
         //move the box downwards
         //update each enemy by the same logic
         for (let i=0;i<enemy.length;i++)
         {
             enemy[i].y +=enemy[i].speed;
             if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
                     enemy[i].speed *=-1;
             }
         }
     }

     function gameloop()
     {
         if (game_over==true)
         {
             clearInterval(f);
         }
         draw();
         update();
         console.log("In gameloop");
     }  
     load_images();
     init();
     var f = setInterval(gameloop,100);     
