//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then((resultObj) =>{
        if(resultObj.status === "ok"){
          
            cartInfo = resultObj.data;
            mostrarCarrito(cartInfo);
        }
    });
});
 

var cartInfo = {};

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
                          <input type="number" value="`+ item.count +`" style="width:40px" class="sinfoco cant-art text-center border-top-0 border-left-0 border-right-0">
                          </label>
                        </div>
                    </div>
                    <div class="col-2 mt-4">
                      <p><b>Subtotal: </b> `+ " " + item.currency + `</p>
                    </div>
                    <div class="col-1 mt-4">
                      <button title="Eliminar artículo" onclick="deleteArt();" class="btn btn-sm border-0 btn-outline-secondary"><i class="fa fa-trash-alt light"></i></button>
                    </div>
                    `

        document.getElementById("cart").innerHTML=cartHTML;
    };
};

const cantArt = document.getElementsByClassName("cant-art");

for (let art of cantArt){
    art.addEventListener("change",(event)=>{
      // let cost = event.target.dataset.cost;
      // let cant = event.target.value;
      // console.log(cost * cant);
      console.log(event.target.value);
    });
};


function deleteArt(art){
    cartInfo.articles.splice(art,-1,);
    mostrarCarrito(cartInfo);
}