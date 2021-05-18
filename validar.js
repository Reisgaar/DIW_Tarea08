/* Cuando cargue la página se ejecutará la función iniciar */
window.onload = iniciar;

/* Función cross-browser para asignar un evento independientemente del navegador */
function crearEvento(elemento,  tipoEvento,  funcion) {
	// Intenta asignar el evento con el método del W3C
    if (elemento.addEventListener) {
        elemento.addEventListener(tipoEvento,  funcion,  false);
    }
	// Si no, intenta utilizar el método de IE
    else if (elemento.attachEvent) {
        elemento.attachEvent("on"  +  tipoEvento,  funcion);
    }
	// Si no, asigna el evento en línea
    else {
        elemento["on"  +  tipoEvento]  =  funcion;
    }
}

/* Detecta si el navegador es Chrome*/
    var esChrome = navigator.userAgent.indexOf("Chrome") > -1;

/* Función que se ejecuta al iniciar */
function iniciar() {
    /* le da focus al primer input */
    document.getElementById("nombre").focus();

    /* Crea los eventos necesarios */
    crearEvento(document.getElementById("submit"),"click",validarForm);
    crearEvento(document.getElementById("volver"),"click",volver);
    crearEvento(document.getElementById("interes"),"keydown",longitud);
    crearEvento(document.getElementById("interes"),"keyup",longitud);
    crearEvento(document.getElementsByTagName("body")[0],"keydown",navegar);
    crearEvento(document.getElementById("navTeclado"),"click",abrirAyuda);
    crearEvento(document.getElementById("navTeclado2"),"click",cerrarAyuda);
    crearEvento(document.getElementById("cerrarAyuda"),"click",cerrarAyuda);
    crearEvento(document.getElementById("mic1"),"click",runSpeechRecognition);
    crearEvento(document.getElementById("mic2"),"click",runSpeechRecognition);
    crearEvento(document.getElementById("mic3"),"click",runSpeechRecognition);
    crearEvento(document.getElementById("mic4"),"click",runSpeechRecognition);
    crearEvento(document.getElementById("mic5"),"click",runSpeechRecognition);

    if (!esChrome){
        document.getElementById("chrome1").style.display = "none";
        document.getElementById("mic1").style.display = "none";
        document.getElementById("mic2").style.display = "none";
        document.getElementById("mic3").style.display = "none";
        document.getElementById("mic4").style.display = "none";
        document.getElementById("mic5").style.display = "none";
    }

    
    // Hago el div de la ayuda accesible draggable:
    dragElement(document.getElementById("ayuda"));

    ayuda = false;
    preenviado = false;
}

/* Calcula la longitud del texto del textarea y pone el texto de ayuda en rojo o verde */
function longitud() {
    let txt = document.getElementById("intereslong").parentNode;
    let num = document.getElementById("interes").value.replaceAll(/\s/g,'').length;
    document.getElementById("intereslong").innerHTML = num;

    if (num < 50){
        txt.style.color = "crimson";
    }
    else {
        txt.style.color = "green";
    }
}

