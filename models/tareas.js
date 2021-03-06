const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    //getter para retornar un nuevo arreglo
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]){
            //si existe 
            delete this._listado[id]; //la borro
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} ${'::'.green} ${estado}`);
            
        })        
    }
    listarPendientesCompletadas(completadas = true){
        let cont = 0;
        console.log();
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                //mostrar completadas
                if (completadoEn){
                    cont += 1;
                    console.log(`${(cont + '.').green} ${desc} ${'::'.green} ${completadoEn.green}`);
                }
            }else {
                //mostrar pendientes 
                if(!completadoEn){
                    cont += 1;
                    console.log(`${(cont + '.').green} ${desc} ${'::'.green} ${estado}`);
                }               
            }
        })
    }    

    toggleCompletadas(ids = []){
        //si viene un id lo tengo que marcar como completado
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){ //si mi arreglo de ids incluye la tarea registrada
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}


module.exports = Tareas;