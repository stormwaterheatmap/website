Slope Categories
================

*Categorized ground surface slope*

## Description

Categorized ground surface slope

Slope values were calculated from the USGS National Elevation Dataset.
Elevations were provided in 1⁄3 arc-second resolution (approximately
10-meters). Slope was calculated using the 4-connected neighbors of each
pixel and classified into the following categories, consistent with
Ecology guidance:

-   Flat: &lt; 5%
-   Moderate: 5-15%
-   Steep: &gt; 15%

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
var layer_name = data.rasters["Slope Categories"]
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
Map.addLayer(raw_image,{},'Slope Categories')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Slope Categories (1.1 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Slope_Categories.tif)

## Visualization

### Palette

| Label    | Raster value | Colors                                                                    |
|:---------|:-------------|:--------------------------------------------------------------------------|
| Flat     | 0            | ![\#009B9E](https://via.placeholder.com/15/009B9E/000000?text=+)`#009B9E` |
| Moderate | 1            | ![\#F1F1F1](https://via.placeholder.com/15/F1F1F1/000000?text=+)`#F1F1F1` |
| Steep    | 2            | ![\#C75DAB](https://via.placeholder.com/15/C75DAB/000000?text=+)`#C75DAB` |

## Source

The Nature Conservancy

## External Links
