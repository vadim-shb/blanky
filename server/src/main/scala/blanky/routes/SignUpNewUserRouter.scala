package blanky.routes

import akka.actor.ActorRef
import akka.pattern.ask
import blanky.domain.{SignUpUserDto, User}
import blanky.routes.common.RoutingGenerator
import spray.http.MediaTypes._
import spray.routing.HttpService._
import spray.routing.Route

import scala.concurrent.ExecutionContext.Implicits.global


class SignUpNewUserRouter(signUpActor: ActorRef) extends RoutingGenerator {

  import blanky.AppJsonProtocol._
  import spray.httpx.SprayJsonSupport._

  override def routing: Route =
    path("sign-up") {
      post {
        respondWithMediaType(`application/json`) {
          entity(as[SignUpUserDto]) { user =>
            complete {
              (signUpActor ? user)
                .mapTo[Long]
                .map(userId =>
                User(Some(userId), Some(user.name), Some(user.lang)))
            }
          }
        }
      }
    }
}
