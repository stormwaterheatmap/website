Flow Duration Index
================

*Dimensionless index indicating level of flow control needed to match forest hydrology.*

## Description

Ecology Stormwater Guidance includes flow-related performance standards
to protect receiving waters from degradation caused by changes in the
hydrologic regime due to development. These performance standards rely
on flow-duration matching, whereby flow durations from developed land
are required to match pre-developed flow-durations for a range of
discharge values. The flow duration standard is intended to prevent
flashy flows in receiving stream channels.

We developed an index representing the magnitude of change to the
flow-duration curve between flow thresholds. Thresholds were chosen
based on Ecology’s LID and Flow Control Standards (Department of
Ecology, 2014), which require flow-duration matching over the range
between 8 percent of the 2-year peak discharge (lower threshold of the
LID standard) up to the 50-year peak discharge (upper threshold of the
flow-control standard).

The flow discharge index is calculated by summing the discharge over the
simulation period between a high-flow and low-flow threshold. This index
is then applied to hru/grid combinations in the stormwater heatmap to
produce a spatially explicit mapping of flow alteration.

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
var layer_name = data.rasters["Flow Duration Index"]
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
Map.addLayer(raw_image,{},'Flow Duration Index')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Flow Duration Index (2.3 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Flow_Duration_Index.tif)

## Visualization

### Palette

| Colors                                                                 |
|:-----------------------------------------------------------------------|
| <svg width="15" height="15"><rect width="15" height="15" fill="#f0f9e8"/></svg> `#f0f9e8` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#a8ddb5"/></svg> `#a8ddb5` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#7bccc4"/></svg> `#7bccc4` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#43a2ca"/></svg> `#43a2ca` |
| <svg width="15" height="15"><rect width="15" height="15" fill="#0868ac"/></svg> `#0868ac` |

**Minimum:** 1 index

**Maximum:** 10 index

## Source

The Nature Conservancy

## External Links
