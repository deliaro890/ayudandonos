
var cont = 0
var token = 0

token_ = localStorage.getItem("token_")
console.log(token_)

token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)

//urls

var pro_local_dev = "http://localhost:8000/productos/"
var pro_local_prod = "http://localhost:1337/productos/"
var pro_server_dev = "https://107.152.32.237:8000/productos"
var pro_server_prod = "https://dynasty.fit/productos"

var local_dev="http://localhost:8000/compras/"
var local_prod="http://localhost:1337/compras/"
var server_dev="https://107.152.32.237:8000/compras/"
var server_prod="https://dynasty.fit/compras/"

var detail_local_dev = "http://localhost:8000/compra_detail/"
var detail_local_prod = "http://localhost:1337/compra_detail/"
var detail_server_dev = "https://107.152.32.237:8000/compra_detail/"
var detail_server_prod = "https://dynasty.fit/compra_detail/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

var menu_local_dev="http://localhost:8000/menu/"
var menu_local_prod="http://localhost:1337/menu/"
var menu_server_dev="https://107.152.32.237:8000/"
var menu_server_prod="https://dynasty.fit/menu/"

//url_root
var local_dev_root ="http://localhost:8000/"
var local_prod_root ="http://localhost:1337/"
var server_dev_root="https://107.152.32.237:8000/"
var server_prod_root="https://dynasty.fit/"



if(ambiente == 'local'){

    url_login = login_local_dev
    url_list_productos = pro_local_dev
    url_compras = local_dev
    url_detail = detail_local_dev
    url_menu = menu_local_dev

    url_root = local_dev_root

}else if(ambiente == 'server'){

    url_login = login_server_prod
    url_list_productos = pro_server_prod
    url_compras = server_prod
    url_detail = detail_server_prod
    url_menu = menu_server_prod

    url_root = server_prod_root
}

///List products

