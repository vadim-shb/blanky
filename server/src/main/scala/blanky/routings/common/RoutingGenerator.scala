package blanky.routings.common

import spray.routing._

trait RoutingGenerator {

  def routing: Route

}
