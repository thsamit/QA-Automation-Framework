# Application Under Test: SauceDemo
**URL**: https://www.saucedemo.com

## Requirements
1. **Login Functionality**:
   - Standard login: Username `standard_user` and Password `secret_sauce` should log in successfully and redirect to the Inventory page.
   - Invalid login: Invalid password should display an error message.

2. **Cart & Inventory**:
   - The user must be able to add the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart.
   - The cart icon badge must update to display `2` items.

3. **Checkout Process**:
   - Navigate to the cart, click "Checkout", enter First Name: "John", Last Name: "Doe", Zip Code: "12345", and click "Continue".
   - Verify the checkout overview displays the correct subtotal.
   - Click "Finish" and confirm the message "Thank you for your order!" is displayed.