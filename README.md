# Paladin


## Description

This is my attempt to limit the impact and damage that fake (or misleading) news articles have upon our society. And the answer that I came up with is Crowdfunding fact checking. Two extensions exist:

- **Paladin Cast** Available only to a selected few Greed Masters.
- **Paladin News** Available to anyone with a chrome browser.

Greed Masters will have the ability to cast a vote on a news article from a list of [supported websites](https://github.com/midastown/Paladin/blob/master/public/websites.js), and the total of that vote will be displayed to the public thanks to its news variant.

## Installation

> This "non-production ready" version is here just to serve as a boilerplate.

**First you would need to install any one of the extensions:**

1) Launch chrome and enter `chrome://extensions/` in the URL
2) Toggle the developer mode
3) Click on the Load Unpacked and select either public or exclusive folder.
4) Repeat last step to install the other extension.


**Now to install the Flask app:**

Make sure you have Python3 > 3.6 and MySQL installed.
1) `cd` into the serverApp folder and install requirements: `pip3 install -r requirements.txt`
2) Start and log in to your MySQL, create a new database "paladin".
3) Add to the database the table "articles" with columns (url, valid, fake).
4) From the serverApp folder modify the db.txt file.
5) Launch the app: `python3 app.py`

*If any  road blocks were encountered during these processes, start up an issue since I'm still actively developing this repo. I'll try to help.*

## Todo
 - Add tests and refactor code
 - Add script and boilerplate data for database first set up
 - create a user auth for the Greed Masters.

## Notes

*Paladin* & *Greed Masters* are derived from the anime Hunter X Hunter, and reffer to *Paladin's Necklace* and *Greed Island* respectively.

## License

[MIT](https://github.com/midastown/Paladin/blob/master/LICENSE.txt)






