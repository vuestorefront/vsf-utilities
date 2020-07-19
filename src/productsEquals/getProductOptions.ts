import get from 'lodash/get';
import flow from 'lodash/flow';
import cloneDeep from 'lodash/cloneDeep';

const replaceNumberToString = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      return replaceNumberToString(obj[key]);
    } else if (typeof obj[key] === 'number') {
      obj[key] = String(obj[key]);
    }
  });
  return obj;
};

const transformToArray = (value) =>
  Array.isArray(value) ? value : Object.values(value);

const getProductOptions = (product, optionsName) =>
  flow([get, cloneDeep, transformToArray, replaceNumberToString])(
    product,
    `product_option.extension_attributes.${optionsName}`,
    [],
  );

export default getProductOptions;
