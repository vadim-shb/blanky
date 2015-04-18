package blanky.routes

import akka.actor.Actor
import blanky.AppJsonProtocol._
import blanky.domain.{SignUpUserDto, User}
import blanky.utils.ActorStub
import org.scalatest.{MustMatchers, WordSpec}
import spray.httpx.SprayJsonSupport._
import spray.json._
import spray.testkit.ScalatestRouteTest

class SignUpNewUserRouterTest extends WordSpec with MustMatchers with ScalatestRouteTest {

  class SignUpActorStub extends Actor {

    def receive = {
      case _ => sender ! 12L
    }
  }

  "SignUpNewUserRouter" must {
    "send user data to SignUpActor AND replay user with id as http response" in {
      // GIVEN user dto to http request
      val userDto = SignUpUserDto("User Name", "user@example.com", "12345", "en")

      // AND signUpActor send back id of saved user
      val createdUserId = 12L
      val signUpActorStub = ActorStub.stub()
      signUpActorStub.sendBack(createdUserId)

      // AND router to test
      val underTest = new SignUpNewUserRouter(signUpActorStub.ref).routing

      // WHEN request send to router
      Post("/sign-up", userDto) ~> underTest ~> check {

        // THEN message has been sent to actor
        signUpActorStub expectMsg userDto

        // AND it responses with data from sign up actor
        val responseUser = User(id = Some(createdUserId), name = Some(userDto.name), lang = Some(userDto.lang))
        responseAs[String] === responseUser.toJson.prettyPrint
      }

    }
  }
}

