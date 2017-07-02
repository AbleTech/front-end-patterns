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
    function _delEvent(obj, eventName, handler) {
      obj.removeEventListener(eventName, handler);
    }
    function _addEvent(obj, eventName, handler) {
      obj.addEventListener(eventName, handler);
    }
    function _maskClickHandler(e) {
      if (e.matches(MASK_SELECTOR)) {
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
    function _handlerToElems(array, eventAction, eventName, handler) {
      var i = 0,
          len = array.length,
          f = (eventAction === 'add' ? _addEvent : _delEvent );
      for (i; i < len; i++) {
        var elem = array[i];
        f(elem, eventName, handler);
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
      _handlerToElems(openElements, 'add', 'click', _openElementClickHandler);
    }
    /************************************************/

    dialog.open = function() {
      dialog.elem.classList.add(DIALOG_CLASS_ACTIVE);
      htmlNode.classList.add(HTML_CLASS_ACTIVE);
      _addEvent(dialogMask, 'click', _maskClickHandler);
      _addEvent(htmlNode, 'keyup', _escapeKeyUpHandler);
      _handlerToElems(closeElements, 'add', 'click', _closeElementClickHandler);
      _triggerCustomEvent('dialog:opened');
    };

    dialog.close = function() {
      dialog.elem.classList.remove(DIALOG_CLASS_ACTIVE);
      htmlNode.classList.remove(HTML_CLASS_ACTIVE);
      _delEvent(htmlNode, 'keyup', _escapeKeyUpHandler);
      _delEvent(dialogMask, 'click', _maskClickHandler);
      _handlerToElems(closeElements, 'del', 'click', _closeElementClickHandler);
      _triggerCustomEvent('dialog:closed');
    };

    _init();

    return dialog;

  }

  UI.Dialog = Dialog;

})(document);
