package blanky.routes

import akka.actor.Actor
import akka.testkit.{TestActorRef, TestProbe}
import blanky.AppJsonProtocol._
import blanky.domain.{SignUpUserDto, User}
import org.scalatest.{MustMatchers, WordSpec}
import spray.httpx.SprayJsonSupport._
import spray.json._
import spray.testkit.ScalatestRouteTest

import scala.concurrent.duration._

class SignUpNewUserRouterTest extends WordSpec with MustMatchers with ScalatestRouteTest {

  class SignUpActorStub extends Actor {

    def receive = {
      case _ => sender ! 12L
    }
  }

  "SignUpNewUserRouter" must {
    "send user data to SignUpActor" in {
      // GIVEN user dto to http request
      val userDto = SignUpUserDto("User Name", "user@example.com", "12345", "en")

      // AND signUpActor
      val signUpActorStub = TestProbe()

      // AND router to test
      val underTest = new SignUpNewUserRouter(signUpActorStub.ref).routing

      // WHEN request send to router
      val request = Post("/sign-up", userDto)
      request ~> underTest ~> check {
      }

      // THEN message has been sended to actor
      signUpActorStub expectMsg(300 millis, userDto)

    }
    "replay user with id as http responce" in {
      // GIVEN user dto to http request
      val userDto = SignUpUserDto("User Name", "user@example.com", "12345", "en")

      // AND signUpActor
      //      val signUpActorStub = TestProbe()
      //      signUpActorStub.reply()
      //      class ActorStub
      val createdUserId = 12L
      val signUpActorStub = TestActorRef(new Actor {
        def receive = {
          case _ => sender ! createdUserId
        }
      })

      // AND router to test
      val underTest = new SignUpNewUserRouter(signUpActorStub).routing

      // WHEN request send to router
      Post("/sign-up", userDto) ~> underTest ~> check {

        // THEN it responses with data from sign up actor
        val responceUser = User(id = Some(createdUserId), name = Some(userDto.name), lang = Some(userDto.lang))
        responseAs[String] === responceUser.toJson.prettyPrint
      }

    }
  }
}

