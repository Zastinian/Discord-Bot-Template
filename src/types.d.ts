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
  name: string
  description: string
  run: Function
}
