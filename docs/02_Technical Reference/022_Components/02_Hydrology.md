
# Hydrology

## Overview 

This document provides an overview of hydrology simulation methods and results for the Puget Sound Stormwater heatmap. Continuous hydrology simulation  was performed using regional pre-calibrated parameters. Batched simulations were run for combinations of land cover, soils, and slopes across the Puget Sound domain. Results are stored in a cloud-based database.  It is intended to be used in conjunction with data derived from the stormwaterheatmap or other geospatial data sources to quickly model rainfall-runoff relationships across Puget Sound.

## Modeling Approach
The hydrologic modeling approach was developed to replicate as much as feasible, commonly applied continuous simulation hydrologic analysis for stormwater in Puget Sound. Ecology developed guidance for continuous simulation modeling as described in the Stormwater Manual for Western Washington (Department of Ecology, 2014).  

This guidance calls for the application of continuous simulation models based on the Hydrologic Simulation Program Fortran (HSPF). HSPF is a lumped-parameter rainfall-runoff model developed by the USGS and EPA. HSPF is generally used to perform analysis on hydrologic processes related to effects of land cover, interception, surface ponding and soil moisture retention. Although maintenance development of HSPF has not occurred since 1997, it is currently distributed by EPA under the Better Assessment Science Integrating Point and Non-point Sources (BASINS) analysis system. In Western Washington, application of HSPF to stormwater design is routinely performed through the Western Washington Hydrology Model (WWHM), a Windows-based graphical user interface program with built-in meteorologic data and modules specific to stormwater analysis.  

HSPF contains a number of specialized modules that are not used by WWHM. These include modules related to snowmelt, sediment budgets, and specific water quality routines. The primary HSPF routines used by WWHM are designated as ```IWATER``` (water budget for impervious land cover) and ```PWATER``` (water budget for pervious land cover). A graphical schematic of the ```PWATER``` routine is shown in Figure 3.1.

<div class="figure">
<center>
<img src="\img\hspf_perlnd.png" alt="HSPF PERLND Conceptual Model" width="500" />
<p class="caption"> Figure 3.1. HSPF PERLND Conceptual Model</p>
</center>
</div>

### Hydrologic Response Units 
Modeling was performed on discretized landscape units based on common soils, land cover, and slope characteristics known as hydrologic response units (HRUs). The HRU approach provides a computationally efficient method of pre-computing hydrologic response for later use. Results for a particular watershed can be calculated by summing or averaging the results for individual HRUs. 

Each combination of parameters was modeled in separate batched simulations. HRUs were designated by a three-digit number according to the following convention: 

* **First digit:** Hydrologic Soil Group Number *(0 = A/B, 1 = C, 2 = Saturated)*
* **Second digit:** Land cover *(0=Forest, 1=Pasture, 2=Lawn, 5=Impervious)* 
* **Third Digit:** Slope *(0=Flat, 1=Mod, 2=Steep)*

For example, a site with Type C soils, with forested land cover, on a moderate slope would be represented by ```101```. This schema allowed for HRUs to be stored as an eight-bit unsigned integer on a Puget-Sound wide raster, minimizing storage size.  


### Regional Calibrated Parameters

Regional calibration factors for the Puget Lowlands Ecoregion were developed the USGS in the 1990s (Dinicola, 1990) and updated by Clear Creek Solutions for use within WWHM (Department of Ecology, 2014). These parameters, referred to as the 'default parameters' by Ecology were used in this study and applied to individual HRUs. Parameters are provided in Appendix A. 


### Python Implementation 

To allow for parallel computations, we used a Python adaption of HSPF <a href="https://github.com/djlampert/PyHSPF">(PyHSPF)</a> developed by David Lambert with funding from the United States Department of Energy, Energy Efficiency & Renewable Energy, Bioenergy Technologies Office (Lampert, 2019). PyHSPF is able to generated HSPF input files, run simulations, and provide HSPF compatible output.  Similar to WWHM, we provided separate output files for three flow-paths: surface flow, interflow, and groundwater flow. In HSPF, these output classes are referred to as ```SURO```, ```INFW```, and ```AGWO``` respectively. We developed and ran individual PyHSPF models for each combination of HRU and Precipitation grid and generated output for each flow patch component. This resulted in 27,990 individual output files. 

## Data Sources 

### Precipitation 

A region-wide, simulated precipitation dataset was provided by the University of Washington Climate Impacts Group. Methodology used to develop this dataset is documented in (Mauger et al., 2018).The dataset contains modeled hourly precipitation using the GFDL CM3 global climate model and the  Representative Concentration Pathways (RCP) 8.5 scenario. 


