HSPF Land Cover Type
================

*Land cover classified by categories used in HSPF/WWHM*

## Description

This layer provides land cover classifications corresponding to default
categories used in the [Western Washington Hydrology
Model.](https://ecology.wa.gov/Regulations-Permits/Guidance-technical-assistance/Stormwater-permittee-guidance-resources/Stormwater-manuals/Western-Washington-Hydrology-Model#latest)

Land cover was derived from the Nature Conservancy’s high-resolution
land cover data set and remapped according to the table below:

| Derived Land Cover                                             | HSPF Land cover class |
|:---------------------------------------------------------------|:----------------------|
| Fine Vegetation                                                | Grass                 |
| Medium Vegetation                                              | Grass                 |
| Coarse Vegetation                                              | Forest                |
| Dirt/Barren                                                    | Grass                 |
| Water                                                          | Water                 |
| Impervious Other                                               | Impervious            |
| Impervious Roofs (roofs were designated impervious/flat slope) | Impervious            |
| NLCD Cropland                                                  | Pasture               |

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
var layer_name = data.rasters["HSPF Land Cover Type"]
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
Map.addLayer(raw_image,{},'HSPF Land Cover Type')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

HSPF Land Cover Type (43.9 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/HSPF_Land_Cover_Type.tif)

## Visualization

### Palette

| Label              | Raster value | Colors                                                                    |
|:-------------------|:-------------|:--------------------------------------------------------------------------|
| Forest/Trees       | 0            | ![\#55775e](https://via.placeholder.com/15/55775e/000000?text=+)`#55775e` |
| Pasture            | 1            | ![\#dacd7f](https://via.placeholder.com/15/dacd7f/000000?text=+)`#dacd7f` |
| Grass              | 2            | ![\#7e9e87](https://via.placeholder.com/15/7e9e87/000000?text=+)`#7e9e87` |
| Water              | 3            | ![\#b3caff](https://via.placeholder.com/15/b3caff/000000?text=+)`#b3caff` |
| Impervious-roof    | 4            | ![\#844c8b](https://via.placeholder.com/15/844c8b/000000?text=+)`#844c8b` |
| Impervious-nonRoof | 5            | ![\#ead1ff](https://via.placeholder.com/15/ead1ff/000000?text=+)`#ead1ff` |

## Source

The Nature Conservancy

## External Links
