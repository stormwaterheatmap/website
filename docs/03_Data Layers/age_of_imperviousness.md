Age of Imperviousness
================

*Impervious surface by estimated date of conversion. Used to estimate level of current stormwater treatment.*

## Description

This layer provides multi-temporal information on the presence of
built-up surfaces derived from global Landsat satellite data collected
from 1975 to 2014. The base image data collections were prepared by the
[Global Land
Survey](https://www.usgs.gov/core-science-systems/nli/landsat/global-land-survey-gls)
and the [Joint Research Center](https://ec.europa.eu/jrc/en). The data
was processed by fully automatic and reproducible methods based on
statistical learning (Symbolic Machine Learning. The source product was
developed with a spatial resolution of 30 meters. To provide a finer
resolution for the stormwater heatmap, the source product was masked by
[1-meter resolution imperviousness data](docs/) developed by the Nature
Conservancy.

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
var layer_name = data.rasters["Age of Imperviousness"]
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
Map.addLayer(raw_image,{},'Age of Imperviousness')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Age of Imperviousness (11.3 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Age_of_Imperviousness.tif)

## Visualization

### Palette

| Label                                        | Raster value | Colors                                                                 |
|:---------------------------------------------|:-------------|:-----------------------------------------------------------------------|
| 2000–2014 (stormwater likely treated)        | 3            | ![9e+73](https://via.placeholder.com/15/9e+73/000000?text=+)`9e+73`    |
| 1990–2000 (some stormwater treatment)        | 4            | ![F0E442](https://via.placeholder.com/15/F0E442/000000?text=+)`F0E442` |
| Before 1990 (likely no stormwater treatment) | 5            | ![CC6677](https://via.placeholder.com/15/CC6677/000000?text=+)`CC6677` |

## Source

The Nature Conservancy; Columbia University, Center for International
Earth Science Information Network

## External Links

<a>http://doi.org/10.2905/jrc-ghsl-10007</a>
