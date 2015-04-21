package blanky.routes

import blanky.routes.common.RoutingGenerator
import spray.routing.HttpService._
import spray.routing.Route

object SignInRouter extends RoutingGenerator {

  override def routing: Route =
    path("sign-in") {
      get {
        complete {
          "sign-in"
        }
      }
    }
}
