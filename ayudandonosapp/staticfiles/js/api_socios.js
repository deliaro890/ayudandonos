//url_root
var local_dev_root ="http://localhost:8000/"
var local_prod_root ="http://localhost:1337/"
var server_dev_root="https://107.152.32.237:8000/"
var server_prod_root="https://dynasty.fit/"

var local_dev="http://localhost:8000/socios/"
var local_prod="http://localhost:1337/socios/"
var server_dev="https://107.152.32.237:8000/socios/"
var server_prod="https://dynasty.fit/socios/"

var menu_local_dev="http://localhost:8000/menu/"
var menu_local_prod="http://localhost:1337/menu/"
var menu_server_dev="https://107.152.32.237:8000/menu/"
var menu_server_prod="https://dynasty.fit/menu/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

//token
token_ = localStorage.getItem("token_")
console.log(token_)
token_final = 'Bearer '+ token_


//ambiente
ambiente = localStorage.getItem("local_server")
console.log(ambiente)


if(ambiente == 'local'){
    url_root = local_dev_root
    url_socios = local_dev
    url_menu = menu_local_dev
    url_login = login_local_dev
    
    
  
}else if(ambiente == 'server'){
    url_root = server_prod_root
    url_socios = server_prod
    url_menu = menu_server_prod
    url_login = login_server_prod
}


$("#boton_ver").click(function () {

    var socio_name = document.getElementById('socio_name').value
    var mensaje = document.getElementById('socio_name_error')
    send_name(socio_name,mensaje,'editar/')

})

function send_name(socio_name,mensaje,_url){

    if(socio_name==''){
        mensaje.innerHTML='debe escribir un socio'
    }else{

        socio_uiid = socio_name.split('-')[1]
        if(socio_uiid === undefined || typeof socio_uiid === 'undefined'){

            mensaje.innerHTML='El socio no existe'
            //location.href = url_root+_url //ya estoy ahi!

        }else{
            
            socio_uiid = parseInt(socio_uiid)
            if(isNaN(socio_uiid)){
                mensaje.innerHTML='El socio no existe'

            }else{
                mensaje.innerHTML=' '
                //ajax para verificar existencia del socio ._. y dentro del success enviar a la url_table ._.--tan facil que habia quedado ._.
                //no tuve que hacerlo porque el error se agarra desde aca no desde el view!!, sin el uiid ni siquiera llega al view!!
                location.href = url_root+_url+socio_uiid+'/'//no se ocupa ajax porque es una peticion get! y no manda mas nada
            }
            
           
            

        }
    }
}

