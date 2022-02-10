Traffic
================

*Mean Annual Average Daily Trips*

## Description

High-resolution raster dataset of Annual Daily Traffic across road 
surface areas in the Puget Sound trough duirng 2016 and 2018.

## Overview
We produced a continuous, high spatial resolution Average Daily Traffic 
(ADT) raster dataset covering the Puget Sound trough. The purpose of this
dataset is for modeling water quality used in the Puget Sound Stormwater 
Heatmap. Here, we summarize the geoprocessing steps and the input data 
sources which included 2018 ADT point locations (Kalibrate Technologies,
2019) and year 2016 road lines with traffic and lane attributes (Messager 
et al., 2021), which was produced from 2016 US Census TIGER Lines spatial
data joined with tabular data from the 2017 U.S. Department of Transportation
National Transportation Atlas Database Highway Performance Monitoring System.
We used Esri’s ArcGIS software and its Spatial Analyst extension for
geoprocessing to develop this layer.

## Methods
First, we grouped the road lines datasets based on their Federal Highway
Administration highway functional class (FHWA, 2013) for our geoprocessing 
(Table 1). This was necessary to keep the extremely high traffic of Major
road segments from being unintentionally allocated to Minor and Local roads
where they intersect in 2-dimensional space (e.g. overpasses and tunnels). 
In the end, the outputs of the separate geoprocessing steps were combined,
and traffic at intersecting cell locations was assigned the highest of the 
overlapping annual daily traffic values. 

**Table 1.** Highway functional classes (FHWA, 2013) and the groups we assigned 
them for geoprocessing.
| *Functional Class Code (US DOT, 2013)* | *Functional Class Name (US DOT)* |*Geoprocessing Group* |
|:---------------------------------------|:---------------------------------|:---------------------|
| 1                                      |Interstate                        |Major                 |
| 2                                      |Other Freeway or Expressway       |Major                 |
| 3                                      |Principle Arterial                |Minor                 |
| 4                                      |Minor Arterial                    |Minor                 |
| 5                                      |Major Collector                   |Minor                 |
| 6                                      |Minor Collector                   |Minor                 |
| 7                                      |Local                             |Local                 |
| 0                                      |Unclassified                      |Local                 |

We created the Major roads raster dataset through a relatively simple process. 
Major roads included interstates and freeways, as well as their access ramps. We 
used the Functional Type attribute to differentiate access ramps (Types
0, 1, and 4) from the actual freeways (Types 2 and 6) during geoprocessing. We 
did this for similar reasons that we separated Major roads from Minor and Local. 
For each of the Major road groups, we used the Euclidean Distance tool to create
2-m resolution rasters covering the road area and based on the lane width described
in the road lines attribute table. Next, we used Path Distance Allocation to assign
known Average Daily Traffic (also from the lines attribute table) to their nearest
road cell along the path of the road surface. We combined the two outputs by taking 
the maximum value at any given cell location. 

Minor and Local roads required a more complicated approach because the road lines 
dataset did not contain ADT, lane count,or lane width for most Local roads and 
because those Local roads often exist in a grid network rather than simple point-
to-point layout. We assumed those unattributed roads consisted of two lanes (one 
per direction) and used Federal Highway Administration guidanceto assign lane widths
of about 10-feet, or 3-meters(FHWA, 2013). Similar to the Major roads, we separated
these roads into their Minor and Local classes to created two new 2-m resolution 
rasters of road area using the Euclidean Distance tool. The difference here is in
the next steps for allocating Average Daily Traffic to each cell. We created our
final road surface area rasters by classifying all values of the distance values
to zero.

For Minor roads, we assigned Average Daily Traffic based on a point dataset of 
combined 2016 and 2018 traffic counts data to provide the most comprehensive coverage 
we could assemble for the Puget Sound region. The 2016 points were created from the
2016 road lines dataset at the mid-point of each road segment. The 2018 points data
represent locations of observed Average Daily Traffic from numerous years that were
modeled to estimate 2018 traffic based on demographic changes between the year of 
observation and 2018. Lastly, we performed a Path Distance Allocation to assign each
Minor road cell the ADT value of the nearest ADT data point.

Our most complex step came was assigning average daily traffic values to each cell of  
the Local roads. We approached this with three assumptions: 

1.  Average daily traffic drops drastically once it transitions from Minor to Local roads;
    
2.  As distance increases from a Minor road to locations along a Local road, ADT continues to decrease but at a lower rate, nearly leveling off;
    
3.  Minimum average daily traffi con any road is ten trips. 
    
With those assumptions, we calculated traffic dispersing through a Local road grid using 
a distance decay function calibrated with estimated traffic values on familiar urban
residential streets of north Tacoma, WA. With the Raster Calculator tool, we used two 
newly created raster datasets as inputs in the distance decay function: 

1.  An Initial (Maximum) ADT raster dataset was used in the function as a constant representing the initial (and maximum) value for the decay. We created this dataset using the Path Distance Allocation tool which assigns the ADT of the nearest Minor road to each given Local road cell. We represent this here as variable *a*.
    
2.  A Distance raster dataset contains the distance at every Local road cell to its nearest Minor road cell,which was calculated with the Path Distance tool. We represent this here as variable d.The decay rate constant ris calculated as a function of the initial (maximum) ADT value a, written as:
    
     *r = f(a) = a * (11.03955 -0.007743235a + 0.000001332168a<sup>2</sup>)*

This distance decay function outputs average daily traffic at each cell location, 
written as: 

*f(d) = a/(1 +(t * d) <sup>0.33</sup>)*

The exponent **0.33** keeps the resultant value from dropping below a reasonable 
amount of traffic moving through the Local road grid even at long distance from 
a Minor road source cell. 

Next, we converted the output ADT datasets to integers and reclassified any ADT value
of less than ten cars per day to ten cars per day as a minimum. Finally, we combined
the resulting ADT datasets for all roads into a single dataset by choosing the maximum
ADT value of those datasets at a given cell location.

## References
FHWA (2013). Highway Functional Classification Concepts, Criteria and Procedures. US Federal Highway Administration. https://doi.org/10.1007/s13398-014-0173-7.2

Kalibrate Technologies (2019) Kalibrate TrafficMetrix© Current Year Estimates. www.kalibratetech.com 

Messager, M. L., Davies, I. P., & Levin, P. S. (2021) Low-cost biomonitoring and high-resolution, scalable models of urban metal pollution. Science of teh Total Environment. Vol. 767, 144280. https://doi.org/10.1016/j.scitotenv.2020.144280 

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Traffic"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#000004](https://via.placeholder.com/15/000004/000000?text=+)`#000004` |
| NA           | ![\#320A5A](https://via.placeholder.com/15/320A5A/000000?text=+)`#320A5A` |
| NA           | ![\#781B6C](https://via.placeholder.com/15/781B6C/000000?text=+)`#781B6C` |
| NA           | ![\#BB3654](https://via.placeholder.com/15/BB3654/000000?text=+)`#BB3654` |
| NA           | ![\#EC6824](https://via.placeholder.com/15/EC6824/000000?text=+)`#EC6824` |
| NA           | ![\#FBB41A](https://via.placeholder.com/15/FBB41A/000000?text=+)`#FBB41A` |
| NA           | ![\#FCFFA4](https://via.placeholder.com/15/FCFFA4/000000?text=+)`#FCFFA4` |

**Minimum:** 0 Average Annual Daily Trips (log)

**Maximum:** 8 Average Annual Daily Trips (log)

## Source

The Nature Conservancy

## External Links
