import { ATTRIBUTES } from "../../support/attributtes";

describe('Test Scenarios', () => {
    context('Desktop', () => {
        beforeEach(async () => {
            await browser.setWindowSize(ATTRIBUTES.VIEWPORT_WIDTH_DESKTOP, ATTRIBUTES.VIEWPORT_HEIGHT_DESKTOP);
            await browser.url('https://immense-hollows-74271.herokuapp.com/');
            await expect(browser).toHaveUrl('https://immense-hollows-74271.herokuapp.com/');
        });

        it('User can create an item', async () => {
            const inputImage = $('[id="inputImage"]');
            const inputField = $('[name="text"]');
            const submitButton = $('[class="btn pull-right btn-success"]');

            await expect(inputImage).toBeDisplayed();
            await expect(inputField).toBeDisplayed();

            await inputField.setValue('QA Automation test description');

            const filePath = 'test/fixtures/test_320x320.jpg';
            const remoteFilePath = await browser.uploadFile(filePath);
            await inputImage.setValue(remoteFilePath);

            await submitButton.click();
        });

        it('User can edit another existing item', async () => {
            const items = await $$('[ng-repeat="item in items"]');
            for (const item of items) {
                await expect(item).toBeDisplayed();
            }

            const editButtons = await $$('button*=Edit');

            if (await editButtons.length > 0) {
                await editButtons[0].click();
            }

            const inputField = $('[name="text"]');
            const submitButton = $('[class="btn pull-right btn-success"]');

            await inputField.setValue('QA Automation test description');
            await submitButton.click();

        });

        it('User can delete the item created', async () => {
            const deleteButton = await $('button*=Delete');
            await deleteButton.click();

            const modalConfirm = $('[class="modal-content"]');
            const yesButton = $('[ng-click="submit()"]');

            await expect(modalConfirm).toBeDisplayed();
            await yesButton.click();
        });

        it('Check max long in description', async () => {
            //Test will fail due a bug user can input more than 300 characters
            const inputField = $('[name="text"]');
            const maxLength = 300;
            const longText = 'a'.repeat(350);
            await inputField.setValue(longText);

            const value = await inputField.getValue();
            expect(value.length).toBeLessThanOrEqual(maxLength);
        });

        it('Check if exist in the list the item with text', async () => {
            const creatorTextElement = await $('//*[contains(text(), "Creators: Matt Duffer, Ross Duffer")]');
            await creatorTextElement.waitForExist({ timeout: 5000 });
        });
    });

    context.only('Mobile', () => {
        beforeEach(async () => {
            await browser.setWindowSize(ATTRIBUTES.VIEWPORT_WIDTH_MOBILE, ATTRIBUTES.VIEWPORT_HEIGHT_MOBILE);
            await browser.url('https://immense-hollows-74271.herokuapp.com/');
            await expect(browser).toHaveUrl('https://immense-hollows-74271.herokuapp.com/');
        });

        it('User can create an item', async () => {
            const inputImage = $('[id="inputImage"]');
            const inputField = $('[name="text"]');
            const submitButton = $('[class="btn pull-right btn-success"]');

            await expect(inputImage).toBeDisplayed();
            await expect(inputField).toBeDisplayed();

            await inputField.setValue('QA Automation test description');

            const filePath = 'test/fixtures/test_320x320.jpg';
            const remoteFilePath = await browser.uploadFile(filePath);
            await inputImage.setValue(remoteFilePath);

            await submitButton.click();
        });

        it('User can edit another existing item', async () => {
            const items = await $$('[ng-repeat="item in items"]');
            for (const item of items) {
                await expect(item).toBeDisplayed();
            }

            const editButtons = await $$('button*=Edit');

            if (await editButtons.length > 0) {
                await editButtons[0].click();
            }

            const inputField = $('[name="text"]');
            const submitButton = $('[class="btn pull-right btn-success"]');
            await inputField.setValue('QA Automation test description');
            await submitButton.click();

        });

        it('User can delete the item created', async () => {
            const deleteButton = await $('button*=Delete');
            await deleteButton.click();

            const modalConfirm = $('[class="modal-content"]');
            const yesButton = $('[ng-click="submit()"]');

            await expect(modalConfirm).toBeDisplayed();
            await yesButton.click();
        });

        it('Check max long in description', async () => {
            //Test will fail due a bug user can input more than 300 characters
            const inputField = $('[name="text"]');
            const maxLength = 300;
            const longText = 'a'.repeat(350);
            await inputField.setValue(longText);

            const value = await inputField.getValue();
            expect(value.length).toBeLessThanOrEqual(maxLength);
        });

        it('Check if exist in the list the item with text', async () => {
            const creatorTextElement = await $('//*[contains(text(), "Creators: Matt Duffer, Ross Duffer")]');
            await creatorTextElement.waitForExist({ timeout: 5000 });
        });
    });
});
