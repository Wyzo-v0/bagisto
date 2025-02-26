import { test, expect, config } from '../../setup';
import { launchBrowser } from '../../utils/core';
import  * as forms from '../../utils/form';
import logIn from '../../utils/login';

test.describe('attribute management', () => {
    let browser;
    let context;
    let page;

    test.beforeEach(async () => {
        browser = await launchBrowser();
        context = await browser.newContext();
        page = await context.newPage();

        await logIn(page);
        await page.goto(`${config.baseUrl}/admin/catalog/attributes`);
        await page.waitForSelector('div.primary-button', { state: 'visible' });
    });

    test.afterEach(async () => {
        await browser.close();
    });

    test('create attribute', async () => {
        test.setTimeout(config.mediumTimeout);

        await page.click('div.primary-button:visible');
        await page.waitForSelector('input[name="admin_name"]');

        const inputs = await page.$$('input[type="text"][class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let input of inputs) {
            let i = Math.floor(Math.random() * 10) + 1;

            if (
                i % 3 == 1
                && input.getAttribute('name') != 'default_value'
            ) {
                await input.fill(forms.generateRandomStringWithSpaces(Math.floor(Math.random() * 200)));
            } else {
                await input.fill('');
            }
        }

        const concatenatedNames = Array(5)
            .fill(null)
            .map(() => forms.generateRandomProductName())
            .join(' ')
            .replaceAll(' ', '');

        await page.fill('input[name="admin_name"]', forms.generateRandomStringWithSpaces(Math.floor(Math.random() * 200)));
        await page.fill('input[name="code"]', concatenatedNames);

        const selects = await page.$$('select.custom-select');

        for (let select of selects) {
            const options = await select.$$eval('option', (options) => {
                return options.map(option => option.value);
            });

            if (options.length > 0) {
                const randomIndex = Math.floor(Math.random() * options.length);

                await select.selectOption(options[randomIndex]);
            }
        }

        const checkboxs = await page.$$('input[type="checkbox"] + label.icon-uncheckbox, input[type="checkbox"] + label.peer.h-5.w-9.cursor-pointer.rounded-full.bg-gray-200:visible');

        for (let checkbox of checkboxs) {
            let i = Math.floor(Math.random() * 10) + 1;

            if (i % 2 == 1) {
                await checkbox.click({timeout: 500}).catch(() => null);
            }
        }

        await page.click('.primary-button:visible');

        const errors = await page.$$('input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (errors.length > 0) {
            await page.click('.primary-button:visible');
        }

        await expect(page.getByText('Attribute Created Successfully')).toBeVisible();
    });

    test('edit attribute', async () => {
        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');

        const iconEdit = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-edit"]');
        await iconEdit[0].click();

        await page.waitForSelector('input[name="admin_name"]');

        const inputs = await page.$$('input[type="text"][class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let input of inputs) {
            let i = Math.floor(Math.random() * 10) + 1;

            if (
                i % 3 == 1
                && input.getAttribute('name') != 'default_value'
            ) {
                await input.fill(forms.generateRandomStringWithSpaces(Math.floor(Math.random() * 200)));
            } else {
                await input.fill('');
            }
        }

        await page.fill('input[name="admin_name"]', forms.generateRandomStringWithSpaces(Math.floor(Math.random() * 200)));

        const checkboxs = await page.$$('input[type="checkbox"] + label:visible');

        for (let checkbox of checkboxs) {
            let i = Math.floor(Math.random() * 10) + 1;

            if (i % 2 == 1) {
                await checkbox.click({timeout: 500}).catch(() => null);
            }
        }

        await page.click('.primary-button:visible');

        const errors = await page.$$('input[type="text"].border-red-500, input[type="text"][class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of errors) {
            await error.fill((Math.random() * 10).toString());
        }

        const newErrors = await page.$$('input[type="text"].border-red-500, input[class="border !border-red-600 hover:border-red-600 w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');

        for (let error of newErrors) {
            await error.fill((Math.floor(Math.random() * 10) + 1).toString());
        }

        if (errors.length > 0) {
            await page.click('.primary-button:visible');
        }

        await expect(page.getByText('Attribute Updated Successfully')).toBeVisible();
    });

    test('delete attribute', async () => {
        test.setTimeout(config.mediumTimeout);

        await page.waitForSelector('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');

        const iconDelete = await page.$$('span[class="cursor-pointer rounded-md p-1.5 text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:place-self-center icon-delete"]');
        await iconDelete[0].click();

        await page.click('button.transparent-button + button.primary-button:visible');

        await expect(page.getByText('Attribute Deleted Successfully')).toBeVisible();
    });

    test('mass delete attributes', async () => {
        await page.waitForSelector('.icon-uncheckbox');

        const checkboxs = await page.$$('.icon-uncheckbox');

        for (let checkbox of checkboxs) {
            let i = Math.floor(Math.random() * 10) + 1;

            if (i % 3 == 1) {
                await checkbox.click({timeout: 500}).catch(() => null);
            }
        }

        await page.waitForSelector('button[class="inline-flex w-full max-w-max cursor-pointer appearance-none items-center justify-between gap-x-2 rounded-md border bg-white px-2.5 py-1.5 text-center leading-6 text-gray-600 transition-all marker:shadow hover:border-gray-400 focus:border-gray-400 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible', { timeout: 1000 }).catch(() => null);
        await page.click('button[class="inline-flex w-full max-w-max cursor-pointer appearance-none items-center justify-between gap-x-2 rounded-md border bg-white px-2.5 py-1.5 text-center leading-6 text-gray-600 transition-all marker:shadow hover:border-gray-400 focus:border-gray-400 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"]:visible');
        await page.click('a[class="whitespace-no-wrap flex gap-1.5 rounded-b px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-950"]:visible');
        await page.click('button.transparent-button + button.primary-button:visible');

        await expect(page.getByText(/Attribute Deleted Successfully|Attribute Deleted Failed/)).toBeVisible();
    });
});
