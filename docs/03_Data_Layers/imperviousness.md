Imperviousness
================

*Percent impervious land cover*

#### Description

This layer is a pixel-wise imperviousness derived from the Nature
Conservancy’s high-resolution land cover data set. It is a binary
classification of imperviousness (1 = impervious, 0 = not impervious)

#### Layer Access

##### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Imperviousness"]

#### Data

| Label | Raster value | Colors                                                                    |
|:------|:-------------|:--------------------------------------------------------------------------|
| NA    | 0            | ![\#10371c](https://via.placeholder.com/15/10371c/000000?text=+)`#10371c` |
| NA    | 1            | ![\#f2298f](https://via.placeholder.com/15/f2298f/000000?text=+)`#f2298f` |

#### Source

The Nature Conservancy

#### External Links
