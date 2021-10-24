//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let perfil = JSON.parse(localStorage.getItem("perfil"));
    if (perfil !== null){
       // document.getElementById("name").value = perfil.nombre;
        document.getElementById("apell").value = perfil.apellido;
        document.getElementById("edad").value = perfil.edad;
       // document.getElementById("email").value = perfil.email;
        document.getElementById("tel").value = perfil.tel;
    };


    document.getElementById("edit-btn").addEventListener("click",()=>{
        let inputs = document.getElementsByName("info");
        for(let i=0; i < inputs.length; i++){
            inputs[i].disabled = false;
        };
    });


    document.getElementById("btn-guardar-perfil").addEventListener("click",()=>{
        guardarPerfil();                                                          
    });

    document.getElementById("img").addEventListener("click",()=>{
       selectImg();
    });


    let imgbase64 = convertir(document.getElementById("img"));
    localStorage.imagen=imgbase64;
    document.getElementById("imagen2").src=`${localStorage.imagen}`;
    console.log(localStorage.imagen);
    console.log(imgbase64);

});



function guardarPerfil() {
    
    let name = document.getElementById("name");
    let apell = document.getElementById("apell");
    let edad = document.getElementById("edad");
    let email = document.getElementById("email");
    let tel = document.getElementById("tel");

    let perfil = {};

    perfil.nombre = name.value;
    perfil.apellido = apell.value;
    perfil.edad = edad.value;
    perfil.email = email.value;
    perfil.tel = tel.value;

    localStorage.setItem("perfil", JSON.stringify(perfil));


    let disabledInputs = document.getElementsByName("info");
    for(let i=0; i < disabledInputs.length; i++){
        disabledInputs[i].disabled = true;
    };


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
    
}



function convertir(img) {
    img.crossOrigin="anonymous";
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let contexto = canvas.getContext("2d");
    contexto.drawImage(img, 0, 0,img.width, img.height);
    let dataURL = canvas.toDataURL("image/png"); //jpng
    return dataURL;
}

