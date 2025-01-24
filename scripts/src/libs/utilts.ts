/**
 * Hotfix function to fix path
 * 
 * e.g. `../src/clients/` => `./src/clients/`
 * @param path 
 * @returns 
 */
export function levelUpPath(path: string): string {
  return './' + path.replace(/^\.\.\//, '')
}
