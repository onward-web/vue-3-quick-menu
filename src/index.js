import VueQuickMenuComponent from './vue-quick-menu.vue';

const VueQuickMenu = {
    install (app, options) {
        app.component('vue-quick-menu', VueQuickMenuComponent)
    }
}

export default VueQuickMenu;
