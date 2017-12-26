/**
 * Modal.js
 * Copyright (c) 2016 xyzhanjiang & contributors
 *
 * Licensed under the MIT License.
 *
 * @author xyzhanjiang <xyzhanjiang@qq.com>
 */

+(function (root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'), require('./transition'), require('./modal.css'));
    } else {
        root.modal = factory(root.jQuery, root.jQuery.support.transition);
    }
}(this, function ($, transition) {

    var transitionEndEventName = 'customTransitionEnd';

    /**
     * Modal
     *
     * @constructor
     * @param {Object} element
     * @param {Object} options
     */
    var Modal = function (element, options) {
        this.options = options;
        this.$el = $(element);
        this.$dialog = this.$el.find('.modal-dialog');
        this.$body = $(document.body);
        this.$back = null;
        this.isShown = false;
        this.originalBodyPad = 0;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;

        if (this.options.remote) {
            this.$el
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$el.trigger('loaded.modal');
                }, this));
        }
    };

    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };

    /**
     * Show modal
     *
     * @param {Object}
     * @returns {Undefined}
     */
    Modal.prototype.show = function (_relatedTarget) {
        var that = this;
        var e = $.Event('show.modal', {relatedTarget: _relatedTarget});
        this.$el.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');

        this.escape();
        this.resize();

        this.$el.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$dialog.on('mousedown.dismiss.modal', function () {
            that.$el.one('mouseup', function (e) {
                if ($(e.target).is(that.$el)) {
                    that.ignoreBackdropClick = true;
                }
            });
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$el.hasClass('fade');

            if (!that.$el.parent().length) {
                that.$el.appendTo(that.$body);
            }

            that.$el
                .show()
                .scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$el[0].offsetWidth;
            }

            that.$el.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.modal', {relatedTarget: _relatedTarget});

            transition ?
                that.$dialog
                    .one('customTransitionEnd', function () {
                        that.$el.trigger('focus').trigger(e);
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$el.trigger('focus').trigger(e);
        });
    };

    /**
     * Hide modal
     *
     * @param {Object} e
     * @returns {Undefined}
     */
    Modal.prototype.hide = function (e) {
        if (e) {
            e.preventDefault();
        }

        e = $.Event('hide.modal');
        this.$el.trigger(e);
        if (!this.isShown || e.isDefaultPrevented()) {
            return;
        }
        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.modal');

        this.$el
            .removeClass('in')
            .off('click.dismiss.modal')
            .off('mouseup.dismiss.modal');

        this.$dialog.off('mousedown.dismiss.modal');

        $.support.transition && this.$el.hasClass('fade') ?
            this.$el
                .one('customTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
            this.hideModal();
    };

    /**
     * Toggle dialog
     *
     * @param {Object}
     * @returns {Undefined}
     */
    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };

    /**
     * Enforce Focus
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.modal')
            .on('focusin.modal', $.proxy(function (e) {
                if (document !== e.target && this.$el[0] !== e.target && !this.$el.has(e.target).length) {
                    this.$el.trigger('focus');
                }
            }, this));
    };

    /**
     * escape
     * 敲击 ESC 键关闭
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$el.on('keydown.dismiss.modal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            this.$el.off('keydown.dismiss.modal');
        }
    };

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.modal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.modal');
        }
    };

    Modal.prototype.hideModal = function () {
        var that = this;
        this.$el.hide();
        this.backdrop(function () {
            that.$body.removeClass('modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$el.trigger('hidden.modal');
        });
    };

    /**
     * create dialog back
     *
     * @param {Function} callback
     * @returns {Undefined}
     */
    Modal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$el.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$back = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body);

            this.$el.on('click.dismiss.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) {
                    return;
                }
                this.options.backdrop == 'static'
                    ? this.$el[0].focus()
                    : this.hide();
            }, this));

            if (doAnimate) {
                this.$back[0].offsetWidth;
            }
            this.$back.addClass('in');

            if (!callback) {
                return;
            }

            doAnimate ?
                this.$back
                    .one('customTransitionEnd', callback)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback();
        } else if (!this.isShown && this.$back) {
            this.$back.removeClass('in');

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback();
            };

            $.support.transition && this.$el.hasClass('fade') ?
                this.$back
                    .one('customTransitionEnd', callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove();
        } else if (callback) {
            callback();
        }

    };

    /**
     * remove dialog back
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.removeBackdrop = function () {
        this.$back && this.$back.remove();
        this.$back = null;
    };

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    /**
     * Adjust Dialog
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$el[0].scrollHeight > document.documentElement.clientHeight;

        this.$el.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    };

    /**
     * Reset Adjustments
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.resetAdjustments = function () {
        this.$el.css({
            paddingLeft: '',
            paddingRight: ''
        });
    };

    /**
     * Check Scrollbar
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    /**
     * Set Scrollbar
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) {
            this.$body.css({
                'padding-right': bodyPad + this.scrollbarWidth
            });
        }
    };

    /**
     * Reset Scrollbar
     *
     * @param {Undefined}
     * @returns {Undefined}
     */
    Modal.prototype.resetScrollbar = function () {
        this.$body.css({
            'padding-right': this.originalBodyPad
        });
    };

    /**
     * Measure Scrollbar
     *
     * @param {Undefined}
     * @returns {Number} scrollbarWidth
     */
    Modal.prototype.measureScrollbar = function () {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    /**
     * plugin
     *
     * @param {Object} option
     * @param {Object} _relatedTarget
     * @returns {Object} this
     */
    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('modal', (data = new Modal(this, options)));
            if (typeof option == 'string') data[option](_relatedTarget);
            else if (options.show) data.show(_relatedTarget);
        });
    }

    $.fn.modal = Plugin;

    $(document).on('click.modal', '[data-toggle="modal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());

        if ($this.is('a')) {
            e.preventDefault();
        }

        $target.one('show.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            $target.one('hidden.modal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });

        Plugin.call($target, option, this);
    });

    return Plugin;
}));