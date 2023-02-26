import colors from 'colors';
import { guardarDB, leerDb } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

const main = async () => {
    let opt = ''
    const tareas = new Tareas();

    const tareasDb = leerDb();
    if (tareasDb) {
        tareas.cargarTareasFromArr(tareasDb)
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear opcion
                const descripcion = await leerInput('Descripcion: ');
                tareas.crearTarea(descripcion);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== 0) {
                    const ok = confirmar('Estas seguro');
                    if (ok) { tareas.borrarTarea(id) }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');

}

main()