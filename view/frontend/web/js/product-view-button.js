define([
    'jquery'
], function ($) {
    'use strict';

    $.mixin('Webkul_OrderByWhatsappBot/js/view/product-view-button', {
        // turbo compatibility
        destroy: function (parent) {
            this.isFormPopUpVisible(false);
            this.popUp?.destroy();
            parent();
        },

        // keep saveNewAddress button visible
        addressChanged: function (parent, event) {
            parent(event);
            $('.action-save-address').css('display', 'inline');
        },

        // breeze uses the saveNewAddress button for selected address too
        saveNewAddress: function (parent) {
            var addressId = $('select#selectedAddress.select').val();

            if (addressId && addressId !== 'newAddress') {
                return this.buyNow();
            }

            parent();
        }
    });
});
