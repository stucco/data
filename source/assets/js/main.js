/*global browser:true, $:true, jquery:true */

$().ready(function () {
  'use strict';

  var parseRow = function (value) {
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

  // set up tooltips for table headers - text in markup
  $('#exog-table thead tr th span').tooltip();
  
  // async load table data and reorder on first and second columns
  $.getJSON('data/exogenous.json', function (data) {
    $.each(data, function (index, row) {
      $('#exog-table tbody').append(parseRow(row));
    });

    // set up table sorter, but disable the third column
    $('#exog-table').tablesorter({
      debug: true,
      headers: {2: {sorter: false}}
    });

    // update table sort
    $('#exog-table').trigger('update');
    var sortOrder = [[0, 0], [1, 0]]
    $('#exog-table').trigger('sorton', [sortOrder]);
    
  })


});