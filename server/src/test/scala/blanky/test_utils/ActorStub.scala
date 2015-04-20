package blanky.test_utils

import akka.actor.{Actor, ActorRef, ActorSystem}
import akka.testkit.TestActorRef

import scala.collection.mutable

// case (where == None) then msg response to sender
case class RePost(msgToReact: Any => Boolean, where: Option[ActorRef], msg: Any)

class Stub(val events: mutable.Queue[Any], val sendList: mutable.MutableList[RePost]) extends Actor {

  def receive = {
    case input: Any =>
      saveInput(input)
      sendStubMessages(input)
  }

  private def saveInput(input: Any) = {
    events += input
  }

  private def sendStubMessages(input: Any) = {
    sendList.foreach(post =>
      if (post.msgToReact(input)) {
        post.where match {
          case None => sender() ! post.msg
          case Some(where) => where ! post.msg
        }
      }
    )
  }
}

class ActorStub {

  private var testActorRef: TestActorRef[Stub] = _

  private val events = mutable.Queue[Any]()

  private val sendList = mutable.MutableList[RePost]()

  def ref = testActorRef.asInstanceOf[ActorRef]

  def send(msgToReact: Any => Boolean, where: ActorRef, what: Any) = {
    sendList += RePost(msgToReact, Some(where), what)
  }

  def send(msgToReact: Any, where: ActorRef, what: Any) = {
    sendList += RePost(msgToReactAsFunc(msgToReact), Some(where), what)
  }

  private def msgToReactAsFunc(innerMsgToReact: Any) = { element: Any =>
    element.getClass == innerMsgToReact.getClass
  }

  def answer(msgToReact: Any => Boolean, what: Any) = {
    sendList += RePost(msgToReact, None, what)
  }

  def answer(msgToReact: Any, what: Any) = {
    sendList += RePost(msgToReactAsFunc(msgToReact), None, what)
  }

  def expectMsg(msg: Any): Unit = {
    if (events.size < 1) throw new Exception("No expected message in actor")
    val firstMessage = events.dequeue()
    assert(firstMessage == msg)
  }

  def stub()(implicit system: ActorSystem) = {
    testActorRef = TestActorRef(new Stub(events, sendList))
  }
}

object ActorStub {

  def stub()(implicit system: ActorSystem) = {
    val retval = new ActorStub()
    retval.stub()
    retval
  }

}

