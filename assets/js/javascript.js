$(document).ready(function() {
    let formulario = $("#formulario");
    let pokenumero = parseInt($("#pokenumero").val()) || Math.floor(Math.random() * 100);
    let expresion = /\d/gmi;
    console.log(pokenumero);
    

formulario.on("submit", function (event) {
        event.preventDefault();
        pokenumero = parseInt($("#pokenumero").val());
        console.log(pokenumero);
        consulta(pokenumero);
        $("body").css("background-image", "url(assets/images/fondo.png)"); 
});

function consulta(pokenumero) {
    if (pokenumero && expresion.test(pokenumero) && pokenumero > 0 && pokenumero <= 893) {
        $.ajax ({
            datatype: "json",
            type: "get",
            url: "https://pokeapi.co/api/v2/pokemon/1" + pokenumero,
            success: function (response) {
                console.log(response);
                $("#resultado").html(`
                <div class="text-center">
                    <h3>Pokémon: ${response.name}</h3>
                    <img src="${response.sprites.front_default}" alt="${response.name}">
                    <h5>Altura: ${response.height}</h5>
                    <h5>Peso: ${response.weight}</h5>
                    <h5>Experiencia: ${response.base_experience}</h5>
                </div>
            `);
            let resultado = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Habilidad</th>
                        <th>Oculto</th>
                    </tr>
                </thead>
                <tbody>
            `;
            response.abilities.forEach(element => {
                console.log(element.ability.name);
                resultado += `
                    <tr>
                        <th>${element.slot}</th>
                        <td>${element.ability.name}</td>
                        <td>${element.is_hidden}</td>
                    </tr>
                `;
            });

            resultado += `
                </tbody>
                </table>
            `;
            $('#resultado').append(resultado);
            

            let datosXY = [];
            response.stats.forEach(element => {
                console.log(element.base_stat);//y
                console.log(element.stat.name);//label
                datosXY.push(
                    {
                        label: element.stat.name, 
                        y:element.base_stat
                    });
            });

            var options = {
               
                data: [              
                    {
                        type: "column",
                        dataPoints: datosXY
                    }
                ]
            };
        
            $("#chartContainer").CanvasJSChart(options);
        },
        error: function (error) {
            console.error(error);
        }
    });

        } else {
            alert("Ingrese un número entre el 1 y el 893")
        }; 
        }
        });




                    
                










