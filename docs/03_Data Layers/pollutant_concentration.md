# Pollutant Concentration

*Predicted Pollutant Concentration*

# Description

Pollutant concentrations have been derived from a series of linear mixed-effects models using spatial covariates. Regressions were performed on outfall stormwater measurements from the Washington State Department of Ecology's S8.D Municipal Stormwater Permit Outfall Data. The stormwater outfall data is available via an open-data api at: [<https://data.wa.gov/Natural-Resources-Environment/Municipal-Stormwater-> Permit-Outfall-Data/d958-q2ci.](https://data.wa.gov/Natural-Resources-Environment/Municipal-Stormwater-%20Permit-Outfall-Data/d958-q2ci.%20)

Heatmap layers have been developed for five constituents of concern:

-   Total Copper
-   Total Kjeldahl Nitrogen
-   Total Phosphorus
-   Total Suspended Solids
-   Total Zinc

For more details on methodology, see the [Water Quality Statistics documentation](/docs/Technical%20Reference/Components/Water%20Quality%20Statistics).

# Units 
Concentrations for all chemicals are provided in micrograms/liter (mcg/L) except for Total Suspended Solids, which is provided in milligrams/liter (mg/L). 

# Layer Access in Earth Engine

The javascript commands below can be used to access this layer within the Google Earth Engine Code Editor. A Google Earth Engine account is required.

``` javascript
// Import the layer data dictionary 
var data = require('users/stormwaterheatmap/apps:data/public')

// To view data dictionary, print to the console: 
print('Data:', data)

//Get this layer from the layer data dictionary: 
var layer_name = data.pollutant_loading[LayerName]
```

**Viewing**

Individual objects contain all the info used in the stormwater heatmap. To add it to the map, add the layer object.

``` javascript
var display_image = layer_name.layer 
Map.addLayer(display_image)
```

**Analysis**

To get the raw image data for analysis, access the eeObject key.

``` javascript
var raw_image = layer_name.layer.eeObject 
Map.addLayer(raw_image,{},'Imperviousness')
```
