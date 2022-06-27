let ingresos =  [

    new Ingreso('Salary', 3000),
    new Ingreso('Rent', 600),
    new Ingreso('Lotery',500)

];

const gastos =  [

    new Gasto('Clothes', 500),
    new Gasto('Food', 300),
    new Gasto('Petrol', 100),

];

function cargarApp(){
    cargarCabecero();
    cargarIngresos();
    cargarGastos();
}

function cargarCabecero(){

    let ingresosTotales = calcularIngresosTotales();
    let gastosTotales = calcularGastosTotales();
    let presupuesto = ingresosTotales-gastosTotales;
    let porcentaje = gastosTotales/ingresosTotales;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(ingresosTotales);
    document.getElementById('gastos').innerHTML = formatoMoneda(gastosTotales);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje);
}

function calcularIngresosTotales(){

    let ingresosTotales =0;

    for (let ingreso of ingresos){
        ingresosTotales += ingreso.value;
    }

    return ingresosTotales;
}

function calcularGastosTotales(){

    let gastosTotales =0;

    for (let gasto of gastos){
        gastosTotales += gasto.value;
    }

    return gastosTotales;

}

function formatoMoneda(valor){
    return valor.toLocaleString('es-ES', {style:'currency', currency:'EUR',minimumFractionDigits:2})
}

function formatoPorcentaje(valor){
    return valor.toLocaleString('es-ES',{style:'percent', minimumFractionDigits:2})
}

function cargarIngresos(){

    let ingresosHTML='';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);

    }
    document.getElementById('listaIngresos').innerHTML = ingresosHTML;
}

function cargarGastos(){

    let gastosHTML = '';

    for (let gasto of gastos){

        gastosHTML += crearGastoHTML(gasto);

    }
    document.getElementById('listaGastos').innerHTML = gastosHTML;

}

function crearIngresoHTML(ingreso){

    let ingresoHTML = (
    "        <div class=\"elemento limpiarEstilos\">\n" +
    "          <div class=\"elemento_descripcion\">" + ingreso.description + "</div>\n" +
    "          <div class=\"derecha limpiarEstilos\">\n" +
    "            <div class=\"elemento_valor\"> " + formatoMoneda(ingreso.value) + "</div>\n" +
    "            <div class=\"elemento_eliminar\">\n" +
    "              <button class=\"elemento_eliminar--btn\">\n" +
    "                <ion-icon name=\"trash-outline\"  onclick='borrarIngreso(" + ingreso.id + ")'></ion-icon>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>"
    );
    return ingresoHTML
}

function crearGastoHTML(gasto){

    let gastoHTML = (
    "<div class=\"elemento limpiarEstilos\">\n" +
    "          <div class=\"elemento_descripcion\">" + gasto.description + "</div>\n" +
    "          <div class=\"derecha limpiarEstilos\">\n" +
    "            <div class=\"elemento_valor\">"+ formatoMoneda(gasto.value) +"</div>\n" +
    "            <div class=\"elemento_porcentaje\">" + formatoPorcentaje(gasto.value/calcularIngresosTotales()) + "</div>\n" +
    "            <div class=\"elemento_eliminar\">\n" +
    "              <button class=\"elemento_eliminar--btn\" onclick='borrarGasto(" + gasto.id + ")' >\n" +
    "                <ion-icon name=\"trash-outline\"></ion-icon>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>"
    );
    return gastoHTML;
}

function borrarIngreso(id){

    let indexEliminar = ingresos.findIndex( ingreso => ingreso.id === id );

    ingresos.splice(indexEliminar,1);

    cargarApp();

}

function borrarGasto(id){

    let indexborrar = gastos.findIndex( gasto => gasto.id === id );

    gastos.splice(indexborrar,1)

    cargarApp();

}

function addDato(){

    let formulario = document.forms['formulario'];

    if (comprobarFormulario(formulario)){

        let inputTipo = formulario.elements['inputTipo'].value;

        let descripcion = formulario.elements['inputDescripcion'].value;

        let value = +formulario.elements['inputValor'].value;

        let newDato;

        if (inputTipo === 'ingreso'){
            newDato = new Ingreso(descripcion,value);
            console.log(newDato);
            ingresos.push(newDato);
        }
        else if (inputTipo === 'gasto'){
            newDato = new Gasto(descripcion,value);
            console.log(newDato);
            gastos.push(newDato);
        }
    }
    cargarApp();
}

function comprobarFormulario(formulario){

    let descripcion = formulario.elements['inputDescripcion'].value;
    let value = formulario.elements['inputValor'].value;

    if ((descripcion === '') || (value === '' )) {
        console.log('formulario NOK');
        return false;
    } else{
        console.log('formulario OK');
        return true;
    }
}