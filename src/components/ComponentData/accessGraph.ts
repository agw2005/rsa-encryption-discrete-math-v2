export interface accessGraphProp {
  [role: string]: string[];
}
  
export const accessGraph: accessGraphProp = {
    "Chief Operating Officer": ["Product Manager"],
    "Product Manager": ["Chief Operating Officer", "Product Manager", "Senior Developer", "Junior Developer"],
    "Senior Developer": ["Product Manager", "Senior Developer", "Junior Developer"],
    "Junior Developer": ["Senior Developer", "Junior Developer"]
};