$(document).ready(function(){
  var data = moment("2018-01-01");

  stampaCalendario(data);
  stampaFestivita(data);

  $(".prev").click(function(){

    if(data.format("M") == 1){
      alert("non puoi tornare nell'anno 2017");
    } else {
      data.subtract(1, "months");
      stampaCalendario(data);
      stampaFestivita(data);

    }

  })

  $(".next").click(function(){

    if(data.format("M") == 12){
      alert("non puoi andare nell'anno 2019");
    } else {
      data.add(1, "months");
      stampaCalendario(data);
      stampaFestivita(data);

    }

  })

});



//stamperà il mese che gli passo come argomento
function stampaCalendario(data){
  //pulisco subito il contenuto per avitare che printa (appende) i mesi uno sotto l'altro
  $("#days").html("");

  var dataMomento = moment(data);
  $("h1").text(dataMomento.format("MMMM YYYY"));

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
}

//stampa le festività del mese che gli passo come a
function stampaFestivita(data){

  var dataMomento = moment(data);
  var mese = dataMomento.format("M") - 1;

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": mese
      },
      "method": "GET",
      "success": function (data, stato) {

        var festivita = data.response;

        for(var i = 0; i < festivita.length; i++){

          var nomeFestivita = festivita[i].name;
          var dataFestivita = festivita[i].date;

          var item = $(".day[data-completa='"+dataFestivita+"']");

          item.addClass("holiday");
          item.children(".holidayType").text(" - " + nomeFestivita);

        }

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
    }
    }
  );
}

function addZero(giorno){

  if(giorno < 10){
    return "0" + giorno;
  }
  return giorno;
}