The GFDL model was chosen by CIG to due to its ability to accurately model winter storm drivers, important for stormwater applications. Combined with the higher emissions scenario, this modeling scenario represents the upper end of expected future climate changes effects. 

CIG downscaled GCM results using a statistical-dynamical approach to capture the anticipated changes in extreme events as well as the different drivers of rainfall that affect the Puget Sound Region. Regional simulations were performed using the Weather Research and Forecasting community mesoscale model. This resulted in hourly rainfall predictions at an approximately 12 km grid size across Puget Sound. Predictions were bias-corrected on a quantile-mapping basis (individual mean bias corrections for precipitation in each quantile range) using the historic (1970-2005) WRF data. The WRF Grid in our study area is shown in Figure 3.2.


<div class="figure">
<center>
<img src="/img/grid_figure.png" alt="WRF Forecasting Grid" width="700" />
<p class="caption">Figure 3.2. WRF Forecasting Grid</p>
</center>
</div>

### Potential Evaporation 

Gridded potential evaporation estimates were acquired from the forcing data for the North American Land Data Assimilation System (NLDAS2) (NASA Goddard Earth Sciences Data and Information Services Center (GES DISC), 2019). This dataset combines multiple sources of observations to produce estimates of surface climate variables. Evaporation data was derived from the NCEP North American Regional Reanalysis, consisting of a retrospective dataset beginning January 1979 through December 2005. Data were acquired in <sup>1</sup>&frasl;<sub>8</sub> degree grid spacing; at an hourly temporal resolution. Average monthly potential evaporation rates were calculated and resampled for each grid cell in the heatmap model domain. 

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
| Impervious Roofs (roofs were designated impervious/flat slope) | Impervious            |
| NLCD Cropland                                                | Pasture               |

Pasture landcover was derived from the US National Landcover Database (Yang et al., 2018) in areas outside of urban growth area boundaries. 

#### Soils

##### Gridded SSURGO Data
The primary source of soils data was the Gridded Soil Survey Geographic Database (gSSURGO), (SoilSurveyStaff, 2018). The gridded soils database contains 10-meter rasterized coverage of surface soils derived from National Cooperate Soil Survey (NCSS) maps. These maps are generally drawn at 1:24000 scale. NCSS designates soils by a "map-unit name," which can be joined with other attribute data. Map units in the study area were joined with the soils component table, containing hydrologic-soil group designations. NCSS classifies hydrologic soil groups according to estimates of runoff potential. Soils are assigned to four groups (A, B, C, and D) and three dual classes (A/D, B/D, and C/D) as defined below: 

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
condition are in group D are assigned to dual classes. In certain locations, data were augmented with the SSURGO Value added tables (SoilSurveyStaff, 2016) using the Potential wetland soil landscapes field. 

##### Oak Ridge National Laboratory HYSOGs250m 
In areas where gSSURGO data were not available, we used the Global Hydrologic Soil Groups (HYSOGs250m) for Curve Number-Based Runoff Modeling developed by Oak Ridge National Laboratory (Ross, C.W., L. Prihodko, J.Y. Anchang, S.S. Kumar, W. Ji, 2018). This dataset contains world-wide hydrologic soils groups derived at a 250 meter resolution from machine learning predictions. Hydrologic soil groups were given the same designation as the SSURGO data above. 

##### GAP/LANDFIRE DATA 

To account for wetlands and saturated soils not included in the above datasets, we used the USGS GAP/LANDFIRE National Terrestrial Ecosystems data set, which includes nationwide vegetation and land cover data. 

#### Slope 

Slope values were calculated from the USGS National Elevation Dataset. Elevations were provided in <sup>1</sup>&frasl;<sub>3</sub> arc-second resolution (approximately 10-meters). Slope was calculated and classified into the following categories, consistent with Ecology guidance:   
* Flat: < 5%   
* Moderate: 5-15%   
* Steep: > 15%   

## Verification of Results 

Results were verified by comparing simulations to measured streamflow for a gaged watershed in King County. King County operates a stream gage on Madsen Creek, near Renton. The watershed above the gage site is approximately 2,000 acres, with about 25% imperviousness. 

