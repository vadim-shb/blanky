package blanky.routes

import akka.actor.ActorRef
import akka.testkit.TestActor.AutoPilot
import akka.testkit.{TestActor, TestProbe}
import blanky.AppJsonProtocol._
import blanky.domain.{SignUpUserDto, User}
import org.scalatest.{MustMatchers, WordSpec}
import spray.httpx.SprayJsonSupport._
import spray.json._
import spray.testkit.ScalatestRouteTest

class SignUpNewUserRouterTest extends WordSpec with MustMatchers with ScalatestRouteTest {

  "SignUpNewUserRouter" must {
    "send user data to SignUpActor AND replay user with id as http response" in {
      // GIVEN user dto from http request
      val userDto = SignUpUserDto("User Name", "user@example.com", "12345", "en")

      // AND signUpActor will response with id of saved user
      val createdUserId = 12L
      val signUpActorStub = TestProbe()
      signUpActorStub.setAutoPilot(new AutoPilot {
        override def run(sender: ActorRef, msg: Any): AutoPilot = {
          msg match {
            case `userDto` =>
              sender ! createdUserId
              TestActor.NoAutoPilot
          }
        }
      })

      // WHEN router receives post-request with user dto
      val underTest = new SignUpNewUserRouter(signUpActorStub.ref).routing

      Post("/sign-up", userDto) ~> underTest ~> check {

        // THEN router sends user dto to signUpActor
        signUpActorStub expectMsg userDto

        // AND router responses user data with id from signUpActor
        val responseUser = User(id = Some(createdUserId), name = Some(userDto.name), lang = Some(userDto.lang))
        responseAs[String] === responseUser.toJson.prettyPrint
      }

    }
  }
}

