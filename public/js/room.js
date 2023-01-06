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