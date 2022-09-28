let idx = 0;

const uuid = () => {
  return idx++;
};

const generateId = (name?: string) => {
  return `id${name ? `-${name}` : ""}-${uuid()}`;
};

export default generateId;
