Age of Imperviousness
================

*Impervious surface by estimated date of conversion*

## Description

This layer provides multi-temporal information on the presence of
built-up surfaces derived from global Landsat satellite data collected
from 1975 to 2014. The base image data collections were prepared by the
[Global Land
Survey](https://www.usgs.gov/core-science-systems/nli/landsat/global-land-survey-gls)
and the [Joint Research Center](https://ec.europa.eu/jrc/en). The data
was processed by fully automatic and reproducible methods based on
statistical learning (Symbolic Machine Learning. The source product was
developed with a spatial resolution of 30 meters. To provide a finer
resolution for the stormwater heatmap, the source product was masked by
[1-meter resolution imperviousness data](docs/) developed by the Nature
Conservancy.

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Age of Imperviousness"]

## Visualization

### Palette

| Label       | Raster value | Colors                                                                    |
|:------------|:-------------|:--------------------------------------------------------------------------|
| 2000–2014   | 3            | ![\#018571](https://via.placeholder.com/15/018571/000000?text=+)`#018571` |
| 1990–2000   | 4            | ![\#80cdc1](https://via.placeholder.com/15/80cdc1/000000?text=+)`#80cdc1` |
| 1975–1990   | 5            | ![\#dfc27d](https://via.placeholder.com/15/dfc27d/000000?text=+)`#dfc27d` |
| Before 1975 | 6            | ![\#a6611a](https://via.placeholder.com/15/a6611a/000000?text=+)`#a6611a` |

## Source

The Nature Conservancy; Columbia University, Center for International
Earth Science Information Network

## External Links

<a>http://doi.org/10.2905/jrc-ghsl-10007</a>
