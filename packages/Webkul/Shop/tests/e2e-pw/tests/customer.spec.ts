import { test, expect, config } from '../setup';

test('Profile Edit', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('testUser1');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Demo1');
    await page.getByPlaceholder('Email', { exact: true }).click();
    await page.getByPlaceholder('Email', { exact: true }).fill('testUser@gmail.com');
    await page.getByPlaceholder('Phone').click();
    await page.getByPlaceholder('Phone').fill('987654323');
    await page.getByLabel('shop::app.customers.account.').selectOption('Male');
    await page.getByPlaceholder('Date of Birth').click();
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const formattedDate = date.toISOString().split('T')[0];
    await page.getByPlaceholder('Date of Birth').fill(formattedDate);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Profile updated successfully').first()).toBeVisible();
});

test('Add Address', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: ' Address ' }).click();
    await page.getByRole('link', { name: 'Add Address' }).click();
    await page.getByPlaceholder('Company Name').click();
    await page.getByPlaceholder('Company Name').fill('Webkul');
    await page.getByPlaceholder('Company Name').press('Tab');
    await page.getByPlaceholder('First Name').fill('Demo');
    await page.getByPlaceholder('First Name').press('Tab');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Last Name').press('Tab');
    await page.getByPlaceholder('Email', { exact: true }).fill('test@example.com');
    await page.getByPlaceholder('Email', { exact: true }).press('Tab');
    await page.getByPlaceholder('Vat ID').press('Tab');
    await page.getByPlaceholder('Street Address').fill('Demo');
    await page.getByPlaceholder('Street Address').press('Tab');
    await page.getByLabel('Country').selectOption('DZ');
    await page.getByPlaceholder('State').click();
    await page.getByPlaceholder('State').fill('any');
    await page.getByPlaceholder('City').click();
    await page.getByPlaceholder('City').fill('any');
    await page.getByPlaceholder('Post Code').click();
    await page.getByPlaceholder('Post Code').fill('123456');
    await page.getByPlaceholder('Phone').click();
    await page.getByPlaceholder('Phone').fill('9876543210');
    await page.locator('#main form div').filter({ hasText: 'Set as Default' }).locator('label').first().click();
    await page.locator('#main form div').filter({ hasText: 'Set as Default' }).locator('label').first().click();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Address have been successfully added.').first()).toBeVisible();
});

test('Edit Address', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: ' Address ' }).click();
    await page.getByLabel('More Options').first().click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByPlaceholder('Company Name').click();
    await page.getByPlaceholder('Company Name').fill('webkul1');
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('User1');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Demo1');
    await page.getByPlaceholder('Email', { exact: true }).click();
    await page.getByPlaceholder('Email', { exact: true }).fill('User_test@gmail.coma');
    await page.getByPlaceholder('Vat ID').click();
    await page.getByPlaceholder('Street Address').click();
    await page.getByPlaceholder('Street Address').fill('123ghds1');
    await page.getByLabel('Country').selectOption('IN');
    await page.locator('#state').selectOption('TR');
    await page.getByPlaceholder('City').click();
    await page.getByPlaceholder('City').fill('noida');
    await page.getByPlaceholder('Post Code').click();
    await page.getByPlaceholder('Post Code').fill('201301');
    await page.getByPlaceholder('Phone').click();
    await page.getByPlaceholder('Phone').fill('9876543219');
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByText('Address updated successfully.').first()).toBeVisible();
});

test('Default Address', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: ' Address ' }).click();
    await page.getByLabel('More Options').first().click();
    await page.getByRole('button', { name: 'Set as Default' }).click();
    await page.getByRole('button', { name: 'Agree', exact: true }).click();

    await expect(page.getByText('Default Address').first()).toBeVisible();
});

test('Delete Address', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: ' Address ' }).click();
    await page.getByLabel('More Options').first().click();
    await page.getByRole('link', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Agree', exact: true }).click();

    await expect(page.getByText('Address successfully deleted').first()).toBeVisible();
});

test('Reorder', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Orders', exact: true }).click();
    await page.locator('div').locator('span.icon-eye').first().click();
    await page.getByRole('link', { name: 'Reorder' }).click();


    await page.getByRole('button', { name: 'Update Cart' }).click();

    await expect(page.getByText('Quantity updated successfully').first()).toBeVisible();
});

test('Cancel Order', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Orders', exact: true }).click();
    await page.locator('div').locator('span.icon-eye').first().click();
    await page.getByRole('link', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'Agree', exact: true }).click();

    await expect(page.getByText('Your order has been canceled').first()).toBeVisible();
});

test('Print Invoice', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Orders', exact: true }).click();
    await page.locator('div').locator('span.icon-eye').first().click();
    await page.getByRole('button', { name: 'Invoices' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: ' Print' }).click();
    const download = await downloadPromise;

    console.log(download);
});

test('Downloadable Orders', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile', exact: true }).click();
    await page.getByRole('link', { name: ' Downloadable Products ' }).click();
    const page2Promise = page.waitForEvent('popup');
    const download1Promise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'file', exact: true }).click();
    const page2 = await page2Promise;
    const download1 = await download1Promise;

    console.log(download1);
});

test('Wishlist to Cart', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('.action-items > span').first().click();
    await page.locator('div:nth-child(9) > div:nth-child(2) > div:nth-child(2) > .-mt-9 > .action-items > span').first().click();
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Wishlist', exact: true }).click();
    await page.getByRole('button', { name: 'Move To Cart' }).first().click();

    await expect(page.getByText('Item Successfully Moved to Cart').first()).toBeVisible();
});

test('Remove from Wishlist', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('div:nth-child(9) > div:nth-child(2) > div:nth-child(3) > .-mt-9 > .action-items > span').first().click();
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Wishlist', exact: true }).click();
    await page.locator('.max-md\\:hidden > .flex').first().click();
    await page.getByRole('button', { name: 'Agree', exact: true }).click();

    await expect(page.getByText('Item Successfully Removed From Wishlist').first()).toBeVisible();
});

test('Clear Wishlist', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Wishlist', exact: true }).click();
    await page.getByText('Delete All', { exact: true }).click();
    await page.getByRole('button', { name: 'Agree', exact: true }).click();

    await expect(page.getByText('Item Successfully Removed From Wishlist').first()).toBeVisible();
});

test('Change Password', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByPlaceholder('Current Password').click();
    await page.getByPlaceholder('Current Password').fill('testUser@123');
    await page.getByPlaceholder('New Password').click();
    await page.getByPlaceholder('New Password').fill('testUser@1234');
    await page.getByPlaceholder('Confirm Password').click();
    await page.getByPlaceholder('Confirm Password').fill('testUser@1234');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Profile updated successfully').first()).toBeVisible();
});

test('Delete Profile', async ({page}) => {
    await page.goto(`${config.baseUrl}`);
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByPlaceholder('email@example.com').click();
    await page.getByPlaceholder('email@example.com').fill('testUser@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('testUser@1234');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Profile').click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByText('Delete Profile').first().click();
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('testUser@1234');
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText('Customer deleted successfully').first()).toBeVisible();
});