/* Valida el formato de un email */
function validarEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/* Valida el form campo por campo, si un campo falla deja de validar e indica el fallo */
function validarForm(event) {
    let formOK = false;
    let nombre;
    let apellidos;
    let email;
    let telefono;
    let interes;
    let profesion;
    let talleres;
    let asistencia;
    let legal;

    nombre = document.getElementById("nombre").value;
    if (nombre.trim() == '' || nombre == null) {
        document.getElementById("nombre").focus();
        alert("El campo nombre no puede estar vacío.");
    }
    else {
        apellidos = document.getElementById("apellidos").value;
        if (apellidos.trim() == '' || apellidos == null) {
            document.getElementById("apellidos").focus();
            alert("El campo apellidos no puede estar vacío.");
            
        }
        else {
            email = document.getElementById("email").value;
            if (email.trim() == '' || email == null) {
                document.getElementById("email").focus();
                alert("El campo email no puede estar vacío.");
            }
            else if (!validarEmail(email)) {
                document.getElementById("email").focus();
                alert("El formato del email no es correcto.");
            }
            else {
                telefono = document.getElementById("telefono").value.replaceAll(/\s/g,'');
                if (telefono.trim() == '' || telefono == null) {
                    document.getElementById("telefono").focus();
                    alert("El campo teléfono no puede estar vacío.");
                }
                else if (isNaN(telefono)) {
                    document.getElementById("telefono").focus();
                    alert("El teléfono tiene que ser numérico.");
                }
                else if (!telefono.match(/^\d{9}$/)) {
                    document.getElementById("telefono").focus();
                    alert("El formato del teléfono no es correcto.\nDebe tener 9 cifras.");
                }
                else {
                    interes = document.getElementById("interes").value;
                    if (interes.trim() == '' || interes == null) {
                        document.getElementById("interes").focus();
                        alert("El campo sobre tu interes en participar no puede estar vacío.");
                    }
                    else if (interes.replaceAll(/\s/g,'').length < 50) {
                        document.getElementById("interes").focus();
                        alert("El campo sobre tu interes debe contener al menos 50 caracteres sin contar los espacios.");
                    }
                    else {
                        profesion = document.getElementById("profesion").value;
                        let talleresList = document.getElementById("talleres");
                        talleres = [];
                        for (let i = 0; i < talleresList.length; i++){
                            if (talleresList[i].selected) {
                                talleres.push(talleresList[i].value);
                            }
                        }
                        if (talleres.length == 0){
                            document.getElementById("talleres").focus();
                            alert("Debes seleccionar al menos un taller en el que estés interesado.");
                        }
                        else {
                            let asistList = document.getElementsByName('asistencia');
                            for (let i = 0; i < asistList.length; i++){
                                if (asistList[i].checked) {
                                    asistencia = asistList[i].value;
                                }
                            }
                            if (asistencia == '' || asistencia == null){
                                document.getElementById("d4y5").focus();
                                alert("Debes indicar tu asistencia.");
                            }
                            else {
                                legal = document.getElementById("legal").checked;
                                if (legal == false){
                                    document.getElementById("legal").focus();
                                    alert("Debes aceptar las condiciones.");
                                }
                                else {
                                    formOK = true;
                                }
                            }
                        }
                     }
                }
            }
        }
    }
    /* Si no se valida correctamente, cancela el evento */
    if (!formOK) {
        event.preventDefault();
        return false;
    }
    /* Si se valida correctamente, muestra una pantalla de confirmación con los datos */
    else {
        event.preventDefault();
        document.getElementById("conf1").innerHTML = nombre;
        document.getElementById("conf2").innerHTML = apellidos;
        document.getElementById("conf3").innerHTML = email;
        document.getElementById("conf4").innerHTML = telefono;
        document.getElementById("conf5").innerHTML = interes;
        document.getElementById("conf6").innerHTML = profesion.replaceAll("_", " ");
        document.getElementById("conf7").innerHTML = talleres.toString().replaceAll("_", " ").replaceAll(",",", ");
        document.getElementById("conf8").innerHTML = asistencia.replaceAll("_", " ");

        document.getElementById("form").style.display = "none";
        document.getElementById("conf").style.display = "block";
        preenviado = true;

        return false;
    }
}

/* Si se hace click en volver, se muestra el formulario con los datos introducidos */
function volver() {
    document.getElementById("form").style.display = "block";
    document.getElementById("conf").style.display = "none";
    preenviado = false;
}

/* Se ejecuta si se pulsa determinada tecla */
function navegar(event){
    console.log(event.keyCode);

    /* Con la tecla esc se muestra/oculta la ayuda */
    if (event.keyCode == 27){ 
        if (ayuda){ cerrarAyuda() }
        else { abrirAyuda() }
    }

    /*  */
    if (event.keyCode == 13 && preenviado){
        document.getElementById("submit2").click();
    }

    /*  */
    if (event.keyCode == 13 && !preenviado){
        document.getElementById("submit").click();
    }

    if (event.ctrlKey) {
        /* Con las teclas numéricas se puede cambiar de campo */
        if (event.keyCode == 49|| event.keyCode == 97){ document.getElementById("nombre").focus(); event.preventDefault(); }
        if (event.keyCode == 50|| event.keyCode == 98){ document.getElementById("apellidos").focus(); event.preventDefault(); }
        if (event.keyCode == 51|| event.keyCode == 99){ document.getElementById("email").focus(); event.preventDefault(); }
        if (event.keyCode == 52|| event.keyCode == 100){ document.getElementById("telefono").focus(); event.preventDefault(); }
        if (event.keyCode == 53|| event.keyCode == 101){ document.getElementById("foto").focus(); event.preventDefault(); }
        if (event.keyCode == 54|| event.keyCode == 102){ document.getElementById("interes").focus(); event.preventDefault(); }
        if (event.keyCode == 55|| event.keyCode == 103){ document.getElementById("profesion").focus(); event.preventDefault(); }
        if (event.keyCode == 56|| event.keyCode == 104){ document.getElementById("talleres").focus(); event.preventDefault(); }
        if (event.keyCode == 57|| event.keyCode == 105){ document.getElementById("d4y5").focus(); event.preventDefault(); }
        if (event.keyCode == 48|| event.keyCode == 96){ document.getElementById("legal").focus(); event.preventDefault(); }

        if (event.keyCode == 8) { volver(); }

    }

    if (event.keyCode == 113 && ayuda && esChrome) { 
        let identificador = document.activeElement.previousElementSibling.id;
        if (identificador.includes("mic")) {
            document.getElementById(identificador).click();
        }
        else if (identificador == "ayudaSelect3"){
            document.getElementById("mic5").click();
        }
    }

}

