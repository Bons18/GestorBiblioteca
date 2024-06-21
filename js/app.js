// CLASE BASE ABSTRACTA MATERIAL (ABSTRACCIÓN, ENCAPSULAMIENTO)
class Material {
    #titulo; // ENCAPSULAMIENTO: CAMPO PRIVADO
    #autor; // ENCAPSULAMIENTO: CAMPO PRIVADO
    #añoPublicacion; // ENCAPSULAMIENTO: CAMPO PRIVADO

    constructor(titulo, autor, añoPublicacion) {
        if (new.target === Material) {
            throw new TypeError("Cannot construct Material instances directly");
        }
        this.#titulo = titulo;
        this.#autor = autor;
        this.#añoPublicacion = añoPublicacion;
    }

    // MÉTODOS PÚBLICOS
    mostrarInformacion() { // ABSTRACCIÓN: MÉTODO ABSTRACTO
        throw new Error("Debe ser implementado por la subclase");
    }

    get titulo() { // ENCAPSULAMIENTO: MÉTODO GETTER
        return this.#titulo;
    }

    get autor() { // ENCAPSULAMIENTO: MÉTODO GETTER
        return this.#autor;
    }

    get añoPublicacion() { // ENCAPSULAMIENTO: MÉTODO GETTER
        return this.#añoPublicacion;
    }
}

// CLASES DERIVADAS: LIBRO, REVISTA, PERIODICO (HERENCIA)
class Libro extends Material {
    #isbn; // ENCAPSULAMIENTO: CAMPO PRIVADO
    #genero; // ENCAPSULAMIENTO: CAMPO PRIVADO

    constructor(titulo, autor, añoPublicacion, isbn, genero) {
        super(titulo, autor, añoPublicacion);
        this.#isbn = isbn;
        this.#genero = genero;
    }

    mostrarInformacion() { // POLIMORFISMO: IMPLEMENTACIÓN DEL MÉTODO ABSTRACTO
        return `Libro: ${this.titulo} por ${this.autor} (${this.añoPublicacion}) - ISBN: ${this.#isbn}, Género: ${this.#genero}`;
    }
}

class Revista extends Material {
    #issn; // ENCAPSULAMIENTO: CAMPO PRIVADO
    #volumen; // ENCAPSULAMIENTO: CAMPO PRIVADO
    #numero; // ENCAPSULAMIENTO: CAMPO PRIVADO

    constructor(titulo, autor, añoPublicacion, issn, volumen, numero) {
        super(titulo, autor, añoPublicacion);
        this.#issn = issn;
        this.#volumen = volumen;
        this.#numero = numero;
    }

    mostrarInformacion() { // POLIMORFISMO: IMPLEMENTACIÓN DEL MÉTODO ABSTRACTO
        return `Revista: ${this.titulo} por ${this.autor} (${this.añoPublicacion}) - ISSN: ${this.#issn}, Volumen: ${this.#volumen}, Número: ${this.#numero}`;
    }
}

class Periodico extends Material {
    #fechaPublicacion; // ENCAPSULAMIENTO: CAMPO PRIVADO

    constructor(titulo, autor, añoPublicacion, fechaPublicacion) {
        super(titulo, autor, añoPublicacion);
        this.#fechaPublicacion = fechaPublicacion;
    }

    mostrarInformacion() { // POLIMORFISMO: IMPLEMENTACIÓN DEL MÉTODO ABSTRACTO
        return `Periódico: ${this.titulo} por ${this.autor} (${this.añoPublicacion}) - Fecha de Publicación: ${this.#fechaPublicacion}`;
    }
}

// CLASE BIBLIOTECA PARA GESTIONAR LOS MATERIALES
class Biblioteca {
    #materiales; // ENCAPSULAMIENTO: CAMPO PRIVADO

    constructor() {
        this.#materiales = [];
    }

    agregarMaterial(material) {
        this.#materiales.push(material);
    }

    mostrarInventario() {
        return this.#materiales.map(material => material.mostrarInformacion());
    }
}

