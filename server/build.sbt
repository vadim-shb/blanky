name := "blanky-server"

version := "0.0-SNAPSHOT"

scalaVersion := "2.11.6"

//@formatter:off

val scV                 = "_2.11"
val configV             = "1.2.1"
val akkaV               = "2.3.9"
val sprayV              = "1.3.3"
val sprayJsonV          = "1.3.1"
val scalaTestV          = "2.2.4"
val scalaMockV          = "3.2"
val scalikejdbcV        = "2.2.5"
val slf4jV              = "1.7.5"
val slf4jApiV           = "1.7.12"
val apacheCommonsCodecV = "1.9"
val apacheCommonsLangV  = "3.3.2"
val postgresJdbcV       = "9.4-1201-jdbc41"

libraryDependencies ++= Seq(
    "com.typesafe"          %   "config"                        % configV,
    "com.typesafe.akka"     %   ("akka-actor"     + scV)        % akkaV,
    "io.spray"              %   ("spray-can"      + scV)        % sprayV,
    "io.spray"              %   ("spray-routing"  + scV)        % sprayV,
    "io.spray"              %   ("spray-json"     + scV)        % sprayJsonV,
    "org.apache.commons"    %   "commons-lang3"                 % apacheCommonsLangV,
    "commons-codec"         %   "commons-codec"                 % apacheCommonsCodecV,
    "org.postgresql"        %   "postgresql"                    % postgresJdbcV,
    "org.scalikejdbc"       %%  "scalikejdbc"                   % scalikejdbcV,
    "org.scalikejdbc"       %%  "scalikejdbc-config"            % scalikejdbcV,
    "org.slf4j"             %   "slf4j-api"                     % slf4jApiV,
    "com.typesafe.akka"     %   ("akka-testkit"   + scV)        % akkaV                 % "test",
    "io.spray"              %   ("spray-testkit"  + scV)        % sprayV                % "test",
    "org.scalatest"         %   ("scalatest"      + scV)        % scalaTestV            % "test",
    "org.scalamock"         %%  "scalamock-scalatest-support"   % scalaMockV            % "test"
)

//@formatter:on

// sbt-revolver(continious restarting sbt by "~re-start" - command) plugin setting up
Revolver.settings

// flyway setting up
seq(flywaySettings: _*)

flywayUrl := "jdbc:postgresql://localhost:5432/blanky"

flywayUser := "pguser"

flywayPassword := "1234"

flywayOutOfOrder := true

flywaySqlMigrationPrefix := ""

flywaySqlMigrationSeparator := "."

flywaySqlMigrationSuffix := "sql"