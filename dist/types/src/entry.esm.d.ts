import { Plugin } from 'vue';
import component from "./aj_select.vue";
declare type InstallableComponent = typeof component & {
    install: Exclude<Plugin['install'], undefined>;
};
declare const _default: InstallableComponent;
export default _default;
