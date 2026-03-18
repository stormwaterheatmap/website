# Hydrologic Response Units

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

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Hydrologic Response Units (99.4 MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Hydrologic_Response_Units.tif)

## Visualization

### Palette

| Label                        | Raster value | Colors                                                                    |
|:-----------------------------|:-------------|:--------------------------------------------------------------------------|
| Outwash, Forest, Flat        | 0            | <svg width="15" height="15"><rect width="15" height="15" fill="#e5f5f9"/></svg> `#e5f5f9` |
| Outwash, Forest, Moderate    | 1            | <svg width="15" height="15"><rect width="15" height="15" fill="#99d8c9"/></svg> `#99d8c9` |
| Outwash, Forest, Steep       | 2            | <svg width="15" height="15"><rect width="15" height="15" fill="#2ca25f"/></svg> `#2ca25f` |
| Outwash, Pasture, Flat       | 10           | <svg width="15" height="15"><rect width="15" height="15" fill="#e0ecf4"/></svg> `#e0ecf4` |
| Outwash, Pasture, Moderate   | 11           | <svg width="15" height="15"><rect width="15" height="15" fill="#9ebcda"/></svg> `#9ebcda` |
| Outwash, Pasture, Steep      | 12           | <svg width="15" height="15"><rect width="15" height="15" fill="#8856a7"/></svg> `#8856a7` |
| Outwash, Lawn , Flat         | 20           | <svg width="15" height="15"><rect width="15" height="15" fill="#e0f3db"/></svg> `#e0f3db` |
| Outwash, Lawn , Moderate     | 21           | <svg width="15" height="15"><rect width="15" height="15" fill="#a8ddb5"/></svg> `#a8ddb5` |
| Outwash, Lawn , Steep        | 22           | <svg width="15" height="15"><rect width="15" height="15" fill="#43a2ca"/></svg> `#43a2ca` |
| Till, Forest, Flat           | 100          | <svg width="15" height="15"><rect width="15" height="15" fill="#ece7f2"/></svg> `#ece7f2` |
| Till, Forest, Moderate       | 101          | <svg width="15" height="15"><rect width="15" height="15" fill="#a6bddb"/></svg> `#a6bddb` |
| Till, Forest, Steep          | 102          | <svg width="15" height="15"><rect width="15" height="15" fill="#2b8cbe"/></svg> `#2b8cbe` |
| Till, Pasture, Flat          | 110          | <svg width="15" height="15"><rect width="15" height="15" fill="#ece2f0"/></svg> `#ece2f0` |
| Till, Pasture, Moderate      | 111          | <svg width="15" height="15"><rect width="15" height="15" fill="#a6bddb"/></svg> `#a6bddb` |
| Till, Pasture, Steep         | 112          | <svg width="15" height="15"><rect width="15" height="15" fill="#1c9099"/></svg> `#1c9099` |
| Till, Lawn , Flat            | 120          | <svg width="15" height="15"><rect width="15" height="15" fill="#e7e1ef"/></svg> `#e7e1ef` |
| Till, Lawn , Moderate        | 121          | <svg width="15" height="15"><rect width="15" height="15" fill="#c994c7"/></svg> `#c994c7` |
| Till, Lawn , Steep           | 122          | <svg width="15" height="15"><rect width="15" height="15" fill="#dd1c77"/></svg> `#dd1c77` |
| Saturated, Forest, Flat      | 200          | <svg width="15" height="15"><rect width="15" height="15" fill="#fde0dd"/></svg> `#fde0dd` |
| Saturated, Forest, Moderate  | 201          | <svg width="15" height="15"><rect width="15" height="15" fill="#fa9fb5"/></svg> `#fa9fb5` |
| Saturated, Forest, Steep     | 202          | <svg width="15" height="15"><rect width="15" height="15" fill="#c51b8a"/></svg> `#c51b8a` |
| Saturated, Pasture, Flat     | 210          | <svg width="15" height="15"><rect width="15" height="15" fill="#edf8b1"/></svg> `#edf8b1` |
| Saturated, Pasture, Moderate | 211          | <svg width="15" height="15"><rect width="15" height="15" fill="#7fcdbb"/></svg> `#7fcdbb` |
| Saturated, Pasture, Steep    | 212          | <svg width="15" height="15"><rect width="15" height="15" fill="#2c7fb8"/></svg> `#2c7fb8` |
| Saturated, Lawn , Flat       | 220          | <svg width="15" height="15"><rect width="15" height="15" fill="#f7fcb9"/></svg> `#f7fcb9` |
| Saturated, Lawn , Moderate   | 221          | <svg width="15" height="15"><rect width="15" height="15" fill="#addd8e"/></svg> `#addd8e` |
| Saturated, Lawn , Steep      | 222          | <svg width="15" height="15"><rect width="15" height="15" fill="#31a354"/></svg> `#31a354` |
| Impervious, Flat             | 250          | <svg width="15" height="15"><rect width="15" height="15" fill="#fee6ce"/></svg> `#fee6ce` |
| Impervious, Moderate         | 251          | <svg width="15" height="15"><rect width="15" height="15" fill="#fdae6b"/></svg> `#fdae6b` |
| Impervious, Steep            | 252          | <svg width="15" height="15"><rect width="15" height="15" fill="#e6550d"/></svg> `#e6550d` |

## Source

The Nature Conservancy

## External Links
