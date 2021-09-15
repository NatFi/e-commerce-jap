//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

   //------------------------- INFO PRODUCTOS -----------------------------
    
   getJSONData(PRODUCT_INFO_URL).then((result) =>{
        if(result.status === "ok"){
          
            prodInfo = result.data;
            mostrarInfoProductos(prodInfo);
        }
    })


   //---------------------- COMENTARIOS PRODUCTO --------------------------
   
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then((resultComents) =>{
        if(resultComents.status === "ok"){
          
            comentarios = resultComents.data;
            mostrarComentProductos(comentarios);
        }
    });
    

   //-----------------------------------------------------------------------

    document.getElementById("publicoment").addEventListener("click",()=>{     // btn publicar comentario
		comentar();                                                          
	});



    //-------------------------- SPAN ESTRELLAS ----------------------------

    document.getElementById("radio1").addEventListener("click",()=>{
        //   document.getElementById("valor").innerHTML="Excelente";
        let x = document.getElementById("valor");
        x.innerHTML = "Muy malo";
        x.style.color = "rgb(255, 0, 0)";   
    });

    document.getElementById("radio2").addEventListener("click",()=>{
        //   document.getElementById("valor").innerHTML="Muy bueno";
        let x = document.getElementById("valor");
        x.innerHTML = "Malo";
        x.style.color = "rgb(255, 123, 0)";   
    });

    document.getElementById("radio3").addEventListener("click",()=>{
        //  document.getElementById("valor").innerHTML="Regular";
        let x = document.getElementById("valor");
        x.innerHTML = "Regular";
        x.style.color = "rgb(238, 195, 6)";  
    });

    document.getElementById("radio4").addEventListener("click",()=>{
        // document.getElementById("valor").innerHTML="Malo";
        let x = document.getElementById("valor");
        x.innerHTML = "Muy bueno";
        x.style.color = "rgb(144, 216, 10)";  
    });

    document.getElementById("radio5").addEventListener("click",()=>{
      //  document.getElementById("valor").innerHTML="Muy malo";
        let x = document.getElementById("valor");
        x.innerHTML = "Excelente";
        x.style.color = "rgb(6, 167, 73)"; 
    });


});


//----------------------------------  INFO  ------------------------------------
var prodInfo = {}; 

function mostrarInfoProductos(){

    document.getElementById("productName").innerHTML= prodInfo.name;
    document.getElementById("productDescription").innerHTML= prodInfo.description;
    document.getElementById("productsoldCount").innerHTML= prodInfo.soldCount;
    document.getElementById("productCost").innerHTML= (prodInfo.currency) +"    "+ (prodInfo.cost);
    
    mostrarProdImg(prodInfo.images);
    mostrarRelacionados(prodInfo.relatedProducts);
};


function mostrarProdImg(array){

    let htmlContentToAppend = "";

    for(let images of array){

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100" id="zoomimage">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }

};

function mostrarRelacionados(array){

    let htmlContentToAppend = "";

    for(let relac of array){
        
        htmlContentToAppend =  `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100" >
                <img class="img-fluid img-thumbnail" src="` +  relac + `" alt="">
            </div>
        </div>
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;

   // relac = (product.includes(1))&& (product.includes(3));
}};


//---------------------------------  COMENTARIOS  ------------------------------------

var comentarios = [];

/*function mostrarComentProductos(array){
    for(let coments of array){

        document.getElementById("comentarios").innerHTML += (coments.score) + (coments.description) + (coments.user) + (coments.dateTime);
    }    
};*/ 

// {} es un objeto que contiene propiedades---a las propiedades del objeto ACCEDES CON objeto.propiedad.
// [] es un array que puede contener objetos o cualquier tipo de variable---a los elementos del array ACCEDES CON array[index].
// array[index].propiedad

function mostrarComentProductos(array){
    let comentariosHTML = "";

    for (let coments of array){
        
        comentariosHTML += `

        <div class="col ml-4 mb-4 border shadow pt-4 pb-3 pl-4 pr-5 " id="comentsusers">
          <div class="mb-2 d-flex w-100 justify-content-between border-bottom">
            <p class="ml-3 mb-2"><b><i class="fas fa-user-circle"></i>`+" "+ coments.user +`</b></p>
            <small class="text-muted">` + calificar(coments.score) + `</small>
          </div>
            <p class="mb-3">`+ coments.description +`</p>
            <p class="mb-1">`+ coments.dateTime +`</p>
        </div>
     `
     document.getElementById("comentarios").innerHTML = comentariosHTML;
    }
};


function comentar(){

  let username = JSON.parse(localStorage.getItem("usuario"));          // nombre del usuario
  let comentario = document.getElementById("dejarcoment").value;       // comentario
  

  let hoy = new Date();  // fecha y hora 
                    // Con esto, lo que acabamos de hacer es guardar, en la variable hoy,
                    // una instancia de la clase Date,
                    // es decir, un objeto, el cual alberga toda la información que necesitamos
                    // para nuestro propósito, por lo que ahora, simplemente, 
                    // tendremos que obtener dicha información mediante llamadas a ciertos métodos
                    // de dicho objeto.

  /**/let mes = hoy.getMonth()+1;
    if (mes < 10){
        mes ="0" + mes;
    }
  /**/let dia = hoy.getDate();
  if (dia < 10){
      dia = "0" + dia;
  }
  /**/let minutos = hoy.getMinutes();
  if (minutos < 10){
      minutos = "0" + minutos;
  } 
  /**/let segundos = hoy.getSeconds();
  if (segundos < 10){
      segundos = "0" + segundos;
  }
  let hora = hoy.getHours() + ":" + minutos +":" + segundos; 
  let fecha = hoy.getFullYear() + "-" + mes + "-" + dia; 

  let fechayhoracoment = fecha +" "+" "+ hora;        // fecha y hora 


  // buscar el radiobutton checked y armar el texto con el valor ( 1 - 5 )
  let estrellasSelect = document.querySelector('input[name=stars]:checked').value;
  if (estrellasSelect > 0 ){
    estrellasSelect; 
  };
    

  let dejarcoment ={};    //creo el objeto comentario con sus propiedades.
  dejarcoment.user = username.nombre; 
  dejarcoment.description = comentario; 
  dejarcoment.score = estrellasSelect;  
  dejarcoment.dateTime = fechayhoracoment;


  if(dejarcoment.description.trim() !== "" && dejarcoment.score.trim() !== ""){

      comentarios.push(dejarcoment);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por compartir tu opinión!',
        showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
    
    document.getElementById("dejarcoment").value = "";
 };

  mostrarComentProductos(comentarios);
};


//----- Poner ESTRELLAS en el SCORE de los comentarios del JSON en vez de numeros ---
//----------------------cuando muestro el score, le puse la funcion (mas arriba) ---
//----------------------------asi el score siempre se mostrara en estrella stanto en el json como en mis nuevos comentarios ---
 function calificar(num){

    let stars = "";
    for (let i=1; i <=5; i++){    // puntuacion entre 1-5
        if (i <= num){  //cuento y pregunto
        stars += `<i class="fas fa-star"></i>`;
      }else{
        stars += `<i class="far fa-star"></i>`;
      };
    };
     return stars;
 };







 /*------------ para todos los radiobutton stars agregar un onchange--------------
 let rating = document.querySelectorAll('input[name=stars]');
 rating.forEach((radio) => {
    radio.addEventListener('change');
 });
  */

