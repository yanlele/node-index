/**
 * Transition.js
 * Copyright (c) 2016 xyzhanjiang & contributors
 *
 * Licensed under the MIT License.
 *
 * @author xyzhanjiang <xyzhanjiang@qq.com>
 */

+(function(root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.transition = factory(root.jQuery || root.Zepto);
  }
}(this, function($) {

var transitionEndEventName = 'customTransitionEnd';

function transitionEnd() {
  var el = document.createElement('div');

  var transEndEventNames = {
    transition       : 'transitionend',
    WebkitTransition : 'webkitTransitionEnd',
    MozTransition    : 'transitionend',
    OTransition      : 'oTransitionEnd otransitionend'
  };

  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return { end: transEndEventNames[name] };
    }
  }

  return false; // explicit for ie8
}

// {end: 'transitionend'}
var transition = $.support.transition = transitionEnd();

// http://blog.alexmaccaw.com/css-transitions
// 模拟事件，防止事件意外不触发
$.fn.emulateTransitionEnd = function(duration) {
  var called = false;
  var $el = this;
  $(this).one(transitionEndEventName, function() { called = true; });
  var callback = function() { if (!called) $($el).trigger(transition.end); };
  setTimeout(callback, duration);
  return this;
};

if (transition) {
  $.event.special[transitionEndEventName] = {
    bindType: transition.end,
    delegateType: transition.end,
    handle: function(e) {
      if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
    }
  };
}

return transition;

}));