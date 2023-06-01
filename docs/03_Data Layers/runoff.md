Runoff
================

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

## Layer Access in ArcGIS Online

This data layer is available for download as a GeoTIFF file at a WGS 84 projection. The resolution represents the finest  available based on the source data. Please note that by clicking on the "download" link, the download will begin. File size is listed next to the layer name.

Runoff (mm) (5.3 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Runoff_mm.tif)

## Visualization

### Palette

| Colors                                                                 |
|:-----------------------------------------------------------------------|
| ![eafdfd](https://via.placeholder.com/15/eafdfd/000000?text=+)`eafdfd` |
| ![9cd4da](https://via.placeholder.com/15/9cd4da/000000?text=+)`9cd4da` |
| ![61a8c7](https://via.placeholder.com/15/61a8c7/000000?text=+)`61a8c7` |
| ![427bb7](https://via.placeholder.com/15/427bb7/000000?text=+)`427bb7` |
| ![3f4b96](https://via.placeholder.com/15/3f4b96/000000?text=+)`3f4b96` |
| ![292851](https://via.placeholder.com/15/292851/000000?text=+)`292851` |
| ![40613](https://via.placeholder.com/15/40613/000000?text=+)`40613`    |

**Minimum:** 25 mm/year

**Maximum:** 1016 mm/year

## Source

The Nature Conservancy

## External Links
