// Requires ./_ui.js
// Requires ./lib/element.matches
// Requires ./lib/window.customevent
(function(d){

  var CONSTANTS = {
    HTML_CLASS_ACTIVE: 'js_dialog_open',
    DIALOG_CLASS_ACTIVE: 'js_dialog_active',
    MASK_SELECTOR: '#dialog_mask',
    ATTR_CLOSE_DIALOG: 'data-dialog-close',
    ATTR_OPEN_DIALOG: 'data-dialog-open'
  };

  function Dialog(id) {
    var dialog  = this;
    dialog.id   = id;
    dialog.elem = null;

    var htmlNode      = d.documentElement,
        dialogMask    = null,
        closeElements = null,
        openElements  = null;

    /* Private **************************************/
    function _delEvent(obj, eventName, handler) {
      obj.removeEventListener(eventName, handler);
    }
    function _addEvent(obj, eventName, handler) {
      obj.addEventListener(eventName, handler);
    }
    function _maskClickHandler(e) {
      if (e.matches(CONSTANTS.MASK_SELECTOR)) {
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
      dialogMask    = d.querySelector(CONSTANTS.MASK_SELECTOR);
      closeElements = d.querySelectorAll('[' + CONSTANTS.ATTR_CLOSE_DIALOG + '="' + dialog.id + '"]');
      openElements  = d.querySelectorAll('[' + CONSTANTS.ATTR_OPEN_DIALOG + '="' + dialog.id + '"]');
      dialog._bindOpen();
    }
    /************************************************/

    dialog._envOpen = function() {
      htmlNode.classList.add(CONSTANTS.HTML_CLASS_ACTIVE);
    };
    dialog._envClose = function() {
      htmlNode.classList.remove(CONSTANTS.HTML_CLASS_ACTIVE);
    };

    dialog._bindMask = function() {
      _addEvent(dialogMask, 'click', _maskClickHandler);
    };
    dialog._unbindMask = function() {
      _delEvent(dialogMask, 'click', _maskClickHandler);
    };

    dialog._bindEscape = function() {
      _addEvent(htmlNode, 'keyup', _escapeKeyUpHandler);
    };
    dialog._unbindEscape = function() {
      _delEvent(htmlNode, 'keyup', _escapeKeyUpHandler);
    };

    dialog._bindOpen = function() {
      _handlerToElems(openElements, 'add', 'click', _openElementClickHandler);
    };

    dialog._bindClose = function() {
      _handlerToElems(closeElements, 'add', 'click', _closeElementClickHandler);
    };
    dialog._unbindClose = function() {
      _handlerToElems(closeElements, 'del', 'click', _closeElementClickHandler);
    };

    dialog._triggerCloseEvent = function() {
      _triggerCustomEvent('dialog:closed');
    };
    dialog._triggerOpenEvent = function() {
      _triggerCustomEvent('dialog:opened');
    };

    dialog.open = function() {
      dialog.elem.classList.add(CONSTANTS.DIALOG_CLASS_ACTIVE);
      dialog._envOpen();
      dialog._bindMask();
      dialog._bindEscape();
      dialog._bindClose();
      dialog._triggerOpenEvent();
    };

    dialog.close = function() {
      dialog.elem.classList.remove(CONSTANTS.DIALOG_CLASS_ACTIVE);
      dialog._envClose();
      dialog._unbindEscape();
      dialog._unbindMask();
      dialog._unbindClose();
      dialog._triggerCloseEvent();
    };

    _init();

    return dialog;

  }

  UI.Dialog = Dialog;

})(document);
