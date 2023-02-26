import colors from 'colors';
import { guardarDB, leerDb } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
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
                console.log(tareas.listadoArr);
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');

}

main()