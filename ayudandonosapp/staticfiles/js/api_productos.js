var boton = document.getElementById('boton')

//urls
var local_dev="http://localhost:8000/productos/"
var local_prod="http://localhost:1337/productos/"
var server_dev="https://107.152.32.237:8000/productos/"
var server_prod="https://dynasty.fit/productos/"

var detail_local_dev = "http://localhost:8000/producto_detail/"
var detail_local_prod = "http://localhost:1337/producto_detail/"
var detail_server_dev = "https://107.152.32.237:8000/producto_detail/"
var detail_server_prod = "https://dynasty.fit/producto_detail/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

//token
token_ = localStorage.getItem("token_")
console.log(token_)
token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)

//ambiente ---aca :
if(ambiente == 'local'){

    url_productos = local_dev
    url_detalle = detail_local_dev
    url_login = login_local_dev
  
}else if(ambiente == 'server'){
  
    url_productos = server_prod
    url_detalle = detail_server_prod
    url_login = login_server_prod
}
//

boton.addEventListener('click',register)

function register(){

    var nombre = document.getElementById('nombre').value
    //var slug_name = document.getElementById('slug_name').value
    var puntos = document.getElementById('puntos').value
    var precio = document.getElementById('precio').value
    var descripcion = document.getElementById('descripcion').value
    var size = document.getElementById('size').value
    var impuesto = document.getElementById('impuesto').value
    console.log(nombre)
    console.log(typeof(puntos))
    if(nombre == ''){
        mensaje='Debes poner un nombre al producto'
        document.getElementById('nombre_error').innerHTML = mensaje
    }else if(puntos ==''){
        mensaje='Debes poner puntos'
        document.getElementById('puntos_error').innerHTML = mensaje

    }else if(precio ==''){
        mensaje='Debes poner precio'
        document.getElementById('precio_error').innerHTML = mensaje

    }else{

        //precio = parseFloat(precio)
        //puntos = parseInt(puntos)
        console.log(typeof(puntos))
        datos = {
            "nombre": nombre,
            "precio": precio,
            "puntos_producto":puntos,
            "description":descripcion,
            "size":size,
            "impuesto":impuesto
        }
        console.log(datos)
       
        console.log(typeof(datos['nombre']))
        //alert(token_final)
        console.log(token_final)
        $.ajax({
            url: url_productos,
            //url: local_prod,
            //url: server_dev,
            //url: server_prod,
            type: "Post",
            headers: {'Authorization': token_final},
            data: JSON.stringify(datos),
            contentType: 'application/json; charset=utf-8',
            success: function (data) { 
                       
                console.log(data)
                var idProducto = data["id"]
                location.href=url_detalle+idProducto;
                //location.href=detail_local_prod+idProducto;
                //location.href=detail_server_dev+idProducto;
                //location.href=detail_server_prod+idProducto;
                      
            }, //fin-success
            error: function (xhr, status, errorThrown) { 
                expiro_token()() 
                
                    /*var status = xhr.status
                    console.log(status)
                    alert(xhr.responseText)
                    location.href = url_login*/
            }
        });//fin-ajax
            

    }
}

function expiro_token(){
    alert('tu sesión ha expirado D:')
    token_final = 0
    location.href = url_login
    //location.href = login_local_prod
    //location.href = login_server_dev
    //location.href = login_server_prod
}