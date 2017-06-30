// Requires ./_ui.js
// Requires ./lib/element.matches
(function(d){

  var CONSTANTS = {
    HTML_CLASS_ACTIVE: 'js_dialog_open',
    DIALOG_CLASS_ACTIVE: 'js_dialog_active',
    MASK_SELECTOR: '#dialog_mask',
    ATTR_CLOSE_DIALOG: 'data-dialog-close'
  };

  function Dialogs(id) {
    var dialog  = this;
    dialog.id   = id;
    dialog.elem = d.querySelector('#' + dialog.id);

    htmlNode = d.documentElement;
    dialogMask = d.querySelector(CONSTANTS.MASK_SELECTOR);
    closeElements = d.querySelectorAll('[' + CONSTANTS.ATTR_CLOSE_DIALOG + '="' + dialog.id + '"]');

    /* Private **************************************/
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
    function _closeElementClickHandler (e) {
      var elem = e.target;
      if (elem.href && /^#/.test(elem.href) && d.getElementById(elem.href.split('#')[1])) {
        e.preventDefault();
      }
      dialog.close();
    }
    /************************************************/

    dialog._envOpen = function() {
      htmlNode.classList.add(CONSTANTS.HTML_CLASS_ACTIVE);
    };
    dialog._envClose = function() {
      htmlNode.classList.remove(CONSTANTS.HTML_CLASS_ACTIVE);
    };

    dialog._bindMask = function() {
      dialogMask.addEventListener('click', _maskClickHandler);
    };
    dialog._unbindMask = function() {
      dialogMask.removeEventListener('click', _maskClickHandler);
    };

    dialog._bindEscape = function() {
      htmlNode.addEventListener('keyup', _escapeKeyUpHandler);
    };
    dialog._unbindEscape = function() {
      htmlNode.removeEventListener('keyup', _escapeKeyUpHandler);
    };

    dialog._bindClose = function() {
      var i = 0,
          len = closeElements.length;
      for (i; i < len; i++) {
        var elem = closeElements[i];
        elem.addEventListener('click', _closeElementClickHandler);
      }
    };
    dialog._unbindClose = function() {
      var i = 0,
          len = closeElements.length;
      for (i; i < len; i++) {
        var elem = closeElements[i];
        elem.removeEventListener('click', _closeElementClickHandler);
      }
    };

    dialog._triggerCloseEvent = function() {
      var closeEvent = d.createEvent('CustomEvent');
      closeEvent.initCustomEvent('dialog:closed', true, true);
      dialog.elem.dispatchEvent(closeEvent);
    };

    dialog.open = function() {
      dialog.elem.classList.add(CONSTANTS.DIALOG_CLASS_ACTIVE);
      dialog._envOpen();
      dialog._bindMask();
      dialog._bindEscape();
      dialog._bindClose();
    };

    dialog.close = function() {
      dialog.elem.classList.remove(CONSTANTS.DIALOG_CLASS_ACTIVE);
      dialog._envClose();
      dialog._unbindEscape();
      dialog._unbindMask();
      dialog._unbindClose();
      dialog._triggerCloseEvent();
    };

    return dialog;

  }

  UI.Dialog = Dialog;

})(document);
