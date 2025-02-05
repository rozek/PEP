import PointerEvent from './PointerEvent';
import dispatcher from './dispatcher';
import mouseEvents from './mouse';
import touchEvents from './touch';
import msEvents from './ms';

export function applyPolyfill() {

  // only activate if this platform does not have pointer events
  if (!window.PointerEvent) {
    window.PointerEvent = PointerEvent;

    if (window.navigator.msPointerEnabled) {
      var tp = window.navigator.msMaxTouchPoints;
      Object.defineProperty(window.navigator, 'maxTouchPoints', {
        value: tp,
        enumerable: true
      });
      dispatcher.registerSource('ms', msEvents);
    } else {
      Object.defineProperty(window.navigator, 'maxTouchPoints', {
        value: 0,
        enumerable: true
      });
      dispatcher.registerSource('mouse', mouseEvents);
      if (window.ontouchstart !== undefined) {
        dispatcher.registerSource('touch', touchEvents);
      }
    }

    dispatcher.register(document);

    console.log('PEP.js: PointerEvent polyfill has been installed')
  } else {
    console.log('PEP.js: no PointerEvent polyfill needed')
  }
}
