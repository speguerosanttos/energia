// =======================
// INICIALIZAR EMAILJS
// =======================

emailjs.init({
    publicKey: "bkr-HzJMJZtgyieMB"
});

// =======================
// ELEMENTOS
// =======================

const modalCita = document.getElementById("modalCita");
const modalFactura = document.getElementById("modalFactura");

const abrirCita = document.getElementById("abrirCita");
const abrirFactura = document.getElementById("abrirFactura");

const cerrarCita = document.getElementById("cerrarCita");
const cerrarFactura = document.getElementById("cerrarFactura");

// =======================
// ABRIR POPUPS
// =======================

abrirCita.addEventListener("click", function (e) {
    e.preventDefault();
    modalCita.style.display = "flex";
});

abrirFactura.addEventListener("click", function (e) {
    e.preventDefault();
    modalFactura.style.display = "flex";
});

// =======================
// CERRAR POPUPS
// =======================

cerrarCita.addEventListener("click", function () {
    modalCita.style.display = "none";
});

cerrarFactura.addEventListener("click", function () {
    modalFactura.style.display = "none";
});

window.addEventListener("click", function (e) {

    if (e.target === modalCita) {
        modalCita.style.display = "none";
    }

    if (e.target === modalFactura) {
        modalFactura.style.display = "none";
    }

});

// =======================
// ENVIAR CITA
// =======================

document.getElementById("formCita").addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.send("service_919nffk", "template_vmv4zrn", {

        nombre: document.getElementById("nombre").value,

        telefono: document.getElementById("telefono").value,

        fecha: document.getElementById("fecha").value,

        hora: document.getElementById("hora").value

    })

        .then(function () {

            mostrarToast("Solicitud enviada correctamente. En breve contactaré contigo.");

            document.getElementById("formCita").reset();

            modalCita.style.display = "none";

        })

        .catch(function (error) {

            console.error(error);

            alert("Ha ocurrido un error al enviar la cita.");

        });

});

// =======================
// MOSTRAR NOMBRE DEL ARCHIVO
// =======================

const archivo = document.getElementById("archivoFactura");
const nombreArchivo = document.getElementById("nombreArchivo");

// =======================
// TOAST
// =======================

const toast = document.getElementById("toast");
const toastTexto = document.getElementById("toastTexto");

function mostrarToast(texto){

    toastTexto.textContent = texto;

    toast.classList.add("mostrar");

    setTimeout(() => {

    toast.classList.remove("mostrar");

}, 3500);

}

archivo.addEventListener("change", function () {

    if (this.files.length > 0) {

        nombreArchivo.textContent = this.files[0].name;

    } else {

        nombreArchivo.textContent = "Ningún archivo seleccionado";

    }

});

// =======================
// ENVIAR FACTURA SIN SALIR DE LA WEB
// =======================

document.getElementById("formFactura").addEventListener("submit", async function (e) {

    e.preventDefault();

    const formulario = this;

    const datos = new FormData(formulario);

    const boton = formulario.querySelector("button");

    boton.disabled = true;
    boton.textContent = "Enviando...";

    try {

        const respuesta = await fetch(formulario.action, {

            method: "POST",
            body: datos,
            headers: {
                Accept: "application/json"
            }

        });

        if (respuesta.ok) {

           mostrarToast("Factura enviada correctamente. En menos de 24 horas me pondré en contacto contigo.");

            formulario.reset();

            nombreArchivo.textContent = "Ningún archivo seleccionado";

            modalFactura.style.display = "none";

        } else {

            alert("Ha ocurrido un error al enviar la factura.");

        }

    } catch (error) {

        console.error(error);

        alert("Error de conexión.");

    }

    boton.disabled = false;
    boton.textContent = "Enviar factura";

});

// =======================
// CERRAR POPUP FACTURA AL ENVIAR
// =======================

document.getElementById("formFactura").addEventListener("submit", function () {

    setTimeout(function () {

        modalFactura.style.display = "none";

    }, 500);

});

flatpickr("#fecha", {
    locale: "es",
    dateFormat: "d/m/Y",
    minDate: "today",
    disableMobile: true
});

flatpickr("#hora", {
    locale: "es",
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    disableMobile: true
});