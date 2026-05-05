import re

with open('src/data/scenarios.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# We look for lines like:        name: 'the budget for my child's l...',
# To fix this, we can capture the whole line starting with `name: '` and ending with `',` 
# But wait, `re.sub` is tricky if there are multiple quotes.
# Let's just iterate over all lines
lines = text.split('\n')
for i in range(len(lines)):
    line = lines[i]
    if line.strip().startswith("name: '") and line.endswith("',"):
        # The content is between the first ' and the last ',
        content = line[line.find("name: '") + 7 : -2]
        # if there's a single quote inside content, let's escape it
        content = content.replace("'", "\\'")
        # reconstruct the line
        prefix = line[:line.find("name: '")]
        lines[i] = f"{prefix}name: '{content}',"

with open('src/data/scenarios.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
