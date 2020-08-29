window.onload= loadCars();

// Läsa in med AJAX
function loadCars() {
    $.getJSON( "http://localhost:3000/api/data", function(data) {
        
    // Rensa listan
    $("#carlist").html("");

      for(var i =0; i<data.length; i ++) {
          $("#carlist").append("<li>" + data[i].id +  ". " + data[i].make + ": " + data[i].model + " (" + data[i].color + ") - <span onclick='deleteCar(" + data[i].id + ")'>Radera</span></li>");
      }  
    });
}

// Radera bil
function deleteCar(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/api/data/delete/" + id
    }).done(function(response) {
        console.log(response);
    });
}
