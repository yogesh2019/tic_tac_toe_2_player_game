var gameStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var moves = 0;
var myClick, otherClick;
const socket = io("/");
var enableClick = false;

document.getElementById('url').value = location;

const copyToClip = () => {
    copyText = document.getElementById('url');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copyText.value = "copied";
    copyText.onclick = null;
    window.getSelection.removeAllRanges();
}
socket.emit("join-room", ROOM_ID);


socket.on('user-connected', () => {
    document.getElementById('message').innerHTML = "User Connected";
    myClick = 'X';
    otherClick = 'O';
    enableClick = true,
        socket.emit('can-play');
})

socket.on("can-play", () => {
    myClick = 'O',
        otherClick = 'X',
        enableClick = true
})

const clicked = (id) => {
    if (enableClick) {
        moves += 1;
        const element = document.getElementById(id);
        element.innerHTML = myClick;
        document.onclick = null;
        socket.emit("clicked", id);
        enableClick = false;
        gameStatus[id - 1] = 1;
        if ((gameStatus[0] == 1 && gameStatus[1] == 1 && gameStatus[2] == 1) ||
            (gameStatus[0] == 1 && gameStatus[3] == 1 && gameStatus[6] == 1) ||
            (gameStatus[0] == 1 && gameStatus[4] == 1 && gameStatus[8] == 1) ||
            (gameStatus[2] == 1 && gameStatus[5] == 1 && gameStatus[8] == 1) ||
            (gameStatus[2] == 1 && gameStatus[4] == 1 && gameStatus[6] == 1) ||
            (gameStatus[1] == 1 && gameStatus[4] == 1 && gameStatus[7] == 1) ||
            (gameStatus[3] == 1 && gameStatus[4] == 1 && gameStatus[5] == 1) ||
            (gameStatus[6] == 1 && gameStatus[7] == 1 && gameStatus[8] == 1)) {
            document.getElementById("message").innerHTML = "You win";
            enableClick = false;
            setTimeout(() => { location.href = '/'; }, 2000);
        } else if (moves == 9) {
            document.getElementById("message").innerHTML = "It's a Draw";
            setTimeout(() => { location.href = '/'; }, 2000);
        }
    }
}

socket.on('clicked', (id) => {
    
})