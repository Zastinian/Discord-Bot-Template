/**
 * @param {string} name
 * @param {string} description
 * @param {Function} run
 */

export interface Command {
    name: string;
    description: string;
    run: Function;
}
  