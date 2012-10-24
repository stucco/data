/*global browser:true, $:true, jquery:true, console:true */

'use strict';

(function(){

  var parseRow = function(value) {
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
      + '<td>' + url + '</td>'
      + '<td>' + desc + '</td>'
      + '<td>' + categories.toString() + '</td>'
      + '</tr>';
    return row;
  }

  $.getJSON('data/exogenous.json', function(data) {
    $.each(data, function(index, row) {
      $('#exog-table').append(parseRow(row));
    });
    
  })

})();