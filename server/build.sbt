name := "blanky-server"

version := "0.0-SNAPSHOT"

scalaVersion := "2.11.6"

val akkaVersion = "2.3.9"
val scalaTestVersion = "2.2.4"
val slf4jVersion = "1.7.5"
val scalaShortVersion = "2.11"

libraryDependencies ++= Seq(
  "com.typesafe.akka" % s"akka-actor_$scalaShortVersion" % akkaVersion,
  "com.typesafe.akka" % s"akka-testkit_$scalaShortVersion" % akkaVersion,
  "org.scalatest" % s"scalatest_$scalaShortVersion" % scalaTestVersion
)