function loading(){
    var cargando = document.getElementById('toSend')
    cargando.style.display='block'
}

//urls
var local_dev="http://localhost:8000/redes/"
var local_prod="http://localhost:1337/redes/"
var server_dev="https://107.152.32.237:8000/redes/"
var server_prod="https://dynasty.fit/redes/"

var login_local_dev="http://localhost:8000/login_form/"
var login_local_prod="http://localhost:1337/login_form/"
var login_server_dev="https://107.152.32.237:8000/login_form/"
var login_server_prod="https://dynasty.fit/login_form/"

//urls tabla de red:
// 'redes_1/<int:socio_uiid>/', --> sustitui el redes_1/ por dontCare2/ y use el url_root de abajo

//urls para red de socio activo!!

var local_dev_form_activo="http://localhost:8000/redes_1/v2_0/"
var local_prod_form_activo="http://localhost:1337/redes_1/v2_0/"
var server_dev_form_activo="https://107.152.32.237:8000/redes_1/v2_0/"
var server_prod_form_activo="https://dynasty.fit/redes_1/v2_0/"

//'redes_1/v2_0/<int:socio_uiid>/<int:mes>/<int:anio>/'
var local_dev_red_activo="http://localhost:8000/redes_1/v2_0/"
var local_prod_red_activo="http://localhost:1337/redes_1/v2_0/"
var server_dev_red_activo="https://107.152.32.237:8000/redes_1/v2_0/"
var server_prod_red_activo="https://dynasty.fit/redes_1/v2_0/"

//ver red grafica
var local_dev_form_grafica="http://localhost:8000/redes_1/api/"
var local_prod_form_grafica="http://localhost:1337/redes_1/api/"
var server_dev_form_grafica="https://107.152.32.237:8000/redes_1/api/"
var server_prod_form_grafica="https://dynasty.fit/redes_1/api/"

//url_root
var local_dev_root ="http://localhost:8000/"
var local_prod_root ="http://localhost:1337/"
var server_dev_root="https://107.152.32.237:8000/"
var server_prod_root="https://dynasty.fit/"

//token
token_ = localStorage.getItem("token_")
console.log(token_)
token_final = 'Bearer '+ token_

ambiente = localStorage.getItem("local_server")
console.log(ambiente)

//ambiente
if(ambiente == 'local'){

    url_redes = local_dev
    url_login = login_local_dev

    url_form_activo = local_dev_form_activo
    url_red_activo = local_dev_red_activo

    url_form_grafica = local_dev_form_grafica

    url_root = local_dev_root

  
  }else if(ambiente == 'server'){
  
    url_redes = server_prod
    url_login = login_server_prod

    url_form_activo = server_prod_form_activo
    url_red_activo = server_prod_red_activo

    url_form_grafica = server_prod_form_grafica

    url_root = server_prod_root
  }
//

