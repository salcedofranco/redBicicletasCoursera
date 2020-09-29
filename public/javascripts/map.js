var map = L.map('main_map').setView([-32.98624, -68.87269], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//llamada a ajax. Reques asincronico , solicitud a web json

$.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'api/auth/authenticate',
    data: { email: 'keko@gmail.com', password: 'keko' },
}).done(function( data ) {
    console.log(data);

    $.ajax({
        dataType: 'json',
        url: 'api/bicicletas',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-access-token", data.data.token);
        }
    }).done(function (result) {
        console.log(result);

        result.bicicletas.forEach(bici => {
            L.marker(bici.ubicacion, { title: bici.id }).addTo(map);
        });
    });
});