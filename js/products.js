
var prodData = [];

function mostrarProductos(array){
    showSpinner();
    let htmlContentToAppend = "";
     for(let i = 0; i < array.length; i++){
        let product = array[i];
      //  if(product.cost >= minvalue && product.cost <= maxvalue){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                        <p class="mb-1">`+ product.description +`</p>
                        <p class="mb-1">`+ product.currency +` `+ product.cost +`</p>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
    hideSpinner();
}



//*****************************************************************************************************//
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then((resultObj) =>{
        if(resultObj.status === "ok"){
          
            prodData = resultObj.data;
            mostrarProductos(prodData);
        }
    });


	document.getElementById("buscador").addEventListener("keyup",()=>{  //evento buscador
		buscar();
	});

    document.getElementById("AZ").addEventListener("click",()=>{  //evento A-Z
		az();
	});

    document.getElementById("ZA").addEventListener("click",()=>{  //evento Z-A
		za();
	});
    document.getElementById("$asc").addEventListener("click",()=>{  //evento precio ascendente
		precioAsc();
	});

    document.getElementById("$desc").addEventListener("click",()=>{  //evento precio descendente
		precioDesc();
	});

    document.getElementById("min").addEventListener("change",()=>{  //evento min
		min(); //mostrarProductos(prodData);
	});

    document.getElementById("max").addEventListener("change",()=>{  //evento max
		max(); //mostrarProductos(prodData);
	});
});
//**************************************************************************************************//


  //-----------------------función buscador--------------------------
function buscar() {
	var resultbuscador = [];
	var inputTxt = document.getElementById("buscador").value.toUpperCase();
	var resultbuscador = prodData.filter((product)=>{  
		return product.name.toUpperCase().includes(inputTxt);
	});
	mostrarProductos(resultbuscador);
}


//-------------------------- función A-Z ------------------------------
function az(){
    prodData.sort((a,b)=>{
        if (a.name < b.name){
            return -1;
        }
        if (a.name > b.name){
            return 1;
        }else{
            return 0;
        }

    });
    mostrarProductos(prodData);
}


//-------------------------- función Z-A ------------------------------
function za(){
    prodData.sort((a,b)=>{
        if (a.name > b.name){
            return -1;
        }
        if (a.name < b.name){
            return 1;
        }else{
            return 0;
        }

    });
    mostrarProductos(prodData);
}

//--------------------------funcion precioAsc--------------------------
function precioAsc(){
    prodData.sort((a,b)=>{
        return a.cost-b.cost;   
    });
    mostrarProductos(prodData);
}
//--------------------------funcion precioDesc-------------------------
function precioDesc(){
    prodData.sort((a,b)=>{
        return b.cost-a.cost;   
    });
    mostrarProductos(prodData);
}

//--------------------------funciones min-max------------------------------

let minvalue = parseInt(document.getElementById("min").value);
let maxvalue = parseInt(document.getElementById("max").value);


function min2(prodData){
    return prodData >= minvalue
}
function min(){
mostrarProductos(prodData).filter(min);
}


function max(prodData){
    if (product.cost <= maxvalue){
        mostrarProductos(prodData);
    };
};
