define([
    'jquery'
], function ($) {
    'use strict';

    $.mixin('Webkul_OrderByWhatsappBot/js/view/whatsapp-category-page', {
        // turbo compatibility
        destroy: function (parent) {
            this.isFormPopUpVisible(false);
            this.isFormPopUpVisibleSubscriber?.dispose();
            this.popUp?.destroy();
            parent();
        },
    });
});
