Hydrologic Response Units
================

*Units of common soils, land cover, and slope used in continuous simulation modeling.*

## Description

Hydrologic response units (HRUs) are discretized landscape units based
on common soils, land cover, and slope characteristics. The HRU approach
provides a computationally efficient method of pre-computing hydrologic
response for later use. Results for a particular watershed can be
calculated by summing or averaging the results for individual HRUs.

Each combination of parameters was modeled in separate batched
simulations. HRUs were designated by a three-digit number according to
the following convention:

-   **First digit:** Hydrologic Soil Group Number *(0 = A/B, 1 = C, 2 =
    Saturated)*
-   **Second digit:** Land cover *(0=Forest, 1=Pasture, 2=Lawn,
    5=Impervious)*
-   **Third Digit:** Slope *(0=Flat, 1=Mod, 2=Steep)*

For example, a site with Type C soils, with forested land cover, on a
moderate slope would be represented by `101`. This schema allowed for
HRUs to be stored as an eight-bit unsigned integer on a Puget-Sound wide
raster, minimizing storage size.

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
var layer_name = data.rasters["Hydrologic Response Units"]
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
Map.addLayer(raw_image,{},'Hydrologic Response Units')
```

## Visualization

### Palette

| Label                        | Raster value | Colors                                                                    |
|:-----------------------------|:-------------|:--------------------------------------------------------------------------|
| Outwash, Forest, Flat        | 0            | ![\#e5f5f9](https://via.placeholder.com/15/e5f5f9/000000?text=+)`#e5f5f9` |
| Outwash, Forest, Moderate    | 1            | ![\#99d8c9](https://via.placeholder.com/15/99d8c9/000000?text=+)`#99d8c9` |
| Outwash, Forest, Steep       | 2            | ![\#2ca25f](https://via.placeholder.com/15/2ca25f/000000?text=+)`#2ca25f` |
| Outwash, Pasture, Flat       | 10           | ![\#e0ecf4](https://via.placeholder.com/15/e0ecf4/000000?text=+)`#e0ecf4` |
| Outwash, Pasture, Moderate   | 11           | ![\#9ebcda](https://via.placeholder.com/15/9ebcda/000000?text=+)`#9ebcda` |
| Outwash, Pasture, Steep      | 12           | ![\#8856a7](https://via.placeholder.com/15/8856a7/000000?text=+)`#8856a7` |
| Outwash, Lawn , Flat         | 20           | ![\#e0f3db](https://via.placeholder.com/15/e0f3db/000000?text=+)`#e0f3db` |
| Outwash, Lawn , Moderate     | 21           | ![\#a8ddb5](https://via.placeholder.com/15/a8ddb5/000000?text=+)`#a8ddb5` |
| Outwash, Lawn , Steep        | 22           | ![\#43a2ca](https://via.placeholder.com/15/43a2ca/000000?text=+)`#43a2ca` |
| Till, Forest, Flat           | 100          | ![\#ece7f2](https://via.placeholder.com/15/ece7f2/000000?text=+)`#ece7f2` |
| Till, Forest, Moderate       | 101          | ![\#a6bddb](https://via.placeholder.com/15/a6bddb/000000?text=+)`#a6bddb` |
| Till, Forest, Steep          | 102          | ![\#2b8cbe](https://via.placeholder.com/15/2b8cbe/000000?text=+)`#2b8cbe` |
| Till, Pasture, Flat          | 110          | ![\#ece2f0](https://via.placeholder.com/15/ece2f0/000000?text=+)`#ece2f0` |
| Till, Pasture, Moderate      | 111          | ![\#a6bddb](https://via.placeholder.com/15/a6bddb/000000?text=+)`#a6bddb` |
| Till, Pasture, Steep         | 112          | ![\#1c9099](https://via.placeholder.com/15/1c9099/000000?text=+)`#1c9099` |
| Till, Lawn , Flat            | 120          | ![\#e7e1ef](https://via.placeholder.com/15/e7e1ef/000000?text=+)`#e7e1ef` |
| Till, Lawn , Moderate        | 121          | ![\#c994c7](https://via.placeholder.com/15/c994c7/000000?text=+)`#c994c7` |
| Till, Lawn , Steep           | 122          | ![\#dd1c77](https://via.placeholder.com/15/dd1c77/000000?text=+)`#dd1c77` |
| Saturated, Forest, Flat      | 200          | ![\#fde0dd](https://via.placeholder.com/15/fde0dd/000000?text=+)`#fde0dd` |
| Saturated, Forest, Moderate  | 201          | ![\#fa9fb5](https://via.placeholder.com/15/fa9fb5/000000?text=+)`#fa9fb5` |
| Saturated, Forest, Steep     | 202          | ![\#c51b8a](https://via.placeholder.com/15/c51b8a/000000?text=+)`#c51b8a` |
| Saturated, Pasture, Flat     | 210          | ![\#edf8b1](https://via.placeholder.com/15/edf8b1/000000?text=+)`#edf8b1` |
| Saturated, Pasture, Moderate | 211          | ![\#7fcdbb](https://via.placeholder.com/15/7fcdbb/000000?text=+)`#7fcdbb` |
| Saturated, Pasture, Steep    | 212          | ![\#2c7fb8](https://via.placeholder.com/15/2c7fb8/000000?text=+)`#2c7fb8` |
| Saturated, Lawn , Flat       | 220          | ![\#f7fcb9](https://via.placeholder.com/15/f7fcb9/000000?text=+)`#f7fcb9` |
| Saturated, Lawn , Moderate   | 221          | ![\#addd8e](https://via.placeholder.com/15/addd8e/000000?text=+)`#addd8e` |
| Saturated, Lawn , Steep      | 222          | ![\#31a354](https://via.placeholder.com/15/31a354/000000?text=+)`#31a354` |
| Impervious, Flat             | 250          | ![\#fee6ce](https://via.placeholder.com/15/fee6ce/000000?text=+)`#fee6ce` |
| Impervious, Moderate         | 251          | ![\#fdae6b](https://via.placeholder.com/15/fdae6b/000000?text=+)`#fdae6b` |
| Impervious, Steep            | 252          | ![\#e6550d](https://via.placeholder.com/15/e6550d/000000?text=+)`#e6550d` |

## Source

The Nature Conservancy

## External Links
