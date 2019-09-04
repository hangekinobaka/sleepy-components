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