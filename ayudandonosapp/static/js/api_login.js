//Obtener token y guardarlo en el localStorage 

//a veces no agarra el token ._.
localStorage.setItem("token_",0);//checar si esto funciona, porque se tenia que entrar dos veces para que agarrara un nuevo token
localStorage.setItem("local_server",0);


//urls
var token_local_dev="http://localhost:8000/api/token/"
var token_local_prod="http://localhost:1337/api/token/"
var token_server_dev="http://107.152.32.237:8000/api/token/"
//var token_server_prod="http://107.152.32.237:1337/api/token/"
//var token_server_prod="http://dynasty.fit/api/token/"
var token_server_prod="https://dynasty.fit/api/token/" //https!!

function api(){
    
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    /* evolucionarlo a que en la parte izq del mail, lleve user_local o user_server 
    para extraer solo el _local o _server y asi poder tener a varios users, 
    con la convencion de crear asi el username (mail) */

    var username_original = username
    var user_split = username_original.split("_")
    var user_split_2 = user_split[1].split('@')
    console.log(user_split_2[0])
    

    if (user_split_2[0] == 's'){

        localStorage.setItem("local_server",'server');

    }else if(user_split_2[0] == 'l'){

        localStorage.setItem("local_server",'local');
    }

    /* if(username == 'pruebas@gmail.com'){
        localStorage.setItem("local_server",'server');
    }else if(username == 'del@gmail.com'){
        localStorage.setItem("local_server",'local');
    } */

  
    if(localStorage.getItem('local_server')=='local'){
        url_= token_local_dev

    }else if(localStorage.getItem('local_server')=='server'){
        url_ = token_server_prod
    }
    //alert(url_)

    datos = {
      "email":username,
      "password":password
    }

    $.ajax({
        //url: token_local_dev,
        url: url_,
        type: "Post",
        data: JSON.stringify(datos),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
             
            localStorage.setItem("token_",data["access"]);
            console.log(localStorage.getItem("token_"))
        },
        error: function (xhr, status, errorThrown) { 
                
            var status = xhr.status
            console.log(status+', '+xhr.responseText)
           
        }
    });  
}
