Slope
================

*Continuous ground surface slope in degrees*

## Description

Slope values were calculated from the USGS National Elevation Dataset.
Elevations were provided in 1⁄3 arc-second resolution (approximately
10-meters). Slope was calculated using the 4-connected neighbors of each
pixel and reported in degrees.

The NED is derived from diverse source data that are processed to a
common coordinate system and unit of vertical measure. NED data are
distributed in conformance with the North American Datum of 1983 (NAD
83). All elevation values are referenced to the North American Vertical
Datum of 1988 (NAVD 88).

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
var layer_name = data.rasters["Slope"]
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
Map.addLayer(raw_image,{},'Slope')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Slope (9 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Slope.tif)

## Visualization

### Palette

| Colors                                                                    |
|:--------------------------------------------------------------------------|
| ![\#3f60ae](https://via.placeholder.com/15/3f60ae/000000?text=+)`#3f60ae` |
| ![\#539eb6](https://via.placeholder.com/15/539eb6/000000?text=+)`#539eb6` |
| ![\#6db388](https://via.placeholder.com/15/6db388/000000?text=+)`#6db388` |
| ![\#cab843](https://via.placeholder.com/15/cab843/000000?text=+)`#cab843` |
| ![\#e78532](https://via.placeholder.com/15/e78532/000000?text=+)`#e78532` |
| ![\#d92120](https://via.placeholder.com/15/d92120/000000?text=+)`#d92120` |

**Minimum:** 0 Percent

**Maximum:** 20 Percent

## Source

USGS National Elevation Dataset 1/3 Arc-Second

## External Links

<a>https://nationalmap.gov/elevation.html</a>