function cerrarAyuda(){
    document.getElementById("ayuda").classList.add("oculto");

    document.getElementById("mic1").classList.add("oculto");
    document.getElementById("mic2").classList.add("oculto");
    document.getElementById("mic3").classList.add("oculto");
    document.getElementById("mic4").classList.add("oculto");
    document.getElementById("mic5").classList.add("oculto");


    document.getElementById("navTeclado").classList.remove("cerrado");
    document.getElementById("navTeclado2").classList.add("cerrado");

    document.getElementById("ayudaSelect1").classList.remove("cerrado");
    document.getElementById("ayudaSelect2").classList.add("cerrado");
    document.getElementById("ayudaSelect").classList.add("cerrado");
    document.getElementById("ayudaSelect3").classList.add("cerrado");

    let sups = document.getElementsByClassName("supnum");
    for (let i = 0; i < sups.length; i++) {
        sups[i].classList.add("oculto");
    }

    ayuda = false;
}

function abrirAyuda(){
    document.getElementById("ayuda").classList.remove("oculto");

    document.getElementById("mic1").classList.remove("oculto");
    document.getElementById("mic2").classList.remove("oculto");
    document.getElementById("mic3").classList.remove("oculto");
    document.getElementById("mic4").classList.remove("oculto");
    document.getElementById("mic5").classList.remove("oculto");

    document.getElementById("navTeclado2").classList.remove("cerrado");
    document.getElementById("navTeclado").classList.add("cerrado");

    document.getElementById("ayudaSelect").classList.remove("cerrado");
    document.getElementById("ayudaSelect3").classList.remove("cerrado");
    document.getElementById("ayudaSelect2").classList.remove("cerrado");
    document.getElementById("ayudaSelect1").classList.add("cerrado");

    document.getElementById("ayuda").style.right = "1%";
    document.getElementById("ayuda").style.left = "unset";
    document.getElementById("ayuda").style.top = "unset";

    let sups = document.getElementsByClassName("supnum");
    for (let i = 0; i < sups.length; i++) {
        sups[i].classList.remove("oculto");
    }

    ayuda = true;
}



function runSpeechRecognition(event) {
    if (esChrome){
        var path = event.path || (event.composedPath && event.composedPath());
        console.log(path);    

        var action = path[0];
        var elemento = path[1].classList[0];
        // output donde añadir el texto transcrito
        var output = document.getElementById(elemento);
        // objeto para reconocimiento de voz
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.lang = "es-es";
        
        if (action.classList.contains("fa-microphone-slash")){
            // cuando se empiece a hablar se activa
            recognition.onstart = function() {
                action.classList.remove("fa-microphone-slash");
                action.classList.add("fa-microphone");
                action.classList.add("grabando");
            };
            
            // cuando se termine de hablar se activa
            recognition.onspeechend = function() {
                action.classList.add("fa-microphone-slash");
                action.classList.remove("fa-microphone");
                action.classList.remove("grabando");
            }
            
            recognition.start();
            
            // Cuando devuelve resultado
            recognition.onresult = function(event) {
                var transcript = event.results[0][0].transcript;
                if (elemento == "interes"){
                    if (transcript.trim() == "borrar" || transcript.trim() == "Borrar."){
                        output.innerHTML = "";
                    }
                    else {
                        let puntoFinal = " ";
                        if (transcript.charAt(transcript.length - 1) != "."){puntoFinal = ". "}
                        output.innerHTML += transcript.charAt(0).toUpperCase() + transcript.slice(1) + puntoFinal;
                    }
                }
                else if (elemento == "email") {
                    output.value = transcript.replaceAll(" ", "").replace("arroba", "@");
                }
                else {
                    output.value = transcript.charAt(0).toUpperCase() + transcript.slice(1);
                }
                output.classList.remove("hide");
                recognition.stop();
                longitud();
            };
        }
        else {
            recognition.stop();
            action.classList.add("fa-microphone-slash");
            action.classList.remove("fa-microphone");
            action.classList.remove("grabando");
            output.classList.remove("hide");
        }
    }   
}


function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // coge la posición del ratón inicial
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // cada vez que se mueve el ratón, llama a la función
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calcula la nueva posición
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // establece la nueva posición
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        document.getElementById("ayuda").style.right = "unset";
    }

    function closeDragElement() {
        // deja de mover cuando se suelta el ratón
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