$("#boton").click(function () {

    var mensaje = document.getElementById('patrocinador_name_error')
    
        ////validar patrocinador
        var validarPat = validar_patrocinador()
        alert(validarPat)
        
        if(validarPat==false){
            mensaje.innerHTML='El patrocinador no existe'
        }
        //////fin de validar patrocinador
        else{
        
        var pat_id = validarPat
            //var idSocio = document.getElementById('idSocio').value --> se ocupa el socio_uiid
        var nombre = document.getElementById('nombre').value
        var apellido_1 = document.getElementById('last_name').value
        var apellido_2 = document.getElementById('last_name2').value
        var socio_uiid = document.getElementById('socio_uiid').value
        
        var email = document.getElementById('email').value

        
        
        if(email==''){
            email = 'ejemplo@mail.com'
        }
        console.log(email)
        var telefono = document.getElementById('telefono').value
        var telefono_2 = document.getElementById('telefono_2').value
        var calle_numero = document.getElementById('calle_numero').value
        var colonia = document.getElementById('colonia').value
        var delegacion_municipio = document.getElementById('delegacion_municipio').value
        var ciudad = document.getElementById('ciudad').value
        var cp = document.getElementById('cp').value
        var estado = document.getElementById('estado').value
        var pais = document.getElementById('pais').value
        var first_name_beneficiario = document.getElementById('first_name_beneficiario').value
        var last_name_beneficiario = document.getElementById('last_name_beneficiario').value
        var last_name2_beneficiario = document.getElementById('last_name_beneficiario').value
        var status = document.getElementById('desactivar').checked
        
        console.log(status)
        pat_id = parseInt(pat_id)
       
        socio_uiid = parseInt(socio_uiid)
        //si el checkbox esta check = true --> el socio se desactiva!
        if(status){
            status=false
        }else{
            status=true
        }

        datos = {
            'first_name':nombre,
            'last_name':apellido_1,
            'last_name2':apellido_2,
            'patrocinador_id':pat_id,
            'email':email,
            'telefono':telefono,
            'telefono_2':telefono_2,
            'calle_numero':calle_numero,
            'colonia':colonia,
            'delegacion_municipio':delegacion_municipio,
            'ciudad':ciudad,
            'cp':cp,
            'pais':pais,
            'estado':estado,
            'first_name_beneficiario':first_name_beneficiario,
            'last_name_beneficiario':last_name_beneficiario,
            'last_name2_beneficiario':last_name2_beneficiario,
            'is_active':status
        }
        console.log(datos)

        $.ajax({
            url: url_socios+socio_uiid+'/',
            type: 'Patch',
            headers: {'Authorization': token_final},
            data: JSON.stringify(datos),
            contentType: 'application/json; charset=utf-8',
            success: function (data) { 
                alert('Socio actualizado con éxito!')
                location.href = url_menu       
            },
            error: function (xhr, status, errorThrown) { 
                
                var status = xhr.status
                console.log(status+', '+xhr.responseText)
                
                if(status==400){
                    alert('el socio no existe')
                }
                else if(status==403){

                    alert('usted no tiene permiso para realizar está acción :p')
                    location.href = url_menu
                        
                }else if(status==401){    
                    expiro_token()
    
                }else if(status==500){    
                    alert('el id no existee')
    
                }else{
                    alert('ha ocurrido un error')
                }

            }
        });

        }
        
})

function expiro_token(){
    alert('tu sesión ha expirado')
    token_final = 0
    location.href = url_login
    
}

function validar_patrocinador_1(){ 


    var patrocinador_id = document.getElementById('patrocinador_id').value
    var patrocinador_name = document.getElementById('patrocinador_name').value
    var mensaje = document.getElementById('patrocinador_name_error')

    console.log(patrocinador_name)
    console.log(typeof patrocinador_name)

    if(patrocinador_name!=''){

        pat_id_name = patrocinador_name.split('-')[1]
        if(pat_id_name === undefined || typeof pat_id_name === 'undefined'){
            return false

        }else{
            
            pat_id_name = parseInt(pat_id_name)
            if(isNaN(pat_id_name)){
                return false

            }else{
                 
                /// // con ajax solo retorna undefined ._.
                $.ajax({
                    url: url_root+'buscar_socio/'+pat_id_name,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) { 
                        console.log(data)
                        if(data.respuesta=='ok'){
                            pat_id = pat_id_name 
                            mensaje.innerHTML=' '
                            return pat_id 
                            
                        }else{
                            mensaje.innerHTML='el patrocinador no existe'
                            alert('acaa')
                            return false
                        }
                        

                    }
                });
                ///  
            }   
        }
    }else{

        
        pat_id=patrocinador_id
        return pat_id 
        
    }

    

    
}


function validar_patrocinador(){ //no pude validar que el patricnador existe jajaj cuando el formato esta bien: hola-20

    var patrocinador_name = document.getElementById('patrocinador_name').value
    var patrocinador_id = document.getElementById('patrocinador_id').value

    if(patrocinador_name!=''){
        
        patro_id = patrocinador_name.split('-')[1]
        if(patro_id === undefined || typeof patro_id === 'undefined'){
            return false

        }else{
            
            patro_id = parseInt(patro_id)
            if(isNaN(patro_id)){
                return false

            }else{
                pat_id = patro_id
                return pat_id
            }
        }
    }else{

        pat_id = patrocinador_id
        return pat_id
    }

    
}






