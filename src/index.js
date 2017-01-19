/**
 * Given a setting string for this ancillary base, validate and parse the
 * string into an object with an elementName and containerName.
 *
 * @param {String} string Position string to be parsed
 * @return {Object}       An object with containerName and elementName
 * @private
 */
const parse = (string, baseName) => {
  const re = new RegExp('ancillary-' + '|' + baseName + '-', 'gi');
  const arr = string.replace(re, '').toLowerCase().split(/-position-?/);
  if (arr.length === 2) {
    return {
      elementName: arr[0],
      containerName: arr[1]
    };
  }
  return null;
};


/**
 * Match strings in className of <body> that may be valid positions.
 * Then parse them and return object with positions.
 *
 * @return {Object}    An object with all positions, indexed by element name
 * @private
 */
const getPositions = (baseName) => {
  const re = new RegExp('ancillary-' + baseName + '-(.{1,20})-position-(.+?)(?=(\\s|$))', 'gi');
  const bodyClasses = document.body.className.match(re);
  const positionObject = bodyClasses.reduce((acc, className) => {
    const info = parse(className, baseName);
    acc[info.elementName] = info.containerName;
    return acc;
  }, {});
  return positionObject;
};


/**
 * Grab all nc-elements from the DOM, and store in object with element names
 * as keys for accessibility purposes.
 *
 * @return {Object}   An object with all elements, indexed by element name
 * @private
 */
const findElements = (base) => {
  const elementNodes = Array.from(base.querySelectorAll('[data-nc-element]'));
  const elementObject = elementNodes.reduce((acc, elementNode) => {
    const elementName = elementNode.getAttribute('data-nc-element');
    if (elementName.length > 0) {
      acc[elementName] = elementNode;
    }
    return acc;
  }, {});
  return elementObject;
};


/**
 * Grab all nc-containers from the DOM, store in object with container names
 * as keys for accessibility purposes. Elements in the container are also
 * stored as a nodelist.
 *
 * @return {Object}   An object with all containers, indexed by container name
 * @private
 */
const findContainers = (base) => {
  const containerNodes = Array.from(base.querySelectorAll('[data-nc-container]'));
  const containerObject = containerNodes.reduce((acc, containerNode) => {
    const containerName = containerNode.getAttribute('data-nc-container');
    if (containerName.length > 0) {
      acc[containerName] = containerNode;
    }
    return acc;
  }, {});
  return containerObject;
};






class Ancillary {

  /**
   * Construct an instance of Ancillary in the DOM node provided.
   *
   * @param  {Object} base  Ancillary base DOM Node
   */
  constructor(base, config = {}) {
    this.baseName = base.getAttribute('data-nc-base').toLowerCase();
    this.base = base;

    this.config = config;

    this.elements = findElements(this.base);
    this.containers = findContainers(this.base);
  }

  /**
   * Get positions, then loop through this.elements and call syncElement
   * on each one.
   *
   * @public
   */
  sync() {
    this.positions = getPositions(this.baseName);
    for (const elementName in this.elements) {
      this.syncElement(elementName, this.positions[elementName]);
    }
  }

  /**
   * Given an element name and container name, insert the element into the
   * proper container. If no element is provided, nothing happens. If no
   * container is provided, remove the element from the DOM.
   *
   * @param {String} elementName    Name of the element
   * @param {String} containerName  Name of the container in which the element is positioned
   * @public
   */
  syncElement(elementName, containerName) {
    const element = this.elements[elementName];
    const container = this.containers[containerName];
    if (!element && this.config.debug) {
      console.error('Element "' + elementName + '"" not found.');
    } else if (container) {
      container.appendChild(element);
    } else if (element.parentNode) {
      element.parentNode.removeChild(element);
      if (this.config.debug) {
        console.warn('Container "' + containerName + '" not found. Removing element "' + elementName + '".');
      }
    }
  }

  /**
   * Static method that calls parse method above.
   *
   * @param {String} string Position string to be parsed
   * @return {Object}       An object with containerName and elementName
   * @public
   */
  static parse(string) {
    return parse(string, this.baseName);
  }
}


export default Ancillary;
