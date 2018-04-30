# WatchOutForThatParty
THIS IS THE SERVER FOR THE OPENING EVENT OF LOGOUT TAIPEI 2018.

require : htop, ftop, icecast, butt(an app in mac that streams sound with xml), nginx, an input port and an output port.


1. For any computers that runs this server, install nginx and icecast from brew. Also install butt and open before starting everything.

To run program, copy pasta 

icecast -c icecast2.xml

to terminal.
(but first, make an alias or cd to the current file.)

2. to stop, copy pasta

sudo nginx -s stop
(or simply sudo nginx -s reload)

3. after changing config file in /usr/local/etc/nginx,
go to /usr/local/Cellar/nginx/1.13.12
and copy pasta

bin/nginx

that should restart nginx with the new configuration.


4. the LTG ip can be configured in sketch.js

5. if you need to monitor data usage, brew install ftop and htop, and sudo htop for the monitoring thing.

6. ip and mac address can be found in ifconfig

7. listening port is 8000, server port is 9000.

8. best bitrate in rehearsal is 224. if the server gets crowded, downgrade it to 196.

9. All the best.
