import json
import re
import uuid

with open('src/data/scenarios_expansion.json', 'r') as f:
    data = json.load(f)

# The frontend categories we want to map to
category_map = {
    'spending_habits': ('spending', 'Daily Spends & Habits', 'Coffee'),
    'government_schemes': ('govt_schemes', 'Government Schemes', 'Landmark'),
    'cultural_lifestyle': ('cultural', 'Culture & Lifestyle', 'Home'),
    'career_life': ('career', 'Career & Life Events', 'Briefcase')
}

ts_output = ""
new_assets = set()

for key, scenarios in data.items():
    cat_id, cat_name, cat_icon = category_map[key]
    ts_output += f"  {{\n    categoryId: '{cat_id}',\n    name: '{cat_name}',\n    icon: '{cat_icon}',\n    scenarios: [\n"
    
    for idx, s in enumerate(scenarios):
        # Generate missing fields for TS
        s_uuid = f"gen-{cat_id}-{idx}-{str(uuid.uuid4())[:6]}"
        name = s['title'].replace('What if ', '').replace(' invested', '').replace('?', '').strip()
        if len(name) > 30: name = name[:27] + '...'
        
        sim_type = 'recurring_dca' if s['type'] == 'recurring' else 'lump_sum'
        asset = s['params']['investment_asset']
        region = 'india' if (asset.endswith('.NS') or '-INR' in asset or asset in ['^NSEI', 'NIFTYBEES.NS']) else 'global'
        
        new_assets.add(asset)
        
        ts_output += f"""      {{
        uuid: '{s_uuid}',
        name: '{name}',
        title: "{s['title']}",
        description: "Explore what happens if you had made this financial choice.",
        category: '{cat_id}',
        region: '{region}',
        sim_type: '{sim_type}',
        params: {json.dumps(s['params'])},
        tags: ['New', 'Trending']
      }},
"""
    ts_output += "    ]\n  },\n"

# Now let's inject this into scenarios.ts
with open('src/data/scenarios.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Insert before the last `];` of SCENARIO_CONFIG
# We can find `  },\n];`
if "  },\n];" in ts_content:
    ts_content = ts_content.replace("  },\n];", "  },\n" + ts_output + "];")
elif "    ]\n  },\n];" in ts_content:
    ts_content = ts_content.replace("    ]\n  },\n];", "    ]\n  },\n" + ts_output + "];")
else:
    # fallback
    ts_content = ts_content.replace("\n];\n\nexport const ASSET_NAMES", ",\n" + ts_output + "];\n\nexport const ASSET_NAMES")

# Add new assets to ASSET_NAMES
# Find export const ASSET_NAMES: Record<string, string> = { ... }
asset_block_match = re.search(r"export const ASSET_NAMES: Record<string, string> = \{([\s\S]*?)\};", ts_content)
if asset_block_match:
    existing_assets_text = asset_block_match.group(1)
    # find existing keys
    existing_keys = re.findall(r"'([^']+)':", existing_assets_text)
    
    missing_assets = []
    for a in new_assets:
        if a not in existing_keys:
            missing_assets.append(f"  '{a}': '{a}',")
            
    if missing_assets:
        new_assets_text = existing_assets_text.rstrip()
        if not new_assets_text.endswith(','):
            new_assets_text += ','
        new_assets_text += "\n" + "\n".join(missing_assets) + "\n"
        
        ts_content = ts_content.replace(existing_assets_text, new_assets_text)

with open('src/data/scenarios.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Injected successfully.")
