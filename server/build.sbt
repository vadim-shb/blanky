name := "blanky-server"

version := "0.0-SNAPSHOT"

scalaVersion := "2.11.6"


libraryDependencies ++= {
  val scV = "2.11"
  val akkaV = "2.3.9"
  val sprayV = "1.3.3"
  val sprayJsonV = "1.3.3"
  val scalaTestV = "2.2.4"
  val slf4jV = "1.7.5"

  Seq(
    "com.typesafe.akka" % s"akka-actor_$scV" % akkaV,
    "com.typesafe.akka" % s"akka-testkit_$scV" % akkaV,
    "io.spray" % s"spray-can_$scV" % sprayV,
    "io.spray" % s"spray-routing_$scV" % sprayV,
    "io.spray" % s"spray-json_$scV" % sprayJsonV,
    "org.scalatest" % s"scalatest_$scV" % scalaTestV
  )
}