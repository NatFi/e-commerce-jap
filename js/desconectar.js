function desconectar() {
	localStorage.removeItem("usuario");
	location.href = "login.html";
	signOut();
}



document.addEventListener("DOMContentLoaded", function(e){
	let usuario = JSON.parse(localStorage.getItem("usuario"));
	if(usuario !== null){
		Swal.fire({
			//title: '¡Bienvenido!',
			//width: '100%',
			grow: 'fullscreen',
			html:'<h3><b>¡Bienvenido!</b></h3>',
			background: 'linear-gradient(to top, rgb(255, 255, 255), rgba(255,255,255,0))',
			imageUrl: 'img/jap.png',
			imageAlt: 'JaP',
			imageWidth: '100px',
			imageHeight: '70px',
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
			showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
			footer: '<span class="lead"><b>Este sitio forma parte de Desarrollo Web - JAP - 2021</b></span>',
		});
		document.getElementById("usuario").innerHTML="Hola" +" "+ usuario.nombre + "!";
	    //document.getElementById("nombreusercoment").innerHTML= `<p class="ml-3 mb-2 mt-2"> <i class="green fas fa-user mx-2"></i>` + " " + `<b class="green">` +" "+ usuario.nombre + `</b>`+ " " + "queremos conocer tu opinión!" +`</p>`;
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
