var mymap = L.map('main_map').setView([-32.98624, -68.87269], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//L.marker([3.4592355,-76.5048994], { title: 'CC. Unico Outlet' }).addTo(mymap); 
//L.marker([-32.4787,-68.57894], { title: 'CC. Unico Outlet' }).addTo(mymap); 

//llamada a ajax. Reques asincronico , solicitud a web json
$.ajax({
    dataType: 'json',
    url: 'api/bicicletas',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("x-access-token", data.data.token);
    }
}).done(function (result) {
    console.log(result);

    result.bicicletas.forEach(bici => {
        L.marker(bici.ubicacion, { title: bici.id }).addTo(mymap);
    });
});