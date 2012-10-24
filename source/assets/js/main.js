/*global browser:true, $:true, jquery:true */

'use strict';

(function(){
  $.getJSON('data/exogenous.json', function(data) {
    var row = '<tr><td>test</td><td>test</td><td>test</td></tr>';
    $('#exog-table').append(row);

  })

})();