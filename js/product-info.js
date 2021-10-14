


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

   //------------------------- INFO PRODUCTOS -----------------------------
    
   getJSONData(PRODUCT_INFO_URL).then((result) =>{
        if(result.status === "ok"){
          
            prodInfo = result.data;
            mostrarInfoProductos(prodInfo);
        };
    });


   //---------------------- COMENTARIOS PRODUCTO --------------------------
   
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then((resultComents) =>{
        if(resultComents.status === "ok"){
          
            comentarios = resultComents.data;
            mostrarComentProductos(comentarios);
        };
    });

    
    //-----------------------------------------------------------------------
    document.getElementById("recientes").addEventListener("click",()=>{        // ordenar recientes
    recientes();                                                          
    });

    document.getElementById("maspuntuados").addEventListener("click",()=>{     // ordenar por mas puntuados
    maspuntuados();                                                          
    });

    document.getElementById("menospuntuados").addEventListener("click",()=>{   // ordenar por menos puntuados
    menospuntuados();                                                          
    });


    //---------------- NOMBRE USUARIO en publicar comentario  --------------

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("nombreusercoment").innerHTML =
    `<p class="ml-3 mb-2 mt-2"> <i class="green fas fa-user mx-2"></i>` + " " + `<b class="green">` +" "+ 
    usuario.nombre + `</b>`+ " " + "queremos conocer tu opinión!" +`</p>`;


    document.getElementById("publicoment").addEventListener("click",()=>{    // btn publicar comentario
		comentar();                                                          
	});

    //-------------------------- SPAN ESTRELLAS ----------------------------

    document.getElementById("radio1").addEventListener("click",()=>{
        //   document.getElementById("valor").innerHTML="Muy malo";
        let x = document.getElementById("valor");
        x.innerHTML = "Muy malo";
        x.style.color = "rgb(255, 0, 0)";
    });

    document.getElementById("radio2").addEventListener("click",()=>{
        //   document.getElementById("valor").innerHTML="Malo";
        let x = document.getElementById("valor");
        x.innerHTML = "Malo";
        x.style.color = "rgb(255, 72, 0)";
    });

    document.getElementById("radio3").addEventListener("click",()=>{
        //  document.getElementById("valor").innerHTML="Regular";
        let x = document.getElementById("valor");
        x.innerHTML = "Regular";
        x.style.color = "rgb(255, 145, 0)";  
    });

    document.getElementById("radio4").addEventListener("click",()=>{
        // document.getElementById("valor").innerHTML="Bueno";
        let x = document.getElementById("valor");
        x.innerHTML = "Bueno";
        x.style.color = "rgb(238, 195, 6)";  
    });

    document.getElementById("radio5").addEventListener("click",()=>{
      //  document.getElementById("valor").innerHTML="Muy bueno";
        let x = document.getElementById("valor");
        x.innerHTML = "Muy bueno";
        x.style.color = "rgb(49, 165, 49)"; 
    });


   //-------------------------- RELACIONADOS --------------------------

   getJSONData(PRODUCTS_URL).then((resultObj) =>{
       if(resultObj.status === "ok"){
           
           allproducts = resultObj.data;
           mostrarRelacionados(allproducts);
        };
    });

});
//-----------
var allproducts = [];

