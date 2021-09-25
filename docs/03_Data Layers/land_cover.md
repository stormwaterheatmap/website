Land Cover
================

*1-meter resolution land cover classification*

## Description

This layer provides automatically-derived land cover classifications of
the Puget Sound trough below 1,500 meters elevation. A six-class 1-meter
land cover layer was developed using the Naïve Bayes classifier (Google,
2019) and trained using a 10-meter land cover product from NOAA Coastal
Change Analysis Program (C-CAP) (NOAA C-CAP, 2018a). Other data combined
with this analysis includes water body and river polygons (Washington
Department of Natural Resources), shoreline polygons (Esri), over-water
structure polygons (Washington Department of Natural Resources), road
polygons buffered from centerlines (U.S. Census Bureau, 2016), and
building rooftops polygons (Microsoft, 2019). Accuracy was validated
accuracy with an observed land cover point dataset from the Washington
Department of Fish & Wildlife (Pierce, Jr., 2015).

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Land Cover"]

## Visualization

### Palette

| Label                   | Raster value | Colors                                                                    |
|:------------------------|:-------------|:--------------------------------------------------------------------------|
| No data                 | 0            | ![\#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+)`#ffffff` |
| Grass/Low Vegetation    | 1            | ![\#3ead63](https://via.placeholder.com/15/3ead63/000000?text=+)`#3ead63` |
| Shrub/Medium Vegetation | 2            | ![\#96ca6e](https://via.placeholder.com/15/96ca6e/000000?text=+)`#96ca6e` |
| Trees/Forest            | 3            | ![\#26532b](https://via.placeholder.com/15/26532b/000000?text=+)`#26532b` |
| Bare soil               | 4            | ![\#a39171](https://via.placeholder.com/15/a39171/000000?text=+)`#a39171` |
| Water                   | 5            | ![\#476b9d](https://via.placeholder.com/15/476b9d/000000?text=+)`#476b9d` |
| Impervious              | 6            | ![\#adacb5](https://via.placeholder.com/15/adacb5/000000?text=+)`#adacb5` |
| Impervious - Roofs      | 7            | ![\#d8d5db](https://via.placeholder.com/15/d8d5db/000000?text=+)`#d8d5db` |

## Source

The Nature Conservancy

## External Links
