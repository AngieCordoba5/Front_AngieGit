function autoInicioCategoria(){
    console.log("se esta ejecutando autoInicioCategoria")
    $.ajax({
        url:"http://129.151.118.90:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarInfoCategoria(respuesta);
            let $selectCat = $("#select-category");
            $.each(respuesta, function (id, categoria) {
                $selectCat.append('<option value='+categoria.id+'>'+categoria.name+'</option>');
                console.log("select "+categoria.id);
            }); 
        }
    })
}

function pintarInfoCategoria(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='actualizarCategoria("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategorias").html(myTable);
}

function guardarInfoCategoria(){
    let var2 = {
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val()
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.118.90:8080/api/Category/save",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarCategoria(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
            autoInicioCategoria();
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCategoria();
            alert("Se ha Eliminado.")
        }
    });

}

//////////////////////TABLA CABIN

function autoInicioCabin(){
    console.log("se esta ejecutando autoInicioCabin")
    $.ajax({
        url:"http://129.151.118.90:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarInfoCabin(respuesta);
            let $selectCabin = $("#select-cabin");
            $.each(respuesta, function (id, cabin) {
                $selectCabin.append('<option value='+cabin.id+'>'+cabin.name+'</option>');
                console.log("select cabin"+cabin.id);
            }); 
        }
    
    })

}

function pintarInfoCabin(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].rooms+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInfoCabin("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCabin("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCabins").html(myTable);
}

function guardarInfoCabin(){
    let var2 = {
        name:$("#nameCabin").val(),
        brand:$("#brandCabin").val(),
        rooms:$("#roomsCabin").val(),
        description:$("#descriptionCabin").val(),
        category:{id:+$("#select-category").val()}
        };
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.118.90:8080/api/Cabin/save",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInfoCabin(idElemento){
    let myData={
        id:idElemento,
        brand:$("#brandCabin").val(),
        rooms:$("#roomsCabin").val(),
        name:$("#nameCabin").val(),
        description:$("#descriptionCabin").val(),
        category:{id:+$("#select-category").val()}
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Cabin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brandCabin").val("");
            $("#roomsCabin").val("");
            $("#nameCabin").val("");
            $("#descriptionCabin").val("");
            $("#select-category").val("");
            autoInicioCabin();
            alert("se ha Actualizado correctamente la cabaña")
        }
    });

}

function borrarCabin(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Cabin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCabin();
            alert("Se ha Eliminado.")
        }
    });

}

//////////////////////TABLA CLIENTES 
function autoInicioCliente(){
    console.log("se esta ejecutando autoInicioCliente")
    $.ajax({
        url:"http://129.151.118.90:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarInfoCliente(respuesta);
            let $selectClient = $("#select-client");
            $.each(respuesta, function (id, cliente) {
                $selectClient.append('<option value='+cliente.idClient+'>'+cliente.name+'</option>');
                console.log("select "+cliente.idClient);
            }); 
        }
        
    })
}

function pintarInfoCliente(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarInfoCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}

function guardarInfoCliente(){
    let var2 = {
        //id:idElemento,
        email:$("#email").val(),
        password:$("#passwordClient").val(),
        name:$("#nameClient").val(),
        age:$("#ageClient").val()
        };
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.118.90:8080/api/Client/save",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInfoCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#email").val(),
        password:$("#passwordClient").val(),
        name:$("#nameClient").val(),
        age:$("#ageClient").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            $("#idClient").val("");
            $("#email").val("");
            $("#passwordClient").val("");
            $("#nameClient").val("");
            $("#ageClient").val("");
            autoInicioCliente();
            alert("Cliente actualizado correctamente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}
////////////TABLA MENSAJES

function autoInicioMensaje(){
    console.log("se esta ejecutando autoInicioMensaje")
    $.ajax({
        url:"http://129.151.118.90:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            console.log("AutoInicioMensaje")
            pintarInfoMensaje(respuesta);
            let $selectMes = $("#select-message");
            $.each(respuesta, function (id, mensaje) {
                console.log("forEachMessage")
                $selectMes.append('<option value='+mensaje.idMessage+'>'+mensaje.messageText+'</option>');
                console.log("select idMessage"+mensaje.idMessage);
            }); 
        }
    })
}

function pintarInfoMensaje(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].cabin.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='actualizarInfoMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}

function guardarInfoMensaje(){
    let var2 = {
        messageText:$("#messageText").val(),
        cabin:{id:+$("#select-cabin").val()},
        client:{idClient:+$("#select-client").val()}
        };
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.118.90:8080/api/Message/save",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInfoMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        cabin:{id:+$("#select-cabin").val()},
        client:{idClient:+$("#select-client").val()}
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            $("#select-cabin").val("");
            autoInicioMensaje();
            alert("Mensaje actualizado correctamente")
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            autoInicioMensaje();
            alert("Se ha Eliminado.")
        }
    });

}

/////////////////TABLA RESERVACIONES
function autoInicioReservacion(){
    console.log("se esta ejecutando autoInicioReservacion")
    $.ajax({
        url:"http://129.151.118.90:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarInfoReservacion(respuesta);
        }
    })
}

function pintarInfoReservacion(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].cabin.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='actualizarInfoReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservacion("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservaciones").html(myTable);
}

function guardarInfoReservacion(){
    let var2 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        cabin:{id:+$("#select-cabin").val()},
        client:{idClient:+$("#select-client").val()}
        };
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.118.90:8080/api/Reservation/save",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInfoReservacion(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        cabin:{id:+$("#select-cabin").val()}
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            $("#select-cabin").val("");
            autoInicioMensaje();
            alert("Mensaje actualizado correctamente")
        }
    });

}

function borrarReservacion(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.118.90:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            autoInicioReservacion();
            alert("Se ha Eliminado.")
        }
    });

}