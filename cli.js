//const { Socket, Namespace } = require('socket.io');
const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('Ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'centre'){
        audio.play();
    }
    
}


const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

scocket.on('user-joined', name => {
    append(`${name} joined the chat`, 'centre')
})

scocket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'centre')
})

scocket.on('left', name => {
    append(`${name} left the chat`, 'centre')
})

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'centre');
    socket.emit('send', message);
    messageInput.value = ''
})