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
        $('#modalVen').modal({
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
                salida += "<td> <a class='btn btn-danger' onclick='eliminarProducto(respuesta.producto[i].id)' >Eliminar</a> </td>"
                salida += "</tr>";
            }
            document.getElementById("detalle").innerHTML = salida;
        },
        error: function() {
            alert('error');
        }
    });
}

//eliminar Producto
function eliminarProducto(id) {
    $.ajax({

    })

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
            document.getElementById("detalle").innerHTML = 'Total ventas del día: ' + suma;
            new Chart(document.getElementsByClassName("grafica"), {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        label: "Ventas del día",
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
            document.getElementById("detalle").innerHTML = 'Producto top: ' + proTop;
            new Chart(document.getElementsByClassName("top"), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Unidades Vendidas",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
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

$(document).ready(function() {
    $('table').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla =(",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        }
    });
});

function empleadoTop(ruta) {
    $.ajax({
        url: ruta,
        dataType: 'json',
        success: function(respuesta) {
            var labels = [];
            var datos = [];
            for (const i in respuesta.empleado) {
                labels.push(respuesta.empleado[i].mesero_id__nombres)
                datos.push(respuesta.empleado[i].total)
            }
            //document.getElementById("detalle").innerHTML = 'Producto top: ' + proTop;
            new Chart(document.getElementsByClassName("empleadotop"), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Empleado top",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
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
            console.log('error');
        }
    })

}

function formatear() {
    var options = { style: 'currency', currency: 'USD' };
    var numberFormat = new Intl.NumberFormat('en-US', options);
    var totales = document.getElementsByClassName('total');
    var empl = document.getElementsByClassName('totalE')
    var aux = 0;
    for (let i = 0; i < totales.length; i++) {
        aux = parseFloat(totales[i].innerHTML);
        console.log(aux);
        totales[i].innerHTML = numberFormat.format(aux);
    }

    for (let i = 0; i < empl.length; i++) {
        aux = parseFloat(empl[i].innerHTML);
        console.log(aux);
        empl[i].innerHTML = numberFormat.format(aux);
    }
}

function formatearInv() {
    var options = { style: 'currency', currency: 'USD' };
    var numberFormat = new Intl.NumberFormat('en-US', options);
    var totales = document.getElementsByClassName('precioV');
    var aux = 0;

    for (let i = 0; i < totales.length; i++) {
        aux = parseFloat(totales[i].innerHTML);
        console.log(aux);
        totales[i].innerHTML = numberFormat.format(aux);
    }
}