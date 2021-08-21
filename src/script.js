export const jsonDecoder = (jsonData) => {
  const tableHeaders = Object.keys(jsonData[0]);
  const tableData = jsonData.map((item) => Object.values(item));
  return { tableHeaders, tableData };
};
