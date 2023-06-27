const form = document.querySelector('#form');
const names = document.querySelector('#name');
const ages = document.querySelector('#age');
const IDs = document.querySelector('#ID');
const selectOne = document.querySelector('#career');
const selectTwo = document.querySelector('#subject1');
const selectThree = document.querySelector('#subject2');
const lengthP = document.querySelector('#lenght');
const computerClick = document.querySelector('.computer-icon');
const openComputer = document.querySelector('#computer-punctuation');
const space = document.querySelector('#space');
const qualification = document.querySelector('.new-student');
const qualificationContainer = document.querySelector('.qualification')
const showStudents = document.querySelector('.show');
const showStudentsButton = document.querySelector('#showStudentsButton');
const showStudentsParagraphs = document.querySelectorAll('.show-students');

const nombre = names.value;
const edad = ages.value;
const identificacion = IDs.value;


class Persona {
    constructor(nombre, edad, id, carrera, materia) {
        this.nombre = nombre;
        this.edad = edad;
        this.id = id;
        this.carrera = carrera;
        this.materia = materia;
    }
}



class Materias {
    constructor() {
        this.ingenieria = [];
        this.derecho = [];
        this.limite = 10;
    }

    agregarUsuario(usuario) {
        if (this.derecho.length >= this.limite && usuario.carrera === 'Derecho') {
            alert('Se ha alcanzado el límite de Estudiantes para esta clase');
            return;
        } else if (this.ingenieria.length >= this.limite && usuario.carrera === 'Ingenieria en sistemas') {
            alert('Se ha alcanzado el límite de Estudiantes para esta clase');
            return;
        }

        if (usuario instanceof Persona) {
            // Verifica si algún campo requerido en el usuario está vacío
            if (usuario.nombre === '' || usuario.edad === '' || usuario.id === '') {
                alert('Por favor, proporciona la siguiente información completa: nombre, edad, ID');
                return;
            }

            const existeEnIngenieria = this.ingenieria.find(user => user.id === usuario.id);
            const existeEnDerecho = this.derecho.find(user => user.id === usuario.id);

            if (existeEnIngenieria || existeEnDerecho) {
                alert('El usuario ya existe');
                return;
            }

            if (usuario.carrera === 'Ingenieria en sistemas') {
                this.ingenieria.push(usuario);
            } else if (usuario.carrera === 'Derecho') {
                this.derecho.push(usuario);
            } else {
                console.log('Error: Carrera no válida');
                return;
            }

        } else {
            console.log('Error: El objeto no es una instancia de Persona');
        }
    }
}



const materia = new Materias();


const actualizarEstudiantes = () => {
    const paragraphsArray = Array.from(showStudentsParagraphs);
    
    paragraphsArray.forEach((paragraph, index) => {
      if (index === 0) {
        return; // Saltar el primer párrafo
      }
      
      paragraph.textContent = '';
      
      if (selectOne.value === 'Ingenieria en sistemas') {
        const estudiante = materia.ingenieria[index - 1];
        if (estudiante) {
          paragraph.textContent = `Nombre: ${estudiante.nombre}, ID: ${estudiante.id}`;
        }
      } else if (selectOne.value === 'Derecho') {
        const estudiante = materia.derecho[index - 1];
        if (estudiante) {
          paragraph.textContent = `Nombre: ${estudiante.nombre}, ID: ${estudiante.id}`;
        }
      }
    });
  };

const actualizarMensajeLengthP = () => {
    let length;

    if (selectOne.value === 'Derecho') {
        length = materia.derecho.length;
    } else if (selectOne.value === 'Ingenieria en sistemas') {
        length = materia.ingenieria.length;
    }

    lengthP.innerHTML = `Hay ${length} estudiantes en la clase de ${selectOne.value}`;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombres = names.value;
    const edads = ages.value;
    const ids = IDs.value;
    const carreras = selectOne.value;
    let materias;

    if (carreras === 'Ingenieria en sistemas') {
        materias = selectTwo.value;
    } else if (carreras === 'Derecho') {
        materias = selectThree.value;
    } else {
        console.log('Error: Carrera no válida');
        return;
    }

    const persona = new Persona(nombres, edads, ids, carreras, materias);
    materia.agregarUsuario(persona);

    console.log(materia.ingenieria);
    console.log(materia.derecho);

    // Almacena el valor seleccionado antes de restablecer el formulario
    const selectedValue = selectOne.value;



    // Reinicia los campos del formulario
    form.reset();

    // Restaura el valor seleccionado después del restablecimiento
    selectOne.value = selectedValue;

    actualizarMensajeLengthP();
});

openComputer.addEventListener('click', () =>{
    qualificationContainer.classList.add('qualification-flex');
});

computerClick.addEventListener('click', ()=>{
    qualification.classList.add('computer-new-student');
});


function toggleExtraClass() {
    showStudentsParagraphs.forEach(element => {
        if (element.getAttribute('id') === 'none') {
            element.removeAttribute('id');
            element.setAttribute('id', 'visible');
        } else if (element.getAttribute('id') === 'visible') {
            element.removeAttribute('id');
            element.setAttribute('id', 'none');
        }
    });
}

const showStudentsButtonDefaultText = showStudentsButton.textContent;
showStudentsButton.addEventListener('click', function () {
    showStudentsButton.textContent = showStudentsButton.textContent === showStudentsButtonDefaultText ? 'Ocultar Estudiantes' : showStudentsButtonDefaultText;
    showStudents.getAttribute('id') === 'show' ? showStudents.removeAttribute('id') : showStudents.setAttribute('id', 'show');
    toggleExtraClass();
    actualizarEstudiantes();
    actualizarMensajeLengthP();
});

selectOne.addEventListener('change', function () {
    actualizarEstudiantes();
    actualizarMensajeLengthP();

    if (selectOne.value === 'Derecho') {
        selectTwo.style.display = 'none'; // Oculta el select con id subject1
        selectThree.style.display = 'block'; // Muestra el select con id subject2
    } else if (selectOne.value === 'Ingenieria en sistemas') {
        selectTwo.style.display = 'block'; // Muestra el select con id subject1
        selectThree.style.display = 'none'; // Oculta el select con id subject2
    } else {
        selectTwo.style.display = 'none'; // Muestra ambos selectores por defecto
        selectThree.style.display = 'none';
    }
});




