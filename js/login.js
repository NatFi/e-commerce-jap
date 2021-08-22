//----Funcion verificar inputs----//

function verificar() {
	let nom = document.getElementById("nombre");
	let mail = document.getElementById("correo");
	let usuario = {};

	if (nom.value.trim() === "" || mail.value.trim() === "") {
		alert("Llena los campos por favor");
	} else {
		location.href = "index.html";
		usuario.nombre = nom.value;
		usuario.correo = mail.value;
		usuario.estado = "conectado";

		localStorage.setItem("usuario", JSON.stringify(usuario));
		//localStorage.setItem("email", JSON.stringify(email));
		sessionStorage.setItem("usuario", JSON.stringify(usuario));
		//sessionStorage.setItem("email", JSON.stringify(email));
	}
}

//---------------- Google ------------------//

function onSignIn(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log("Full Name: " + profile.getName());
	console.log("Given Name: " + profile.getGivenName());
	console.log("Family Name: " + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
   
	let usuario= {};
	usuario.nombre=profile.getGivenName();
	usuario.correo=profile.getEmail();
	usuario.estado="conectado";
	location.href = "index.html";

	localStorage.setItem("usuario",JSON.stringify(usuario));
    
}

function onLoad() {
	gapi.load("auth2", function() {
		gapi.auth2.init();
	});
}


//-------------Efectos--------------//

const imgprinc = document.getElementById("principal");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");

nombre.addEventListener("keyup", function (eventn) {
	let nom = nombre.value.length;
	if (nom >= 1 && nom <= 3) {
		principal.src = "img/user1.png";
	} else if (nom >= 4 && nom <= 15) {
		principal.src = "img/user2.png";
	} else if (nom === 0) {
		principal.src = "img/principal.png";
	}
});

correo.addEventListener("keyup", function (eventc) {
	let corr = correo.value.length;
	if (corr >= 1 && corr <= 3) {
		principal.src = "img/corr.png";
	} else if (corr >= 4 && corr <= 7) {
		principal.src = "img/corr@.png";
	} else if (corr >= 8 && corr <= 20) {
		principal.src = "img/corraz.png";
	} else if (corr === 0) {
		principal.src = "img/principal.png";
	}
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});