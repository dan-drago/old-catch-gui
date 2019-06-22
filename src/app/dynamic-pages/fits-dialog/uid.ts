let count = 0;

/**
 * Gets a Simple Unique Id each time it is called; used when you need to uniquely identify divs, etc.
 */
export function getSimpleUID(): string {
  count++;
  return 'simple_uuid_' + count;
}
