google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {

  var data = google.visualization.arrayToDataTable([
    ['Year', 'Fraud', 'Identity Theft', 'Other', 'Average'],
    ['2010',  820072,      251074,         399160,         490102],
    ['2011',  1041517,      279191,        577835,         632847.6667],
    ['2012',  1112693,      369958,         632428,        705026.3333],
    ['2013',  1159115,      290098,         685352,        711521.6667],
    ['2014',  1526365,      332545,         762021,        873643.6667],
    ['2015',  1165625,      490112,         1427784,       1027840.333],
    ['2016',  1226402,      398952,         1423823,       1016392.333],
    ['2017',  1290636,      371034,         1215464,       959044.6667],
    ['2018',  1427563,      444602,         1125354,       999173]
  ]);

  var options = {
    title : 'Theft',
    vAxis: {title: 'Numbers of reports'},
    hAxis: {title: 'Year'},
    seriesType: 'bars',
    series: {3: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}