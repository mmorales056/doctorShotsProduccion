/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// este metodo me carga el contenido de el formulario editar empleado a la ventana modal
function editarEmpleado(ruta) {
    $.ajax({
        url: ruta,
        success: function(respuesta) {
            document.getElementById('modaleditar').innerHTML = respuesta;
        },
        error: function() {
            console.log("No se a podido tener la informacion");
        }
    })


}
//Carga el contendio del formulario crer empleado desde el movil a una modal
function crearEmpleadoMovil(ruta) {
    $.ajax({
        url: ruta,
        success: function(respuesta) {
            document.getElementById('modaleditar').innerHTML = respuesta;
        },
        error: function() {
            console.log("No se pudieron obtener los datos");
        }
    })
}


/* MODULO PRODUCTOS*/
function crearProductoMovil(ruta) {
    $.ajax({
        url: ruta,
        success: function(respuesta) {
            document.getElementById('editarProducto').innerHTML = respuesta;
        },
        error: function() {
            console.log('Error al traer los datos');
        }
    });
}

function editarProducto(ruta) {
    $.ajax({
        url: ruta,
        success: function(respuesta) {
            document.getElementById('editarProducto').innerHTML = respuesta;
        },
        error: function() {
            console.log("No se a podido tener informacion");
        }

    });
}

function verProducto(ruta) {
    $.ajax({
        url: ruta,
        dataType: "json",
        success: function(respuesta) {
            var salida = "";
            salida = "<table class='table table-dark'>";
            $.each(respuesta, function(indice, valor) {
                salida += " <tr> <td> " + indice + "</td><td>" + valor + "</td></tr>"
            });
            salida += "</table>";
            document.getElementById("editarProducto").innerHTML = salida;
        },
        error: function() {
            console.log("no se pueden encontrar los datos");
        }
    });
}


//CArgar modal de nueva categoria con su formulario
function cargarModal() {
    let select = document.getElementById("categorias");
    if (select.value === 'nueva') {
        $('#modalCategoria').modal({
            show: true,
        });
    }
}

//Metodo que me carga el formulario de nueva mesa
function formNuevaMesa(ruta, ruta1, idMesa) {
    let select = document.getElementById("mesas");
    if (select.value === 'nueva') {
        $('#modalVentas').modal({
            show: true,
        });
        $.ajax({
            url: ruta,
            success: function(respuesta) {
                document.getElementById("resultadoVentas").innerHTML = respuesta

            },
            error: function() {
                console.log("error");
            }
        })
    } else {
        $.ajax({
            url: ruta1,
            data: "idMesa=" + idMesa,
            method: 'GET',
            success: function(respuesta) {
                document.getElementById("comanda").innerHTML = respuesta
                    //document.getElementById("comanda-pc").innerHTML = respuesta


            },
            error: function() {
                console.log("error");
            }
        })

    }
}
//este metodo 
function llenar(ruta, categoria) {
    $.ajax({
        url: ruta,
        data: "categoria=" + categoria,
        method: "get",
        success: function(respuesta) {
            document.getElementById("productoselect").innerHTML = respuesta;
        },
        error: function() {
            console.log("no se pueden encontrar los datos");
        }
    });
}


//Este metodo se activa cuando se da en el boton pagar 
function pagar(ruta) {
    //se crea peticion ajax
    $.ajax({
        //se captura la ruta de los views de python
        url: ruta,
        success: function() {
            //si larespuesta es correcta entra acá
            alert("Pagó con exito");
            //se actualiza la página 
            location.replace("http://0.0.0.0:8000/doctorshots/ventas/Pagado");
        },
        error: function() {
            //si hay error en la respuesta se imprime en la consola
            console.log("error");
        }
    })
}

//ver detalle
function verDetalle(ruta) {
    $.ajax({
        url: ruta,
        dataType: "json",
        success: function(respuesta) {
            var salida = "";
            for (const i in respuesta.producto) {
                salida += "<tr>";
                salida += "<td>" + respuesta.producto[i].producto__nombreProducto + "</td>";
                salida += "<td>" + respuesta.producto[i].precio + "</td>";
                salida += "<td>" + respuesta.producto[i].cantidad + "</td>";
                salida += "<td> <a class='btn btn-danger'  data-toggle='confirmation' hrfe='#'>Eliminar</a> </td>"
                salida += "</tr>";
            }
            document.getElementById("detalle").innerHTML = salida;
        },
        error: function() {
            alert('error');
        }
    });
}

function ventasDia(ruta) {
    $.ajax({
        url: ruta,
        dataType: 'json',
        success: function(respuesta) {
            let label = [];
            let datos = [];
            let suma = 0;
            for (const i in respuesta.venta) {
                label.push(respuesta.venta[i].fecha);
                datos.push(respuesta.venta[i].total);
                suma += respuesta.venta[i].total;
            }
            console.log(label);
            console.log(datos);
            document.getElementById("detalle").innerHTML = 'Total ventas del día: ' + suma;
            new Chart(document.getElementsByClassName("grafica"), {
                type: 'bar',
                data: {
                    labels: label,
                    datasets: [{
                        label: "Total (Venta)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: datos
                    }]
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Ventas del día'
                    }
                }
            });

        },
        error: function() {
            console.log('Error');
        }
    })
}

function productoMasVendido(ruta) {
    $.ajax({
        url: ruta,
        dataType: 'json',
        success: function(respuesta) {
            let labels = [];
            let datos = [];
            var proTop = "";
            var tam = respuesta.producto.length
            proTop += respuesta.producto[tam - 1].producto__nombreProducto
            for (const i in respuesta.producto) {

                labels.push(respuesta.producto[i].producto__nombreProducto)
                datos.push(respuesta.producto[i].total)

            }
            console.log(proTop);
            console.log(labels);
            console.log(datos);
            document.getElementById("detalle").innerHTML = 'Producto top: ' + proTop;
            new Chart(document.getElementsByClassName("grafica"), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Top mas vendido",
                        data: datos
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 10,
                                suggestedMax: 30
                            }
                        }]
                    }
                }
            });

        },
        error: function() {
            console.log("error");
        }
    })
}