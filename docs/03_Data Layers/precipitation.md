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
| <svg width="15" height="15"><rect width="15" height="15" fill="#ffffff"/></svg> `#ffffff` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#fdef9a"/></svg> `#fdef9a` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#aad85c"/></svg> `#aad85c` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#5ab978"/></svg> `#5ab978` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#3c9387"/></svg> `#3c9387` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#206e8b"/></svg> `#206e8b` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#14439c"/></svg> `#14439c` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#2a186c"/></svg> `#2a186c` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#4a1486"/></svg> `#4a1486` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#6a51a3"/></svg> `#6a51a3` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#807dba"/></svg> `#807dba` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#9e9ac8"/></svg> `#9e9ac8` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#bcbddc"/></svg> `#bcbddc` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#dadaeb"/></svg> `#dadaeb` |

**Minimum:** 500 mm/year

**Maximum:** 3800 mm/year

## Source

Salathé et al 2019

## External Links

<a>https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/</a>
