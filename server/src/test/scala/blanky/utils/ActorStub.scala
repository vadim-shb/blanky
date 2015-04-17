package blanky.utils

import akka.actor.{ActorRef, ActorSystem}

object ActorStub {

  var ref: ActorRef = _

  def stub(returnVal: Option[Any])(implicit system: ActorSystem) = {
    //ref = system.actorOf(Props[]) //todo : copy from TestKit
  }
}
