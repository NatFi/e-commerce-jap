function desconectar() {
	localStorage.removeItem("usuario");
	location.href = "login.html";
	signOut();
}



document.addEventListener("DOMContentLoaded", function(e){
	let usuario = JSON.parse(localStorage.getItem("usuario"));
	if(usuario !== null){
		  document.getElementById("usuario").innerHTML="Hola" +" "+ usuario.nombre + "!";
		  document.getElementById("nombreusercoment").innerHTML= `<p class="ml-3 mb-2 mt-2"> <i class="fas fa-user mx-2"></i>` + " " + `<b>` +" "+ usuario.nombre + `</b>`+ " " + "queremos conocer tu opinión!" +`</p>`;
		}else{
			Swal.fire({
				//title: '¡Hola!',
				//width: '100%',
				grow:'fullscreen',
		    	//html:'<b>Ingresa para continuar al sitio</b>',
			    background:'linear-gradient(to top, rgb(255, 255, 255), rgba(255,255,255,0))',
			    imageUrl: 'img/jap.png',
				imageAlt: 'JaP',
			    imageWidth:'100px',
			    imageHeight:'70px',
				padding: '2rem',
			    backdrop: `
			    rgba(21, 150, 155, 0.836)
			    url('img/sa.gif')
			    center
			    no-repeat
		        `,
				showClass: {
					popup: 'animate__animated animate__fadeInDown'
				},
			    hideClass: {
			    	popup: 'animate__animated animate__fadeOutUp'
			    },
				confirmButtonColor: 'rgba(6, 169, 250, 0.479)',
			    confirmButtonText: 'Ingresa para continuar al sitio',
				footer: '<span class="lead">Este sitio forma parte de Desarrollo Web - JAP - 2021</span>',
			}).then((result) => {
				if (result.isConfirmed) {
					location.href='login.html';
				};
			});
			//location.href="login.html";
		}
	});