// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

// write a simple test to check if the page title is correct
test('homepage has title', async ({ page }) => {
    await page.goto('http://localhost:5000'); // Adjust the URL to match your local server

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Talk-A-Tive/);

});



test('test', async ({ page }) => {
    await page.goto('http://localhost:5000/');
    await page.getByText('Talk-A-Tive').click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('ahmedanas8032@gmail.com');
    await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
    await page.getByPlaceholder('Enter password', { exact: true }).fill('ansahmd123');
    await page.getByRole('button', { name: 'Show' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.getByText('John Doe', { exact: true }).click();
    // await page.getByPlaceholder('Enter a message..').click({
    //     modifiers: ['Shift']
    // });
    // await page.getByPlaceholder('Enter a message..').click();
    // await page.getByPlaceholder('Enter a message..').fill('Hi, Good Afternoon');
    // await page.getByPlaceholder('Enter a message..').press('Enter');
    // await page.locator('div').filter({ hasText: /^John DoeHi, Good AfternoonHi, Good Afternoon$/ }).getByRole('button').click();
    // await page.getByText('Close').click();
    // await page.getByText('Ammar Ahmad').click();
    // await page.getByPlaceholder('Enter a message..').click();
    // await page.getByPlaceholder('Enter a message..').fill('Please call me');
    // await page.getByPlaceholder('Enter a message..').press('Enter');
    // await page.getByText('Assalamu alaikum').click();
    // await page.getByText('My Chats').click();
    // await page.getByRole('button', { name: ' Search User' }).click();
    // await page.getByPlaceholder('Search by name or email').click();
    // await page.getByPlaceholder('Search by name or email').fill('amit');
    // await page.getByPlaceholder('Search by name or email').press('Enter');
    // await page.getByRole('button', { name: 'Go' }).click();
    // await page.getByPlaceholder('Search by name or email').click();
    // await page.getByPlaceholder('Search by name or email').fill('am');
    // await page.getByRole('button', { name: 'Go' }).click();
    // await page.getByText('Email : amrahmd123@gmail.com').click();
    // await page.getByText('My ChatsNew Group Chat').click();
    // await page.getByPlaceholder('Chat Name').click();
    // await page.getByPlaceholder('Chat Name').fill('My group');
    // await page.getByPlaceholder('Add Users eg: John, Piyush,').click();
    // await page.getByPlaceholder('Add Users eg: John, Piyush,').fill('a');
    // await page.getByLabel('Create Group Chat').getByText('Ammar Ahmad').click();
    // await page.getByPlaceholder('Add Users eg: John, Piyush,').click();
    // await page.getByPlaceholder('Add Users eg: John, Piyush,').click();
    // await page.getByPlaceholder('Add Users eg: John, Piyush,').fill('j');
    // await page.getByLabel('Create Group Chat').getByText('John Doe').click();
    // await page.getByRole('img', { name: 'John Doe' }).click();
    // await page.getByRole('button', { name: 'Create Chat' }).click();
    // await page.getByText('My group').click();
    // await page.getByPlaceholder('Enter a message..').click();
    // await page.getByPlaceholder('Enter a message..').fill('Hi, Guys');
    // await page.getByPlaceholder('Enter a message..').press('Enter');
    // await page.getByRole('button', { name: 'Anas Ahmad' }).click();
    // await page.getByRole('menuitem', { name: 'Logout' }).click();
    // await page.getByRole('tab', { name: 'Sign Up' }).click();
    // await page.getByPlaceholder('Enter Your Name').click();
    // await page.getByPlaceholder('Enter Your Name').fill('Amit Sutar');
    // await page.getByRole('textbox', { name: 'Email Address' }).click();
    // await page.getByRole('textbox', { name: 'Email Address' }).fill('amit.sutar@gmail.com');
    // await page.getByPlaceholder('Enter Password', { exact: true }).click();
    // await page.getByPlaceholder('Enter Password', { exact: true }).fill('1234');
    // await page.getByPlaceholder('Enter Password', { exact: true }).press('Tab');
    // await page.getByLabel('Sign Up').locator('div').filter({ hasText: /^Password\*Show$/ }).getByRole('button').press('Tab');
    // await page.getByPlaceholder('Confirm password').fill('1234');
    // await page.getByPlaceholder('Confirm password').press('Tab');
    // await page.locator('div').filter({ hasText: /^Confirm Password\*Show$/ }).getByRole('button').press('Tab');
    // await page.getByLabel('Upload your Picture').press('Tab');
    // await page.getByRole('button', { name: 'Sign Up' }).click();
    // await page.getByRole('button', { name: ' Search User' }).click();
    // await page.getByLabel('Close').dblclick();
    // await page.getByRole('button', { name: ' Search User' }).click();
    // await page.getByPlaceholder('Search by name or email').click();
    // await page.getByPlaceholder('Search by name or email').fill('ana');
    // await page.getByRole('button', { name: 'Go' }).click();
    // await page.getByRole('img', { name: 'Anas Ahmad' }).click();
    // await page.getByPlaceholder('Enter a message..').click();
    // await page.getByPlaceholder('Enter a message..').fill('Hi');
    // await page.getByPlaceholder('Enter a message..').press('Enter');
    // await page.getByRole('button', { name: 'Amit Sutar' }).click();
    // await page.getByRole('menuitem', { name: 'My Profile' }).click();
    // await page.getByText('Close').click();
    // await page.getByRole('button', { name: 'Amit Sutar' }).click();
    // await page.getByRole('menuitem', { name: 'Logout' }).click();
});