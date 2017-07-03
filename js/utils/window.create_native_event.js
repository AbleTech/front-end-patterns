// This script maintains compatibility for registering native events
// across oldIE and other browsers.
//
// It currently supports the following events:
// - change
// - mousedown
// - mouseup
// - click
//
// Requires ./_utils.js
(function(d, w, utils){

  function _createEvent(eventType) {

    var e,
        _eventMap = {
          change: 'HTMLEvents',
          mousedown: 'MouseEvent',
          mouseup: 'MouseEvent',
          click: 'MouseEvent'
        },
        eventGroup = _eventMap[eventType];

    if (d.createEvent) {
      // Browser is probably oldIE
      e = d.createEvent(eventGroup);
      if (eventGroup === 'MouseEvent') {
        e.initMouseEvent(eventType,true,true,w,0,0,0,0,0,false,false,false,false,0,null);
      } else {
        e.initEvent(eventType,true,true);
      }
    } else {
      // Use new event spec
      e = (eventGroup === 'MouseEvent') ? new MouseEvent(eventType) : new Event(eventType, {bubbles: true});
    }
    return e;
  }

  // Publish createNativeEvent under the utils global
  utils.createNativeEvent = _createEvent;

})(document, window, window.utils);
