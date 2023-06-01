Imperviousness
================

*Percent impervious land cover*

## Description

This layer is a pixel-wise imperviousness derived from the Nature
Conservancy’s high-resolution land cover data set. It is a binary
classification of imperviousness (1 = impervious, 0 = not impervious)

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
var layer_name = data.rasters["Imperviousness"]
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
Map.addLayer(raw_image,{},'Imperviousness')
```

## Layer Access in ArcGIS Online

This data layer is available for download as a GeoTIFF file at a WGS 84 projection. The resolution represents the finest  available based on the source data. Please note that by clicking on the "download" link, the download will begin. File size is listed next to the layer name.

Imperviousness (2.8 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Imperviousness.tif)

## Visualization

### Palette

| Colors                                                                    |
|:--------------------------------------------------------------------------|
| ![\#002564](https://via.placeholder.com/15/002564/000000?text=+)`#002564` |
| ![\#fce644](https://via.placeholder.com/15/fce644/000000?text=+)`#fce644` |

**Minimum:** 0 Percent

**Maximum:** 1 Percent

## Source

The Nature Conservancy

## External Links
