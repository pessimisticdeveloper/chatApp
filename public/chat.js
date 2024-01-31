const socket = io.connect('http://localhost:3000'); // Bu kod sunucuya bağlanır.

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitBtn.addEventListener('click', () => { // submitBtn'a tıklandığında
    socket.emit('chat', { // sunucuya chat adında bir event gönderilir.
        message: message.value, // message.value değişkeni gönderilir.
        sender: sender.value // sender.value değişkeni gönder
        })
    })

    socket.on('chat', (data) => { // sunucuda chat adında bir event gelirse
        feedback.innerHTML = ''; // feedback değişkeni boşaltılır.
        output.innerHTML += '<p><strong>' + data.sender + ' : </strong>' + data.message + '</p>'; // output değişkenine data.sender ve data.message değişkenleri eklenir.
        message.value = ''; // message değişkeni boşaltılır.
    })

    message.addEventListener('keypress', () => { // message değişkenine keypress eventi eklenir.
        socket.emit('typing', sender.value); // sunucuya typing adında bir ev
    })

    socket.on('typing', (data) => { // sunucuda typing adında bir event gelirse
        feedback.innerHTML = '<p><em>' + data + ' yazıyor...</em></p>'; // feedback değişkenine data
    })
