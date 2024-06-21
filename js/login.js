// Simulación de datos de usuarios
const usuarios = [
    { username: 'sena', password: 'sena' },
    { username: 'user', password: '123' }
];

// Función para verificar las credenciales ingresadas
function verificarCredenciales(username, password) {
    return usuarios.find(user => user.username === username && user.password === password);
}

// Funcionalidad para manejar el formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const usuarioValido = verificarCredenciales(username, password);

        if (usuarioValido) {
            // Mostrar alerta de éxito con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Bienvenido/a ' + username + '!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirigir a la página de gestión de libros
                window.location.href = 'gestion-libros.html';
            });
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
                // Limpiar campos de formulario
                loginForm.reset();
            });
        }
    });
});
