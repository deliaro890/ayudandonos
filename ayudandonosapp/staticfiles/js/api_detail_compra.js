//token
token_ = localStorage.getItem("token_")
console.log(token_)

token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)


//urls
var local_dev="http://localhost:8000/tickets/"
var local_prod="http://localhost:1337/tickets/"
var server_dev="https://107.152.32.237:8000/tickets/"
var server_prod="https://dynasty.fit/tickets/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

var root_local_dev="http://localhost:8000/"
var root_local_prod="http://localhost:1337/"
var root_server_dev="https://107.152.32.237:8000/"
var root_server_prod="https://dynasty.fit/"

//ambiente
if(ambiente == 'local'){

  url_tickets = local_dev
  url_login = login_local_dev
  url_root = root_local_dev

}else if(ambiente == 'server'){

  url_tickets = server_prod
  url_login = login_server_prod
  url_root = root_server_prod
}
//

//obteniendo token:poner datos de un user root!!, el password desde un input lo entrega hasheado!!
var carrito = document.getElementById('carrito').value

        
  $.ajax({
    url: url_tickets+carrito,
    headers: {'Authorization': token_final},
    contentType: 'application/json; charset=utf-8',
    success: function (data) { 
               
      var socio = document.getElementById('socio')
      socio.innerHTML = 'Compra exitosa del socio: '+data['item_compras'][0]['socio']
      var date = document.getElementById('date')
      date.innerHTML = 'Fecha de compra: '+data['item_compras'][0]['fecha_compra']

      for (a in data['item_compras']){
        var div = document.createElement("hr")
        var producto = document.createElement("p");
        nombre = nombre_producto(data,producto)
      
        var cantidad = document.createElement("p");
        cantidad.innerHTML='Cantidad: '+data['item_compras'][a]['cantidad']
        var importe = document.createElement("p");
        importe.innerHTML='Importe: '+data['item_compras'][a]['importe']
        var puntos = document.createElement("p");
        puntos.innerHTML='Puntos: '+data['item_compras'][a]['puntos_compra']

        var contenedor = document.getElementById("contenedor");
        contenedor.appendChild(div);
        contenedor.appendChild(producto);
                    
        contenedor.appendChild(cantidad);
        contenedor.appendChild(importe);
        contenedor.appendChild(puntos);
                    
      }
      var importe_total= document.getElementById('importe_total')
      importe_total.innerHTML = 'Importe Total: '+data['ticket']['importe_total']
      var puntos_totales = document.getElementById('puntos_totales')
      puntos_totales.innerHTML = 'Puntos Totales: '+data['ticket']['puntos_totales']   
    },//fin-success
    error: function (xhr, status, errorThrown){ 
      var status = xhr.status
      console.log(status+', '+xhr.responseText)

      if(status==401){    
        expiro_token()

      }else if(status==404){
          alert('compra no encontrada')

      }else if(status==403){

          alert('usted no tiene permiso para realizar está acción')
          location.href = url_menu
      
      }else{
          alert('ha ocurrido un error')
          //msj_result.innerHTML='ha ocurrido un error'
      }
    }
  });//fin-ajax

function expiro_token(){
    alert('tu sesión ha expirado')
    token_final = 0
    location.href = url_login
}

function nombre_producto(data,producto){

  $.ajax({
    url : url_root+'productos/'+data['item_compras'][a]['producto'], //retrieve a product
    headers: {'Authorization': token_final},
    contentType: 'application/json; charset=utf-8',
    success: function (data) { 
      nombre = data.nombre
      producto.innerHTML='Producto: '+nombre
    },
    error: function (xhr, status, errorThrown) { 
        var status = xhr.status
        console.log(status+', '+xhr.responseText)
        if(status==401){
            expiro_token()
        }else{
            alert('ha ocurrido un error')
        }
    }
  });

  


}
        
 