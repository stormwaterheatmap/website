Total Suspended Solids Concentration
================

*Total Suspended Solids Concentration*

## Description

Predicted median annual total suspended solids (TSS) concentration ($\mu$/L) from stormwater
sources. <br>

Median annual TSS concentration predictions are based on *ln*-transformed observational TSS data and the following spatial predictors: rainfall, traffic, and paved.  The best-fit model for the fixed effects is: <br>

*ln*[TSS]~rain+traffic+paved<br>

The best fit variance structure for TSS included a combination of two variance structures, wehre residual variation differs by agency *j*, and also by rainfall at each location *i*, and date *k*. The parameter delta is estimated by the model: <br>
<br>
var(ε<sub>*ijk*</sub>) = σ<sup>2</sup><sub>j</sub> × *e*<sup>2δ × *rain<sub>ik*<br>

Observational data were obtained from the S8.D Municipal Stormwater Permit Outfall Data provided by the Washington Department of Ecology. Data included in the TSS model came from the following reporting agencies: King County, Pierce County, Snohomish County, Port of Tacoma, City of Tacoma, and City of Seattle. The best-fit model for TSS concentration is a random-intercept model where intercept of the linear model is allowed to shift up or down according to reporting agency.  TSS predictions for highways were capped at the highest level of traffic observed within the monitored watersheds, as we lack strong TSS-traffic relationships above that level with the Puget Sound region. 

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Total Suspended Solids Concentration"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#352a87](https://via.placeholder.com/15/352a87/000000?text=+)`#352a87` |
| NA           | ![\#056ede](https://via.placeholder.com/15/056ede/000000?text=+)`#056ede` |
| NA           | ![\#089bce](https://via.placeholder.com/15/089bce/000000?text=+)`#089bce` |
| NA           | ![\#33b7a0](https://via.placeholder.com/15/33b7a0/000000?text=+)`#33b7a0` |
| NA           | ![\#a3bd6a](https://via.placeholder.com/15/a3bd6a/000000?text=+)`#a3bd6a` |
| NA           | ![\#f9bd3f](https://via.placeholder.com/15/f9bd3f/000000?text=+)`#f9bd3f` |
| NA           | ![\#f9fb0e](https://via.placeholder.com/15/f9fb0e/000000?text=+)`#f9fb0e` |

**Minimum:** 15000 μg/L

**Maximum:** 100000 μg/L

## Source

The Nature Conservancy

## External Links
