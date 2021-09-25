HSPF Land Cover Type
================

*Land cover classified by categories used in HSPF/WWHM*

## Description

This layer provides land cover classifications corresponding to default
categories used in the [Western Washington Hydrology
Model.](https://ecology.wa.gov/Regulations-Permits/Guidance-technical-assistance/Stormwater-permittee-guidance-resources/Stormwater-manuals/Western-Washington-Hydrology-Model#latest)

Land cover was derived from the Nature Conservancy’s high-resolution
land cover data set and remapped according to the table below:

| Derived Land Cover                                             | HSPF Land cover class |
|:---------------------------------------------------------------|:----------------------|
| Fine Vegetation                                                | Grass                 |
| Medium Vegetation                                              | Grass                 |
| Coarse Vegetation                                              | Forest                |
| Dirt/Barren                                                    | Grass                 |
| Water                                                          | Water                 |
| Impervious Other                                               | Impervious            |
| Impervious Roofs (roofs were designated impervious/flat slope) | Impervious            |
| NLCD Cropland                                                  | Pasture               |

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["HSPF Land Cover Type"]

## Visualization

### Palette

| Label              | Raster value | Colors                                                                    |
|:-------------------|:-------------|:--------------------------------------------------------------------------|
| Forest/Trees       | 0            | ![\#55775e](https://via.placeholder.com/15/55775e/000000?text=+)`#55775e` |
| Pasture            | 1            | ![\#dacd7f](https://via.placeholder.com/15/dacd7f/000000?text=+)`#dacd7f` |
| Grass              | 2            | ![\#7e9e87](https://via.placeholder.com/15/7e9e87/000000?text=+)`#7e9e87` |
| Water              | 3            | ![\#b3caff](https://via.placeholder.com/15/b3caff/000000?text=+)`#b3caff` |
| Impervious-roof    | 4            | ![\#844c8b](https://via.placeholder.com/15/844c8b/000000?text=+)`#844c8b` |
| Impervious-nonRoof | 5            | ![\#ead1ff](https://via.placeholder.com/15/ead1ff/000000?text=+)`#ead1ff` |

## Source

The Nature Conservancy

## External Links
