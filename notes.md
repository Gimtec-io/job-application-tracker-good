# Notes

* When installing with create-react-app make sure to use matching version below. Otherwise, the setup seems to work, but Typescript is not installed.

```
Expected version "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0". Got "12.7.0"
```

Use Grommet for a minimum style from the beginning. https://v2.grommet.io/
Followed the setup only for the theme, font and body reset.

DO NOT USE ANY CSS

First I started with Express hello world

https://github.com/goldbergyoni/nodebestpractices

Created first endpoints returning text

Populated the DB

Sometimes I started with how I wanted my code to read:

```javascript
// PENDING to create new status
const application = await Application.getById(req.params.id);
await application.update(req.body);
res.json(application);
```

They I would implement the methods `getById` and `update`.


## Bonus features to be added later

Add markdown or WYSIWYW for job description
Add tag to each comment to then show all the comments with the same tag.
Add modified at
Add the date that the status changed.

## Application New Page

Simple form to add new applications.

Path: '/applications/new'