function mostrarRelacionados(allproducts){

    let relac = "";

    for(let i=0; i < prodInfo.relatedProducts.length; i++){
        let rel = prodInfo.relatedProducts[i];
    
        relac += `
        <div class="row-sm-5 col-md-4">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid shadow" id="zoomimage" src="` + allproducts[rel].imgSrc + `" alt="">
                <h4 class="mb-1 mt-3 ml-4 float-left">`+ allproducts[rel].name +`</h4>
                <p class="text-muted mt-3 mr-4 float-right">`+ allproducts[rel].currency +` `+ allproducts[rel].cost +`</p>
                <div class="mb-2 d-flex w-100 justify-content-between border-bottom">
                <p class="mb-1 mt-3">`+ allproducts[rel].description +`</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("relatedProducts").innerHTML = relac;
    };
};


//----------------------------------  INFO  ------------------------------------
var prodInfo = {}; 

function mostrarInfoProductos(){

    document.getElementById("productName").innerHTML= prodInfo.name;
    document.getElementById("productDescription").innerHTML= prodInfo.description;
    document.getElementById("productsoldCount").innerHTML= prodInfo.soldCount;
    document.getElementById("productCost").innerHTML= (prodInfo.currency) +"    "+ (prodInfo.cost);
    
    mostrarProdImg(prodInfo.images);
   // mostrarRelacionados(prodInfo.relatedProducts);
};


function mostrarProdImg(){

    var imges = prodInfo.images;
    var slides = "";
    var i = 0;
    imges.forEach(img=>{
    if (i==0){
        slides+= "<div class='carousel-item active'><img class='dblock w-100' src=" + img +" alt='" + img + "'></div>"
        } else{
        slides+= "<div class='carousel-item'><img class='dblock w-100' src=" + img +" alt='" + img + "'></div>"
        }
        i++;
    });
    document.getElementById("productImages").innerHTML = slides;

};

//---------------------------------  COMENTARIOS  ------------------------------------

var comentarios = [];

/*
function mostrarComentProductos(array){
    for(let coments of array){
         document.getElementById("comentarios").innerHTML += (coments.score) + (coments.description) + (coments.user) + (coments.dateTime);
        }};
*/ 

// {} es un objeto que contiene propiedades---a las propiedades del objeto ACCEDES CON objeto.propiedad.
// [] es un array que puede contener objetos o cualquier tipo de variable---a los elementos del array ACCEDES CON array[index].
// array[index].propiedad

function mostrarComentProductos(array){
    let comentariosHTML = "";

    for (let coments of array){
        
        comentariosHTML += `

        <div class="col ml-4 mb-4 shadow pt-4 pb-5 pl-4 pr-5" id="comentsusers">
          <div class="mb-2 d-flex w-100 justify-content-between border-bottom">
            <p class="ml-3 mb-2 orange"><b><i class="fas fa-user-circle pr-2"></i>`+" "+ coments.user +`</b></p>
            <small class="text-muted">` + calificar(coments.score) + `</small>
          </div>
            <p class="pt-2">`+ coments.description +`</p>
            <small class="float-right text-muted"><i class="far fa-calendar-alt pr-2"></i>`+ coments.dateTime +`<i class="pl-2 far fa-clock"></i></small>
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

  let fechayhoracoment = fecha +"   "+ hora;        // fecha y hora 


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

     //comentarios.push(dejarcoment);
     comentarios.unshift(dejarcoment);

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
        timer: 2000,
        timerProgressBar: true,
    });
    
    document.getElementById("dejarcoment").value = "";
 };
 
 mostrarComentProductos(comentarios);
};


//----- Poner ESTRELLAS en el SCORE de los comentarios del JSON en vez de numeros ---
//----------------------------cuando muestro el score, le puse la funcion (mas arriba) ---
//-------------------------------asi el score siempre se mostrara en estrella stanto en el json como en mis nuevos comentarios ---
 function calificar(num){

     let stars = "";
     for (let i=1; i <=5; i++){    // puntuacion entre 1-5
        if (i <=num ){  //cuento y pregunto
         stars += `<i class="stars fas fa-star"></i>`;
        }else{
        stars += `<i class="stars far fa-star"></i>`;
        };
     };
     return stars;
 };

 

//--------------- Ordenar ------------------

function recientes(){
    comentarios.sort((a,b)=>{
        if (a.dateTime > b.dateTime){
            return -1;
        }
        if (a.dateTime < b.dateTime){
            return 1;
        }else{
            return 0;
        }   
    });
    mostrarComentProductos(comentarios);
}

function maspuntuados(){
    comentarios.sort((a,b)=>{
        return b.score-a.score;   
    });
    mostrarComentProductos(comentarios);
}

function menospuntuados(){
    comentarios.sort((a,b)=>{
        return a.score-b.score;   
    });
    mostrarComentProductos(comentarios);
}
 

 



 /*------------ para todos los radiobutton stars agregar un onchange--------------
 let rating = document.querySelectorAll('input[name=stars]');
 rating.forEach((radio) => {
    radio.addEventListener('change');
 });
  */

