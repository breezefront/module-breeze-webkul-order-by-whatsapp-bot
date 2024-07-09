define(['jquery', 'ko'], function ($, ko) {
    'use strict';

    ko.bindingHandlers.optgroup = ko.bindingHandlers.options;

    $.breezemap.__register('Magento_Ui/js/form/element/select', 'Magento_Ui/js/form/element/select');
    $.breezemap.__register('Magento_Ui/js/form/element/select');
    $.breezemap.__register('./select', 'Magento_Ui/js/form/element/select');
});
