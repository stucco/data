/*global browser:true, $:true, jquery:true */

$().ready(function () {
  'use strict';

  var parseRow = function (value) {
    var name = value.name || ''
      , url = value.url || ''
      , type = value.type || ''
      , loc = value.location || ''
      , infoUrl = value.info || ''
      , desc = value.description || ''
      , category = value.category || ''
    
    var sourceStr = '<a href="' + infoUrl + '">' + name + '</a> &nbsp; ' + '<i class="' + (loc === 'ex' ? 'icon-globe' : 'icon-hdd') + '"></i>';
      
    var typeIcon = 'icon-bookmark'; // default to web
    if ( type === 'RSS' || type === 'Atom' ) {
      typeIcon = 'icon-rss';
    }
    else if ( type === 'file' ) {
      typeIcon = 'icon-file';
    }
    else if ( type === 'API' ) {
      typeIcon = 'icon-cogs';
    }
    var typeStr = '<i class="' + typeIcon + '">' + type + '</i>';
    
    var row = 
        '<tr>'
      + '<td>' + sourceStr + '</td>'
      + '<td>' + typeStr + '</td>'
      + '<td>' + desc + '<br><strong>URL:</strong> <a href="' + url + '">' + url + '</a></td>'
      + '<td>' + category + '</td>'
      + '</tr>';
    return row;
  }

  // set up tooltips for table headers - text in markup
  $('#datasource-table thead tr th span').tooltip();
  
  // async load table data and reorder on first and second columns
  $.getJSON('data/sorted_sources.json', function (data) {
    $.each(data, function (index, row) {
      $('#datasource-table tbody').append(parseRow(row));
    });

    // set up table sorter, but disable the third column
    $('#datasource-table').tablesorter({
      headers: {2: {sorter: false}}
    , cancelSelection: true
    });

    // update table sort
    $('#datasource-table').trigger('update');
    var sortOrder = [[0, 0], [1, 0]]
    $('#datasource-table').trigger('sorton', [sortOrder]);
    
  })


});