name := "blanky-server"

version := "0.0-SNAPSHOT"

scalaVersion := "2.11.6"

//@formatter:off

val scV         = "_2.11"
val akkaV       = "2.3.9"
val sprayV      = "1.3.3"
val sprayJsonV  = "1.3.1"
val scalaTestV  = "2.2.4"

libraryDependencies ++= Seq(
    "com.typesafe.akka" % ("akka-actor"     + scV) % akkaV,
    "com.typesafe.akka" % ("akka-testkit"   + scV) % akkaV          % "test",
    "io.spray"          % ("spray-can"      + scV) % sprayV,
    "io.spray"          % ("spray-routing"  + scV) % sprayV,
    "io.spray"          % ("spray-json"     + scV) % sprayJsonV,
    "org.scalatest"     % ("scalatest"      + scV) % scalaTestV     % "test"
)

//@formatter:on

Revolver.settings