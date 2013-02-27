# sign up sheet

This is a simple app to provide a sign up sheet for a club

They would like

* Name,
* city,
* phone,
* email address, and
* Your experience in fly fishing

# using html5 boilerplate

# which uses twitter bootstrap

# Status

I started this project using [erica](https://github.com/benoitc/erica)
with the basic web app template.  This didn't provide any of the
javascript bits that I used to use in the jchris days of couchapp and
evently.  So I created another app using the couchapp template, and
pulled in some of the javascript libraries.

At the moment, all of the libs are included in the project, but only
some are being called in by the app.

I am playing with component on the side here, and will probably wrap
everything up in component.  I wonder if there is a twitter bootstrap
component.

At the moment, the app has basic functionality to meet the request.
You can enter names, and it saves them to the db.

# Todo

* form validation for required fields (a name, and either a phone number or an
  email, otherwise how will we contact you)
* feedback that the user actually entered their name, like some sort
  of transient on the list of new names.
* photos and decorations from the club to run as the app is just
  sitting there.
