package blanky

import akka.actor.{ActorSystem, Props}
import akka.io.IO
import akka.pattern.ask
import akka.util.Timeout
import spray.can.Http

import scala.concurrent.duration._

object ServerStarter extends App {

  implicit val system = ActorSystem("app-system")
  implicit val timeout = Timeout(10.seconds)

  val apiService = system.actorOf(Props[ApiServiceActor], "api-service")
  IO(Http) ? Http.Bind(apiService, interface = "localhost", port = 8085)
  println("======== server started ========")
}
