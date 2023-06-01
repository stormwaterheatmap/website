Pollutant Concentration
================

*Predicted Pollutant Concentration*

## Description

Pollutant concentrations have been derived from a series of linear mixed-effects models using spatial covariates. Regressions were performed on outfall stormwater measurements from the Washington State Department of Ecology's S8.D Municipal Stormwater Permit Outfall Data. The stormwater outfall data is available via an open-data api at: [<https://data.wa.gov/Natural-Resources-Environment/Municipal-Stormwater-> Permit-Outfall-Data/d958-q2ci.](https://data.wa.gov/Natural-Resources-Environment/Municipal-Stormwater-%20Permit-Outfall-Data/d958-q2ci.%20)

Heatmap layers have been developed for five constituents of concern:

-   Total Copper
-   Total Kjeldahl Nitrogen
-   Total Phosphorus
-   Total Suspended Solids
-   Total Zinc

For more details on methodology, see the [Water Quality Statistics documentation](/docs/Technical%20Reference/Components/Water%20Quality%20Statistics).

## Units 
Concentrations for all chemicals are provided in micrograms/liter (mcg/L) except for Total Suspended Solids, which is provided in milligrams/liter (mg/L). 

## Layer Access in Earth Engine

The javascript commands below can be used to access this layer within the Google Earth Engine Code Editor. A Google Earth Engine account is required.

``` javascript
// Import the layer data dictionary 
var data = require('users/stormwaterheatmap/apps:data/public')

// To view data dictionary, print to the console: 
print('Data:', data)

//Get this layer from the layer data dictionary: 
var layer_name = data.pollutant_loading[LayerName]
```

#### Viewing

Individual objects contain all the info used in the stormwater heatmap. To add it to the map, add the layer object.

``` javascript
var display_image = layer_name.layer 
Map.addLayer(display_image)
```

#### Analysis

To get the raw image data for analysis, access the eeObject key.

``` javascript
var raw_image = layer_name.layer.eeObject 
Map.addLayer(raw_image,{},'Imperviousness')
```

## Layer Access in ArcGIS Online

The pollution concentration data represent estimated modeled values that can be used to evaluate relative values across the region.

These data layers are available for download as GeoTIFF files at a WGS 84 projection. The resolution values represent the finest available based on the source data. Please note that by clicking on the "download" link, the download will begin. File sizes are listed next to the layer names.

1. Copper Concentration ug/L (1.6 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Total_Copper_Concentration.tif)
2. Phosphorus Concentration ug/L (1.6 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Total_Phosphorus_Concentration.tif)
3. TKN Concentration ug/L (1.1 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Total_Kjeldahl_Nitrogen_Concentration.tif)
4. TSS Concentration ug/L (1.1 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Total_Suspended_Solids_Concentration.tif)
5. Zinc Concentration ug/L (1.2 GB) [download](https://storage.googleapis.com/live_data_layers/rasters/Total_Zinc_Concentration.tif)
