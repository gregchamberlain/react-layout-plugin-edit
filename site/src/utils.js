const rVal = () => Math.floor(Math.random() * 255);

export const createStyle = () => ({
  padding: 15,
  margin: 5,
  backgroundColor: `rgba(${rVal()}, ${rVal()}, ${rVal()}, 1)`
});