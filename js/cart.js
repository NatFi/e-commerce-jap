//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  getJSONData(CART_DESAFIATE).then((resultObj) =>{
    if(resultObj.status === "ok"){
      cartInfo = resultObj.data;
      mostrarCarrito(cartInfo);
    }
  });

  /*for (let i=0;i<radioEnvio.length;i++){
    radioEnvio[i].addEventListener("click",()=>{
      cartCost();
    });
  };*/
  //-------------------------------------------------------------------------
  document.getElementById("tarjRadio").addEventListener("click",function(){
    
    document.getElementById("numTarj").disabled = false;
    document.getElementById("vencTarj").disabled = false;
    document.getElementById("CVV").disabled = false;

    document.getElementById("cta-banc").disabled = true;

    document.getElementById("metPago").innerHTML = "Tarjeta";
  });


  document.getElementById("ctaBancRadio").addEventListener("click",function(){
    
    document.getElementById("numTarj").disabled = true;
    document.getElementById("vencTarj").disabled = true;
    document.getElementById("CVV").disabled = true;

    document.getElementById("cta-banc").disabled = false;

    document.getElementById("metPago").innerHTML = "Cuenta bancaria";
  });
  //-------------------------------------------------------------------------

});


let cartInfo = {};

function mostrarCarrito(cartInfo){

    let cartHTML = "";

    for(let i=0; i < cartInfo.articles.length; i++){
      let item = cartInfo.articles[i];

     /* document.getElementById("pesos").addEventListener("click",()=>{
        if(item.currency === "USD"){
          item.currency = "UYU";
          item.unitCost = parseFloat(item.unitCost * 40);
        };
      });*/

      if(item.currency === "UYU"){
        item.currency = "USD";
        item.unitCost = parseFloat(item.unitCost / 40);
      };

        cartHTML += `
                    <div class="col-2 d-block mb-4 h-100">
                    <img src="` + item.src + `" alt="" class="mb-3 shadow border-0 img-fluid dblock">
                    </div>
                    <div class="col-4 mt-2">
                     <p>` + item.name + `</p>
                     <p><b>Precio unitario: </b> `+ " " + item.currency + " " + `<span class="precio">`+ item.unitCost +`</span> </p>
                    </div>
                    <div class="col-2 mt-4">
                        <div class="row">
                          <label for="cant" class="float-right"> Cantidad:
                          <input type="number" min="1" onchange="cartCost();" value="`+ item.count +`" class="cant-art sinfoco text-center border-top-0 border-left-0 border-right-0" style="width:40px">
                          </label>
                        </div>
                    </div>
                    <div class="col-3 mt-4">
                      <p> <b>Subtotal:</b>` + " " + item.currency + " " + `<span class="subtotal">`+ item.unitCost * item.count +`</span> </p>
                    </div>
                    <div class="col-1 mt-4">
                      <button title="Eliminar artículo" onclick="deleteart(${i});" class="btn border-0 btn-outline-danger"><i class="fa fa-trash-alt light"></i></button>
                    </div>
                    `
    };
    document.getElementById("cart").innerHTML=cartHTML;
    cartCost();
};


function cartCost(){
  
  let spanPrecios = document.getElementsByClassName('precio'); //array de precio de cada articulo.
  let inputCant = document.getElementsByClassName("cant-art"); //array de cantidad de cada articulo.
  let spanSubtotales = document.getElementsByClassName('subtotal');//array de span con cada subtotal de articulo.
  let radioEnvio = document.getElementsByName("envio"); // array de radio button de los envios.
  
  let total=0;
  
  for (let i=0; i < spanPrecios.length; i++){
    spanSubtotales[i].innerHTML = (parseFloat(spanPrecios[i].innerHTML) * parseFloat(inputCant[i].value)).toFixed(2); 
    total += parseFloat(spanPrecios[i].innerHTML) * parseFloat(inputCant[i].value);
   // document.getElementById("subt").innerHTML = (total).toFixed(2);
  };
  /* if(spanPrecios.length === 0){
    document.getElementById("subt").innerHTML = 0;
  } */

  let costEnvio = 0;

  for (let i=0; i < radioEnvio.length; i++){
    if(radioEnvio[i].checked){
      costEnvio += ((parseFloat(radioEnvio[i].value) / 100) * total);
      document.getElementById("costEnv").innerHTML = "Costo"+" "+" "+ (costEnvio).toFixed(2);
    };
  };
  document.getElementById("total").innerHTML = (total + costEnvio).toFixed(2);
  document.getElementById("subt").innerHTML = (total).toFixed(2);
};


function deleteart(i){
  cartInfo.articles.splice(i,1);
  mostrarCarrito(cartInfo);
};




















/********************** NOTAS  ***********************
const monthsinicio = ['Jan', 'March', 'April', 'June'];
monthsinicio.splice(0,1);
console.log(monthsinicio); /*  array ["March", "April", "June"]   


const monthsfinal = ['Jan', 'March', 'April', 'June'];
monthsfinal.splice(-1,1);
console.log(monthsfinal); /*   array ["Jan", "March", "April"]    */ 

