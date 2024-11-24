export interface accessgraph {
    [role: string]: string[];
  }
  
  export const accessGraph: accessgraph = {
    "Chief Operating Officer": ["Product Manager", "Senior Developer"],
    "Product Manager": ["Chief Operating Officer", "Product Manager", "Senior Developer", "Junior Developer"],
    "Senior Developer": ["Product Manager", "Senior Developer", "Junior Developer"],
    "Junior Developer": ["Senior Developer", "Junior Developer"]
  };
  