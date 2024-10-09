# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

Start by reading the challenge instructions in [INTERVIEW.md](./INTERVIEW.md). When you are finished, you can edit this file to include any documentation for your work.

_or…_

**Sta**rt **b**y **read**ing **th**e **challen**ge **instructio**ns **i**n **[INTERVIEW.](./INTERVIEW.md)**[md](./INTERVIEW.md). **Whe**n **yo**u **ar**e **finish**ed, **yo**u **ca**n **edi**t **thi**s **fil**e **t**o **inclu**de **an**y **documentat**ion **fo**r **you**r **wor**k.

## Usage Notes

* Load a page with text in your browser
* Copy and paste the entire contents of the `./public/diy-onic-converter.js` into the console.
* Run the script:
```
diyOnicConverter();
```
By default, the conversion will happen on the entire `body` element, but you can choose to target a specific element based on any selector.

For example: `diyOnicConverter('#some-specific-section');`

## TODO
* [ ] Test on real world examples
* [ ] Document usage
* [ ] Should all words be processed? 
* [ ] Shorter words should not be completely bolded
* [ ] Handle inner anchor tags
* [ ] Support other tags than p - just all text