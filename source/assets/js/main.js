/*global browser:true, $:true, jquery:true, console:true */

'use strict';

$().ready(function() {

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
      + '<td>' + desc + '<br><strong>URL:</strong> <a href="' + url + '">' + url + '</a></td>'
      + '<td>' + categories.toString() + '</td>'
      + '</tr>';
    return row;
  }

  $.getJSON('data/endogenous.json', function(data) {
    $.each(data, function(index, row) {
      $('#endog-table').append(parseRow(row))
    });    
    $('#endog-table').tablesorter( {sortList: [[0,0], [1,0]]} );
  })

  $.getJSON('data/exogenous.json', function(data) {
    $.each(data, function(index, row) {
      $('#exog-table').append(parseRow(row));
    });    
    $('#exog-table').tablesorter( {sortList: [[0,0], [1,0]]} );
  })

});