Slope Categories
================

*Categorized ground surface slope*

## Description

Categorized ground surface slope

Slope values were calculated from the USGS National Elevation Dataset.
Elevations were provided in 1⁄3 arc-second resolution (approximately
10-meters). Slope was calculated using the 4-connected neighbors of each
pixel and classified into the following categories, consistent with
Ecology guidance:

-   Flat: &lt; 5%
-   Moderate: 5-15%
-   Steep: &gt; 15%

The NED is derived from diverse source data that are processed to a
common coordinate system and unit of vertical measure. NED data are
distributed in conformance with the North American Datum of 1983 (NAD
83). All elevation values are referenced to the North American Vertical
Datum of 1988 (NAVD 88).

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Slope Categories"]

## Visualization

### Palette

| Label    | Raster value | Colors                                                                    |
|:---------|:-------------|:--------------------------------------------------------------------------|
| Flat     | 0            | ![\#009B9E](https://via.placeholder.com/15/009B9E/000000?text=+)`#009B9E` |
| Moderate | 1            | ![\#F1F1F1](https://via.placeholder.com/15/F1F1F1/000000?text=+)`#F1F1F1` |
| Steep    | 2            | ![\#C75DAB](https://via.placeholder.com/15/C75DAB/000000?text=+)`#C75DAB` |

## Source

The Nature Conservancy

## External Links
