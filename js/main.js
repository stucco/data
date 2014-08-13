/*global browser:true, $:true, jquery:true */

$().ready(function () {
  'use strict';

  //see parsers documentation: http://mottie.github.io/tablesorter/docs/example-parsers.html
  //parser for the "status" column
  $.tablesorter.addParser({
    // set a unique id
    id: 'status',
    is: function(s, table, cell) {
      // return false so this parser is not auto detected
      return false;
    },
    format: function(s, table, cell, cellIndex) {
      // format your data for normalization
      return s.toLowerCase()
        .replace(/low/,4)
        .replace(/medium/,3)
        .replace(/high/,2)
        .replace(/pending/,1)
        .replace(/done/,0);
    },
    // set type, either numeric or text
    type: 'numeric'
  });

  var parseRow = function (value) {
    var name = value.name || ''
      , url = value.url || ''
      , type = value.type || ''
      , loc = value.location || ''
      , infoUrl = value.info || ''
      , desc = value.description || ''
      , category = value.category || ''
      , priority = value.priority || '';
    
    var sourceStr = '<a href="' + infoUrl + '">' + name + '</a> &nbsp; ' + '<i class="' + (loc === 'ex' ? 'fa fa-fw fa-globe' : 'fa fa-fw fa-hdd') + '"></i>';
      
    var typeIcon = 'fa fa-fw fa-bookmark'; // default to web
    if ( type === 'RSS' || type === 'Atom' ) {
      typeIcon = 'fa fa-fw fa-rss';
    }
    else if ( type === 'file' ) {
      typeIcon = 'fa fa-fw fa-file';
    }
    else if ( type === 'API' ) {
      typeIcon = 'fa fa-fw fa-cogs';
    }
    var typeStr = '<i class="' + typeIcon + '" data-toggle="tooltip" title="' + type + '"></i>';
    
    var row = 
        '<tr>'
      + '<td>' + sourceStr + '</td>'
      + '<td>' + typeStr + '</td>'
      + '<td>' + category + '</td>'
      + '<td>' + desc + '<br><strong>URL:</strong> <a href="' + url + '">' + url + '</a></td>'
      + '<td>' + priority + '</td>'
      + '</tr>';
    return row;
  }

  // set up tooltips for table headers, etc
  $('[data-toggle="tooltip"]').tooltip();
  
  // async load table data and reorder on first and second columns
  $.getJSON('data/sources.json', function (data) {
    $.each(data, function (index, row) {
      $('#datasource-table tbody').append(parseRow(row));
    });

    // set up table sorter, but disable the third column
    var sortOrder = [[2,0], [0,0]];
    $('#datasource-table').tablesorter({
      headers: {3: {sorter: false}, 4: { sorter: 'status' }}
    , cancelSelection: true
    , sortList: sortOrder
    });
    
  })

});