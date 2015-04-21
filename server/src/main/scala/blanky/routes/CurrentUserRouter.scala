package blanky.routes

import blanky.routes.common.RoutingGenerator
import spray.routing.HttpService._
import spray.routing.Route


object CurrentUserRouter extends RoutingGenerator {

  override def routing: Route =
    pathPrefix("current-user") {
      path("info") {
        get {
          complete {
            "current-user/info"
          }
        }
      } ~
        path("info-with-contacts") {
          get {
            complete {
              "current-user/info-with-contacts"
            }
          }
        }
    }
}
