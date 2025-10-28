#!/usr/bin/env python3
"""
Extract data layer information from markdown files and convert to JSON format.
"""

import os
import json
import re
from pathlib import Path

def extract_title(content):
    """Extract title from markdown content"""
    lines = content.split('\n')
    for line in lines:
        if line.strip() and not line.startswith('='):
            return line.strip()
    return ""

def extract_subtitle(content):
    """Extract subtitle (italicized description)"""
    lines = content.split('\n')
    for line in lines:
        if line.strip().startswith('*') and line.strip().endswith('*'):
            return line.strip()[1:-1]  # Remove asterisks
    return ""

def extract_description(content):
    """Extract description section"""
    lines = content.split('\n')
    in_description = False
    description_lines = []
    
    for line in lines:
        if line.strip() == "## Description":
            in_description = True
            continue
        elif line.strip().startswith('##') and in_description:
            break
        elif in_description and line.strip():
            description_lines.append(line.strip())
    
    return ' '.join(description_lines)

def extract_units(content):
    """Extract units section if present"""
    lines = content.split('\n')
    in_units = False
    units_lines = []
    
    for line in lines:
        if line.strip() == "## Units" or line.strip() == "## Units ":
            in_units = True
            continue
        elif line.strip().startswith('##') and in_units:
            break
        elif in_units and line.strip():
            units_lines.append(line.strip())
    
    return ' '.join(units_lines) if units_lines else None

def extract_earth_engine_info(content):
    """Extract Earth Engine access information"""
    lines = content.split('\n')
    
    # Find the data path from the layer_name assignment
    data_path = ""
    for line in lines:
        if "data.rasters[" in line or "data.pollutant_loading[" in line:
            data_path = line.strip().split('=')[1].strip()
            break
    
    # Extract viewing code
    viewing_code = ""
    in_viewing = False
    for i, line in enumerate(lines):
        if line.strip() == "#### Viewing":
            in_viewing = True
            continue
        elif line.strip().startswith('####') and in_viewing:
            break
        elif in_viewing and line.strip().startswith('```') and i < len(lines) - 1:
            # Get the code between ``` blocks
            code_lines = []
            for j in range(i+1, len(lines)):
                if lines[j].strip() == '```':
                    break
                code_lines.append(lines[j])
            viewing_code = '\n'.join(code_lines)
            break
    
    # Extract analysis code
    analysis_code = ""
    in_analysis = False
    for i, line in enumerate(lines):
        if line.strip() == "#### Analysis":
            in_analysis = True
            continue
        elif line.strip().startswith('##') and in_analysis:
            break
        elif in_analysis and line.strip().startswith('```') and i < len(lines) - 1:
            # Get the code between ``` blocks
            code_lines = []
            for j in range(i+1, len(lines)):
                if lines[j].strip() == '```':
                    break
                code_lines.append(lines[j])
            analysis_code = '\n'.join(code_lines)
            break
    
    return {
        "dataPath": data_path,
        "viewingCode": viewing_code,
        "analysisCode": analysis_code
    }

def extract_downloads(content):
    """Extract download information"""
    downloads = []
    
    # Find download links using regex - more precise pattern
    download_pattern = r'([A-Za-z\s\-_]+)\s*\(([^)]+)\)\s*\[download\]\(([^)]+)\)'
    matches = re.findall(download_pattern, content)
    
    for match in matches:
        name = match[0].strip()
        size = match[1].strip()
        url = match[2].strip()
        downloads.append({
            "name": name,
            "size": size,
            "url": url
        })
    
    return downloads

def extract_visualization(content):
    """Extract visualization information including palette, min/max values"""
    lines = content.split('\n')
    in_visualization = False
    palette = []
    minimum = None
    maximum = None
    
    for i, line in enumerate(lines):
        if line.strip() == "## Visualization":
            in_visualization = True
            continue
        elif line.strip().startswith('## ') and not line.strip().startswith('### ') and in_visualization:
            break
        elif in_visualization:
            # Extract color information from table rows
            if '|' in line and ('placeholder' in line or 'via.placeholder' in line):
                # Parse table row with color information
                parts = [p.strip() for p in line.split('|')]
                
                # Extract color from the line (handles both #ffffff and ffffff formats)
                color_match = re.search(r'`#?([0-9a-fA-F]{5,6})`', line)
                if color_match:
                    color_value = color_match.group(1)
                    # Pad 5-character colors to 6 characters
                    if len(color_value) == 5:
                        color_value = '0' + color_value
                    color = '#' + color_value
                    
                    # Check if it's a detailed table with label and value (3+ columns)
                    if len(parts) >= 4 and parts[1] and parts[2]:
                        label = parts[1]
                        value = parts[2]
                        # Skip header rows
                        if label not in ['Label', 'Colors', ':'] and value not in ['Raster value', 'Colors', ':']:
                            palette.append({
                                "label": label,
                                "value": value,
                                "color": color
                            })
                    elif len(parts) >= 3 and parts[1]:
                        # Simple color list with single column
                        if parts[1] not in ['Colors', ':']:
                            palette.append({"color": color})
                    else:
                        # Just color
                        palette.append({"color": color})
            
            # Extract min/max values
            elif line.strip().startswith('**Minimum:**'):
                minimum = line.replace('**Minimum:**', '').strip()
            elif line.strip().startswith('**Maximum:**'):
                maximum = line.replace('**Maximum:**', '').strip()
    
    return {
        "palette": palette,
        "minimum": minimum,
        "maximum": maximum
    }

def extract_source(content):
    """Extract source information"""
    lines = content.split('\n')
    in_source = False
    
    for line in lines:
        if line.strip() == "## Source":
            in_source = True
            continue
        elif line.strip().startswith('##') and in_source:
            break
        elif in_source and line.strip():
            return line.strip()
    
    return ""

def process_markdown_file(file_path):
    """Process a single markdown file and extract all information"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    data = {
        "title": extract_title(content),
        "subtitle": extract_subtitle(content),
        "description": extract_description(content),
        "earthEngine": extract_earth_engine_info(content),
        "downloads": extract_downloads(content),
        "visualization": extract_visualization(content),
        "source": extract_source(content),
        "externalLinks": []
    }
    
    # Add units if present
    units = extract_units(content)
    if units:
        data["units"] = units
    
    return data

def main():
    """Main function to process all markdown files"""
    input_dir = Path("docs/03_Data Layers")
    output_dir = Path("data_layers_json")
    
    # Files to skip (nonstandard format)
    skip_files = {
        "pollutant_concentration.md",
        "pollutant_load.md", 
        "population_density.md"
    }
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(exist_ok=True)
    
    # Process each markdown file
    for md_file in input_dir.glob("*.md"):
        if md_file.name in skip_files:
            print(f"Skipping {md_file.name} (nonstandard format)")
            continue
            
        print(f"Processing {md_file.name}...")
        
        try:
            data = process_markdown_file(md_file)
            
            # Create JSON filename
            json_filename = md_file.stem + ".json"
            json_path = output_dir / json_filename
            
            # Write JSON file
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"  -> Created {json_filename}")
            
        except Exception as e:
            print(f"  -> Error processing {md_file.name}: {e}")
    
    print(f"\nCompleted processing. JSON files saved to {output_dir}")

if __name__ == "__main__":
    main()