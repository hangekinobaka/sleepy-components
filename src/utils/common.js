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
 * @param {Object} options  The configuration for the component
 * @param {HTMLDivElement} root  App vue object *
 *
 * @return {HTMLDivElement} The dynamic container for your component
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
/**
 *
 * @param {Number} from  Lower limit
 * @param {Number} to    Upper limit
 * @param {Number} value Checked number value
 *
 * @return {Number} Either source value itself or limit value if range limits
 *   are exceeded
 */
export const inRange = (from, to, value) => {
  return value < from ? from : value > to ? to : value;
};

export const createModalEvent = (args = {}) => {
  return {
    id: generateId(),
    timestamp: Date.now(),
    canceled: false,
    ...args
  };
};
