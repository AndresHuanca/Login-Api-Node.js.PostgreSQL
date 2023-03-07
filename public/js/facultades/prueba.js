function solution(queries) {
    const container = [];
    const result = [];
    
    for (let i = 0; i < queries.length; i++) {
      const operation = queries[i][0];
      const value = queries[i][1];
      
      if (operation === "ADD") {
        container.push(parseInt(value));
        result.push("");
      } else if (operation === "EXISTS") {
        const exists = container.includes(parseInt(value));
        result.push(exists ? "true" : "false");
      }
    }
    
    return result;
  }
  
  const queries = [
    ["ADD", "1"],
    ["ADD", "1"],
    ["ADD", "2"],
    ["ADD", "5"],
    ["ADD", "2"],
    ["EXISTS", "2"],
    ["EXISTS", "5"],
    ["EXISTS", "1"],
    ["EXISTS", "4"],
    ["EXISTS", "3"],
    ["EXISTS", "0"]
  ];
  
  console.log(solution(queries));
  