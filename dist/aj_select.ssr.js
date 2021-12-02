'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var _hoisted_1 = ["onClick"];
var script = {
  props: {
    modelValue: {},
    items: {
      type: Array,
      default: []
    },
    multi: {
      default: false
    },
    top: {
      default: false
    },
    block: {
      default: false
    }
  },
  emits: ['update:modelValue', 'emit'],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var select = vue.ref(null);
    var status = vue.ref(false);
    var value = vue.ref(props.modelValue);
    props.items;
    var isMulti = vue.computed(function () {
      return props.multi !== false;
    });
    var listAllow = vue.computed(function () {
      return isMulti.value ? props.items : props.items.filter(function (x) {
        return JSON.stringify(x) !== JSON.stringify(value.value);
      });
    });
    vue.watch(function () {
      return props.modelValue;
    }, function () {
      return value.value = props.modelValue;
    });

    var onClick = function onClick(e) {
      if (e.target === select.value) status.value = !status.value;else if (!select.value.contains(e.target)) status.value = false;
    };

    vue.onMounted(function () {
      window.addEventListener('click', onClick);
    });
    vue.onUnmounted(function () {
      window.removeEventListener('click', onClick);
    });

    var isSelect = function isSelect(item) {
      return isMulti.value && value.value.map(JSON.stringify).includes(JSON.stringify(item));
    };

    var Select = function Select(el) {
      if (props.block !== false) return;

      if (props.multi !== false) {
        var index = value.value.map(JSON.stringify).indexOf(JSON.stringify(el));
        if (index === -1) value.value.push(el);else value.value.splice(index, 1);
      } else {
        value.value = el;
        status.value = false;
      }

      emit("update:modelValue", value);
      emit("emit");
    };

    return function (_ctx, _cache) {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(["AJ_Select", {
          isMulti: vue.unref(isMulti),
          block: props.block
        }]),
        ref: function ref(_value, _refs) {
          _refs['select'] = _value;
          select.value = _value;
        }
      }, [vue.createElementVNode("p", null, [vue.renderSlot(_ctx.$slots, "default")]), vue.createElementVNode("span", null, [vue.renderSlot(_ctx.$slots, "value", vue.normalizeProps(vue.guardReactiveProps({
        item: value.value
      })), function () {
        return [vue.createElementVNode("b", null, vue.toDisplayString(props.multi !== false ? value.value.join(', ') : value.value), 1)];
      })]), vue.createElementVNode("div", {
        class: vue.normalizeClass(["_arr", {
          open: vue.unref(status)
        }])
      }, null, 2), vue.unref(status) ? (vue.openBlock(), vue.createElementBlock("ul", {
        key: 0,
        class: vue.normalizeClass({
          top: props.top !== false
        })
      }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(listAllow), function (item) {
        return vue.openBlock(), vue.createElementBlock("li", {
          key: JSON.stringify(item),
          onClick: function onClick($event) {
            return Select(item);
          },
          class: vue.normalizeClass({
            select: isSelect(item)
          })
        }, [vue.renderSlot(_ctx.$slots, "item", vue.normalizeProps(vue.guardReactiveProps({
          item: item,
          active: isSelect(item)
        })), function () {
          return [vue.createTextVNode(vue.toDisplayString(item), 1)];
        })], 10, _hoisted_1);
      }), 128))], 2)) : vue.createCommentVNode("", true)], 2);
    };
  }
};function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = ".AJ_Select {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n  height: 40px;\n  border: 1px solid #353F4D;\n  border-radius: 10px;\n  user-select: all;\n  cursor: pointer;\n  width: calc(100% - 10px);\n  margin: 5px;\n}\n.AJ_Select.block {\n  user-select: none;\n  pointer-events: none;\n  border: 1px solid rgba(53, 63, 77, 0.5);\n}\n.AJ_Select.block > span, .AJ_Select.block > p {\n  opacity: 0.5;\n}\n.AJ_Select > span, .AJ_Select > p {\n  letter-spacing: 0.5px;\n  user-select: none;\n  pointer-events: none;\n}\n.AJ_Select > p {\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 9px;\n  color: #ffffff;\n  padding: 0 10px 0 10px;\n  position: absolute;\n  top: 0;\n  left: 10px;\n  transform: translateY(-50%);\n  margin: 0;\n  background-color: #1E242A;\n}\n.AJ_Select > span {\n  width: 100%;\n  position: relative;\n  font-size: 16px;\n  font-weight: 400;\n  height: 18px;\n  padding: 0 10px 0 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.AJ_Select > span b {\n  font-size: 16px;\n  font-weight: 400;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.AJ_Select ._arr {\n  width: 17px;\n  height: 17px;\n  position: absolute;\n  top: 11px;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.AJ_Select ._arr::after {\n  content: \"\";\n  border-color: #353F4D;\n  border-style: solid;\n  border-width: 1px 1px 0 0;\n  display: flex;\n  height: 11px;\n  width: 11px;\n  box-sizing: border-box;\n  transform: rotate(135deg);\n  margin-top: -30%;\n  transition: 0.3s;\n}\n.AJ_Select ._arr.open::after {\n  transform: rotate(-45deg);\n  margin-top: 25%;\n}\n.AJ_Select:hover ._arr::after {\n  border: 1px solid #fd6950;\n  border-width: 1px 1px 0 0;\n}\n.AJ_Select > ul {\n  position: absolute;\n  top: calc(100% + 10px);\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: #1E242A;\n  box-shadow: 0 0 2rem 0.1rem rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  min-height: 13px !important;\n  min-width: 100%;\n  overflow: hidden;\n  transition: 0.15s;\n  z-index: 99999;\n}\n.AJ_Select > ul.top {\n  top: unset;\n  bottom: calc(100% + 10px);\n}\n.AJ_Select > ul > li {\n  padding: 0.5rem 10px;\n  white-space: nowrap;\n  cursor: pointer;\n  min-height: 37px;\n  display: flex;\n  align-items: center;\n  line-height: 11px;\n  letter-spacing: 0.5px;\n  font-size: 12px;\n  font-weight: 400;\n  user-select: none;\n  transition: 0.3s;\n  color: #fff;\n}\n.AJ_Select > ul > li:hover {\n  background-color: #1E242A;\n  color: #fd6950;\n}\n.AJ_Select.isMulti ul li::before {\n  content: \"\";\n  display: inline-flex;\n  width: 10px;\n  height: 10px;\n  border: 1.25px solid #ffffff;\n  margin-right: 10px;\n  transition: 0.3s;\n}\n.AJ_Select.isMulti ul li.select::before {\n  background-color: #ffffff;\n}";
styleInject(css_248z);// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('Aj_select', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;