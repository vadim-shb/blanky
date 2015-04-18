package blanky.utils

import akka.actor.{Actor, ActorRef, ActorSystem}
import akka.testkit.TestActorRef

import scala.collection.mutable

case class Post(where: Option[ActorRef], what: Any)

class ActorStub {

  var ref: ActorRef = _

  var events = mutable.MutableList[Any]()

  var sendList = mutable.MutableList[Post]()

  def saveInput(input: Any) = {
    events += input
  }

  def send(where: ActorRef, what: Any) = {
    sendList += Post(Some(where), what)
  }

  def sendBack(what: Any) = {
    sendList += Post(None, what)
  }

  def expectMsg(msg: Any): Unit = {
    assert(events.contains(msg))
  }

  def stub()(implicit system: ActorSystem) = {
    ref = TestActorRef(new Actor {
      def receive = {
        case input: Any =>
          saveInput(input)
          sendList.foreach(post =>
            post.where match {
              case None => sender() ! post.what
              case Some(where) => where ! post.what
            })
      }
    })
    ref
  }

}

object ActorStub {

  def stub()(implicit system: ActorSystem) = {
    val retval = new ActorStub()
    retval.stub()
    retval
  }
}