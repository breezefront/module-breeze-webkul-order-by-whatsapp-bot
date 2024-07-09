# Webkul_OrderByWhatsappBot integration

## Installation

```bash
composer require swissup/module-breeze-webkul-order-by-whatsapp-bot
bin/magento module:enable Swissup_BreezeWebkulOrderByWhatsappBot
```

## Required patches

`view/frontend/web/js/view/product-view-button.js`

```diff
@@ -27,6 +27,7 @@

     return Component.extend({
         defaults: {
+            popUp: null,
             template: 'Webkul_OrderByWhatsappBot/whatsapp-button',
             shippingFormTemplate: 'Webkul_OrderByWhatsappBot/shipping-address/form',
             buttonText: window.whatsappConfig.pageViewButtonTitle,
@@ -149,7 +150,7 @@
             var self = this,
                 buttons;

-            if (!popUp) {
+            if (!this.popUp) {
                 buttons = this.popUpForm.options.buttons;
                 this.popUpForm.options.buttons = [{
                         text: buttons.save.text ? buttons.save.text : $t('Save Address'),
@@ -174,10 +175,10 @@
                 this.popUpForm.options.keyEventHandlers = {
                     escapeKey: this.onClosePopUp.bind(this)
                 };
-                popUp = modal(this.popUpForm.options, $(this.popUpForm.element));
+                this.popUp = modal(this.popUpForm.options, $(this.popUpForm.element));
             }

-            return popUp;
+            return this.popUp;
         },
```
