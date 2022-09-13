export const getBaseUrl = (path: string) => {
  const pathArray = path.split('/');
  const protocol = pathArray[0].replace(':', '');
  const host = pathArray[2];
  return `${protocol}://${host}`;
};
