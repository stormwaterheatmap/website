Total Suspended Solids Concentration
================

*Total Suspended Solids Concentration*

## Description

Median annual total suspended solids (TSS) concentration (μg/L) from stormwater
sources. <br>

Median annual TSS concentration predictions are based on *ln*-transformed observational data of TSS concentration, and the following spatial predictors: paved and traffic.  The best-fit model is: <br>

*ln*[TSS]=10.17 + 0.14*(cumulative daily rainfall) + 0.21*(traffic) + 0.28*(paved)<br>

The best fit variance structure for TSS included a combination of two variance structures, where residual variation differs by agency *j*, and also by rainfall at each location *i*, and date *k*. The parameter delta is estimated by the model: <br>
<br>
var(ε<sub>*ijk*</sub>) = σ<sup>2</sup><sub>j</sub> × *e*<sup>2δ × *rain<sub>ik*<br>

Observational data were obtained from the S8.D Municipal Stormwater Permit Outfall Data provided by the Washington Department of Ecology. Data included in the TSS model were reported by the following agencies: King County, Pierce County, Snohomish County, Port of Tacoma, City of Tacoma, and City of Seattle. The best-fit model for TSS concentration is a random-intercept model where intercept of the linear model is allowed to shift up or down according to reporting agency.  However, the TSS predictions shown on the heatmap utilize a common intercept that is fitted to all observational data. <br>
<br>
TSS predictions for highways were capped at the highest level of traffic observed within the monitored watersheds; without data for higher levels of traffic and coinciding TSS levels, we were unable to confirm the shape of the relationship curve and therefore determined it would be unwise to extrapolate the TSS-traffic relationships using traffic values that extend beyond the level of traffic measured within the monitored watersheds.  After capping the traffic values, we compared our TSS predictions on highways to those available in the USGS Highway-Runoff Database, and verified that the values we generated for highways were reasonable. 

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