// FUNCIONALIDAD PARA MANEJAR EL FORMULARIO Y LA LISTA DE MATERIALES
document.addEventListener('DOMContentLoaded', () => {
    const addMaterialForm = document.getElementById('addMaterialForm');
    const materialesList = document.getElementById('materiales');
    const tipoSelect = document.getElementById('tipo');
    const extraFields = document.getElementById('extraFields');
    const biblioteca = new Biblioteca();

    // FUNCIÓN PARA AGREGAR CAMPOS ADICIONALES SEGÚN EL TIPO DE MATERIAL
    function updateExtraFields() {
        extraFields.innerHTML = '';
        const tipo = tipoSelect.value;

        if (tipo === 'libro') {
            extraFields.innerHTML = `
                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" required>
                <label for="genero">Género:</label>
                <input type="text" id="genero" required>
            `;
        } else if (tipo === 'revista') {
            extraFields.innerHTML = `
                <label for="issn">ISSN:</label>
                <input type="text" id="issn" required>
                <label for="volumen">Volumen:</label>
                <input type="number" id="volumen" required>
                <label for="numero">Número:</label>
                <input type="number" id="numero" required>
            `;
        } else if (tipo === 'periodico') {
            extraFields.innerHTML = `
                <label for="fecha">Fecha de Publicación:</label>
                <input type="date" id="fecha" required>
            `;
        }
    }

    tipoSelect.addEventListener('change', updateExtraFields);
    updateExtraFields();

    // FUNCIÓN PARA MOSTRAR ALERTAS DE ÉXITO CON SWEETALERT2 Y ICONO
    function mostrarAlertaExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<i class="fas fa-check-circle"></i> OK'
        });
    }

    // FUNCIÓN PARA MOSTRAR ALERTAS DE ERROR CON SWEETALERT2 Y ICONO
    function mostrarAlertaError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: mensaje,
            confirmButtonColor: '#d33',
            confirmButtonText: '<i class="fas fa-exclamation-triangle"></i> OK'
        });
    }

    // FUNCIÓN PARA VALIDAR QUE TODOS LOS CAMPOS REQUERIDOS ESTÉN LLENOS
    function validarCampos() {
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const año = document.getElementById('año').value.trim();
        const tipo = tipoSelect.value;

        if (tipo === 'libro') {
            const isbn = document.getElementById('isbn').value.trim();
            const genero = document.getElementById('genero').value.trim();
            if (!titulo || !autor || !año || !isbn || !genero) {
                mostrarAlertaError('Por favor completa todos los campos.');
                return false;
            }
        } else if (tipo === 'revista') {
            const issn = document.getElementById('issn').value.trim();
            const volumen = document.getElementById('volumen').value.trim();
            const numero = document.getElementById('numero').value.trim();
            if (!titulo || !autor || !año || !issn || !volumen || !numero) {
                mostrarAlertaError('Por favor completa todos los campos.');
                return false;
            }
        } else if (tipo === 'periodico') {
            const fecha = document.getElementById('fecha').value.trim();
            if (!titulo || !autor || !año || !fecha) {
                mostrarAlertaError('Por favor completa todos los campos.');
                return false;
            }
        }

        return true;
    }

    // FUNCIÓN PARA AGREGAR UN MATERIAL AL INVENTARIO
    addMaterialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validarCampos()) {
            return; // DETENER LA FUNCIÓN SI LOS CAMPOS NO ESTÁN LLENOS
        }

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const año = document.getElementById('año').value;
        const tipo = tipoSelect.value;
        let material;

        try {
            if (tipo === 'libro') {
                const isbn = document.getElementById('isbn').value;
                const genero = document.getElementById('genero').value;
                material = new Libro(titulo, autor, año, isbn, genero);
            } else if (tipo === 'revista') {
                const issn = document.getElementById('issn').value;
                const volumen = document.getElementById('volumen').value;
                const numero = document.getElementById('numero').value;
                material = new Revista(titulo, autor, año, issn, volumen, numero);
            } else if (tipo === 'periodico') {
                const fecha = document.getElementById('fecha').value;
                material = new Periodico(titulo, autor, año, fecha);
            }

            biblioteca.agregarMaterial(material);
            mostrarInventario();
            addMaterialForm.reset();
            updateExtraFields();
            mostrarAlertaExito('Material agregado correctamente');
        } catch (error) {
            mostrarAlertaError(error.message);
        }
    });

    // FUNCIÓN PARA MOSTRAR EL INVENTARIO DE MATERIALES EN LA LISTA
    function mostrarInventario() {
        materialesList.innerHTML = '';
        const inventario = biblioteca.mostrarInventario();
        inventario.forEach(info => {
            const li = document.createElement('li');
            li.textContent = info;
            materialesList.appendChild(li);
        });
    }
});
