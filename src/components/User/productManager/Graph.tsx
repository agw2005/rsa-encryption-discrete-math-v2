import React from 'react'
import { accessGraph } from '../../../Data/accessGraph'
import './Graph.css'

const Graph: React.FC = () => {
  const colorMapping: { [key: number]: string } = {
    0: "#FF6384",
    1: "#36A2EB",
    2: "#FFCE56",
    3: "#4BC0C0",
    4: "#9966FF",
  };

  const welshPowell = (graph: { [key: string]: string[] }) => {
    const colors: { [key: string]: number } = {};
    const sortedRoles = Object.keys(graph).sort((a, b) => graph[b].length - graph[a].length);

    for (const role of sortedRoles) {
      const assignedColors = new Set<number>();
      for (const neighbor of graph[role]) {
        if (colors[neighbor] !== undefined) {
          assignedColors.add(colors[neighbor]);
        }
      }

      let color = 0;
      while (assignedColors.has(color)) {
        color++;
      }
      colors[role] = color;
    }

    return colors;
  };

  const colors = welshPowell(accessGraph);

  const data = Object.entries(accessGraph).map(([role, accessibleRoles]) => ({
    label: role,
    value: accessibleRoles.length,
    color: colorMapping[colors[role]] || "#CCCCCC",
    accessibleRoles,
  }));

  return (
    <div className="graph-container">
      <svg className="svg-container" width="100%" height="500">
        {data.map((item, index) => {
          const x = (index + 1) * 150; 
          let y = 150; 
  
          if (item.label === "Chief Operating Officer") {
            y = 420;
          } else if (item.label === "Product Manager") {
            y = 300;
          } else if (item.label === "Senior Developer") {
            y = 450;
          } else if (item.label === "Junior Developer") {
            y = 300;
          }
  
          return (
            <React.Fragment key={index}>
              {}
              {item.accessibleRoles.map((role) => {
                const targetIndex = data.findIndex(d => d.label === role);
                if (targetIndex !== -1) {
                  const targetX = (targetIndex + 1) * 150; 
                  const targetY = (targetIndex === index) ? y : (targetIndex === 0 ? 420 : 300); 
                  return (
                    <line
                      key={role}
                      x1={x}
                      y1={y}
                      x2={targetX}
                      y2={targetY}
                      stroke="#000000" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      color='#663504'
                    />
                  );
                }
                return null;
              })}
  
              {}
              {item.label === "Product Manager" && ["Product Manager 1", "Product Manager 2", "Product Manager 3"].map((branch, branchIndex) => {
                const branchX = x + (branchIndex + 1) * 120; 
                const branchY = y - 150; 
  
                
                const lineStartX = x; 
                const lineStartY = y; 
  
                return (
                  <React.Fragment key={branch}>
                    <line x1={lineStartX} y1={lineStartY} x2={branchX} y2={branchY} />
                    <circle cx={branchX} cy={branchY} r="30" fill="#36A2EB" />
                    <text x={branchX} y={branchY - 10} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="12">{branch}</text>
                  </React.Fragment>
                );
              })}
  
              {}
              {item.label === "Junior Developer" && ["Junior Developer 1", "Junior Developer 2", "Junior Developer 3"].map((branch, branchIndex) => {
                const branchX = x + 150; 
                const branchY = y + (branchIndex + 1) * 70; 
                return (
                  <React.Fragment key={branch}>
                    <line x1={x} y1={y} x2={branchX} y2={branchY} />
                    <circle cx={branchX} cy={branchY} r="30" fill="#FFCE56" />
                    <text x={branchX + 60} y={branchY + 60} textAnchor="start" alignmentBaseline="middle" fill="#fff" fontSize="12">{branch}</text>
                  </React.Fragment>
                );
              })}
  
              {}
              {item.label === "Senior Developer" && ["Senior Developer 1", "Senior Developer 2", "Senior Developer 3"].map((branch, branchIndex) => {
                const branchX = x + (branchIndex * 120); 
                const branchY = y + 150; 
                return (
                  <React.Fragment key={branch}>
                    <line x1={x} y1={y} x2={branchX} y2={branchY} />
                    <circle cx={branchX} cy={branchY} r="30" fill="#FFCE56" />
                    <text x={branchX} y={branchY + 110} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="12">{branch}</text>
                  </React.Fragment>
                );
              })}
  
            </React.Fragment>
          );
        })}
  
        {}
        {data.map((item, index) => {
          const x = (index + 1) * 150; 
          let y = item.label === "Chief Operating Officer" ? 420 : 
                  item.label === "Product Manager" ? 300 : 
                  item.label === "Senior Developer" ? 450 : 
                  item.label === "Junior Developer" ? 300 : 
                  null;
  
          if (y !== null) {
            return (
              <React.Fragment key={`main-circle-${index}`}>
                <circle cx={x} cy={y} r="40" fill={item.color} />
                <text x={x} y={y - 10} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="12">{item.label}</text>
                <text x={x} y={y + 10} textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="10">{item.value}</text>
              </React.Fragment>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default Graph