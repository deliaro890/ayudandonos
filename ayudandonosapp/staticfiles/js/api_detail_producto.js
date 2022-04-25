
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

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

//ambiente
if(ambiente == 'local'){

  url_productos = local_dev
  url_login = login_local_dev

}else if(ambiente == 'server'){

  url_productos = server_prod
  url_login = login_server_prod
}

//



//antes de guardar el token el localStorage: obteniendo token:poner datos de un user root!!, el password desde un input lo entrega hasheado!!

var idProducto = document.getElementById('idProducto').value

$.ajax({
  url: url_productos+idProducto,
  //url: local_prod+idProducto,
  //url: server_dev+idProducto,
  //url: server_prod+idProducto,
  headers: {'Authorization': token_final},
  contentType: 'application/json; charset=utf-8',
  success: function (data) { 
               
    var name = document.getElementById('name')
    name.innerHTML = 'Nombre: '+data['nombre']
    var puntos = document.getElementById('puntos')
    puntos.innerHTML = 'Puntos: '+data['puntos_producto']
    var precio = document.getElementById('precio')
    precio.innerHTML = 'Precio: '+data['precio']
    var descripcion = document.getElementById('descripcion')
    descripcion.innerHTML = 'Descripción: '+data['description']
              
  },
  error: function () { 
    expiro_token()
  }
}); 

function expiro_token(){
  alert('tu sesión ha expirado D:')
  token_final = 0
  location.href = url_login
  //location.href = login_local_prod
  //location.href = login_server_dev
  //location.href = login_server_prod
}
 