$.ajax({
        url : url_list_productos,
        headers: {'Authorization': token_final},
        contentType: 'application/json; charset=utf-8',
        success: function (data) { 
            console.log(data)
            console.log(data.length)
            if(data.length>0){
                lista(data)
                var mensaje_error = document.getElementById('compra_error')
                mensaje_error.innerHTML = ''
            }else{
                var mensaje_error = document.getElementById('compra_error')
                mensaje_error.innerHTML = 'no hay productos'
               
            }
            

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

function expiro_token(){
    alert('tu sesión ha expirado o el token es invalido')
    token_final = 0
    localStorage.setItem("token_",0);//rev, esta mien!!
    location.href = url_login
}

    

var list = []
function lista(data){
    list.push(data)
    return list
}

function asign_token(data_token){
    token = data_token
    return token
}


function create_input_producto(cont){
    var div = document.createElement('hr')
    div.className='division'
    var input_producto_label = document.createElement("label");
    input_producto_label.innerHTML = 'Producto'
    input_producto_label.className = 'mt-3'
    console.log(list[0][1]['id'])
    console.log(list[0])
    lista = []

    for(var a=0;a<list[0].length;a++){
        elemento =  '<option value='+list[0][a]['id']+'">'+
        //list[0][a]['id']+'-'+
        list[0][a]['nombre']+'-'+
        '$'+list[0][a]['precio']+'-'+
        list[0][a]['puntos_producto']+
        '</option>'

        lista.push(elemento)
    }
    
    var input_producto = document.createElement("select");
    input_producto.setAttribute('id','producto_'+cont);
    input_producto.className = 'form-control col-8';
    input_producto.innerHTML=
        '<select>'+
        '<option selected value="zero">Selecciona</option>'+
        lista+        
        '</select>'

    var contenedor = document.getElementById("carrito");
    contenedor.appendChild(div);
    contenedor.appendChild(input_producto_label);
    contenedor.appendChild(input_producto);

}

function create_input_cantidad(cont){

    var input_cantidad = document.createElement("input");
    input_cantidad.setAttribute('id','cantidad_'+cont)
    input_cantidad.className = 'form-control col-8'
    input_cantidad.setAttribute('type','number')
    input_cantidad.value = '0'
    input_cantidad.min='0'

    var input_cantidad_label = document.createElement("label");
    input_cantidad_label.innerHTML = 'Cantidad'
    input_cantidad_label.className = 'mt-1'

    var contenedor = document.getElementById("carrito");
    contenedor.appendChild(input_cantidad_label);
    contenedor.appendChild(input_cantidad);

}



$("#boton_mas").click(function () {

    create_input_producto(cont)
    create_input_cantidad(cont)
    cont=cont+1
})


$("#boton").click(function () {
   
    var socio_name = document.getElementById('socio_name').value
   
    var fecha = document.getElementById('date').value

    if(socio_name==''){
        mensaje = 'debes escribir un socio'
        document.getElementById('socio_name_error').innerHTML = mensaje
    }
    else{

        socio_uiid = socio_name.split('-')[1]
        socio_uiid = parseInt(socio_uiid)
        
        array_productos_cantidades = []
        datos = []
        for(i=0; i<cont;i++){
            producto = document.getElementById('producto_'+i).value
            cantidad = document.getElementById('cantidad_'+i).value
            elementos = []
            if(producto!='zero' && cantidad!=0){
                producto_id = parseInt(producto)
                cantidad = parseInt(cantidad)
                elementos.push(producto_id)
                elementos.push(cantidad)
                array_productos_cantidades.push(elementos)

                if(fecha!=''){
                    dato = {
                        "socio":socio_uiid,
                        "producto":producto_id,
                        "cantidad":cantidad,
                        "fecha_compra":fecha
                    }

                }else{
                    dato = {
                        "socio":socio_uiid,
                        "producto":producto_id,
                        "cantidad":cantidad
                    }

                }
                
                datos.push(dato)
            }
    
        }
      
        console.log(datos)
        //alert(datos)
        $.ajax({
            url : url_compras,
            type: "Post",
            headers: {'Authorization': token_final},
            data: JSON.stringify(datos),
            contentType: 'application/json; charset=utf-8',
            success: function (data) { 
                if(data.length==0){
                    //alert('debe elegir algún producto')
                    var mensaje_error = document.getElementById('compra_error')
                    mensaje_error.innerHTML = 'debe agregar algún producto'
                }
                console.log(data)
                var carrito = data[0]["carrito_code"]
                console.log(data)
                location.href = url_detail+carrito
                 
            },
            ///aca no nec la function de setear el token a 0 y enviar al login, porque ya lo hace el ajax de list_products
            //error 403 forbidden: user sin permiso :v
            error: function (xhr, status, errorThrown) { 
                
                var status = xhr.status
                console.log(status+', '+xhr.responseText)
                
                if(status==400){
                    alert('el socio no existe')
                }
                else if(status==403){

                    alert('usted no tiene permiso para realizar está acción :p')
                    location.href = url_menu
            
                }else{
                    alert('ha ocurrido un error')
                }

            }
                
        });
                     
    }   
    
});

//btn_ver_compra
function ver_compra(){
  
//$("#btn_ver_compra").click(function () {
    var socio_name = document.getElementById('socio_name').value
    var mensaje = document.getElementById('socio_name_error')
    
    var date_i = document.getElementById('date_i').value
    var date_f = document.getElementById('date_f').value

    var mensaje_d_i = document.getElementById('date_i_error')
    var mensaje_d_f = document.getElementById('date_f_error')

    var edit = document.getElementById('edit').value

    send_name(socio_name,mensaje,'compras_period/',date_i,mensaje_d_i,date_f,mensaje_d_f,edit) //compras_period/<str:date>
}
//)

band_clic = false

function send_name(socio_name,mensaje,_url,date_i,mensaje_d_i,date_f,mensaje_d_f,edit){
    
    var msj = document.getElementById('msj')

    if(socio_name==''){
        mensaje.innerHTML='debe escribir un socio'
    }else if(date_i==''){
        //alert('fecha vacia')
        mensaje_d_i.innerHTML='debe elegir una fecha de inicio'
    }else if(date_f==''){
        //alert('fecha vacia')
        mensaje_d_f.innerHTML='debe elegir una fecha de final'
    }else if(date_f<date_i){ //funciono!._.
        //alert('la fecha final debe ser mayor que la inicial')
        msj.innerHTML = 'la fecha final debe ser mayor que la inicial'
    }else{

        msj.innerHTML =' '
        socio_uiid = socio_name.split('-')[1]
        if(socio_uiid === undefined || typeof socio_uiid === 'undefined'){

            mensaje.innerHTML='El socio no existe'
            //location.href = url_root+_url

        }else{

            band_clic = true //es true cuando un se verificó un input!, esta var es global y false 
            limpiar_datos()
            //alert(band_clic)
           
            socio_uiid = parseInt(socio_uiid)
            //location.href = url_root+_url+socio_uiid+'/'+date//no se ocupa ajax porque es una peticion get! y no manda mas nada
            //mejor ajax para recibir la respuesta en el mismo html
            $.ajax({
                url:url_root+_url+socio_uiid+'/'+date_i+'/'+date_f,
                contentType: 'application/json; charset=utf-8',
                success: function (data) { //, xhr, status en el succes no los agarra
                    console.log(data)
                    if(data.length==0){
                        //alert('no hubo compras en esas fechas')
                        msj.innerHTML = 'no hubo compras en esas fechas'
                    }else{
                        msj.innerHTML = ' '
                        for(a in data){
                        
                            //pintando los resultados en el mismo form
                            var container_div = document.getElementById('div_compras')
                            var divis = document.createElement('div')
                            divis.className='pat_div'

                            var p_0 = document.createElement('p')
                            p_0.innerHTML='Id: '+data[a][7]
                            p_0.setAttribute('id','compra_id_'+data[a][7])
                         
                            var p = document.createElement('p')
                            p.innerHTML='Fecha: '+data[a][1]
                            var p_2 = document.createElement('p')
                            p_2.innerHTML='Producto: '+data[a][5]
                            var p_3 = document.createElement('p')
                            p_3.innerHTML='Cantidad: '+data[a][4]
                            var p_4 = document.createElement('p')
                            p_4.innerHTML='Puntos: '+data[a][3]
                            var p_5 = document.createElement('p')
                            p_5.innerHTML='Precio: '+data[a][2]

                            if(edit=='can_edit'){
                                //var p_6 = document.createElement('p')
                                //p_6.innerHTML='Active?: '+data[a][6]
                                var label = document.createElement('label')
                                label.setAttribute('id','label_compra'+data[a][7])
                                label.className='desactivar_compra'
                                var desactivar = document.createElement('input')
                                desactivar.type = "checkbox";
                                desactivar.setAttribute('id','compra_'+data[a][7])
                                //desactivar.value = 'compra-'+data[a][7]
                                desactivar.setAttribute('onclick','arreglo_compras('+data[a][7]+')')

                                
                                if(data[a][6]==true){

                                    label.innerHTML='desactivar compra'
                                    //desactivar.setAttribute('onclick','desactivar_compra("'+data[a][7])+'")');
                                    /* desactivar.addEventListener("click", function(){
                                        alert('jojo'+desactivar.value)
                                        arreglo_compras_des(desactivar.value)
                                }) */

                                }else{

                                    label.innerHTML='activar compra'
                                    //desactivar.setAttribute('onclick', 'activar_compra( " '+data[a][7]+' " )');

                                }

                                divis.appendChild(label)
                                divis.appendChild(desactivar)

                            }//else?
                            
                            

                            divis.appendChild(p_0)
                            divis.appendChild(p)
                            divis.appendChild(p_2)
                            divis.appendChild(p_3)
                            divis.appendChild(p_4)
                            divis.appendChild(p_5)
                            
                            var div_s=document.getElementById('div_compras')
                            div_s.appendChild(divis)
                        }


                    }

                    
                    
                },
                error: function (xhr, status, errorThrown){ 
                    alert('error!')
                    var status = xhr.status
                    console.log(status+', '+xhr.responseText)
                }
                

            })
        }
    }
}

function limpiar_datos(){
    //alert(band_clic)
    if(band_clic){
        var c_1 = $("#div_compras")
        c_1.empty()
    }
}

arreglo_c = []

function arreglo_compras(compra){
    //alert(compra)
    
    var ch = document.getElementById('compra_'+compra)
    if (ch.checked){ //claveee!!!
        //alert(compra)
        arreglo_c.push(compra)
    }else{
        var i = arreglo_c.indexOf(compra)
        alert(i)
        arreglo_c.splice(i,1)
    }
    
}

function desactivar(){
    alert('estas compras se editarán: '+arreglo_c)
    var msj_result = document.getElementById('msj_result')

    for(a in arreglo_c){
      
        //alert(typeof(arreglo_c[a]))//-->string
        b = parseInt(arreglo_c[a])
        $.ajax({
            url:url_root+'compras/'+b+'/',
            type: 'DELETE',
            headers: {'Authorization': token_final},
                data: JSON.stringify(arreglo_c),
                contentType: 'application/json; charset=utf-8',
                success: function (data) { 
                    console.log(data)
                    msj_result.innerHTML='compras editadas (activadas o desactiavadas) con éxito'
                              
                },
                
                error: function (xhr, status, errorThrown) { 
            
                    var status = xhr.status
                    console.log(status+', '+xhr.responseText)
                
                    if(status==401){    
                        expiro_token()
            
                    }else if(status==404){
                        alert('compra no encontrada')

                    }else if(status==403){

                        alert('usted no tiene permiso para realizar está acción :p')
                        location.href = url_menu
                    
                    }else{
                        //alert('ha ocurrido un error ._.')
                        msj_result.innerHTML='ha ocurrido un error'
                    }
                }
    
        })

    }

    
}

$("#mensualidad").click(function () {
   
    var socio_name = document.getElementById('socio_name').value
    var socio_uiid_field = document.getElementById('socio_uiid').value

    producto_id = 22
    datos = []

    if(socio_name==''&&socio_uiid_field==''){
        mensaje = 'debes escribir un socio'
        document.getElementById('message').innerHTML = mensaje
    }
    else{

        if(socio_name!=''&&socio_uiid_field==''){
            socio_uiid = socio_name.split('-')[1]
            socio_uiid = parseInt(socio_uiid)

        }else if(socio_uiid_field!=''&&socio_name==''){
            socio_uiid = parseInt(socio_uiid_field)
        }else if(socio_uiid_field!=''&&socio_name!=''){
            socio_uiid = socio_name.split('-')[1]
            socio_uiid = parseInt(socio_uiid)

        }

        dato = {
            "socio":socio_uiid,
            "producto":producto_id,
            "cantidad":1
        }
        datos.push(dato)
    
        $.ajax({
            url : url_compras,
            type: "Post",
            headers: {'Authorization': token_final},
            data: JSON.stringify(datos),
            contentType: 'application/json; charset=utf-8',
            success: function (data) { 

                console.log(data)
                var carrito = data[0]["carrito_code"]
                console.log(data)
                location.href = url_detail+carrito
                 
            },
            ///aca no nec la function de setear el token a 0 y enviar al login, porque ya lo hace el ajax de list_products
            //error 403 forbidden: user sin permiso :v
            error: function (xhr, status, errorThrown) { 
                
                var status = xhr.status
                console.log(status+', '+xhr.responseText)
                
                if(status==400){
                    alert('el socio no existe')
                }
                else if(status==403){

                    alert('usted no tiene permiso para realizar está acción :p')
                    location.href = url_menu
            
                }else{
                    alert('ha ocurrido un error')
                }

            }
                
        });
                     
    }   
    
});



   
