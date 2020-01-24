/**
 *
 * @param none
 *
 * @return {HTMLDivElement} The div you just created and on the top level of body
 *
 */
export const createDivInBody = () => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  return div;
};

/**
 *
 * @param {VueConstructor} Vue  App vue object
 * @param {Object} options  The configuration for the component. Have
 * @param {Vue} root  App vue object with an additional _dynamicContainer propertity
 *
 * @return {Vue} The dynamic container for your component
 *
 */
export const getContainer = (Vue, options, root) => {
  if (!root._dynamicContainer) {
    const container = createDivInBody();

    new Vue({
      parent: root,
      render: h => h(options.target)
    }).$mount(container);
  }

  return root._dynamicContainer;
};

export const generateId = ((index = 0) => () => (index++).toString())();

// ABCD Alphabet and number map
export const dictionary = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J",
  11: "K",
  12: "L",
  13: "M",
  14: "N",
  15: "O",
  16: "P",
  17: "Q",
  18: "R",
  19: "S",
  20: "T",
  21: "U",
  22: "V",
  23: "W",
  24: "X",
  25: "Y",
  26: "Z"
};
Object.freeze(dictionary);