$("#btn_red_grafica").click(function () {
    
    //
    var socio_name = document.getElementById('socio_name').value
    var mensaje = document.getElementById('socio_name_error')
    
    if(socio_name==''){
        mensaje.innerHTML='debe escribir un socio'

    }else{

        mensaje.innerHTML=''
       
        socio_uiid = socio_name.split('-')[1]

        if(socio_uiid === undefined || typeof socio_uiid === 'undefined'){
            alert('El socio no existe')
            location.href = local_dev_form_grafica

        }else{
            socio_uiid = parseInt(socio_uiid)
            //location.href = local_dev_form_grafica //se queda aqui mismo pero trae con ajax de la view datos con post!!:

            //ajax--> peticiones post sin cambiar de html :v, con un form se cambia
            $.ajax({
                url: url_redes,
                type: "Post",
                headers: {'Authorization': token_final},
                data: JSON.stringify({
                    socio_id: socio_uiid,
                    mes: 0,
                    anio:0
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    
                    console.log(data)
                    
                    var arreglo = []
                          
                    if(data['red_dont_care'].length>0){
                        //for(d=0; d< data['red_dont_care'].length; d++){
                        for(d in data['red_dont_care']){
                                  elementos = []
                                  elementos.push(data['red_dont_care'][d]['Patrocinador_id'])
                                  elementos.push(data['red_dont_care'][d]['Número de socio'])
                                  elementos.push(data['red_dont_care'][d]['Nombre'])
                                  arreglo.push(elementos)
                        }
                        var nombre_socio_one = data['socio']
                        var socio_id_one = data['red_dont_care'][0]['Patrocinador_id'].toString()
                              
                        arreglo_string=[]
                        node = []
                      
                        elementos_node_one = {
                                  "id":socio_id_one,
                                  "title":socio_id_one,
                                  "name":nombre_socio_one
                        }
                      
                        node.push(elementos_node_one)
                      
                      
                        for (a in arreglo){
                            elementos = []
                                  
                            pat = arreglo[a][0].toString()
                            socio = arreglo[a][1].toString()
                            elementos.push(pat)
                            elementos.push(socio)
                            arreglo_string.push(elementos)
                            elementos_node = {
                                      "id":socio,
                                      "title":socio,
                                      "name":arreglo[a][2]
                            }
                            node.push(elementos_node)
                      
                        }
                  
                        }else{
                            arreglo_string=[[data['data_in']["socio_id"].toString(),'0']]
                            node = [
                                  {
                                      "id":data['data_in']["socio_id"].toString(),
                                      "title":data['data_in']["socio_id"].toString(),
                                      "name":data["socio"]
                                  }
                            ]
                        }
                        console.log(arreglo_string)
                        console.log(node)
                        //alert(arreglo_string)// es una lista de dos strings: el numero de arriba con el de abajo
                        //alert(node)//los datos de cada cuadrito
                          
                         //Highcharts
                        Highcharts.chart('container_api', {
                  
                              chart: {
                                  height: 600,
                                  inverted: true
                              },
                  
                              title: {
                                  text: 'Organización multinivel',
                                  fontSize:'10px'
                              },
                          
                              series: [{
                                  type: 'organization',
                                  name: 'Highsoft',
                                  keys: ['from', 'to'],
                                  data: arreglo_string,
                                  levels: [
                                      {
                                          level: 0,
                                          color: 'silver',
                                          fontSize:'10px',
                                          
                                          dataLabels: {
                                              color: 'black',
                                              nombre:'jojo',
                                          },
                                          height: 60,
                                          
                                      }, 
                  
                                      {
                                          level: 1,
                                          color: 'pink',
                                          dataLabels: {
                                              color: 'black'
                                          },
                                          height: 25
                                      },
                                      
                                      {
                                          level: 3,
                                          color: 'purple',
                                          dataLabels: {
                                              color: 'white'
                                          },
                                          height: 25
                                      }, 
                                      {
                                          level: 4,
                                          color: 'orange',
                                          dataLabels: {
                                              color: 'white'
                                          },
                                          height: 25
                                      }, 
                                      
                                  
                                  ],
                  
                                  nodes: node,
                                  
                                  colorByPoint: false,
                                  color: '#007ad0',
                                  dataLabels: {
                                      color: 'white'    
                                  },
                                  borderColor: 'white',
                                  nodeWidth: 65
                              }],
                              tooltip: {
                                  outside: true
                              },
                              exporting: {
                                  allowHTML: true,
                                  sourceWidth: 800,
                                  sourceHeight: 600
                              }
                  
                        });//Highcharts
                     
                }, //fin-success
                error: function () { 
                    expiro_token()
                }
            });//fin-ajax
            ///

        }
    }
         
});

function expiro_token(){
    alert('tu sesión ha expirado o no tiene autorización')
    token_final = 0
    location.href = url_login
}


//visualizar tabla de red
$("#boton_ver").click(function () {//'redes_1/<int:socio_uiid>/', --'dontCare2/<int:socio_uiid>/'

    var socio_name = document.getElementById('socio_name').value
    var mensaje = document.getElementById('socio_name_error')
    send_name(socio_name,mensaje,'dontCare2/')

})

//red socio activo!! queda igual que la funcion de arriba porque es un get!!por default al 
//escribir cualq url es un get!! a menos que se especifique otro metodo como en el ajax un post!!

$("#btn_red_activo").click(function () {

    var socio_name = document.getElementById('socio_name').value
    var mes = document.getElementById('mes').value
    var anio = document.getElementById('anio').value
    var puntos = document.getElementById('puntos').value
    var mensaje = document.getElementById('mensaje')
    
    var bandera_puntos = false
    if(puntos=='350' || puntos==''){
        puntos = document.getElementById('puntos_context').value
        bandera_puntos = true
    }else{

        puntos = parseInt(puntos)
        if(isNaN(puntos)){
            mensaje.innerHTML='los puntos deben ser un número entero'
            bandera_puntos = false
        }else{
            bandera_puntos = true
        }
    }


    if(socio_name=='' || mes=='Mes' || anio == 'Años'){
    //if(s && m && a){
        mensaje.innerHTML='no debe dejar ningun espacio en blanco'

    }else if(bandera_puntos){
    
        puntos = parseInt(puntos)
        
        mensaje.innerHTML=''
        socio_uiid = socio_name.split('-')[1]

        if(socio_uiid === undefined || typeof socio_uiid === 'undefined'){
            //alert('El socio no existe')
            mensaje.innerHTML='El socio no existe'
            location.href = url_form_activo

        }else{
            
            //alert(typeof(puntos))
            socio_uiid = parseInt(socio_uiid)
            //'redes_1/v2_0/<int:socio_uiid>/<int:mes>/<int:anio>/' --> url: redes:detailRed2_0
            location.href = url_red_activo+socio_uiid+'/'+mes+'/'+anio+'/'+puntos //no se ocupa ajax porque es una peticion get! y no manda mas nada

        }
    }
    

})


//ascendencia
var band_clic = false
/* $("#btn_red_grafica").click(function () {}) *//*era igual que send_name; no funciono así ._.*/
$("#btn_ascendencia").click(function () {
    
    var socio_name = document.getElementById('socio_name').value
    var mensaje = document.getElementById('socio_name_error')
    send_name_as(socio_name,mensaje,'ascendencia/')

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

function send_name_as(socio_name,mensaje,_url){
   
    if(socio_name==''){
        mensaje.innerHTML='debe escribir un socio'
    }else{

        socio_uiid = socio_name.split('-')[1]
        if(socio_uiid === undefined || typeof socio_uiid === 'undefined'){

            mensaje.innerHTML='El socio no existe'
            //location.href = url_root+_url

        }else if(socio_uiid==70000009){
            mensaje.innerHTML='El socio no tiene patrocinador'

        }else{

            band_clic = true //es true cuando un se verificó un input!, esta var es global y false 
            limpiar_datos()//con esta aca ya ni si quiera se nececita el btn de limpiar ._.

            socio_uiid = parseInt(socio_uiid)
            $.ajax({
                url:url_root+_url+socio_uiid+'/',
                contentType: 'application/json; charset=utf-8',
                success: function (data) { 

                    console.log(data['pats'].length)
                    console.log(data['pares'])
                    node = []

                    var l = data['pats'].length

                    var pats_reverse = data['pats'].reverse()
                    console.log(pats_reverse)
                    if(data['pats'].length>0){
                        for(x in pats_reverse){
                            //console.log(data['pats'][x][0])
                            elementos_node = {
                                "id":pats_reverse[x][0],
                                'title':pats_reverse[x][0],
                                "name":pats_reverse[x][1]
                            }
                            console.log(elementos_node)
                            node.push(elementos_node)

                            ///dibujando!
                            var contenedor_div_socios = document.getElementById('div_socio')
                            var div_socio = document.createElement('div')
                            div_socio.setAttribute('id','div_s')
                        
                            if(x==(l-1)){
                                div_socio.className='pat_div_first'
                            }else{
                                div_socio.className='pat_div'
                            }
                          
                            var p = document.createElement('p')
                            p.innerHTML=pats_reverse[x][0]+'-'+pats_reverse[x][1]

                            div_socio.appendChild(p)
                            contenedor_socios.appendChild(div_socio)

                        }
                        
                        ///////////////////////h_2
                        Highcharts.chart('container_api_no', {
                            chart: {
                              height: 600,
                              inverted: true
                            },
                          
                            title: {
                              text: 'Highcharts Org Chart'
                            },
                          
                            accessibility: {
                              point: {
                                descriptionFormatter: function (point) {
                                  var nodeName = point.toNode.name,
                                    nodeId = point.toNode.id,
                                    nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                                    parentDesc = point.fromNode.id;
                                  return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
                                }
                              }
                            },
                          
                            series: [{
                              type: 'organization',
                              name: 'Highsoft',
                              keys: ['from', 'to'],
                              data: data['pares'],
                              levels: [{
                                level: 0,
                                color: 'silver',
                                dataLabels: {
                                  color: 'black'
                                },
                                height: 25
                              }, {
                                level: 1,
                                color: 'silver',
                                dataLabels: {
                                  color: 'black'
                                },
                                height: 25
                              }, {
                                level: 2,
                                color: '#980104'
                              }, {
                                level: 4,
                                color: '#359154'
                              }],
                              nodes: node,
                              colorByPoint: false,
                              color: '#007ad0',
                              dataLabels: {
                                color: 'white'
                              },
                              borderColor: 'white',
                              nodeWidth: 65
                            }],
                            tooltip: {
                              outside: true
                            },
                            exporting: {
                              allowHTML: true,
                              sourceWidth: 800,
                              sourceHeight: 600
                            }
                          
                          });
                        ///////////////////////end_h_2
                    }else{
                        alert('no tiene patrocinadores')
                    }
                     
                }, //fin-success
                error: function () { 
                    alert('error!')
                }
            
            })//fin_ajax
            //location.href = url_root+_url+socio_uiid+'/'//no se ocupa ajax porque es una peticion get! y no manda mas nada

        }
    }
}


function limpiar_datos(){
    //alert(band_clic)
    if(band_clic){
        
        var c_1 = $("#contenedor_socios")
        var div_s=document.getElementById('div_socio')
        c_1.empty()
          

    }
}

$("#btn_detalle").click(function () {

    var mes = document.getElementById('mes').value
    var anio = document.getElementById('anio').value
    var puntos = document.getElementById('puntos').value
    var mensaje = document.getElementById('mensaje')
    
    
    var bandera_puntos = false
    if(puntos=='350' || puntos==''){
        puntos = document.getElementById('puntos_context').value
        bandera_puntos = true
    }else{

        puntos = parseInt(puntos)
        if(isNaN(puntos)){
            mensaje.innerHTML='los puntos deben ser un número entero'
            bandera_puntos = false
        }else{
            bandera_puntos = true
        }
    }


    if(mes=='Mes' || anio == 'Años'){
       
        mensaje.innerHTML='no debe dejar ningun espacio en blanco'
    
    }else if(bandera_puntos){
       
        puntos = parseInt(puntos)
        
        mensaje.innerHTML=' '

        var cargando = document.getElementById('toSend')
        cargando.style.display='block'

        //'detalle/<int:mes>/<int:anio>/<int:puntos>'
        location.href = url_root+'detalle/'+mes+'/'+anio+'/'+puntos
    }


})

$("#btn_descarga").click(function () {

    var mes = document.getElementById('mes').value
    var anio = document.getElementById('anio').value
    var puntos = document.getElementById('puntos').value
    var mensaje = document.getElementById('mensaje')
    
    
    var bandera_puntos = false
    if(puntos=='350' || puntos==''){
        puntos = document.getElementById('puntos_context').value
        bandera_puntos = true
    }else{

        puntos = parseInt(puntos)
        if(isNaN(puntos)){
            mensaje.innerHTML='los puntos deben ser un número entero'
            bandera_puntos = false
        }else{
            bandera_puntos = true
        }
    }


    if(mes=='Mes' || anio == 'Años'){
       
        mensaje.innerHTML='no debe dejar ningun espacio en blanco'
    
    }else if(bandera_puntos){
       
        puntos = parseInt(puntos)
        
        mensaje.innerHTML=' '

        //var cargando = document.getElementById('toSend')
        //cargando.style.display='block'
        var mensaje_descarga = document.getElementById('mensaje_descarga')
        mensaje_descarga.innerHTML='Cargando datos, espere...'
        var btn_descarga = document.getElementById('btn_descarga')
        btn_descarga.style.display = 'none'

        var btn_detalle = document.getElementById('btn_detalle')
        btn_detalle.style.display = 'none'

        location.href = url_root+'descarga/'+mes+'/'+anio+'/'+puntos
       
    }


})

$("#btn_concentrado").click(function () {
    
    var mes = document.getElementById('mes').value
    var anio = document.getElementById('anio').value
    var puntos = document.getElementById('puntos').value
    var mensaje = document.getElementById('mensaje')
    
    
    var bandera_puntos = false
    if(puntos=='350' || puntos==''){
        puntos = document.getElementById('puntos_context').value
        bandera_puntos = true
    }else{

        puntos = parseInt(puntos)
        if(isNaN(puntos)){
            mensaje.innerHTML='los puntos deben ser un número entero'
            bandera_puntos = false
        }else{
            bandera_puntos = true
        }
    }


    if(mes=='Mes' || anio == 'Años'){
       
        mensaje.innerHTML='no debe dejar ningun espacio en blanco'
    
    }else if(bandera_puntos){
        
        puntos = parseInt(puntos)
      
        mensaje.innerHTML=' '

      
        var cargando = document.getElementById('toSend')
        cargando.style.display='block'
   

        //'concentrado/<int:mes>/<int:anio>/<int:puntos>'
        location.href = url_root+'concentrado/'+mes+'/'+anio+'/'+puntos
    }


})




