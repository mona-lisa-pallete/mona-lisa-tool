export const getJSON = (data: string) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:22111/${data}.json`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
