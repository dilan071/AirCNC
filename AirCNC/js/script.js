let contenedor_login_registro = document.querySelector(".contenedor__login-registro");
let formulario_login = document.querySelector(".formulario__login");
let formulario_registro = document.querySelector(".formulario__registro");
let caja_trasera_login = document.querySelector(".caja__trasera--login");
let caja_trasera_registro = document.querySelector(".caja__trasera--registro");

function adjustPage() {
    if (window.innerWidth > 850) {
        caja_trasera_login.style.display = "block";
        caja_trasera_registro.style.display = "block";
    } else {
        caja_trasera_registro.style.display = "block";
        caja_trasera_registro.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        contenedor_login_registro.style.left = "0px";
    }
}

adjustPage();

function loginForm() {
    if (window.innerWidth > 850) {
        formulario_registro.style.display = "none";
        contenedor_login_registro.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_registro.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_registro.style.display = "none";
        contenedor_login_registro.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_registro.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function registerForm() {
    if (window.innerWidth > 850) {
        formulario_registro.style.display = "block";
        contenedor_login_registro.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_registro.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_registro.style.display = "block";
        contenedor_login_registro.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_registro.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Función para validar el nombre de usuario
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{7,14}$/;
    return usernameRegex.test(username);
}

// Función para validar la contraseña
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-:;,.¡_])[A-Za-z\d@$!%*?&\-:;,.¡_]{12,20}$/;
    return passwordRegex.test(password);
}

// Función para el registro de usuario con validaciones
function register() {
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const email = document.getElementById('email').value.trim();
    const userName = document.getElementById('userNameRegister').value.trim();
    const password = document.getElementById('passwordRegister').value.trim();

    if (localStorage.getItem(userName.toLowerCase())) {
        alert('Usuario ya existe');
        return;
    }

    if (!nombreCompleto || !email || !userName || !password) {
        alert('Diligencia todos los campos');
        return;
    }

    if (!isValidEmail(email)) {
        alert('El dominio del correo electronico no es correcto.');
        return;
    }

    if (!isValidUsername(userName)) {
        alert('El nombre de usuario debe tener entre 8 y 15 caracteres, no contener espacios, ni iniciar con numeros o caracteres especiales.');
        return;
    }

    if (!isValidPassword(password)) {
        alert('La contraseña debe tener entre 12 y 20 caracteres, incluir al menos una letra mayuscula, una minuscula, un numero y un caracter especial.');
        return;
    }

    localStorage.setItem(userName.toLowerCase(), JSON.stringify({ nombreCompleto, email, password }));
    alert('Registro exitoso');
    document.getElementById('nombreCompleto').value = '';
    document.getElementById('email').value = '';
    document.getElementById('userNameRegister').value = '';
    document.getElementById('passwordRegister').value = '';
    window.location.reload();
}



// Función para el inicio de sesión de usuario
function login() {
    const userName = document.getElementById('userNameLogin').value.trim();
    const password = document.getElementById('passwordLogin').value.trim();

    if (!userName || !password) {
        alert('Debe diligenciar todos los campos');
        return;
    }

    const storedUser = localStorage.getItem(userName.toLowerCase());

    if (storedUser === null) {
        alert('Usuario no registrado');
    } else {
        const { password: storedPassword } = JSON.parse(storedUser);
        if (storedPassword === password) {
            alert('Inicio de sesión exitoso');
            window.location.href = `index.html?userName=${encodeURIComponent(userName)}`;
        } else {
            alert('Contraseña incorrecta');
        }
    }
}

document.getElementById("btn__iniciar-sesion").addEventListener("click", registerForm);
document.getElementById("btn__registrarse").addEventListener("click", loginForm);
window.addEventListener("resize", adjustPage);
