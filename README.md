# WatchOutForThatParty
THIS IS THE SERVER FOR THE OPENING EVENT OF LOGOUT TAIPEI 2018.


For any computers that runs this server, install nginx and icecast from brew. Also install butt and open before starting everything.

To run program, copy pasta 

icecast -c icecast2.xml

to terminal.
(but first, make an alias or cd to the current file.)

to stop, copy pasta

sudo nginx -s stop

after changing config file in /usr/local/etc/nginx,
go to /usr/local/Cellar/nginx/1.13.12
and copy pasta

bin/nginx

that should restart nginx with the new configuration.


the LTG ip can be configured in sketch.js
