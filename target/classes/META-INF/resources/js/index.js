/*Declaracion de variables*/
const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems, {});
const elemsSelect = document.querySelectorAll('select');
const instancesSelect = M.FormSelect.init(elemsSelect, {});
const btnPrecioModal1 = document.getElementById("precioProducto");
const btnPrecioModal2 = document.getElementById("txtNumber");

/* Declaracion de Eventos */
btnPrecioModal1.onkeydown = prevenirNegativo;
btnPrecioModal1.onkeypress = dosDecimales;
btnPrecioModal2.onkeydown = prevenirNegativo;
btnPrecioModal2.onkeypress = dosDecimales;

/* Creacion de metodos */
function listarProducto(){
	let url = "/getProductos";
	fetch(url)
	.then(response => response.json())
	.then((data) => {
		let dataTable = "";
		data.map((producto) =>{
			dataTable+= `<tr>
					<td hidden>${producto.id}</td>
					<td>${producto.nombre}</td>
					<td>${producto.marca}</td>
					<td>${producto.origen}</td>
					<td>${producto.precio}</td>
					<td>
					<a class="waves-effect waves-light btn modal-trigger" data-id=${producto.id} href="#modal1" onclick="editarProducto(this)" id="btnEditar" th:text="#{boton.editar}"><i class="material-icons left">create</i></a>
					&nbsp;&nbsp;&nbsp;
					<a class="waves-effect waves-light btn" data-id=${producto.id} onclick="eliminarProducto(this)" id="btnEliminar" th:text="#{boton.eliminar}"><i class="material-icons left">delete</i></a>
					</td>
					</tr>`;})
					document.getElementById("tblProductos").innerHTML = dataTable;
	}); 
}

function marcaProducto(){
	if(document.getElementById("txtMarca").value != ""){
		let url = "/getProductosByMarca/" + document.getElementById("txtMarca").value;
		fetch(url)
		.then(response => response.json())
		.then((data) => {
			let dataTable = "";
			data.map((producto) =>{
				dataTable+= `<tr>
						<td hidden>${producto.id}</td>
						<td>${producto.nombre}</td>
						<td>${producto.marca}</td>
						<td>${producto.origen}</td>
						<td>${producto.precio}</td>
						<td>
						<a class="waves-effect waves-light btn modal-trigger" data-id=${producto.id} href="#modal1" onclick="editarProducto(this)" id="btnEditar"><i class="material-icons left">create</i>Editar</a>
						&nbsp;&nbsp;&nbsp;
						<a class="waves-effect waves-light btn" data-id=${producto.id} onclick="eliminarProducto(this)" id="btnEliminar"><i class="material-icons left">delete</i>Eliminar</a>
						</td>
						</tr>`;})
						document.getElementById("tblProductos").innerHTML = dataTable;
		});
		
		document.getElementById("btnCerrarModalMarca").click();
		document.getElementById("txtMarca").value = "";
	}else{
		 M.toast({html: 'Complete el formulario', classes: 'red'})
	}
}

function precioProducto(){
	if(document.getElementById("txtNumber").value != ""){
		let url = "/getProductosByPrecio/" + document.getElementById("txtNumber").value;
		fetch(url)
		.then(response => response.json())
		.then((data) => {
			let dataTable = "";
			data.map((producto) =>{
				dataTable+= `<tr>
						<td hidden>${producto.id}</td>
						<td>${producto.nombre}</td>
						<td>${producto.marca}</td>
						<td>${producto.origen}</td>
						<td>${producto.precio}</td>
						<td>
						<a class="waves-effect waves-light btn modal-trigger" data-id=${producto.id} href="#modal1" onclick="editarProducto(this)" id="btnEditar"><i class="material-icons left">create</i>Editar</a>
						&nbsp;&nbsp;&nbsp;
						<a class="waves-effect waves-light btn" data-id=${producto.id} onclick="eliminarProducto(this)" id="btnEliminar"><i class="material-icons left">delete</i>Eliminar</a>
						</td>
						</tr>`;})
						document.getElementById("tblProductos").innerHTML = dataTable;
		});
		
		document.getElementById("btnCerrarModalPrecio").click();
		document.getElementById("txtNumber").value = "";	
	}else{
		M.toast({html: 'Complete el formulario', classes: 'red'})
	}
}

function eliminarProducto(button){
 let url = "/delete/" + button.dataset.id;
 fetch(url, {
	  method: 'DELETE'
	})
	.then(function(response) {
		  if(response.ok) {
			  listarProducto();
			  } else {
			    console.log('Respuesta de red OK pero respuesta HTTP no OK');
			  }
	}) 
}

function editarProducto(button){
		 let url = "/edit/" + button.dataset.id;
		 fetch(url, {
			  method: 'PUT'
			})
			.then(response => response.json())
			.then((data) => {
				document.getElementById("idProducto").value = data.id;
				document.getElementById("nombreProducto").value = data.nombre;
				document.getElementById("marcaProducto").value = data.marca;
				document.getElementById("origenProducto").value = data.origen;
				document.getElementById("precioProducto").value = data.precio;
			});
		 
		 $("label[for='nombreProducto']").addClass("active");
		 $("label[for='marcaProducto']").addClass("active");
		 $("label[for='origenProducto']").addClass("active");
		 $("label[for='precioProducto']").addClass("active");
}

function guardarProducto(){
	if(validarForm()){
		let form = {
				id: parseInt(document.getElementById('idProducto').value),
				nombre: document.getElementById('nombreProducto').value ,
				marca: document.getElementById('marcaProducto').value ,
				origen: document.getElementById('origenProducto').value,
				precio: parseFloat(document.getElementById('precioProducto').value)
		}
		 let data = JSON.stringify(form);
		 let url = "/save";
		 fetch(url, {
			  method: 'PUT',
			  body: data,
			    headers: {
			        'Content-Type': 'application/json'
			      },
			})
			.then(function(response) {
				  if(response.ok) {
					  listarProducto();
					  document.getElementById('btnCerrarModal').click();
					  limpiarModal();
					  } else {
					    console.log('Respuesta de red OK pero respuesta HTTP no OK');
					  }
			}) 
	}else{
		M.toast({html: 'Complete el formulario', classes: 'red'})
	}
}

function limpiarModal(){
	document.getElementById("productoForm").reset();
}

function validarForm(){
	let isValid = true;
	if(	document.getElementById('nombreProducto').value == "" ||
			document.getElementById('marcaProducto').value == "" ||
			document.getElementById('origenProducto').value == "" ||
			document.getElementById('precioProducto').value == ""){
		
		isValid = false;
	}
	return isValid;
}

function prevenirNegativo(e) {
    if(e.keyCode === 189 
    		|| e.keyCode == 109 
    		|| e.keyCode == 69 ){
    	 return false;
    }
}

function dosDecimales(e) {
  let valor = this.value;
  if(valor.includes(".")){
	  let data = valor.split(".");
	  if(data.length > 1 && data[1].length > 1){
		  return false;
	  }
  }
}

function cambiarIdioma() {
	let selectedOption = document.getElementById('slcIdioma').value;
	if (selectedOption != ''){
		window.location.replace('index?lang=' + selectedOption);
	}
}

/* Llamada de metodos iniciales */
listarProducto();

