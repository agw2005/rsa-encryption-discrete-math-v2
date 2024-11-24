export interface accessgraph {
    [role: string]: string[];
  }
  
  export const accessGraph: accessgraph = {
    "Chief Operating Officer": ["Product Manager"],
    "Product Manager": [
        "Chief Operating Officer", 
        "Product Manager 1", 
        "Product Manager 2", 
        "Product Manager 3", 
        "Junior Developer", 
        "Senior Developer"
    ],
    // End of Selection
    "Senior Developer": [
        "Product Manager", 
        "Senior Developer 1", 
        "Senior Developer 2", 
        "Senior Developer 3"
    ],
    // Removed as per instructions
    "Junior Developer": [
        "Product Manager", 
        "Junior Developer 1", 
        "Junior Developer 2", 
        "Junior Developer 3"
    ],
    // Removed as per instructions
  };
  