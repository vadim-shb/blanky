# blanky

Template of basic application on top of
 - Gulp-AngularJs-Bootstrap-Jasmine-Karma(web-client)
 - Sbt-Scala-Akka-AkkaHttp-ScalaTest-Postgres(server)

In client directory:
 - use init.bash to initiate project(uncomment global packages which don't install yet).
 - use "gulp dev" command to start client development environment.
 - use "gulp production" command to generate production version of client in "productionApp" folder.
 
IntelliJ users helpers:
 1. Use "File > New > Module from existing sources..."
   - for "client" directory (as Web module)
   - for "server" directory (as SBT module)
 2. Start "client/init.bash" 
 3. Exclude folders from client module
   - bower_components
   - coverage
   - node_modules
   - productionApp
   - src/lib
 4. Install Karma-plugin. Create Karma configuration for start with "karma.conf.js" config file