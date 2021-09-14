
var prodData = [];

function mostrarProductos(array){
    showSpinner();
    let htmlContentToAppend = "";
     for(let product of array){

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
        </a>
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

    document.getElementById("relevancia").addEventListener("click",()=>{  //evento mayor relevancia
		relevancia();
	});

    document.getElementById("min").addEventListener("change",()=>{  //evento min al usar flechas
		min();
	});

    document.getElementById("min").addEventListener("keyup",()=>{  //evento min al escribir
		min();
	});

    document.getElementById("max").addEventListener("change",()=>{  //evento max al usar flechas
		max();
	});

    document.getElementById("max").addEventListener("keyup",()=>{  //evento max al escribir
		max();
	});


});
//**************************************************************************************************//


  //-----------------------función BUSCADOR--------------------------
function buscar() {
	var resultbuscador = [];
	var inputTxt = document.getElementById("buscador").value.toUpperCase();
	var resultbuscador = prodData.filter((product)=>{  
		return product.name.toUpperCase().includes(inputTxt);
	});
	mostrarProductos(resultbuscador);
}


//-------------------------- ordenar por NOMBRE ------------------------------
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
//---------------
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

//--------------------------ordenar por PRECIO y RELEVANCIA--------------------------
function precioAsc(){
    prodData.sort((a,b)=>{
        return a.cost-b.cost;   
    });
    mostrarProductos(prodData);
}
//--------------------------
function precioDesc(){
    prodData.sort((a,b)=>{
        return b.cost-a.cost;   
    });
    mostrarProductos(prodData);
}
//--------------------------
function relevancia(){
    prodData.sort((a,b)=>{
        return b.soldCount-a.soldCount;   
    });
    mostrarProductos(prodData);
}
//-------------------------------FILTRAR por U$D------------------------------------


function min(){
    let maxvalue = parseInt(document.getElementById("max").value);

    let minvalue = parseInt(document.getElementById("min").value);
	let filtrado = prodData.filter((product)=>{  
		return product.cost >= minvalue && product.cost <= maxvalue;
	});
	mostrarProductos(filtrado);
};
//---------------------
function max(){
    let minvalue = parseInt(document.getElementById("min").value);

    let maxvalue = parseInt(document.getElementById("max").value);
    let filtrado = prodData.filter((product)=>{
        return product.cost <= maxvalue && product.cost >= minvalue;
    });
    mostrarProductos(filtrado);
};
//----------------------
function limpiar(){
    document.getElementById("min").value= "";
    document.getElementById("max").value= "";
    mostrarProductos(prodData);
}
