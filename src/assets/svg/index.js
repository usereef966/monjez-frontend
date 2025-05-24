const icons = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const name = key.replace('./', '');
    icons[name] = r(key);
  });
}

importAll(require.context('./', false, /\.(svg|png|jpg)$/));

export default icons;