Daily streamflow data for the Madsen Creek watershed was provided by <a href="https://green2.kingcounty.gov/hydrology/SummaryDataGraphs.aspx?G_ID=98">King County</a> for the period 1991-2010. We delineated the watershed above the gaging site using the USGS NHDPLus flow-conditioned raster (Moore et al., 2019). 
Using this watershed boundary, we extracted HRUs and associated areas from the stormwater heatmap HRU layer on Google Earth Engine. HRU results and areas are shown in Table 3.1.

<table>
<caption> Table 3.1. Summary of HRUs and areas in Madsen Creek Watershed</caption>
 <thead>
  <tr>
   <th> hruName </th>
    <th> sq.m </th>
    <th> acres </th>
    <th> soil </th>
    <th> land cover </th>
    <th> slope </th>
  </tr>
 </thead>
<tbody>
  <tr>
    <td> hru000 </td>
    <td> 2432168.00 </td>
    <td> 601.001891 </td>
    <td> A/B </td>
    <td> forest </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru001 </td>
    <td> 1228910.00 </td>
    <td> 303.670347 </td>
    <td> A/B </td>
    <td> forest </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru002 </td>
    <td> 743614.00 </td>
    <td> 183.751019 </td>
    <td> A/B </td>
    <td> forest </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru010 </td>
    <td> 556435.10 </td>
    <td> 137.498118 </td>
    <td> A/B </td>
    <td> pasture </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru011 </td>
    <td> 153862.00 </td>
    <td> 38.020137 </td>
    <td> A/B </td>
    <td> pasture </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru012 </td>
    <td> 24682.16 </td>
    <td> 6.099095 </td>
    <td> A/B </td>
    <td> pasture </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru020 </td>
    <td> 909390.80 </td>
    <td> 224.715351 </td>
    <td> A/B </td>
    <td> lawn </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru021 </td>
    <td> 230017.00 </td>
    <td> 56.838437 </td>
    <td> A/B </td>
    <td> lawn </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru022 </td>
    <td> 17757.89 </td>
    <td> 4.388070 </td>
    <td> A/B </td>
    <td> lawn </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru100 </td>
    <td> 93139.05 </td>
    <td> 23.015160 </td>
    <td> C </td>
    <td> forest </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru101 </td>
    <td> 9888.50 </td>
    <td> 2.443502 </td>
    <td> C </td>
    <td> forest </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru102 </td>
    <td> 6064.56 </td>
    <td> 1.498585 </td>
    <td> C </td>
    <td> forest </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru110 </td>
    <td> 13569.95 </td>
    <td> 3.353207 </td>
    <td> C </td>
    <td> pasture </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru111 </td>
    <td> 2032.37 </td>
    <td> 0.502208 </td>
    <td> C </td>
    <td> pasture </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru112 </td>
    <td> 230.02 </td>
    <td> 0.056840 </td>
    <td> C </td>
    <td> pasture </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru120 </td>
    <td> 118094.30 </td>
    <td> 29.181745 </td>
    <td> C </td>
    <td> lawn </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru121 </td>
    <td> 7885.95 </td>
    <td> 1.948661 </td>
    <td> C </td>
    <td> lawn </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru122 </td>
    <td> 243.56 </td>
    <td> 0.060185 </td>
    <td> C </td>
    <td> lawn </td>
    <td> steep </td>
  </tr>
  <tr>
    <td> hru200 </td>
    <td> 90542.94 </td>
    <td> 22.373647 </td>
    <td> D </td>
    <td> forest </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru201 </td>
    <td> 3724.20 </td>
    <td> 0.920269 </td>
    <td> D </td>
    <td> forest </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru210 </td>
    <td> 22074.19 </td>
    <td> 5.454652 </td>
    <td> D </td>
    <td> pasture </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru211 </td>
    <td> 1212.49 </td>
    <td> 0.299612 </td>
    <td> D </td>
    <td> pasture </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru220 </td>
    <td> 42232.11 </td>
    <td> 10.435781 </td>
    <td> D </td>
    <td> lawn </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru221 </td>
    <td> 2335.62 </td>
    <td> 0.577145 </td>
    <td> D </td>
    <td> lawn </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru250 </td>
    <td> 1477833.00 </td>
    <td> 365.180393 </td>
    <td> D </td>
    <td> impervious </td>
    <td> flat </td>
  </tr>
  <tr>
    <td> hru251 </td>
    <td> 320216.80 </td>
    <td> 79.127303 </td>
    <td> D </td>
    <td> impervious </td>
    <td> moderate </td>
  </tr>
  <tr>
    <td> hru252 </td>
    <td> 25874.91 </td>
    <td> 6.393828 </td>
    <td> D </td>
    <td> impervious </td>
    <td> steep </td>
  </tr>
