$(document).ready(function(){

  var data = "2018-01-01";

  var dataMomento = moment(data);

  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  for(var i = 1; i <= dataMomento.daysInMonth(); i++){

    var giorno = addZero(i);
    var dataCompleta = dataMomento.format("YYYY") + "-" + dataMomento.format("MM") + "-" + giorno;

    var context = {
      "day": i,
      "month": dataMomento.format("MMMM"),
      "dataCompleta": dataCompleta
    };
    var html = template(context);

    $("#days").append(html);

  }

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": 0
      },
      "method": "GET",
      "success": function (data, stato) {

        var festivita = data.response;

        for(var i = 0; i < festivita.length; i++){

          var nomeFestivita = festivita[i].name;
          var dataFestivita = festivita[i].date;

          $(".day[data-completa='"+dataFestivita+"']").addClass("holiday");
          $(".day[data-completa='"+dataFestivita+"'] .holidayType").text(" - " + nomeFestivita);
        }

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
    }
    }
  );

});

function addZero(giorno){
  if(giorno < 10){
    return "0" + giorno;
  }
  return giorno;
}
