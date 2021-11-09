//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
	  if(usuario !== null){
	    document.getElementById("name").value = usuario.nombre; // nombre en perfil
		  document.getElementById("email").value = usuario.correo; // correo en perfil
    };
  
    
    let perfil = JSON.parse(localStorage.getItem("perfil"));
    let preview = document.getElementById("foto");
    if (perfil !== null){
      // document.getElementById("name").value = perfil.nombre;
      document.getElementById("apell").value = perfil.apellido;
      document.getElementById("edad").value = perfil.edad;
      // document.getElementById("email").value = perfil.email;
      document.getElementById("tel").value = perfil.tel;
      document.getElementById("foto").src = perfil.imagen;
    } else {
      preview.src = "img/img-prof.ico";
    };



    document.getElementById("edit-btn").addEventListener("click",()=>{
        let inputs = document.getElementsByName("info");
        for(let i=0; i < inputs.length; i++){
            inputs[i].disabled = false;
            inputs[i].classList.add("blueI");
        };
    });


    document.getElementById("btn-guardar-perfil").addEventListener("click",()=>{
        guardarPerfil();                                                          
    });


    /*
    var imgbase64 = convertir(document.getElementById("img"));
    localStorage.profileImg = imgbase64;
    document.getElementById("img2").src=`${localStorage.profileImg}`; // ME PONE LA IMAGEN EN OTRO SITIO CON EL ID IMG2 por ejemplo;
    console.log(localStorage.imgbase64);
    console.log(imgbase64);
    */

});

 /*** *** *** *** *** *** *** *** *** *** *** *** *** ***/  


function guardarPerfil() {
    
  // let name = document.getElementById("name");
    let apell = document.getElementById("apell");
    let edad = document.getElementById("edad");
  // let email = document.getElementById("email");
    let tel = document.getElementById("tel");
    let preview = document.getElementById("foto");

    let perfil = {};
   // perfil.nombre = name.value;
    perfil.apellido = apell.value;
    perfil.edad = edad.value;
   // perfil.email = email.value;
    perfil.tel = tel.value;
    perfil.imagen = preview.src;
   
    localStorage.setItem('perfil', JSON.stringify(perfil));
   // localStorage.setItem("perfil", JSON.stringify(perfil));

    /* alert */
    const Toast = Swal.mixin({
        background: 'linear-gradient(rgba(128, 128, 128, 0.377) ,rgba(6, 104, 128, 0.185))',
        iconColor: 'rgba(6, 103, 128, 0.897)',
        toast: true,
        position: 'center',
        
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
      icon: 'success',
      html:'<h6 style="color: rgba(6, 103, 128, 0.897); position: absolute;  padding-left: 17px;">Información actualizada</h6>',
    });

    /* deshabilitar inputs  */
    let disabledInputs = document.getElementsByName("info");
    for(let i=0; i < disabledInputs.length; i++){
        disabledInputs[i].disabled = true;
    };
    
};

/*
function convertir(img) {
    img.crossOrigin="anonymous";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var contexto = canvas.getContext("2d");
    contexto.drawImage(img, 0, 0,img.width, img.height);
    var dataURL = canvas.toDataURL("image/jpeg",0.5);
    return dataURL;
};
*/

function previewFile() {
    let preview = document.getElementById('foto');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result; 
      console.log(reader.result);
    }
  
    if (file) {
      reader.readAsDataURL(file);
     
    } else {
      preview.src = "img/img-prof.ico";
    } 
}


