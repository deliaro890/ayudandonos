/* $("#elegir").click(function () {
    var producto = document.getElementById('producto').value
    //location.href="http://localhost:8000/productos/producto_edit/"

}) */

//token
token_ = localStorage.getItem("token_")
console.log(token_)
token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)


//urls
var local_dev="http://localhost:8000/productos/"
var local_prod="http://localhost:1337/productos/"
var server_dev="https://107.152.32.237:8000/productos/"
var server_prod="https://dynasty.fit/productos/"

var menu_local_dev="http://localhost:8000/menu/"
var menu_local_prod="http://localhost:1337/menu/"
var menu_server_dev="https://107.152.32.237:8000/menu/"
var menu_server_prod="https://dynasty.fit/menu/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

//ambiente
if(ambiente == 'local'){

    url_productos = local_dev
    url_menu = menu_local_dev
    url_login = login_local_dev
  
}else if(ambiente == 'server'){
  
    url_productos = server_prod
    url_menu = menu_server_prod
    url_login = login_server_prod
}
//

$("#boton").click(function () {
//function patch(){
    var idProducto = document.getElementById('idProducto').value
    var nombre = document.getElementById('nombre').value
    var puntos = document.getElementById('puntos').value
    var precio = document.getElementById('precio').value
    var descripcion = document.getElementById('descripcion').value
    var estado = document.getElementById('desactivar').checked
    precio = parseFloat(precio)
    console.log(precio)
    puntos = parseInt(puntos)
    if(estado){
        estado=false
    }else{
        estado=true
    }

    console.log(estado)
    console.log(nombre)
    datos = {
        'nombre':nombre,
        'precio':precio,
        'puntos_producto':puntos,
        'description':descripcion,
        'is_active':estado
    }
    console.log(datos)

    
    $.ajax({
        url: url_productos+idProducto+'/',
        //url: local_prod+idProducto,
        //url: server_dev+idProducto,
        //url: server_prod+idProducto,
        type: 'Patch',
        headers: {'Authorization': token_final},
        data: JSON.stringify(datos),
        contentType: 'application/json; charset=utf-8',
        success: function (data) { 
            alert('Producto actualizado con éxito!')
            location.href = url_menu
            //location.href = menu_local_prod
            //location.href = menu_server_dev
            //location.href = menu_server_prod        
        },
        error: function () { 
            expiro_token()
        }
    }); 
     
})


function expiro_token(){
    alert('tu sesión ha expirado D:')
    token_final = 0
    location.href = url_login
    //location.href = login_local_prod
    //location.href = login_server_dev
    //location.href = login_server_prod
}
