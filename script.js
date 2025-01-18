
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = message; // Establecer el mensaje
    modal.style.display = 'flex'; // Mostrar el modal
    setTimeout(() => {
        modal.classList.add('fade-out'); // Agregar la clase para animación
        setTimeout(() => {
            modal.style.display = 'none'; // Ocultar el modal después de la animación
            modal.classList.remove('fade-out'); // Remover la clase para futuras animaciones
        }, 1000); // Tiempo de duración de la animación
    }, 1400); // Mostrar por 2 segundos
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    const loginSection = document.getElementById('loginDiv');
    const content = document.getElementById('content');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí puedes realizar una petición al servidor para verificar las credenciales
    fetch('user.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username);
            const ps = data.users.find(user => user.username === username && user.password === password);
            if (user) {
                if (ps){
                showModal('Inicio de sesión exitoso!');
                loginSection.style.display = 'none';
                content.style.display = 'block';
                } else {
                    showModal('contraseña incorrecta');
                }
            } else {
                showModal('Usuario incorrecto');
            }
        })
        .catch(error => console.error('Error:', error));
});

function updateOutput() {
    const texto = document.getElementById('name').value;
    const link = document.getElementById('link').value;
    const linkSecundario = document.getElementById('secondary-link').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<div><a class="botoncito" href="${link}" target="_blank">${texto}</a></div><div><a class="botoncito" href="${linkSecundario}" target="_blank">post de Facebook</a></div>`;
}

function copiarTexto() {
    const outputDiv = document.getElementById('output').innerHTML;
    navigator.clipboard.writeText(outputDiv).then(() => {
        alert('Texto copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar texto: ', err);
    });
}

document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const username = document.getElementById('username').value;
    const nombre = document.getElementById('nombre').value;
    const link = document.getElementById('link').value;
    const facebookLink = document.getElementById('facebookLink').value;
    const descripcion = document.getElementById('descripcion').value;

    // Enviar los datos al servidor
    fetch('/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, nombre, link, facebookLink, descripcion })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Notificación enviada a Discord.');
        mostrarPrevisualizacion(facebookLink); // Muestra la previsualización
    })
    .catch(error => console.error('Error:', error));
});
