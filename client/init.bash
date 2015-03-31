#!/bin/bash
#sudo aptitude install nodejs
#sudo npm install -g bower
###sudo npm install -g gulp ## old version for now
#sudo npm install -g gulpjs/gulp-cli#4.0
#sudo npm install -g jasmine
#sudo npm install -g karma-cli

bower install
npm install
gulp production
gulp dev