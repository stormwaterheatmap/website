Slope
================

*Continuous ground surface slope in degrees*

## Description

Slope values were calculated from the USGS National Elevation Dataset.
Elevations were provided in 1⁄3 arc-second resolution (approximately
10-meters). Slope was calculated using the 4-connected neighbors of each
pixel and reported in degrees.

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
    layer = data.rasters["Slope"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#3f60ae](https://via.placeholder.com/15/3f60ae/000000?text=+)`#3f60ae` |
| NA           | ![\#539eb6](https://via.placeholder.com/15/539eb6/000000?text=+)`#539eb6` |
| NA           | ![\#6db388](https://via.placeholder.com/15/6db388/000000?text=+)`#6db388` |
| NA           | ![\#cab843](https://via.placeholder.com/15/cab843/000000?text=+)`#cab843` |
| NA           | ![\#e78532](https://via.placeholder.com/15/e78532/000000?text=+)`#e78532` |
| NA           | ![\#d92120](https://via.placeholder.com/15/d92120/000000?text=+)`#d92120` |

**Minimum:** 0 Percent

**Maximum:** 20 Percent

## Source

USGS National Elevation Dataset 1/3 Arc-Second

## External Links

<a>https://nationalmap.gov/elevation.html</a>
