/*global browser:true, $:true, jquery:true, console:true */

'use strict';

(function(){
  $.getJSON('data/exogenous.json', function(data) {
    
    $.each(data, function(index, value) {
      console.log(value)
      var name = value.name || ''
        , url = value.url || ''
        , type = value.type || ''
        , infoUrl = value.info || ''
        , desc = value.description || ''
        , categories = value.categories || []
      var row = 
          '<tr>'
        + '<td><a href="' + infoUrl + '">' + name + '</a></td>'
        + '<td>' + type + '</td>'
        + '<td>' + desc + '</td>'
        + '</tr>';
      $('#exog-table').append(row);
    });
    
  })

})();