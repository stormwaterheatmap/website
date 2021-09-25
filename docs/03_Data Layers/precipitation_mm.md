Precipitation (mm)
================

*Mean annual precipitation (1970-1999)*

## Description

A region-wide, simulated precipitation dataset was provided by the
University of Washington Climate Impacts Group. Methodology used to
develop this dataset is documented in (Mauger et al., 2018). it dataset
contains modeled hourly precipitation using the GFDL CM3 global climate
model and the Representative Concentration Pathways (RCP) 8.5 scenario.

The GFDL model was chosen by CIG to due to its ability to accurately
model winter storm drivers, important for stormwater applications.
Combined with the higher emissions scenario, this modeling scenario
represents the upper end of expected future climate changes effects.

CIG downscaled GCM results using a statistical-dynamical approach to
capture the anticipated changes in extreme events as well as the
different drivers of rainfall that affect the Puget Sound Region.
Regional simulations were performed using the Weather Research and
Forecasting community mesoscale model. This resulted in hourly rainfall
predictions at an approximately 12 km grid size across Puget Sound.
Predictions were bias-corrected on a quantile-mapping basis.

Mean annual precipitation was calcuated on a per-grid basis for the
period between 1970 and 1999. Grid cells were resampled using bicubic
interpolation.

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Precipitation (mm)"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#781c81](https://via.placeholder.com/15/781c81/000000?text=+)`#781c81` |
| NA           | ![\#3f60ae](https://via.placeholder.com/15/3f60ae/000000?text=+)`#3f60ae` |
| NA           | ![\#539eb6](https://via.placeholder.com/15/539eb6/000000?text=+)`#539eb6` |
| NA           | ![\#6db388](https://via.placeholder.com/15/6db388/000000?text=+)`#6db388` |
| NA           | ![\#cab843](https://via.placeholder.com/15/cab843/000000?text=+)`#cab843` |
| NA           | ![\#e78532](https://via.placeholder.com/15/e78532/000000?text=+)`#e78532` |
| NA           | ![\#d92120](https://via.placeholder.com/15/d92120/000000?text=+)`#d92120` |

### Color Ramp

<img src="C:/Users/CNilsen/Documents/repos/heatmap_earthengine/layer_docs/precipitation_mm_files/figure-gfm/unnamed-chunk-9-1.png" width="340" />

**Minimum:** 20 in/year

**Maximum:** 120 in/year

## Source

Salathé et al 2019

## External Links

<a>https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/</a>
