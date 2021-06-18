
# Hydrology

## Overview 

This document provides an overview of hydrology simulation methods and results for the Puget Sound Stormwater heatmap. Continuous hydrology simulation  was performed using regional pre-calibrated parameters. Batched simulations were run for combinations of land cover, soils, and slopes across the Puget Sound domain. Results are stored in a cloud-based database.  It is intended to be used in conjunction with data derived from the stormwaterheatmap or other geospatial data sources to quickly model rainfall-runoff relationships across Puget Sound.

## Modeling approach
The hydrologic modeling approach was developed to replicate as much as feasible, commonly applied continuous simulation hydrologic analysis for stormwater in Puget Sound. Ecology developed guidance for continuous simulation modeling as described in the Stormwater Manual for Western Washington [@DepartmentofEcology2014].  

This guidance calls for the application of continuous simulation models based on the Hydrologic Simulation Program Fortran (HSPF). HSPF is a lumped-parameter rainfall-runoff model developed by the USGS and EPA. HSPF is generally used to perform analysis on hydrologic processes related to effects of land cover, interception, surface ponding and soil moisture retention. Although maintenance development of HSPF has not occurred since 1997, it is currently distributed by EPA under the Better Assessment Science Integrating Point and Non-point Sources (BASINS) analysis system. In Western Washington, application of HSPF to stormwater design is routinely performed through the Western Washington Hydrology Model (WWHM), a Windows-based graphical user interface program with built-in meteorologic data and modules specific to stormwater analysis.  

HSPF contains a number of specialized modules that are not used by WWHM. These include modules related to snowmelt, sediment budgets, and specific water quality routines. The primary HSPF routines used by WWHM are designated as ```IWATER``` (water budget for impervious land cover) and ```PWATER``` (water budget for pervious land cover). A graphical schematic of the ```PWATER``` routine is shown in Figure \@ref(fig:hspfFig).

