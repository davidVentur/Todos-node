import colors from 'colors';
import { Tarea } from '../models/tarea.js'

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArr(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            console.log(`${idx} - ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log()
        const tareasC = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        const tareasP = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        if (completadas) {
            tareasC.forEach((tarea, i) => {
                const idx = `${i + 1}`.green;
                const { desc } = tarea;
                console.log(`${idx} - ${desc} :: ${'Completada'.green}`);
            })
        } else {
            tareasP.forEach((tarea, i) => {
                const idx = `${i + 1}`.green;
                const { desc } = tarea;
                console.log(`${idx} - ${desc} :: ${'Pendiente'.red}`);
            })
        }
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

export { Tareas }