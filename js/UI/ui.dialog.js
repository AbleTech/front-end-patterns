// Requires ./_ui.js
// Requires ./lib/element.matches
// Requires ./lib/window.customevent
(function(d){

  var
    HTML_CLASS_ACTIVE   = 'js_dialog_open',
    DIALOG_CLASS_ACTIVE = 'js_dialog_active',
    MASK_SELECTOR       = '#dialog_mask',
    ATTR_CLOSE_DIALOG   = 'data-dialog-close',
    ATTR_OPEN_DIALOG    = 'data-dialog-open';

  function Dialog(id) {
    var dialog        = this,
        htmlNode      = d.documentElement,
        dialogMask    = null,
        closeElements = null,
        openElements  = null;

    dialog.id   = id;
    dialog.elem = null;

    /* Private **************************************/
    function _Event(obj, eventName, handler, eventType) {
      var f = (eventType === 'add' ? 'addEventListener' : 'removeEventListener');
      obj[f](eventName, handler);
    }

    function _maskClickHandler(e) {
      if (e.target.matches(MASK_SELECTOR)) {
        dialog.close();
      }
    }
    function _escapeKeyUpHandler(e) {
      if (e.keyCode === 27) {
        dialog.close();
      }
    }
    function _toggleDialogEvent(event, callback) {
      var elem = event.target;
      if (elem.matches('[href*="' + elem.href + '"]') && d.getElementById(elem.href.split('#')[1])) {
        event.preventDefault();
      }
      callback();
    }
    function _openElementClickHandler (e) {
      _toggleDialogEvent(e, dialog.open);
    }
    function _closeElementClickHandler (e) {
      _toggleDialogEvent(e, dialog.close);
    }
    function _handlerToElems(array, eventName, handler, eventAction) {
      var i = 0,
          len = array.length;
      for (i; i < len; i++) {
        var elem = array[i];
        _Event(elem, eventName, handler, eventAction);
      }
    }
    function _triggerCustomEvent(eventName) {
      var newEvent = new CustomEvent(eventName, {bubbles: true});
      dialog.elem.dispatchEvent(newEvent);
    }

    function _init() {
      dialog.elem   = d.querySelector('#' + dialog.id);
      dialogMask    = d.querySelector(MASK_SELECTOR);
      closeElements = d.querySelectorAll('[' + ATTR_CLOSE_DIALOG + '="' + dialog.id + '"]');
      openElements  = d.querySelectorAll('[' + ATTR_OPEN_DIALOG + '="' + dialog.id + '"]');
      _handlerToElems(openElements, 'click', _openElementClickHandler, 'add');
    }
    /************************************************/

    dialog.open = function() {
      dialog.elem.classList.add(DIALOG_CLASS_ACTIVE);
      htmlNode.classList.add(HTML_CLASS_ACTIVE);
      _Event(dialogMask, 'click', _maskClickHandler, 'add');
      _Event(htmlNode, 'keyup', _escapeKeyUpHandler, 'add');
      _handlerToElems(closeElements, 'click', _closeElementClickHandler, 'add');
      _triggerCustomEvent('dialog:opened');
    };

    dialog.close = function() {
      dialog.elem.classList.remove(DIALOG_CLASS_ACTIVE);
      htmlNode.classList.remove(HTML_CLASS_ACTIVE);
      _Event(htmlNode, 'keyup', _escapeKeyUpHandler);
      _Event(dialogMask, 'click', _maskClickHandler);
      _handlerToElems(closeElements, 'click', _closeElementClickHandler);
      _triggerCustomEvent('dialog:closed');
    };

    _init();

    return dialog;

  }

  UI.Dialog = Dialog;

})(document);