<div class="figure">
<img src="images/hspf_perlnd.png" alt="HSPF PERLND Conceptual Model" width="264" />
<p class="caption">(\#fig:hspfFig)HSPF PERLND Conceptual Model</p>
</div>

### Hydrologic Response Units 
Modeling was performed on discretized landscape units based on common soils, land cover, and slope charcateristics known as hydrologic response units (HRUs). The HRU approach provides a computationally efficient method of pre-computing hydrolgic response for later use. Results for a particular watershed can be calculated by  summing or averaging the results for individual HRUs. 

Each combination of parameters was modeled in separate batched simulations. HRUs were designated by a three-digit number according to the following convention: 

* **First digit:** Hydrologic Soil Group Number *(0 = A/B, 1 = C, 2 = Saturated)*
* **Second digit:** Land cover *(0=Forest, 1=Pasture, 2=Lawn, 5=Impervious),* 
* **Third Digit:** Slope *(0=Flat, 1=Mod, 2=Steep)*

For example, a site with Type C soils, with forested land cover, on a moderate slope would be represented by ```101```. This schema allowed for HRUs to be stored as an eight-bit unsigned integer on a Puget-Sound wide raster, minimizing storage size.  


### Regional Calibrated Parameters

Regional calibration factors for the Puget Lowlands Ecoregion were developed the USGS in the 1990s [@Dinicola1990] and updated by Clear Creek Solutions for use within WWHM [@DepartmentofEcology2014]. These parameters, referred to as the 'default parameters' by Ecology were used in this study and applied to individual HRUs. Parameters are provided in Appendix A. 


### Python Implementation 

To allow for parallel computations, we used a Python adaption of HSPF (PyHSPF^[https://github.com/djlampert/PyHSPF]) developed by David Lambert with funding from the United States Department of Energy, Energy Efficiency & Renewable Energy, Bioenergy Technologies Office [@Lampert2019]. PyHSPF is able to generated HSPF input files, run simulations, and provide HSPF compatible output.  Similar to WWHM, we provided separate output files for three flow-paths: surface flow, interflow, and groundwater flow. In HSPF, these output classes are referred to as ```SURO```, ```INFW```, and ```AGWO``` respectively. We developed and ran individual PyHSPF models for each combination of HRU and Precipitation grid and generated output for each flow patch component. This resulted in 27,990 individual output files. 

## Data Sources 

### Precipitation 

A region-wide, simulated precipitation dataset was provided by the University of Washington Climate Impacts Group. Methodology used to develop this dataset is documented in [@Jr2018].The dataset contains modeled hourly precipitation using the GFDL CM3 global climate model and the  Representative Concentration Pathways (RCP) 8.5 scenario. 


The GFDL model was chosen by CIG to due to its ability to accurately model winter storm drivers, important for stormwater applications. Combined with the higher emissions scenario, this modeling scenario represents the upper end of expected future climate changes effects. 

CIG downscaled GCM results using a statistical-dynamical approach to capture the anticipated changes in extreme events as well as the different drivers of rainfall that affect the Puget Sound Region. Regional simulations were performed using the Weather Research and Forecasting community mesoscale model. This resulted in hourly rainfall predictions at an approximately 12 km grid size across Puget Sound. Predictions were bias-corrected on a quantile-mapping basis (individual mean bias corrections for precipitation in each quantile range) using the historic (1970-2005) WRF data. The WRF Grid in our study area is shown in Figure \@ref(fig:wrfGrid).


<div class="figure">
<img src="qgis/for_figure.png" alt="WRF Forecasting Grid" width="622" />
<p class="caption">(\#fig:wrfGrid)WRF Forecasting Grid</p>
</div>

### Potential Evaporation 

Gridded potential evaporation estimates were acquired from the forcing data for the North American Land Data Assimilation System (NLDAS2) [@NASAGoddardEarthSciencesDataandInformationServicesCenterGESDISC2019]. This dataset combines multiple sources of observations to produce estimates of surface climate variables. Evaporation data was derived from the NCEP North American Regional Reanalysis, consisting of a retrospective dataset beginning January 1979 through December 2005. Data were acquired in <U+215B> degree grid spacing; at an hourly temporal resolution. Average monthly potential evaporation rates were calculated and resampled for each grid cell in the heatmap model domain. 



<!-- var tncLC = ee.Image("users/jrobertson2000/psLandCover_1m_finPS_roofs"); -->
<!-- var lc2 = tncLC -->
<!--   .remap([0,1,2,3,4,5,6,7], -->
<!--          [9,2,2,0,2,8,5,4]) -->

<!-- var NLCD = ee.ImageCollection('USGS/NLCD') -->
<!-- .filterDate('2015-01-01', '2019-01-01');  -->

<!-- var NLCDlandcover = (NLCD.select('landcover')).first();  -->
<!-- Map.addLayer(NLCDlandcover) -->
<!-- var NLCDforest = NLCDlandcover.divide(ee.Image(10)).floor().eq(4) -->
<!-- var NLCDpasture = NLCDlandcover.divide(ee.Image(10)).floor().eq(8) -->

<!-- var forest = NLCDforest.eq(1).or(lc2.eq(0));  -->
<!-- var pasture = NLCDpasture.eq(1).or(lc2.eq(1));  -->

<!-- var lc2 = lc2.where(forest.eq(1),0) -->
<!-- var lc2 = lc2.where(pasture.eq(1),1);  -->



#### Land Cover

Land cover was derived from the Nature Conservancy's high-resolution land cover data set. See Section 2 for details on land cover derivation. 

Land cover values were remapped to equivalent HSPF land cover classes as shown below. 

| Derived Land Cover                                           | HSPF Land cover class |
| ------------------------------------------------------------ | --------------------- |
| Fine Vegetation                                              | Grass                 |
| Medium Vegetation                                            | Grass                 |
| Coarse Vegetation                                            | Forest                |
| Dirt/Barren                                                  | Grass                 |
| Water                                                        | Water                 |
| Impervious Other                                             | Impervious            |
| Impervious Roofs^[Roofs were designated impervious/flat slope] | Impervious            |
| NLCD Cropland                                                | Pasture               |

Pasture landcover was derived from the US National Landcover Database [@yang2018new] in areas outside of urban growth area boundaries. 

#### Soils

##### Gridded SSURGO Data
The primary source of soils data was the Gridded Soil Survey Geographic Database (gSSURGO), [@SoilSurveyStaff2018]. The gridded soils database contains 10-meter rasterized coverage of surface soils derived from National Cooperate Soil Survey (NCSS) maps. These maps are generally drawn at 1:24000 scale. NCSS designates soils by a "map-unit name," which can be joined with other attribute data. Map units in the study area were joined with the soils component table, containing hydrologic-soil group designations. NCSS classifies hydrologic soil groups according to estimates of runoff potential. Soils are assigned to four groups (A, B, C, and D) and three dual classes (A/D, B/D, and C/D) as defined below: 

* **Group A.** Soils having a high infiltration rate (low runoff potential) when thoroughly wet.
These consist mainly of deep, well drained to excessively drained sands or gravelly sands.
These soils have a high rate of water transmission.

* **Group B.** Soils having a moderate infiltration rate when thoroughly wet. These consist
chiefly of moderately deep or deep, moderately well drained or well drained soils that have
moderately fine texture to moderately coarse texture. These soils have a moderate rate of
water transmission.

* **Group C.** Soils having a slow infiltration rate when thoroughly wet. These consist chiefly of
soils having a layer that impedes the downward movement of water or soils of moderately
fine texture or fine texture. These soils have a slow rate of water transmission.

* **Group D.** Soils having a very slow infiltration rate (high runoff potential) when thoroughly
wet. These consist chiefly of clays that have a high shrink-swell potential, soils that have a
high water table, soils that have a claypan or clay layer at or near the surface, and soils that
are shallow over nearly impervious material. These soils have a very slow rate of water
transmission.

If a soil is assigned to a dual hydrologic group (A/D, B/D, or C/D), the first letter is for
drained areas and the second is for undrained areas. Only the soils that in their natural
condition are in group D are assigned to dual classes. In certain locations, data were augmented with the SSURGO Value added tables [@SoilSurveyStaff2016] using the Potential wetland soil landscapes field. 

##### Oak Ridge National Laboratory HYSOGs250m 
In areas where gSSURGO data were not available, we used the Global Hydrologic Soil Groups (HYSOGs250m) for Curve Number-Based Runoff Modeling developed by Oak Ridge National Laboratory [@RossC.W.L.PrihodkoJ.Y.AnchangS.S.KumarW.Ji2018]. This dataset contains world-wide hydrologic soils groups derived at a 250 meter resolution from machine learning predictions. Hydrologic soil groups were given the same designation as the SSURGO data above. 

##### GAP/LANDFIRE DATA 

To account for wetlands and saturated soils not included in the above datasets, we used the USGS GAP/LANDFIRE National Terrestrial Ecosystems data set, which includes nationwide vegetation and land cover data. 

#### Slope 

Slope values were calculated from the USGS National Elevation Dataset. Elevations were provided in 1/3 arc-second resolution (approximately 10-meters). Slope was calculated and classified into the following categories, consistent with Ecology guidance:   
* Flat: < 5%   
* Moderate: 5-15%   
* Steep: > 15%   

## Verification of Results 

Results were verified by comparing simulations to measured streamflow for a gaged watershed in King County. King County operates a stream gage on Madsen Creek, near Renton. The watershed above the gage site is approximately 2,000 acres, with about 25% imperviousness. 

Daily streamflow data for the Madsen Creek watershed was provided by King County^[https://green2.kingcounty.gov/hydrology/SummaryDataGraphs.aspx?G_ID=98] for the period 1991-2010. We delineated the watershed above the gaging site using the USGS NHDPLus flow-conditioned raster [@moore2019user]. 
Using this watershed boundary, we extracted HRUs and associated areas from the stormwater heatmap HRU layer on Google Earth Engine. HRU results and areas are shown in Table \@ref(tab:madsent).

<!-- <table>
<caption>(\#tab:madsent)Summary of HRUs and areas in Madsen Creek Watershed</caption>
 <thead>
  <tr>
   <th style="text-align:left;"> hruName </th>
   <th style="text-align:right;"> sq.m </th>
   <th style="text-align:right;"> acres </th>
   <th style="text-align:left;"> soil </th>
   <th style="text-align:left;"> land cover </th>
   <th style="text-align:left;"> slope </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> hru000 </td>
   <td style="text-align:right;"> 2432168.00 </td>
   <td style="text-align:right;"> 601.001891 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru001 </td>
   <td style="text-align:right;"> 1228910.00 </td>
   <td style="text-align:right;"> 303.670347 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru002 </td>
   <td style="text-align:right;"> 743614.00 </td>
   <td style="text-align:right;"> 183.751019 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru010 </td>
   <td style="text-align:right;"> 556435.10 </td>
   <td style="text-align:right;"> 137.498118 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru011 </td>
   <td style="text-align:right;"> 153862.00 </td>
   <td style="text-align:right;"> 38.020137 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru012 </td>
   <td style="text-align:right;"> 24682.16 </td>
   <td style="text-align:right;"> 6.099095 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru020 </td>
   <td style="text-align:right;"> 909390.80 </td>
   <td style="text-align:right;"> 224.715351 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru021 </td>
   <td style="text-align:right;"> 230017.00 </td>
   <td style="text-align:right;"> 56.838437 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru022 </td>
   <td style="text-align:right;"> 17757.89 </td>
   <td style="text-align:right;"> 4.388070 </td>
   <td style="text-align:left;"> A/B </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru100 </td>
   <td style="text-align:right;"> 93139.05 </td>
   <td style="text-align:right;"> 23.015160 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru101 </td>
   <td style="text-align:right;"> 9888.50 </td>
   <td style="text-align:right;"> 2.443502 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru102 </td>
   <td style="text-align:right;"> 6064.56 </td>
   <td style="text-align:right;"> 1.498585 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru110 </td>
   <td style="text-align:right;"> 13569.95 </td>
   <td style="text-align:right;"> 3.353207 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru111 </td>
   <td style="text-align:right;"> 2032.37 </td>
   <td style="text-align:right;"> 0.502208 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru112 </td>
   <td style="text-align:right;"> 230.02 </td>
   <td style="text-align:right;"> 0.056840 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru120 </td>
   <td style="text-align:right;"> 118094.30 </td>
   <td style="text-align:right;"> 29.181745 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru121 </td>
   <td style="text-align:right;"> 7885.95 </td>
   <td style="text-align:right;"> 1.948661 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru122 </td>
   <td style="text-align:right;"> 243.56 </td>
   <td style="text-align:right;"> 0.060185 </td>
   <td style="text-align:left;"> C </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> steep </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru200 </td>
   <td style="text-align:right;"> 90542.94 </td>
   <td style="text-align:right;"> 22.373647 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru201 </td>
   <td style="text-align:right;"> 3724.20 </td>
   <td style="text-align:right;"> 0.920269 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> forest </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru210 </td>
   <td style="text-align:right;"> 22074.19 </td>
   <td style="text-align:right;"> 5.454652 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru211 </td>
   <td style="text-align:right;"> 1212.49 </td>
   <td style="text-align:right;"> 0.299612 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> pasture </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru220 </td>
   <td style="text-align:right;"> 42232.11 </td>
   <td style="text-align:right;"> 10.435781 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru221 </td>
   <td style="text-align:right;"> 2335.62 </td>
   <td style="text-align:right;"> 0.577145 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> lawn </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru250 </td>
   <td style="text-align:right;"> 1477833.00 </td>
   <td style="text-align:right;"> 365.180393 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> impervious </td>
   <td style="text-align:left;"> flat </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru251 </td>
   <td style="text-align:right;"> 320216.80 </td>
   <td style="text-align:right;"> 79.127303 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> impervious </td>
   <td style="text-align:left;"> moderate </td>
  </tr>
  <tr>
   <td style="text-align:left;"> hru252 </td>
   <td style="text-align:right;"> 25874.91 </td>
   <td style="text-align:right;"> 6.393828 </td>
   <td style="text-align:left;"> D </td>
   <td style="text-align:left;"> impervious </td>
   <td style="text-align:left;"> steep </td>
  </tr>
</tbody>
</table> -->

Modeling results were then queried and aggregated from the BigQuery dataset as described in Appendix B. The same HRU values were also run in WWHM for comparison. Both the WWHM and BigQuery results were truncated to have the same period of record as the streamflow data. Only the surface runoff and interflow components were used in this analysis. 

Figure \@ref(fig:madsenFig) shows a comparison of the observed and simulation flow-durations for the Madsen Creek watershed.

<!-- <div class="figure">
<img src="StormwaterHeatmapTechReference_files/figure-html/madsenFig-1.png" alt="Observed and simulated flow-duration curves for Madsen Creek, King County, WA" width="672" />
<p class="caption">(\#fig:madsenFig)Observed and simulated flow-duration curves for Madsen Creek, King County, WA</p>
</div> -->

Both the WWHM and PyHSPF results underpredict actual streamflow primarly because baseflow was not simulated. This is expected, since both models exclude groundwater contributions. However, the results show good agreement between both simulated datasets over the full duration of simulations. Note that the simulations use different precipitation (see Figure \@ref(fig:precipCompare) ) datasets and are not expected to match. 
<!-- <div class="figure">
<img src="StormwaterHeatmapTechReference_files/figure-html/precipCompare-1.png" alt="Comparison of precipitation data used in verification" width="672" />
<p class="caption">(\#fig:precipCompare)Comparison of precipitation data used in verification</p>
</div> -->

## Spatially Aggregated Results     
Since the PyHSPF model is a lumped parameter model, results can be calculated for HRU/precipitation grids individually and then aggregated after calculation. 

The stormwater heatmap contains two spatial aggregates of hydrology results: Mean Annual Runoff for the historic period (1970-1999) and a new index, termed the Flow Duration Index. 



### Mean Annual Runoff (1970-1999)

Mean annual runoff for each HRU/grid combination was aggregated from BigQuery for the historic period of record (1970-1999). Consistent with Ecology guidance for stormwater projects, only the surface flow components, `SURO` and `IFWO` were used. `AGWO`, deep groundwater flow, was not included in this calculation. 

Total runoff was calculated for each year/hru/grid combination in the period of record, then averaged by hru/grid combination. 




<!-- Citations
Figures \@ref(fig:outwash_fig2) through xx show box plots of mean annual runoff results for the historic period of record for each modeled soil type.
<!\@ref(fig:wrfGrid).-->


<!-- <img src="StormwaterHeatmapTechReference_files/figure-html/annualQplots-1.png" width="672" /> -->
     
### Flow Duration Index   

#### Ecology Performance Standards 
Ecology Stormwater Guidance includes flow-related performance standards to protect receiving waters from degradation caused by changes in the hydrologic regime due to development.  These performance standards rely on flow-duration matching, whereby flow durations from developed land are required to match pre-developed flow-durations for a range of discharge values.The flow duration standard is intended to prevent flashy flows in receiving stream channels. 

#### Calculation of the Index
We developed an index representing the magnitude of change to the flow-duration curve between flow thresholds.Thresholds were chosen based on Ecology's LID and Flow Control Standards  [@DepartmentofEcology2014], which require flow-duration matching over the range between 8 percent of the 2-year peak discharge (lower threshold of the LID standard) up to the 50-year peak discharge (upper threshold of the flow-control standard).   

The flow discharge index is calculated by summing the discharge over the simulation period between a high-flow and low-flow threshold. Figure \@ref(fig:fdrfig) illustrates the summation of flow-duration values used in calculating this index. 

<!-- <div class="figure">
<img src="StormwaterHeatmapTechReference_files/figure-html/fdrfig-1.png" alt="Example flow duration curves of altered and forested land covers" width="672" />
<p class="caption">(\#fig:fdrfig)Example flow duration curves of altered and forested land covers</p>
</div> -->

The flow duration index can be described by Equation \@ref(eq:fdr). 

<!-- $$
  \ln\left(\frac{\sum_{ }^{ }q_{current}\Delta t}{\sum_{ }^{ }q_{forest}\Delta t}+1\right) \\
  \text{for: }\left\{ \ 0.06\cdot Q_{2,forest\ }\le\ q\ \le\ Q_{50,forest}\right\}   
  (\#eq:fdr)
$$ -->

Where q~current~ is the simulated discharge for current or altered conditions and q~forest~ is the predevelopment or forested conditions. One is added to this ratio and the logarithm is taken to produce an index that generally falls between 1 and 10. This index is then applied to hru/grid combinations in the stormwater heatmap to produce a spatially explicit mapping of flow alteration. Figure  \@ref(fig:flowIndexfig) shows a summary of flow index values used in the stormwater heatmap.     


<!-- <div class="figure">
<img src="StormwaterHeatmapTechReference_files/figure-html/flowIndexfig-1.png" alt="Summary of flow index values in study area" width="672" />
<p class="caption">(\#fig:flowIndexfig)Summary of flow index values in study area</p>
</div> -->















<!--chapter:end:03-hydrology.Rmd-->

<!-- # References     

<div id = "refs"></div>

# (APPENDIX) Appendix {-}

# Regional HSPF Calibration Factors -->