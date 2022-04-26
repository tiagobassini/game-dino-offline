
const player = document.querySelector(".player");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {

    switch (event.keyCode) {
        case 32:
            console.log("espaço");

            if(!isJumping){
                jump();
            }
            break;

        default:
            console.log("erro");
            break;
    }

}

function jump() {
    

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            downInterval = setInterval(() => {

                if (position <= 0) {
                    clearInterval(downInterval);
                    player.style.bottom = "0 ";
                    isJumping = false;
                }
                else {
                    position -= 20
                    player.style.bottom = position + "px";
                }

            }, 20);

        }
        else {
            //subindo
            position += 20
            player.style.bottom = position + "px";
        }
    }, 20);
}

function createObstacle(){
    const obstacle = document.createElement("div");
    let obstaclePosition = 2000;

    let randomTime = Math.random() * 6000;


    obstacle.classList.add("obstacle");
    obstacle.style.left = obstaclePosition +'px';
    background.appendChild(obstacle);


    let leftInterval = setInterval(()=>{

        if(obstaclePosition< -60){
            clearInterval(leftInterval);
            background.removeChild(obstacle);
        }
        else if(obstaclePosition > 0 && obstaclePosition < 60 && position <60 ){
            
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Fim do Jogo</h1>"
        }
        else{
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition +'px';
        }

    },20);

    setTimeout(createObstacle, randomTime);
}
createObstacle();
document.addEventListener("keydown", handleKeyUp)