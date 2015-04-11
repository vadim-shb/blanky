package blanky

import akka.actor.Actor
import blanky.routings.{CurrentUser, SignIn}
import spray.routing.HttpService

class ApiServiceActor extends Actor with HttpService {

  def actorRefFactory = context

  def receive = runRoute(
    pathPrefix("api") {
      CurrentUser.routing ~
        SignIn.routing
    }
  )

}
