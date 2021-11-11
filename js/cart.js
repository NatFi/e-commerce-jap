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

  document.getElementById("tarjRadio").addEventListener("change",function(){
    document.getElementById("numTarj").disabled = false;
    document.getElementById("vencTarj").disabled = false;
    document.getElementById("CVV").disabled = false;

    document.getElementById("ctaBancRadio").disabled = true;

    document.getElementById("metPago").innerHTML = Tarjeta;
  });

});

let cartInfo = {};

function mostrarCarrito(cartInfo){

    let cartHTML = "";

    for(let i=0; i < cartInfo.articles.length; i++){
       let item = cartInfo.articles[i];

        cartHTML += `
                    <div class="col-2 d-block mb-4 h-100">
                    <img src="` + item.src + `" alt="" class="mb-3 shadow border-0 img-fluid dblock">
                    </div>
                    <div class="col-4 mt-2">
                     <p>` + item.name + `</p>
                     <p><b>Precio unitario: </b> `+ " " + item.currency + " " + `<span class="precio">` + item.unitCost +`</span></p>
                    </div>
                    <div class="col-2 mt-4">
                        <div class="row">
                          <label for="cant" class="float-right"> Cantidad:
                          <input type="number" min="1" onchange="cartCost();" value="`+ item.count +`" style="width:40px" class="cant-art sinfoco text-center border-top-0 border-left-0 border-right-0">
                          </label>
                        </div>
                    </div>
                    <div class="col-3 mt-4">
                      <p> <b>Subtotal:</b> `+ " " + item.currency + " " +`<span class="subtotal"> `+ item.unitCost * item.count + `</span></p>
                    </div>
                    <div class="col-1 mt-4">
                      <button title="Eliminar artículo" onclick="deleteart();" class="btn border-0 btn-outline-danger"><i class="fa fa-trash-alt light"></i></button>
                    </div>
                    `
         document.getElementById("cart").innerHTML=cartHTML;
    };
  cartCost();
};


function cartCost(){
  
  let spanPrecios = document.getElementsByClassName('precio'); //array de precio de cada articulo.
  let inputCant = document.getElementsByClassName("cant-art"); //array de cantidad de cada articulo.
  let spanSubtotales = document.getElementsByClassName('subtotal');//array de span con cada subtotal de articulo.
  let subtotalProducts = document.getElementById("subt"); //subtotal
  let radioEnvio = document.getElementsByName("envio"); // array de radio button de los envios.
  
  let total=0;
  
  for (let i=0; i < spanPrecios.length; i++){
    spanSubtotales[i].innerHTML = (parseFloat(spanPrecios[i].innerHTML) * parseFloat(inputCant[i].value)).toFixed(2); 
    total += parseFloat(spanPrecios[i].innerHTML) * parseFloat(inputCant[i].value);
    subtotalProducts.innerHTML = total;
  };

  let costEnvio = 0;

  for (let i=0; i < radioEnvio.length; i++){
    if(radioEnvio[i].checked){
      costEnvio += ((parseFloat(radioEnvio[i].value) / 100) * total);
      document.getElementById("costEnv").innerHTML = "Costo"+" "+" "+ (costEnvio).toFixed(2);
    }
  }
  document.getElementById("total").innerHTML = (total + costEnvio).toFixed(2);

}

function pesOdol(){
  let pesos = document.getElementById("pesos"); // btn
  let dolares = document.getElementById("dolares"); // btn
  let usd = 40;
};


function deleteart(){
  cartInfo.articles.splice(i,1);
  mostrarCarrito(cartInfo);
}




















/********************** NOTAS  ***********************
const monthsinicio = ['Jan', 'March', 'April', 'June'];
monthsinicio.splice(0,1);
console.log(monthsinicio); /*  array ["March", "April", "June"]   


const monthsfinal = ['Jan', 'March', 'April', 'June'];
monthsfinal.splice(-1,1);
console.log(monthsfinal); /*   array ["Jan", "March", "April"]    */ 

