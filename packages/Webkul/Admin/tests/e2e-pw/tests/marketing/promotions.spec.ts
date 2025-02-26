import { test, expect, config } from '../../setup';
import { launchBrowser } from '../../utils/core';
import  * as forms from '../../utils/form';
import logIn from '../../utils/login';

test.describe('promotion management', () => {
    let browser;
    let context;
    let page;

    test.beforeEach(async () => {
        browser = await launchBrowser();
        context = await browser.newContext();
        page = await context.newPage();

        await logIn(page);
    });

    test.afterEach(async () => {
        await browser.close();
    });

    test('create cart rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/cart-rules`);

        await page.click('a.primary-button:visible');

        page.hover('select[name="coupon_type"]');

        let i = Math.floor(Math.random() * 10) + 1;

        for (i; i > 0; i--) {
            await page.click('div.secondary-button:visible');
        }

        const selects = await page.$$('select.custom-select:visible');

        for (let select of selects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const newSelects = await page.$$('select.custom-select:visible');

        const addedSelects = newSelects.filter(newSelect =>
            !selects.includes(newSelect)
        );

        for (let select of addedSelects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const checkboxs = await page.$$('input[type="checkbox"] + label');

        for (let checkbox of checkboxs) {
            await checkbox.click();
        }

        const inputs = await page.$$('textarea.rounded-md:visible, input[type="text"].rounded-md:visible');

        for (let input of inputs) {
            await input.fill(forms.generateRandomStringWithSpaces(200),{timeout: 100}).catch(() => null);
        }

        const time = forms.generateRandomDateTimeRange();

        await page.fill('input[name="starts_from"]', time.from);
        await page.fill('input[name="ends_till"]', time.to);

        for (i; i > 0; i--) {
            if (await page.click('input[name="coupon_qty"]', { timeout: 100 }).catch(() => null)) {
                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.click('button[type="submit"].primary-button:visible');
            }
        }

        await page.click('button[type="submit"][class="primary-button"]:visible');

        const firstErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of firstErrors) {
            await error.fill(forms.generateRandomStringWithSpaces(200));
        }

        const errors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (firstErrors.length > 0) {
            await page.click('button[type="submit"][class="primary-button"]:visible');
        }

        await expect(page.getByText('Cart rule created successfully')).toBeVisible();
    });

    test('edit cart rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/cart-rules`);

        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');

        const iconEdit = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');

        await iconEdit[0].click();

        page.hover('select[name="coupon_type"]');

        let i = Math.floor(Math.random() * 10) + 1;

        for (i; i > 0; i--) {
            await page.click('div.secondary-button:visible');
        }

        const selects = await page.$$('select.custom-select:visible');

        for (let select of selects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const newSelects = await page.$$('select.custom-select:visible');

        const addedSelects = newSelects.filter(newSelect =>
            !selects.includes(newSelect)
        );

        for (let select of addedSelects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const inputs = await page.$$('textarea.rounded-md:visible, input[type="text"].rounded-md:visible');

        for (let input of inputs) {
            await input.fill(forms.generateRandomStringWithSpaces(200),{timeout: 100}).catch(() => null);
        }

        const time = forms.generateRandomDateTimeRange();

        await page.fill('input[name="starts_from"]', time.from);
        await page.fill('input[name="ends_till"]', time.to);

        for (i; i > 0; i--) {
            if (await page.click('input[name="coupon_qty"]', { timeout: 100 }).catch(() => null)) {
                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.click('button[type="submit"].primary-button:visible');
            }
        }

        await page.click('button[type="button"][class="primary-button"]:visible');

        const firstErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of firstErrors) {
            await error.fill(forms.generateRandomStringWithSpaces(200));
        }

        const errors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (firstErrors.length > 0) {
            await page.click('button[type="button"][class="primary-button"]:visible');
        }

        await expect(page.getByText('Cart rule updated successfully')).toBeVisible();
    });

    test('delete cart rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/cart-rules`);

        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');

        const iconDelete = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');

        await iconDelete[0].click();

        await page.click('button.transparent-button + button.primary-button:visible');

        await expect(page.getByText('Cart Rule Deleted Successfully')).toBeVisible();
    });

    test('create catalog rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/catalog-rules`);

        await page.click('a.primary-button:visible');

        page.click('input[name="name"]');

        let i = Math.floor(Math.random() * 10) + 1;

        for (i; i > 0; i--) {
            await page.click('div.secondary-button:visible');
        }

        const selects = await page.$$('select.custom-select:visible');

        for (let select of selects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const newSelects = await page.$$('select.custom-select:visible');

        const addedSelects = newSelects.filter(newSelect =>
            !selects.includes(newSelect)
        );

        for (let select of addedSelects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const checkboxs = await page.$$('input[type="checkbox"] + label');

        for (let checkbox of checkboxs) {
            await checkbox.click({timeout: 100}).catch(() => null);
        }

        const inputs = await page.$$('textarea.rounded-md:visible, input[type="text"].rounded-md:visible');

        for (let input of inputs) {
            await input.fill(forms.generateRandomStringWithSpaces(200),{timeout: 100}).catch(() => null);
        }

        const time = forms.generateRandomDateTimeRange();

        await page.fill('input[name="starts_from"]', time.from);
        await page.fill('input[name="ends_till"]', time.to);

        for (i; i > 0; i--) {
            if (await page.click('input[name="coupon_qty"]', { timeout: 100 }).catch(() => null)) {
                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.click('button[type="submit"].primary-button:visible');
            }
        }

        await page.click('button[type="submit"][class="primary-button"]:visible');

        const firstErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of firstErrors) {
            await error.fill(forms.generateRandomStringWithSpaces(200));
        }

        const errors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (firstErrors.length > 0) {
            await page.click('button[type="submit"][class="primary-button"]:visible');
        }

        await expect(page.getByText('Catalog rule created successfully')).toBeVisible();
    });

    test('edit catalog rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/catalog-rules`);

        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');

        const iconEdit = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');

        await iconEdit[0].click();

        page.click('input[name="name"]');

        let i = Math.floor(Math.random() * 10) + 1;

        for (i; i > 0; i--) {
            await page.click('div.secondary-button:visible');
        }

        const selects = await page.$$('select.custom-select:visible');

        for (let select of selects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const newSelects = await page.$$('select.custom-select:visible');

        const addedSelects = newSelects.filter(newSelect =>
            !selects.includes(newSelect)
        );

        for (let select of addedSelects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            },{timeout: 100}).catch(() => null);

            if (options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

                await select.selectOption(options[randomIndex],{timeout: 100}).catch(() => null);
            } else {
                await select.selectOption(options[0],{timeout: 100}).catch(() => null);
            }
        }

        const inputs = await page.$$('textarea.rounded-md:visible, input[type="text"].rounded-md:visible');

        for (let input of inputs) {
            await input.fill(forms.generateRandomStringWithSpaces(200),{timeout: 100}).catch(() => null);
        }

        const time = forms.generateRandomDateTimeRange();

        await page.fill('input[name="starts_from"]', time.from);
        await page.fill('input[name="ends_till"]', time.to);

        for (i; i > 0; i--) {
            if (await page.click('input[name="coupon_qty"]', { timeout: 100 }).catch(() => null)) {
                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.fill('input[name="coupon_qty"]', (Math.floor(Math.random() * 10000) + 1).toString());

                await page.click('button[type="submit"].primary-button:visible');
            }
        }

        await page.click('button[type="submit"][class="primary-button"]:visible');

        const firstErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of firstErrors) {
            await error.fill(forms.generateRandomStringWithSpaces(200));
        }

        const errors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('#discount_amount, input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (firstErrors.length > 0) {
            await page.click('button[type="submit"][class="primary-button"]:visible');
        }

        await expect(page.getByText('Catalog rule updated successfully')).toBeVisible();
    });

    test('delete catalog rule', async () => {
        await page.goto(`${config.baseUrl}/admin/marketing/promotions/catalog-rules`);

        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');

        const iconDelete = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');

        await iconDelete[0].click();

        await page.click('button.transparent-button + button.primary-button:visible');

        await expect(page.getByText('Catalog rule deleted successfully')).toBeVisible();
    });
});
