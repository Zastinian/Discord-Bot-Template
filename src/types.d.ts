/**
 * @description It's defining an interface.
 * @author Zastinian
 * @param {string} name
 * @param {string} description
 * @param {Function} run
 * @export
 * @interface Command
 */
export interface Command {
  /* It's defining a property called `name` that is of type `string`. */
  name: string;
  /* It's defining a property called `description` that is of type `string`. */
  description: string;
  /* It's defining a property called `run` that is of type `Function`. */
  run: Function;
}
