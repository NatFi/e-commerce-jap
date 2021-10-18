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
                     <p><b>Precio unitario: </b> `+ " " + item.currency + " " + item.unitCost +`</p>
                    </div>
                    <div class="col-2 mt-4">
                        <div class="row">
                          <label for="cant" class="float-right"> Cantidad:
                          <input data-cost="`+ item.unitCost +`" type="number" min="1" onchange="contador();" value="`+ item.count +`" style="width:40px" class="cant-art sinfoco text-center border-top-0 border-left-0 border-right-0">
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
};



function contador(){

  let inputCant = document.getElementsByClassName("cant-art");  // cantidad del articulo
  //console.log(inputCant);
  
  for (let elem of inputCant){

    let cost = event.target.dataset.cost;  
    let cant = event.target.value;
    //console.log(event.target.value);
  
    console.log(cost*cant);
    let resultTotal = cost*cant;

    let arraySpans = document.getElementsByClassName("subtotal");  // escribir los subtotales de cada art
    for (let span of arraySpans) {
     span.innerHTML= resultTotal;
    };
    
  };
};













//en proceso xD
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

