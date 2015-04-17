package blanky

import akka.actor.{Actor, Props}
import blanky.actors.SignUpActor
import blanky.dao.UserSecurityDao
import blanky.routes.SignUpNewUserRouter
import blanky.utils.CorsSupport
import spray.routing.HttpService

class ApiServiceActor extends Actor with HttpService with CorsSupport {

  def actorRefFactory = context

  val signUpActor = context.actorOf(Props(classOf[SignUpActor], new UserSecurityDao))
  val signUpNewUserRouter = new SignUpNewUserRouter(signUpActor).routing

  def receive = {
    runRoute(pathPrefix("api") {
      cors {
        signUpNewUserRouter
      }
    })
  }

}
