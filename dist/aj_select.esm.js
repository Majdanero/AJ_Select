import { ref, computed, watch, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, normalizeProps, guardReactiveProps, toDisplayString, Fragment, renderList, createTextVNode, createCommentVNode } from 'vue';

const _hoisted_1 = ["onClick"];
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

  setup(__props, _ref) {
    let {
      emit
    } = _ref;
    const props = __props;
    const select = ref(null);
    let status = ref(false);
    const value = ref(props.modelValue);
    props.items;
    const isMulti = computed(() => props.multi !== false);
    const listAllow = computed(() => isMulti.value ? props.items : props.items.filter(x => JSON.stringify(x) !== JSON.stringify(value.value)));
    watch(() => props.modelValue, () => value.value = props.modelValue);

    let onClick = e => {
      if (e.target === select.value) status.value = !status.value;else if (!select.value.contains(e.target)) status.value = false;
    };

    onMounted(() => {
      window.addEventListener('click', onClick);
    });
    onUnmounted(() => {
      window.removeEventListener('click', onClick);
    });

    const isSelect = item => isMulti.value && value.value.map(JSON.stringify).includes(JSON.stringify(item));

    const Select = el => {
      if (props.block !== false) return;

      if (props.multi !== false) {
        const index = value.value.map(JSON.stringify).indexOf(JSON.stringify(el));
        if (index === -1) value.value.push(el);else value.value.splice(index, 1);
      } else {
        value.value = el;
        status.value = false;
      }

      emit("update:modelValue", value);
      emit("emit");
    };

    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["AJ_Select", {
          isMulti: unref(isMulti),
          block: props.block
        }]),
        ref: (_value, _refs) => {
          _refs['select'] = _value;
          select.value = _value;
        }
      }, [createElementVNode("p", null, [renderSlot(_ctx.$slots, "default")]), createElementVNode("span", null, [renderSlot(_ctx.$slots, "value", normalizeProps(guardReactiveProps({
        item: value.value
      })), () => [createElementVNode("b", null, toDisplayString(props.multi !== false ? value.value.join(', ') : value.value), 1)])]), createElementVNode("div", {
        class: normalizeClass(["_arr", {
          open: unref(status)
        }])
      }, null, 2), unref(status) ? (openBlock(), createElementBlock("ul", {
        key: 0,
        class: normalizeClass({
          top: props.top !== false
        })
      }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(listAllow), item => {
        return openBlock(), createElementBlock("li", {
          key: JSON.stringify(item),
          onClick: $event => Select(item),
          class: normalizeClass({
            select: isSelect(item)
          })
        }, [renderSlot(_ctx.$slots, "item", normalizeProps(guardReactiveProps({
          item,
          active: isSelect(item)
        })), () => [createTextVNode(toDisplayString(item), 1)])], 10, _hoisted_1);
      }), 128))], 2)) : createCommentVNode("", true)], 2);
    };
  }

};

function styleInject(css, ref) {
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
}

var css_248z = ".AJ_Select {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n  height: 40px;\n  border: 1px solid #353F4D;\n  border-radius: 10px;\n  user-select: all;\n  cursor: pointer;\n  width: calc(100% - 10px);\n  margin: 5px;\n}\n.AJ_Select.block {\n  user-select: none;\n  pointer-events: none;\n  border: 1px solid rgba(53, 63, 77, 0.5);\n}\n.AJ_Select.block > span, .AJ_Select.block > p {\n  opacity: 0.5;\n}\n.AJ_Select > span, .AJ_Select > p {\n  letter-spacing: 0.5px;\n  user-select: none;\n  pointer-events: none;\n}\n.AJ_Select > p {\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 9px;\n  color: #ffffff;\n  padding: 0 10px 0 10px;\n  position: absolute;\n  top: 0;\n  left: 10px;\n  transform: translateY(-50%);\n  margin: 0;\n  background-color: #1E242A;\n}\n.AJ_Select > span {\n  width: 100%;\n  position: relative;\n  font-size: 16px;\n  font-weight: 400;\n  height: 18px;\n  padding: 0 10px 0 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.AJ_Select > span b {\n  font-size: 16px;\n  font-weight: 400;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.AJ_Select ._arr {\n  width: 17px;\n  height: 17px;\n  position: absolute;\n  top: 11px;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.AJ_Select ._arr::after {\n  content: \"\";\n  border-color: #353F4D;\n  border-style: solid;\n  border-width: 1px 1px 0 0;\n  display: flex;\n  height: 11px;\n  width: 11px;\n  box-sizing: border-box;\n  transform: rotate(135deg);\n  margin-top: -30%;\n  transition: 0.3s;\n}\n.AJ_Select ._arr.open::after {\n  transform: rotate(-45deg);\n  margin-top: 25%;\n}\n.AJ_Select:hover ._arr::after {\n  border: 1px solid #fd6950;\n  border-width: 1px 1px 0 0;\n}\n.AJ_Select > ul {\n  position: absolute;\n  top: calc(100% + 10px);\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: #1E242A;\n  box-shadow: 0 0 2rem 0.1rem rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  min-height: 13px !important;\n  min-width: 100%;\n  overflow: hidden;\n  transition: 0.15s;\n  z-index: 99999;\n}\n.AJ_Select > ul.top {\n  top: unset;\n  bottom: calc(100% + 10px);\n}\n.AJ_Select > ul > li {\n  padding: 0.5rem 10px;\n  white-space: nowrap;\n  cursor: pointer;\n  min-height: 37px;\n  display: flex;\n  align-items: center;\n  line-height: 11px;\n  letter-spacing: 0.5px;\n  font-size: 12px;\n  font-weight: 400;\n  user-select: none;\n  transition: 0.3s;\n  color: #fff;\n}\n.AJ_Select > ul > li:hover {\n  background-color: #1E242A;\n  color: #fd6950;\n}\n.AJ_Select.isMulti ul li::before {\n  content: \"\";\n  display: inline-flex;\n  width: 10px;\n  height: 10px;\n  border: 1.25px solid #ffffff;\n  margin-right: 10px;\n  transition: 0.3s;\n}\n.AJ_Select.isMulti ul li.select::before {\n  background-color: #ffffff;\n}";
styleInject(css_248z);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('Aj_select', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
