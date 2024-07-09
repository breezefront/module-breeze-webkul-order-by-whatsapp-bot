define([
    'jquery',
    'ko',
    'underscore'
], function ($, ko, _) {
    'use strict';

    $.view = $.createComponentFn($.View.extend({
        initialize: function () {
            this._super();
            return this.initLinks();
        },

        initLinks: function () {
            _.each(this.listens || {}, (cb, name) => {
                if (typeof this[cb] === 'function') {
                    this.on(name, this[cb].bind(this));
                }
            });

            this.setLinks(this.links, 'imports');
            this.setLinks(this.links, 'exports');
            this.setLinks(this.imports, 'imports');
            this.setLinks(this.exports, 'exports');

            return this;
        },

        setLinks: function (links, direction) {
            var isImport = direction === 'imports';

            _.each(links || {}, (val, key) => {
                var valScope, valPath, keyScope, keyPath;

                [valScope, valPath] = val.includes(':') ? val.split(':') : [this.__scope, val];
                [keyScope, keyPath] = key.includes(':') ? key.split(':') : [this.__scope, key];

                $.breezemap.uiRegistry.get(valScope, valCmp => {
                    $.breezemap.uiRegistry.get(keyScope, keyCmp => {
                        var source = isImport ? valCmp : keyCmp,
                            sourceKey = isImport ? valPath : keyPath,
                            value = source.get(sourceKey),
                            update = isImport ? (v) => keyCmp.set(keyPath, v) : (v) => valCmp.set(valPath, v);

                        if (ko.isObservable(value)) {
                            value.subscribe(update);
                        } else {
                            source.on(sourceKey, (e, data) => update(data.value));
                        }

                        if (_.isFunction(value)) {
                            value = value();
                        }

                        if (typeof value !== 'undefined' && value != null) {
                            update(value);
                        }
                    });
                });
            });

            return this;
        },

        on: function (name, callback) {
            var [scope, event] = name.includes(':') ? name.split(':') : [this.__scope, name];

            $.breezemap.uiRegistry.get(scope, cmp => {
                if (cmp[event] && ko.isObservable(cmp[event])) {
                    cmp[event].subscribe(callback);
                } else {
                    cmp._on(cmp.__name + ':' + event.replaceAll('.', '_'), callback);
                }
            });

            return this;
        },

        trigger: function (name, data) {
            var [scope, event] = name.includes(':') ? name.split(':') : [this.__scope, name];

            $.breezemap.uiRegistry.get(scope, cmp => {
                cmp._trigger(event.replaceAll('.', '_'), data);
            });
        },

        bubble: function () {
            return false;
        },

        set: function (path, value) {
            var parts = path.split('.'),
                last = parts.pop(),
                target = parts.length ? this.get(parts.join('.')) : this;

            if (_.isUndefined(target)) {
                target = this;
                parts.forEach(key => {
                    target[key] = target[key] || {};
                    target = target[key];
                });
            }

            if (_.isFunction(target[last])) {
                target[last](value);
            } else if (target[last] != value) { // eslint-disable-line eqeqeq
                target[last] = value;
                this.trigger(path, { value });
            }

            return this;
        },

        get: function (path) {
            return _.get(this, path.split('.'));
        },

        _processDefaults: function (obj, context) {
            return this._renderLiterals(obj, context);
        },

        _renderLiterals: function (obj, context, canIgnore = true) {
            var result;

            if ($.isPlainObject(obj) || _.isArray(obj)) {
                result = $.isPlainObject(obj) ? {} : [];
                _.each(obj, (val, key) => {
                    if (['children', 'dictionaries'].includes(key) || canIgnore && context.ignoreTmpls?.[key]) {
                        result[key] = val;
                    } else {
                        if (_.isString(key) && key.includes('${')) {
                            key = this._renderLiterals(key, context, false);
                        }
                        result[key] = this._renderLiterals(val, context, false);
                    }
                });
            } else if (_.isString(obj) && obj.includes('${')) {
                // Copied from lib/web/mage/utils/template.js:79
                // eslint-disable-next-line no-shadow
                result = (function (t, $) { // eslint-disable-line no-unused-vars
                    return eval('`' + t + '`'); // eslint-disable-line no-eval
                })(obj, context);
            } else {
                result = obj;
            }

            return result;
        }
    }));
});
