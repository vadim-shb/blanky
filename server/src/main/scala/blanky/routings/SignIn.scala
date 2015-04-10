package blanky.routings

import blanky.routings.common.RoutingGenerator
import spray.routing.HttpService._
import spray.routing.Route

object SignIn extends RoutingGenerator {

  override def routing: Route =
    path("sign-in") {
      get {
        complete {
          "sign-in"
        }
      }
    }
}
