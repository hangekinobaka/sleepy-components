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
