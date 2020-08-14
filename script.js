const winComb = ["123", "456", "789", "147", "258", "369", "159", "357"];
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player1, player2, activePlayer, clickTimes, result;

init();

document.querySelector('.new-game-btn', '.btn').addEventListener('click', init);
document.querySelector('.btn').addEventListener('click', init);

function init () {
    player1 = [];
    player2 = [];
    blockClicked = [];
    activePlayer = 1;
    clickTimes = 0;
    result = false;

    for (let i = 1; i <= 9; i++) {
        document.querySelector('.sub-block-' + i).style.transform = 'rotateY(0deg)';
        document.querySelector('.image-block-' + i).style.transform = 'rotateY(-180deg)';
        document.querySelector('.image-' + i).classList.remove('image-cross');
        document.querySelector('.image-' + i).classList.remove('image-circle');
        
        document.querySelector('.sub-block-' + i).addEventListener('click', start, {once: true});
    }

    document.querySelector('.win1').style.display = 'none';
    document.querySelector('.win2').style.display = 'none';
    document.querySelector('.draw').style.display = 'none';
    document.querySelector('.whole-layout').style.filter = 'none';
    document.querySelector('.endgame').style.display = 'none';
    
    setTimeout(() => {
        document.querySelector('.container').classList.add('container-type-1');
        document.querySelector('.container').classList.remove('container-type-2');
        document.querySelector('.player-1').classList.add('active');
        document.querySelector('.player-2').classList.remove('active');
    }, 400);
}

let newPos;


document.querySelector('.sub-block-1').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-2').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-3').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-4').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-5').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-6').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-7').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-8').addEventListener('click', start, {once: true});

document.querySelector('.sub-block-9').addEventListener('click', start, {once: true});

function start(event) {
    let value = event.target.dataset.blockid;
    if (result === false) {
        newPos = value;
        blockClicked.push(value);
        clickTimes ++;
        determination ();
        changeUI ();
    }
}

function changeUI () {
    if (activePlayer === 1) {
        document.querySelector('.image-' + newPos).classList.add('image-cross');
    }
    else {
        document.querySelector('.image-' + newPos).classList.add('image-circle');
    }

    // setTimeout(() => {
        document.querySelector('.sub-block-' + newPos).style.transform = 'rotateY(180deg)';
        document.querySelector('.image-block-' + newPos).style.transform = 'rotateY(0deg)';  
    // }, 0);  

    if (result === true || clickTimes === 9) {
        if ( clickTimes === 9 && result === false ) {
            document.querySelector('.endgame').style.top = '50%';
            document.querySelector('.draw').style.display = 'block';
            document.querySelector('.congrats').style.display = 'none';
            document.querySelector('.btn').textContent = 'Try again';

        }

        if ( result === true ) {
            document.querySelector('.endgame').style.top = '68%';
            document.querySelector('.congrats').style.display = 'block';
            document.querySelector('.btn').textContent = 'Start new game';
            if (activePlayer === 1 ) {
                document.querySelector('.win1').style.display = 'block';
            }
            else {
                document.querySelector('.win2').style.display = 'block';
            }
        }
        setTimeout(() => {
            document.querySelector('.whole-layout').style.filter = 'blur(35px)';
            document.querySelector('.endgame').style.display = 'block';
        }, 1000);
    }

    
    if (result === false) {
        setTimeout(() => {
            document.querySelector('.container').classList.toggle('container-type-1');
            document.querySelector('.container').classList.toggle('container-type-2');
            document.querySelector('.player-1').classList.toggle('active');
            document.querySelector('.player-2').classList.toggle('active');
        }, 800);
        activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    }
    
}

function determination () {
    let length1 = player1.length;
    let length2 = player2.length;

    if (length1 >= 2 && length2 >=2) {

        let useArray = [];

        if (activePlayer === 1) {
            for (let i = 0; i < length1; i++) {
                useArray.push(player1[i]);
            }
        }
        else {
            for (let i = 0; i < length2; i++) {
                useArray.push(player2[i]);
            }
        }
        
        let length = useArray.length;
        let possibleComb = [];
        let tempArray = [];
        for (let i = 0; i < (length - 1); i++) {
            for (let j = (i + 1); j < length; j++) {
                tempArray[0] = useArray[i];
                tempArray[1] = useArray[j];
                tempArray[2] = newPos;
                let str = "";
                tempArray.sort((a, b) => a - b)
                for (let k = 0; k < 3; k++) {
                    str = str + tempArray[k];
                }
                
                possibleComb.push(str);
            }
        }
        let len  = possibleComb.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < 8; j++) {
                result = possibleComb[i] === winComb[j];
                if (result) {
                    i = length;
                    break;
                }
            }
        }
    }

    if (activePlayer === 1) {
        player1.push(newPos);
    }
    else {
        player2.push(newPos);
    }
}