package blanky.routes.common

import akka.util.Timeout
import spray.routing._

import scala.concurrent.duration._

trait RoutingGenerator {

  def routing: Route

  implicit val timeout = Timeout(5.second)

}
