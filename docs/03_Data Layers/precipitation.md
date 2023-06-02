Precipitation
================

*Mean annual precipitation (1970-1999)*

## Description

A region-wide, simulated precipitation dataset was provided by the
University of Washington Climate Impacts Group. Methodology used to
develop this dataset is documented in (Mauger et al., 2018). This
dataset contains modeled hourly precipitation using the GFDL CM3 global
climate model and the Representative Concentration Pathways (RCP) 8.5
scenario.

The GFDL model was chosen by CIG to due to its ability to accurately
model winter storm drivers, important for stormwater applications.
Combined with the higher emissions scenario, this modeling scenario
represents the upper end of expected future climate changes effects.

CIG downscaled GCM results using a statistical-dynamical approach to
capture the anticipated changes in extreme events as well as the
different drivers of rainfall that affect the Puget Sound Region.
Regional simulations were performed using the Weather Research and
Forecasting community mesoscale model. This resulted in hourly rainfall
predictions at an approximately 12 km grid size across Puget Sound.
Predictions were bias-corrected on a quantile-mapping basis.

Mean annual precipitation was calcuated on a per-grid basis for the
period between 1970 and 1999. Grid cells were resampled using bicubic
interpolation.

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
var layer_name = data.rasters["Precipitation"]
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
Map.addLayer(raw_image,{},'Precipitation')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Precipitation (mm) (180.5 KB) [download](https://storage.googleapis.com/live_data_layers/rasters/Precipitation_mm.tif)

## Visualization

### Palette

| Colors                                                                 |
|:-----------------------------------------------------------------------|
| ![ffffff](https://via.placeholder.com/15/ffffff/000000?text=+)`ffffff` |
| ![fdef9a](https://via.placeholder.com/15/fdef9a/000000?text=+)`fdef9a` |
| ![aad85c](https://via.placeholder.com/15/aad85c/000000?text=+)`aad85c` |
| ![5ab978](https://via.placeholder.com/15/5ab978/000000?text=+)`5ab978` |
| ![3c9387](https://via.placeholder.com/15/3c9387/000000?text=+)`3c9387` |
| ![206e8b](https://via.placeholder.com/15/206e8b/000000?text=+)`206e8b` |
| ![14439c](https://via.placeholder.com/15/14439c/000000?text=+)`14439c` |
| ![2a186c](https://via.placeholder.com/15/2a186c/000000?text=+)`2a186c` |
| ![4a1486](https://via.placeholder.com/15/4a1486/000000?text=+)`4a1486` |
| ![6a51a3](https://via.placeholder.com/15/6a51a3/000000?text=+)`6a51a3` |
| ![807dba](https://via.placeholder.com/15/807dba/000000?text=+)`807dba` |
| ![9e9ac8](https://via.placeholder.com/15/9e9ac8/000000?text=+)`9e9ac8` |
| ![bcbddc](https://via.placeholder.com/15/bcbddc/000000?text=+)`bcbddc` |
| ![dadaeb](https://via.placeholder.com/15/dadaeb/000000?text=+)`dadaeb` |

**Minimum:** 500 mm/year

**Maximum:** 3800 mm/year

## Source

Salathé et al 2019

## External Links

<a>https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/</a>
