require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();       
    const tareasDB = leerDB();
    if (tareasDB) {
        //si existen, establecer las tareas
        //cargarTareasFromArray
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();      
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':                
                tareas.listadoCompleto();
                break;
            case '3': //listar completadas                
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': //listar pendientes                
                tareas.listarPendientesCompletadas(false);
                break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log({id})
                break;
        }

        guardarDB(tareas.listadoArr);

        if(opt !== '0') await pausa();
    } while(opt !== '0')

}

main();