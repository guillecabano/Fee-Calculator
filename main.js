//Se crea una funcion que se ejecuta al presionar el boton

$('#boton').click(function(){
    capturar();
});

class Cuenta {
    constructor (id, aPagar, pagado, saldo,) {
        this.id=id;
        this.aPagar=aPagar;
        this.pagado=pagado;
        this.saldo=saldo;
    }
}

const baseDatos = [];

    function capturar() {

    
    //se crean las variables con los valores q ingresa el usuario
    numCuenta = document.getElementById("dni").value;
    datoApagar = document.getElementById("saldo").value;
    datoPagado = document.getElementById("adelanto").value;
    
    //se crea una funcion para calcular el total restante del dinero q quiere abonar el usuario
    function calcular () {
        let total = 0    
        total = datoApagar - datoPagado;
        return total;
    }


    
    //se llama a la funcion y se utiliza una variable global
    total = calcular();
    
    //al finalizar se ejecuta otra funcion
    cuotas();

        //Se crea un objeto con los datos del usuario
        const nuevaCuenta = new Cuenta(numCuenta,datoApagar,datoPagado,total);
        console.log(nuevaCuenta);
    
        //Se crea una base de datos con un array y se guarda la cuenta con el metodo.push para futuros usos

        baseDatos.push(nuevaCuenta);
        console.log(baseDatos);
    
        localStorage.setItem("cuentas", JSON.stringify(baseDatos));

        //se verifica si existe un DOM creado y si existe lo elimina
        if (document.contains(document.getElementById("parrafoTotal"))) {
            document.getElementById("parrafoTotal").remove();
        } 
    };
    


    //Se crea una funcion q crea elementos html y dependiendo del saldo restante se sigue con el programa o no
    function cuotas() {
    // se crean parrafos en el html con DOM en Jquery
    // se verifica que el monto entregado sea menor al total a pagar y se piden la cantidad de cuotas a abonar
    if (total > 0) {
        $('form').append("<div id='parrafo' style='display: none'><p>Su saldo es de: $" + total + " Ingrese en cuantas cuotas lo desea abonar(3,6,12,18,24,30)</p> <input id='cuotas' type='number'></input> <button type='reset' onclick='capturarCuotas()'>Calcular Cuotas</button></div>")
        //Se agrega animacion
        $('#parrafo').fadeIn(1000);
        // en caso de que lo pagado supere al monto a abonar se despliega el mensaje y se termina el procedimiento
        } else {
            $('form').append("<p>El monto total ya esta pagado por adelantado, felicidades!</p>");
            $('p').fadeIn(1000);
        }
    }

     //Cuando el usuario use el boton para ver las cuotas se realiza una funcion dependiendo de las cuotas elegidas por el usuario
/*     function capturarCuotas(){
        let cuotas = Number(document.getElementById("cuotas".value));
        if (cuotas == 3 || cuotas == 6 || cuotas == 9 || cuotas == 12 || cuotas == 24 || cuotas == 32) {
            calculaCuotas(cuotas);
        } else {
            alert("No se ingreso un monto de cuotas correcto, refresque la pagina y intente nuevamente")
        }} */

    function capturarCuotas() {
        let cuotas = Number(document.getElementById("cuotas").value);
    switch (cuotas) {
        case 3:
            tresCuotas();
            break;
        case 6:
            seisCuotas();
            break;
        case 12:
            doceCuotas();
            break;
        case 18:
            dieciochoCuotas();
            break;
        case 24:
            veinticuatroCuotas();
            break;
        case 30:
            treintaCuotas();
            break;
        default:
            alert ("No se ingreso un monto de cuotas correcto, refresque la pagina y intente nuevamente")
            break;
    }
    }
    
    // se hacen funciones dependiendo de la cantidad de cuotas a abonar y se suman intereses dependiendo de las mismas

        //tres cuotas
        function tresCuotas (){
            cuota = 3;
            intereses = (3.20 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 3;
            mostrarDatos();
        }
        //seis cuotas
        function seisCuotas (){
            cuota = 6;
            intereses = (6.39 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 6;
            mostrarDatos();
        }
        
        //doce cuotas
        function doceCuotas (){
            cuota = 12;
            intereses = (12.97 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 12;
            mostrarDatos();
        }
        
        //dieciocho cuotas
        function dieciochoCuotas () {
            cuota = 18;
            intereses = (19.97 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 18;
            mostrarDatos();
        }
        
        //veinticuatro cuotas
        function veinticuatroCuotas (){
            cuota = 24;
            intereses = (30.33 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 24;
            mostrarDatos();
        }
    
        //treinta cuotas
        function treintaCuotas (){
            cuota = 30;
            intereses = (40.18 * total) / 100 ;
            granTotal = total + intereses;
            costoCuota = granTotal / 30;
            mostrarDatos();
        }

//funcion q muestra los datos en la tabla
function mostrarDatos() {
    $('form').append("<p id='parrafoTotal' style='display: none'>El total a pagar seria de: $" + granTotal.toFixed(2) + " y "+ cuota +" cuotas de: $" + costoCuota.toFixed(2) + "</p>")
    document.getElementById("tabla").innerHTML += '<tbody><td><h4>'+numCuenta+'</h4></td><td><h4>$'+datoApagar+'</h4></td><td><h4>$'+datoPagado+'</h4></td><td><h4>'+cuota+'</h4></td><td><h4>$'+intereses.toFixed(2)+'</h4></td><td><h4>$'+costoCuota.toFixed(2)+'</h4></td><td><h4>$'+granTotal+'</h4></td></tbody>'
    $('#parrafo').fadeOut("slow");
    $('#parrafoTotal').slideDown(2000);
    formulario.reset();
}
