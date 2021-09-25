Soils
================

*Hydrologic Soil Group*

## Description

The primary source of soils data was the Gridded Soil Survey Geographic
Database (gSSURGO), (SoilSurveyStaff, 2018). The gridded soils database
contains 10-meter rasterized coverage of surface soils derived from
National Cooperate Soil Survey (NCSS) maps. These maps are generally
drawn at 1:24000 scale. NCSS designates soils by a “map-unit name,”
which can be joined with other attribute data. Map units in the study
area were joined with the soils component table, containing
hydrologic-soil group designations. NCSS classifies hydrologic soil
groups according to estimates of runoff potential. Soils are assigned to
four groups (A, B, C, and D) and three dual classes (A/D, B/D, and C/D)
as defined below:

-   **Group A.** Soils having a high infiltration rate (low runoff
    potential) when thoroughly wet. These consist mainly of deep, well
    drained to excessively drained sands or gravelly sands. These soils
    have a high rate of water transmission.
-   **Group B.** Soils having a moderate infiltration rate when
    thoroughly wet. These consist chiefly of moderately deep or deep,
    moderately well drained or well drained soils that have moderately
    fine texture to moderately coarse texture. These soils have a
    moderate rate of water transmission.
-   **Group C.** Soils having a slow infiltration rate when thoroughly
    wet. These consist chiefly of soils having a layer that impedes the
    downward movement of water or soils of moderately fine texture or
    fine texture. These soils have a slow rate of water transmission.
-   **Group D.** Soils having a very slow infiltration rate (high runoff
    potential) when thoroughly wet. These consist chiefly of clays that
    have a high shrink-swell potential, soils that have a high water
    table, soils that have a claypan or clay layer at or near the
    surface, and soils that are shallow over nearly impervious material.
    These soils have a very slow rate of water transmission.

If a soil is assigned to a dual hydrologic group (A/D, B/D, or C/D), the
first letter is for drained areas and the second is for undrained areas.
Only the soils that in their natural condition are in group D are
assigned to dual classes. In certain locations, data were augmented with
the SSURGO Value added tables (SoilSurveyStaff, 2016) using the
Potential wetland soil landscapes field.

In areas where gSSURGO data were not available, we used the Global
Hydrologic Soil Groups (HYSOGs250m) for Curve Number-Based Runoff
Modeling developed by Oak Ridge National Laboratory. This dataset
contains world-wide hydrologic soils groups derived at a 250 meter
resolution from machine learning predictions. Hydrologic soil groups
were given the same designation as the SSURGO data above.

To account for wetlands and saturated soils not included in the above
datasets, we used the USGS GAP/LANDFIRE National Terrestrial Ecosystems
data set, which includes nationwide vegetation and land cover data.

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Soils"]

## Visualization

### Palette

| Label     | Raster value | Colors                                                                    |
|:----------|:-------------|:--------------------------------------------------------------------------|
| Outwash   | 1            | ![\#69995D](https://via.placeholder.com/15/69995D/000000?text=+)`#69995D` |
| Till      | 2            | ![\#564138](https://via.placeholder.com/15/564138/000000?text=+)`#564138` |
| Saturated | 3            | ![\#F06543](https://via.placeholder.com/15/F06543/000000?text=+)`#F06543` |
| Water     | 4            | ![\#b3caff](https://via.placeholder.com/15/b3caff/000000?text=+)`#b3caff` |

## Source

The Nature Conservancy

## External Links
