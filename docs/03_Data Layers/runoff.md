# Runoff

*Mean annual runoff calculated through continuous simulation for the period 1970-1999.*

## Description

Continuous hydrology simulation was performed using regional
pre-calibrated parameters. Batched simulations were run for combinations
of land cover, soils, and slopes across the Puget Sound domain.

To allow for parallel computations, a python adaption of HSPF
[(PyHSPF)](https://github.com/djlampert/PyHSPF) developed by David
Lambert with funding from the United States Department of Energy, Energy
Efficiency & Renewable Energy, Bioenergy Technologies Office (Lampert,
2019) was used to model rainfall-runoff responses. Regional calibration
factors for the Puget Lowlands Ecoregion were used as developed by
Dinicola (1990) and Clear Creek Solutions (Department of Ecology, 2014).

HSPF calculates discharge for for three flow-paths: surface flow,
interflow, and groundwater flow, referred to as `SURO`, `INFW`, and
`AGWO` respectively. We report only `SURO`, `INFW`, consistent with
Ecology Guidance.

More information, including verification of results can be found in the
[technical reference.](/docs/Technical%20Reference/Components/Hydrology)

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
var layer_name = data.rasters["Runoff"]
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
Map.addLayer(raw_image,{},'Runoff')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Runoff (mm) (5.3 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Runoff_mm.tif)

## Visualization

### Palette

| Colors                                                                 |
|:-----------------------------------------------------------------------|
| <svg width="15" height="15"><rect width="15" height="15" fill="#eafdfd"/></svg> `#eafdfd` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#9cd4da"/></svg> `#9cd4da` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#61a8c7"/></svg> `#61a8c7` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#427bb7"/></svg> `#427bb7` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#3f4b96"/></svg> `#3f4b96` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#292851"/></svg> `#292851` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#040613"/></svg> `#040613` |

**Minimum:** 25 mm/year

**Maximum:** 1016 mm/year

## Source

The Nature Conservancy

## External Links
