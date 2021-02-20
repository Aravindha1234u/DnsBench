var element = document.getElementById("chartdiv");
if(typeof(element) != 'undefined' && element != null){
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();
chart.maxZoomLevel = 1;
// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
//polygonTemplate.tooltipText = "{name}";
var map_color = document.getElementById('map_color').value;
if(map_color != '')
{
  polygonTemplate.fill = map_color;  
}
else
{
  polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);  
}


// Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = chart.colors.getIndex(0);   



// Add image series
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
var mapdata = document.getElementById('iq-map-data').value;



//console.log(mapdata);

imageSeries.data =  
 JSON.parse(mapdata)
;

// add events to recalculate map position when the map is moved or zoomed
chart.events.on( "ready", updateCustomMarkers );
chart.events.on( "mappositionchanged", updateCustomMarkers );



// this function will take current images on the map and create HTML elements for them
function updateCustomMarkers( event ) {
  
  // go through all of the images
  imageSeries.mapImages.each(function(image) {
    // check if it has corresponding HTML element
    if (!image.dummyData || !image.dummyData.externalElement) {
      // create onex
      image.dummyData = {
        externalElement: createCustomMarker(image)
      };
    }

    // reposition the element accoridng to coordinates
    var xy = chart.geoPointToSVG( { longitude: image.longitude, latitude: image.latitude } );
    image.dummyData.externalElement.style.top = xy.y + 'px';
    image.dummyData.externalElement.style.left = xy.x + 'px';
  });

}

// this function creates and returns a new marker element
function createCustomMarker( image ) {
 
  var chart = image.dataItem.component.chart;
  // create holder
  var holder = document.createElement( 'div' );
  holder.className = 'map-marker';
  //holder.title = image.dataItem.dataContext.title;
  
  //holder.setAttribute('data-original-title',image.dataItem.dataContext.title);
 
  holder.style.position = 'absolute';
  //console.log(image.dataItem.dataContext.tooltip_image['url']);

  // maybe add a link to it?
  if ( undefined != image.url ) {
    holder.onclick = function() {
      window.location.href = image.url;
    };
    holder.className += ' map-clickable';
  }



  // create dot
  var dot = document.createElement( 'div' );
  dot.className = 'dot';
  var content = `<div class="iq-tooltip-content">
                    <div class="tooltipimg">
                      <img src="`+image.dataItem.dataContext.tooltip_image['url']+`"/>
                    </div>
                    <div class="tooltip-title">
                      <`+image.dataItem.dataContext.title_tag+`>`+image.dataItem.dataContext.title+`</`+image.dataItem.dataContext.title_tag+`>
                    </div>`;
                    if(image.dataItem.dataContext.link)
                    {
                      var linkattr = 'href="'+image.dataItem.dataContext.link['url']+'"';
                      if(image.dataItem.dataContext.link['is_external'])
                      {
                         linkattr += 'target="_blank"';
                      }
                      if(image.dataItem.dataContext.link['nofollow'])
                      {
                         linkattr += 'rel="nofollow"';
                      }

                    content+=`<div class="tooltip-info">
                      <a `+linkattr+`>`+image.dataItem.dataContext.link_text+`</a>
                    </div>`;
                    }
      content += `</div>`;
  
  dot.setAttribute('data-content',content);
  dot.setAttribute('data-placement','top');
  holder.appendChild( dot );

  // create pulse
  var pulse = document.createElement( 'div' );
  pulse.className = 'pulse';
  holder.appendChild( pulse );

  // append the marker to the map container
  chart.svgContainer.htmlElement.appendChild( holder );

  return holder;
}

}); // end am4core.ready()
}