package blanky

import akka.actor.ActorSystem
import blanky.routings.{CurrentUser, SignIn}
import spray.routing.SimpleRoutingApp

object ServerStarter extends App with SimpleRoutingApp {

  implicit val system = ActorSystem("app-system")

  startServer(interface = "localhost", port = 8085) {
    pathPrefix("api") {
      CurrentUser.routing ~
        SignIn.routing
    }
  }

}
