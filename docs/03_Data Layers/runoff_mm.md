Runoff (mm)
================

*Mean annual runoff calculated through continuous simulation for the
period 1970-1999.*

## Description

Continuous hydrology simulation was performed using regional
pre-calibrated parameters. Batched simulations were run for combinations
of land cover, soils, and slopes across the Puget Sound domain.

To allow for parallel computations, a python adaption of HSPF
[(PyHSPF)](https://github.com/djlampert/PyHSPF) developed by David
Lambert with funding from the United States Department of Energy, Energy
Efficiency & Renewable Energy, Bioenergy Technologies Office (Lampert,
2019) was used to model rainfall-runoff responses. Regional calibration
factors for the Puget Lowlands Ecoregion were used as developed by
Dinicola (1990) and Clear Creek Solutions (Department of Ecology, 2014).

HSPF calculates discharge for for three flow-paths: surface flow,
interflow, and groundwater flow, referred to as `SURO`, `INFW`, and
`AGWO` respectively. We report only `SURO`, `INFW`, consistent with
Ecology Guidance.

More information, including verification of results can be found in the
\[technical reference.\](

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Runoff (mm)"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#DBEBB9](https://via.placeholder.com/15/DBEBB9/000000?text=+)`#DBEBB9` |
| NA           | ![\#CAEBC9](https://via.placeholder.com/15/CAEBC9/000000?text=+)`#CAEBC9` |
| NA           | ![\#B3E7D3](https://via.placeholder.com/15/B3E7D3/000000?text=+)`#B3E7D3` |
| NA           | ![\#95DDD7](https://via.placeholder.com/15/95DDD7/000000?text=+)`#95DDD7` |
| NA           | ![\#7AD0D7](https://via.placeholder.com/15/7AD0D7/000000?text=+)`#7AD0D7` |
| NA           | ![\#61BDD3](https://via.placeholder.com/15/61BDD3/000000?text=+)`#61BDD3` |
| NA           | ![\#52AACC](https://via.placeholder.com/15/52AACC/000000?text=+)`#52AACC` |
| NA           | ![\#4898C5](https://via.placeholder.com/15/4898C5/000000?text=+)`#4898C5` |
| NA           | ![\#4085BD](https://via.placeholder.com/15/4085BD/000000?text=+)`#4085BD` |
| NA           | ![\#3874B5](https://via.placeholder.com/15/3874B5/000000?text=+)`#3874B5` |
| NA           | ![\#3264AE](https://via.placeholder.com/15/3264AE/000000?text=+)`#3264AE` |
| NA           | ![\#2B53A7](https://via.placeholder.com/15/2B53A7/000000?text=+)`#2B53A7` |
| NA           | ![\#2444A0](https://via.placeholder.com/15/2444A0/000000?text=+)`#2444A0` |

### Color Ramp

<img src="C:/Users/CNilsen/Documents/repos/heatmap_earthengine/layer_docs/runoff_mm_files/figure-gfm/unnamed-chunk-9-1.png" width="340" />

**Minimum:** 25 mm/year

**Maximum:** 1016 mm/year

## Source

The Nature Conservancy

## External Links
