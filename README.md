# Webkul_OrderByWhatsappBot integration

## Installation

```bash
composer require swissup/module-breeze-webkul-order-by-whatsapp-bot
bin/magento module:enable Swissup_BreezeWebkulOrderByWhatsappBot
```

## Required patches

`Webkul/OrderByWhatsappBot/view/frontend/web/js/view/product-view-button.js`

```diff
@@ -27,6 +27,7 @@
     return Component.extend({
         defaults: {
+            popUp: null,
             template: 'Webkul_OrderByWhatsappBot/whatsapp-button',
             shippingFormTemplate: 'Webkul_OrderByWhatsappBot/shipping-address/form',
             buttonText: window.whatsappConfig.pageViewButtonTitle,
@@ -55,7 +55,7 @@
             var self = this;
             this._super();

-            this.isFormPopUpVisible.subscribe(function(value) {
+            this.isFormPopUpVisibleSubscriber = this.isFormPopUpVisible.subscribe(function(value) {
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

`Webkul/OrderByWhatsappBot/view/frontend/web/js/view/whatsapp-category-page.js`

```diff
@@ -28,6 +28,7 @@
     return Component.extend({
         defaults: {
+            popUp: null,
             template: 'Webkul_OrderByWhatsappBot/whatsapp-category-page-button',
             shippingFormTemplate: 'Webkul_OrderByWhatsappBot/shipping-address/form',
         },
@@ -55,11 +56,11 @@
             this._super();
             $('.action[data-action=add-to-whatsapp]').prop('disabled', false);

-            this.isFormPopUpVisible.subscribe(function(value) {
+            this.isFormPopUpVisibleSubscriber = this.isFormPopUpVisible.subscribe(function(value) {
                 if (value) {
                     self.productOptionsSelected();
                     $('.whatsapp-button-div').trigger('contentUpdated');
-                    if ($.fn.applyBindings != undefined) {
+                    if (!$.breeze && $.fn.applyBindings != undefined) {
                         ko.cleanNode($("#opc-category-page-shipping-address")[0]);
                         $('#opc-category-page-shipping-address').applyBindings();
                     }
@@ -237,7 +238,7 @@
             var self = this,
                 buttons;

-            if (!popUp) {
+            if (!this.popUp) {
                 buttons = this.popUpForm.options.buttons;
                 this.popUpForm.options.buttons = [{
                         text: buttons.save.text ? buttons.save.text : $t('Save Address'),
@@ -262,10 +263,10 @@
                 this.popUpForm.options.keyEventHandlers = {
                     escapeKey: this.onClosePopUp.bind(this)
                 };
-                popUp = modal(this.popUpForm.options, $(this.popUpForm.element));
+                this.popUp = modal(this.popUpForm.options, $(this.popUpForm.element));
             }
             $('.action-close').css('display', 'none');
-            return popUp;
+            return this.popUp;
         },
```

`Webkul/OrderByWhatsappBot/view/frontend/web/js/view/cart/whatsapp-checkout.js`

```diff
@@ -26,6 +26,7 @@
     var popUp = null;
     return Component.extend({
         defaults: {
+            popUp: null,
             template: 'Webkul_OrderByWhatsappBot/whatsapp-cart-page',
             shippingFormTemplate: 'Webkul_OrderByWhatsappBot/shipping-address/form',
             buttonText: $t('Buy Now'),
@@ -53,7 +54,7 @@
             var self = this;
             this._super();

-            this.isFormPopUpVisible.subscribe(function(value) {
+            this.isFormPopUpVisibleSubscriber = this.isFormPopUpVisible.subscribe(function(value) {
                 if (value) {
                     self.getPopUp().openModal();
                 }
@@ -136,7 +137,7 @@
             var self = this,
                 buttons;

-            if (!popUp) {
+            if (!this.popUp) {
                 buttons = this.popUpForm.options.buttons;
                 this.popUpForm.options.buttons = [{
                         text: buttons.save.text ? buttons.save.text : $t('Save Address'),
@@ -159,10 +160,10 @@
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