function desconectar() {
	localStorage.removeItem("usuario");
	location.href = "login.html";
	signOut();
}



document.addEventListener("DOMContentLoaded", function(e){
	let usuario = JSON.parse(localStorage.getItem("usuario"));
	if(usuario !== null){
		  document.getElementById("usuario").innerHTML="Hola" +" "+ usuario.nombre + "!";
		}else{
			Swal.fire({
				//title: '¡Hola!',
				width: '461px',
		    	//html:'<b>Ingresa para continuar al sitio</b>',
			    background:'linear-gradient(to top, rgb(234, 255, 239), rgba(255,255,255,0))',
			    imageUrl: '../img/jap.png',
			    imageWidth:'90px',
			    imageHeight:'70px',
			    backdrop: `
			    rgba(129, 208, 248, 0.781)
			    url("../img/sa.gif")
			    top
			    no-repeat
		        `,
				showClass: {
					popup: 'animate__animated animate__fadeInDown'
				},
			    hideClass: {
			    	popup: 'animate__animated animate__fadeOutUp'
			    },
				confirmButtonColor: 'rgba(6, 169, 250, 0.781)',
			    confirmButtonText: 'Ingresa para continuar al sitio',
			}).then((result) => {
				if (result.isConfirmed) {
					location.href="login.html"
				};
			});
			//location.href="login.html";
		}
	});