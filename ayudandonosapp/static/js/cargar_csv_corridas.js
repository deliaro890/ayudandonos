
//token
token_ = localStorage.getItem("token_")
console.log(token_)
token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)

//url_root
var local_dev_root ="http://localhost:8000/"
var local_prod_root ="http://localhost:1337/"
var server_dev_root="https://107.152.32.237:8000/"
var server_prod_root="https://dynasty.fit/"

console.log('parametros')

//ambiente
if(ambiente == 'local'){

    url_root = local_dev_root
  
}else if(ambiente == 'server'){
  
    url_root = server_prod_root
}

$("#products").click(function () {

    var csrf = document.getElementById('csrf').value
    var mensaje = document.getElementById('mensaje')
    
    $.ajax({
        

        url: url_root+'cargar_csv_productos/',
        headers:{'X-CSRFToken': csrf},
        method:'POST',
        contentType: 'application/json; charset=utf-8',
       
        success: function (data) {
            console.log('success!')
            console.log(data)
            mensaje.innerHTML='productos cargados con éxito'
        },
        error: function (xhr, status, errorThrown) { 
                
            var status = xhr.status
            console.log(status+', '+xhr.responseText)
        }
    
    })
})


$("#socios").click(function () {

    var csrf = document.getElementById('csrf').value
    var mensaje = document.getElementById('mensaje_s')
  
    $.ajax({
        

        url: url_root+'cargar_csv_socios/',
        headers:{'X-CSRFToken': csrf},
        method:'POST',
        contentType: 'application/json; charset=utf-8',
       
        success: function (data) {
            console.log('success!')
            console.log(data)
            mensaje.innerHTML='socios cargados con éxito'
        },
        error: function (xhr, status, errorThrown) { 
                
            var status = xhr.status
            console.log(status+', '+xhr.responseText)
        }
    
    })
})

//no pude asi, lo submitee directamente a un for de django
$("#corrida").click(function () {

    var csrf = document.getElementById('csrf').value

    var fecha = document.getElementById('date').value

    dato = {
        "fecha":fecha
    }

    //alert(fecha)
 
    
    $.ajax({
        

        url: 'http://localhost:8000/corrida_compras/',
        headers:{'X-CSRFToken': csrf},
        method:'POST',
        contentType: 'application/json; charset=utf-8',
        //data: JSON.stringify(fecha),
        // data: {
        //     'fecha': fecha
        // },
        // dataType: 'json',
        data: {'hola':'hola'},
       
        success: function (data) {
            console.log('success!')
            console.log(data)
        },
        error: function (xhr, status, errorThrown) { 
                
            var status = xhr.status
            console.log(status+', '+xhr.responseText)
        }
    
    })
})