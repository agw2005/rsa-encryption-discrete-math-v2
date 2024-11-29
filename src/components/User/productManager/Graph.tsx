import React from 'react';
import { accessGraph } from '../../ComponentData/accessGraph'; // Import the access graph data
import './Graph.css'; // Import the CSS file

const Graph: React.FC = () => {
  // Define a color mapping for each role index
  const colorMapping: { [key: number]: string } = {
    0: "#FF6384", // Red
    1: "#36A2EB", // Blue
    2: "#FFCE56", // Yellow
    3: "#4BC0C0", // Teal
    4: "#9966FF", // Purple
    // Add more colors if needed
  };

  // Welsh-Powell algorithm implementation
  const welshPowell = (graph: { [key: string]: string[] }) => {
    const colors: { [key: string]: number } = {};
    const sortedRoles = Object.keys(graph).sort((a, b) => graph[b].length - graph[a].length); // Sort by degree

    for (const role of sortedRoles) {
      const assignedColors = new Set<number>();
      // Check colors of adjacent roles
      for (const neighbor of graph[role]) {
        if (colors[neighbor] !== undefined) {
          assignedColors.add(colors[neighbor]);
        }
      }

      // Assign the lowest available color
      let color = 0;
      while (assignedColors.has(color)) {
        color++;
      }
      colors[role] = color;
    }

    return colors;
  };

  // Apply the Welsh-Powell algorithm to get colors for each role
  const colors = welshPowell(accessGraph);

  // Transform the accessGraph data into a format suitable for the graph
  const data = Object.entries(accessGraph).map(([role, accessibleRoles]) => ({
    label: role,
    value: accessibleRoles.length, // Count of accessible roles
    color: colorMapping[colors[role]] || "#CCCCCC", // Use the color from the Welsh-Powell algorithm
    accessibleRoles, // Keep track of accessible roles for drawing edges
  }));

  return (
    <div className="graph-container">
      <svg className="svg-container" width="100%" height="300">
        {data.map((item, index) => {
          const x = (index + 1) * 150; // Calculate x position for circles
          const y = 150; // Fixed y position for circles

          // Draw lines to accessible roles
          return (
            <React.Fragment key={index}>
              {item.accessibleRoles.map((role) => {
                const targetIndex = data.findIndex(d => d.label === role);
                if (targetIndex !== -1) {
                  const targetX = (targetIndex + 1) * 150;
                  const targetY = y + 50; // Adjust y position for branches
                  return (
                    <line
                      key={role}
                      x1={x}
                      y1={y}
                      x2={targetX}
                      y2={targetY}
                    />
                  );
                }
                return null;
              })}
              <circle cx={x} cy={y} r="40" fill={item.color} />
              <text x={x} y={y - 10} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="12">{item.label}</text>
              <text x={x} y={y + 10} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="10">{item.value}</text>
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
};

export default Graph; 