Population Density
================

*2010 Census, population density*

## Description

Population density from the 2010 census, reported by census block.

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
var layer_name = data.rasters["Population Density"]
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
Map.addLayer(raw_image,{},'Population Density')
```

## Visualization

### Palette

| Colors                                                                    |
|:--------------------------------------------------------------------------|
| ![\#FFC5D4](https://via.placeholder.com/15/FFC5D4/000000?text=+)`#FFC5D4` |
| ![\#FFB3D0](https://via.placeholder.com/15/FFB3D0/000000?text=+)`#FFB3D0` |
| ![\#EF98B6](https://via.placeholder.com/15/EF98B6/000000?text=+)`#EF98B6` |
| ![\#DE7C9C](https://via.placeholder.com/15/DE7C9C/000000?text=+)`#DE7C9C` |
| ![\#CC6184](https://via.placeholder.com/15/CC6184/000000?text=+)`#CC6184` |
| ![\#BB446C](https://via.placeholder.com/15/BB446C/000000?text=+)`#BB446C` |
| ![\#A82255](https://via.placeholder.com/15/A82255/000000?text=+)`#A82255` |
| ![\#672941](https://via.placeholder.com/15/672941/000000?text=+)`#672941` |

**Minimum:** 0 Population per ha

**Maximum:** 100 Population per ha

## Source

2010 US Census Blocks

## External Links

<a>https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2010/TGRSHP10SF1.pdf</a>
