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
  console.log("root ", root);

  if (!root._dynamicContainer && options.injectModalContainer) {
    const container = createDivInBody();

    new Vue({
      parent: root,
      render: h => h(options.target)
    }).$mount(container);
  }

  return root._dynamicContainer;
};
