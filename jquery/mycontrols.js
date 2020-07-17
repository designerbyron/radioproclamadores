let conexionActiva = false;

function verificarConexion(){

  /*Agregarmos opcinal con Sweetalert*/
    var x = `Swal.fire({
        title: 'Importante!',
        text: 'Verifica tu conexion',
        icon: 'info',
        confirmButtonText: 'Verificar'
      })`;
    if(x){
        if(navigator.onLine == true) {
            Swal.fire({
                title: 'Conexion Correcta | Bienvenido',
                text: 'Dios te bendiga',
                icon: 'success',
                confirmButtonText: 'Escuchar la Radio'
              });
              conexionActiva = true;
              return true;
            
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Necesitas una conexion A internet activa',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              conexionActiva = false;
              return false;
        }
    }
}
/*Obligamos a verificar la conexion cuando entramos o recargamos*/
verificarConexion();

var radioProclamadores = document.getElementById("radioProclamadores");
var vumeter = document.querySelector(".principal__vumeter");



var controlVolumen = document.getElementById("vol-control");
window.onload = asignarVolumen();

sonido = false;

var btn_stop = document.getElementById("btn_stop");
btn_stop.addEventListener("click", detener);

function detener(){
    vumeter.setAttribute("src", "./images/vumeter-off.jpg");
    radioProclamadores.pause();
    var play = document.querySelector(".play");
    play.textContent ="Play";
    sonido = false;
  }

var btn_play = document.getElementById("btn_play");
btn_play.addEventListener("click", reproducir);


function reproducir(){
   
  if(conexionActiva || navigator.onLine == true ){
    var play = document.querySelector(".play");
    if(!sonido){
        radioProclamadores.load();
        radioProclamadores.play();
        play.textContent ="Pause";
        sonido = true;
        vumeter.setAttribute("src", "./images/vumeter.gif");

    }else{
        detener();            
        play.textContent ="Play";
        sonido = false;
        vumeter.setAttribute("src", "./images/vumeter-pause.gif");
    }
  }else{
    Swal.fire({
        title: 'Error!',
        text: 'Necesitas una conexion A internet activa',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
  }
  
}
/* Eventos para moviles */
controlVolumen.addEventListener("touchstart", asignarVolumen);
controlVolumen.addEventListener("touchmove", asignarVolumen);

controlVolumen.addEventListener("click", asignarVolumen);

function asignarVolumen(){    
        
        var radioProclamadores = document.getElementById('radioProclamadores');        
        radioProclamadores.volume = controlVolumen.value / 100;
         window.setVolume = radioProclamadores.volume;

    
}
/* Registrar el Services worker para que sea una PWA */
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
  .then(reg=> console.log('Registro exitoso', reg))
  .catch(err=> console.warm('NO se ha podido registrar el SW', err))
}

/*resolvemos advertencia del navegador acerca de las cookies*/
response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");