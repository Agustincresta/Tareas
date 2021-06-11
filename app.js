document.getElementById("formulario").addEventListener("submit", saveTask)

let today = new Date().toISOString().substr(0, 10);
document.querySelector("#fecha").value = today;

function saveTask(e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;

    const tarea = {
        titulo,
        fecha,
        descripcion
    }

    let ca = true;
    if(localStorage.getItem('tareas') == null) {
        let tareas = [];
        tareas.push(tarea);

        localStorage.setItem('tareas', JSON.stringify(tareas));

    }else if(ca == true){
        let tareas = JSON.parse(localStorage.getItem('tareas'));

            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].titulo == titulo && tareas[i].descripcion == descripcion && tareas[i].fecha == fecha) {
                    alert("esta tarea existe");
                    ca = false;
                    break;
                }
                
            }
        if (ca == true) {
            tareas.push(tarea)
            localStorage.setItem('tareas', JSON.stringify(tareas));
            document.getElementById('formulario').reset();
        }


        
    }

    return getTask();


}

function deleteTask(titulo, descripcion, fecha) {
    tarea = (JSON.parse(localStorage.getItem('tareas')));

    
  

    for (let i = 0; i < tarea.length; i++) {
        if (tarea[i].titulo == titulo && tarea[i].descripcion == descripcion && tarea[i].fecha == fecha) {

            tarea.splice(i,1);
        }
        
    }

    localStorage.setItem('tareas',  JSON.stringify(tarea))
    getTask();
}


function getTask() {
    tarea = (JSON.parse(localStorage.getItem('tareas')));
    vista = document.getElementById("tareas");

    tarea.sort(compare);

    vista.innerHTML = '';

    for (let i = 0; i < tarea.length; i++) {
        const titulo = tarea[i].titulo;
        const fecha = tarea[i].fecha;
        const descripcion = tarea[i].descripcion;

        
        
        vista.innerHTML += `
        <div class="card mb-3">
        <div class="card-body">
          <h4>${titulo}</h4>
          <p>${fecha} - ${descripcion}
          </p>

          <a href="#" onclick="deleteTask('${titulo}','${descripcion}', '${fecha}')" class="btn btn-danger ml-5 float-right">Delete</a>
        </div>
      </div>
        `
    }
}



function compare(a, b) {
    if (a.fecha > b.fecha) {
      return 1;
    }
    if (a.fecha < b.fecha) {
      return -1;
    }
    // a must be equal to b
    return 0;
}


  



if (localStorage.getItem('tareas')) {
    getTask();
}