</tbody>
</table>

Modeling results were then queried and aggregated from the BigQuery dataset as described in Appendix B. The same HRU values were also run in WWHM for comparison. Both the WWHM and BigQuery results were truncated to have the same period of record as the streamflow data. Only the surface runoff and interflow components were used in this analysis. 

Figure 3.3 shows a comparison of the observed and simulation flow-durations for the Madsen Creek watershed.

<div class="figure">
<center>
<img src="/img/madsenFig-1.png" alt="Observed and simulated flow-duration curves for Madsen Creek, King County, WA" width="672" />
<p class="caption"> Figure 3.3. Observed and simulated flow-duration curves for Madsen Creek, King County, WA</p>
</center>
</div>

Both the WWHM and PyHSPF results underpredict actual streamflow primarly because baseflow was not simulated. This is expected, since both models exclude groundwater contributions. However, the results show good agreement between both simulated datasets over the full duration of simulations. Note that the simulations use different precipitation (see Figure 3.4) datasets and are not expected to match. 

<div class="figure">
<center>
<img src="/img/precipCompare-1.png" alt="Comparison of precipitation data used in verification" width="672" />
<p class="caption">Figure 3.4. Comparison of precipitation data used in verification</p>
</center>
</div>

## Spatially Aggregated Results     
Since the PyHSPF model is a lumped parameter model, results can be calculated for HRU/precipitation grids individually and then aggregated after calculation. 

The stormwater heatmap contains two spatial aggregates of hydrology results: Mean Annual Runoff for the historic period (1970-1999) and a new index, termed the Flow Duration Index. 



### Mean Annual Runoff (1970-1999)

Mean annual runoff for each HRU/grid combination was aggregated from BigQuery for the historic period of record (1970-1999). Consistent with Ecology guidance for stormwater projects, only the surface flow components, `SURO` and `IFWO` were used. `AGWO`, deep groundwater flow, was not included in this calculation. 

Total runoff was calculated for each year/hru/grid combination in the period of record, then averaged by hru/grid combination. 

<div class="figure">
<center>
<img src="/img/annualQplots-1.png" alt="Mean Annual Runoff Plots" width="672" />
<p class="caption">Figure 3.5. Mean Annual Runoff</p>
</center>
</div>
     

### Flow Duration Index   

#### Ecology Performance Standards 
Ecology Stormwater Guidance includes flow-related performance standards to protect receiving waters from degradation caused by changes in the hydrologic regime due to development.  These performance standards rely on flow-duration matching, whereby flow durations from developed land are required to match pre-developed flow-durations for a range of discharge values. The flow duration standard is intended to prevent flashy flows in receiving stream channels. 

#### Calculation of the Index
We developed an index representing the magnitude of change to the flow-duration curve between flow thresholds. Thresholds were chosen based on Ecology's LID and Flow Control Standards  (Department of Ecology, 2014), which require flow-duration matching over the range between 8 percent of the 2-year peak discharge (lower threshold of the LID standard) up to the 50-year peak discharge (upper threshold of the flow-control standard).   

The flow discharge index is calculated by summing the discharge over the simulation period between a high-flow and low-flow threshold. Figure 3.6 illustrates the summation of flow-duration values used in calculating this index. 

<div class="figure">
<center>
<img src="/img/fdrfig-1.png" alt="Example flow duration curves of altered and forested land covers" width="672" />
<p class="caption"> Figure 3.6. Example flow duration curves of altered and forested land covers</p>
</center>
</div>

The flow duration index can be described by Equation 3.1. 

<div class="figure">
<center>
<img src="/img/EQ_3.1.JPG" alt="Equation 3.1" width="672" />
</center>
</div>


Where q<sub>current</sub> is the simulated discharge for current or altered conditions and q<sub>forest</sub> is the predevelopment or forested conditions. One is added to this ratio and the logarithm is taken to produce an index that generally falls between 1 and 10. This index is then applied to hru/grid combinations in the stormwater heatmap to produce a spatially explicit mapping of flow alteration. Figure 3.7 shows a summary of flow index values used in the stormwater heatmap.     

<div class="figure">
<center>
<img src="/img/flowIndexfig-1.png" alt="Summary of flow index values in study area" width="672" />
<p class="caption">Figure 3.7. Summary of flow index values in study area</p>
</center>
</div>
