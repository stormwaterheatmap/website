Population Density
================

*2010 Census, population density*

:::caution Deprecated
Description to be updated 
:::

## Description

Population density from the 2010 census, reported by census block.

## Layer Access in Earth Engine

The javascript commands below can be used to access this layer within
the [Google Earth Engine Code
Editor](https://developers.google.com/earth-engine/guides/playground). A
Google Earth Engine account is required.

``` javascript
// Import the layer data dictionary
var data = require('users/stormwaterheatmap/apps:data/public')

// To view data dictionary, print to the console:
print('Data:', data)

//Get this layer from the layer data dictionary: 
var layer_name = data.rasters["Population Density"]
```

#### Viewing

Individual objects contain all the info used in the stormwater heatmap.
To add it to the map, add the layer object.

``` javascript
var display_image = layer_name.layer
Map.addLayer(display_image)
```

#### Analysis

To get the raw image data for analysis, access the `eeObject` key.

``` javascript
var raw_image = layer_name.layer.eeObject
Map.addLayer(raw_image,{},'Population Density')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Population Density (11.4 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Population_Density.tif)

## Visualization

### Palette

| Colors                                                                    |
|:--------------------------------------------------------------------------|
| <svg width="15" height="15"><rect width="15" height="15" fill="#FFC5D4"/></svg> `#FFC5D4` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#FFB3D0"/></svg> `#FFB3D0` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#EF98B6"/></svg> `#EF98B6` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#DE7C9C"/></svg> `#DE7C9C` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#CC6184"/></svg> `#CC6184` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#BB446C"/></svg> `#BB446C` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#A82255"/></svg> `#A82255` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#672941"/></svg> `#672941` |

**Minimum:** 0 Population per ha

**Maximum:** 100 Population per ha

## Source

2010 US Census Blocks

## External Links

<a>https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2010/TGRSHP10SF1.pdf</a>
