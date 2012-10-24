/*global browser:true, $:true, jquery:true */

'use strict';

(function(){
  $.getJSON('data/exogenous.json', function(data) {
    
    $.each(data, function(index, value) { 
      var name = value.name || ''
        , url = value.url || ''
        , type = value.type || ''
        , infoUrl = value.info || ''
        , desc = value.description || ''
        , categories = value.categories || []
      var row = '<tr><td>test</td><td>test</td><td>test</td></tr>';
      $('#exog-table').append(row);
    });
    
  })

})();