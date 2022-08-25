//const port = 3001;
//export const urlServer = `http://localhost:${port}/api/`;

console.log(import.meta.env.VITE_API);

export const urlServer = import.meta.env.VITE_API;
