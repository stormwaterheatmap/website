Flow Duration Index
================

*Dimensionless index indicating level of flow control needed to match
forest hydrology.*

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
\[technical reference.\](

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Flow Duration Index"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#FFFFCC](https://via.placeholder.com/15/FFFFCC/000000?text=+)`#FFFFCC` |
| NA           | ![\#FBEC9A](https://via.placeholder.com/15/FBEC9A/000000?text=+)`#FBEC9A` |
| NA           | ![\#F4CC68](https://via.placeholder.com/15/F4CC68/000000?text=+)`#F4CC68` |
| NA           | ![\#ECA855](https://via.placeholder.com/15/ECA855/000000?text=+)`#ECA855` |
| NA           | ![\#E48751](https://via.placeholder.com/15/E48751/000000?text=+)`#E48751` |
| NA           | ![\#D2624D](https://via.placeholder.com/15/D2624D/000000?text=+)`#D2624D` |
| NA           | ![\#A54742](https://via.placeholder.com/15/A54742/000000?text=+)`#A54742` |
| NA           | ![\#73382F](https://via.placeholder.com/15/73382F/000000?text=+)`#73382F` |
| NA           | ![\#422818](https://via.placeholder.com/15/422818/000000?text=+)`#422818` |
| NA           | ![\#1A1A01](https://via.placeholder.com/15/1A1A01/000000?text=+)`#1A1A01` |

### Color Ramp

<img src="C:/Users/CNilsen/Documents/repos/heatmap_earthengine/layer_docs/flow_duration_index_files/figure-gfm/unnamed-chunk-9-1.png" width="340" />

**Minimum:** 1 index

**Maximum:** 10 index

## Source

The Nature Conservancy

## External Links
