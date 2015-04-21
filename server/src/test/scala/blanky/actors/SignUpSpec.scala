package blanky.actors

import akka.actor.{ActorRef, ActorSystem, Props}
import akka.pattern.ask
import akka.testkit.TestKit
import akka.util.Timeout
import blanky.dao.UserSecurityDao
import blanky.domain.{SignUpUser, SignUpUserDto}
import blanky.test_utils.StopSystemAfterAll
import org.apache.commons.codec.digest.DigestUtils
import org.scalamock.scalatest.MockFactory
import org.scalatest.{GivenWhenThen, Matchers, WordSpecLike}

import scala.concurrent.Await
import scala.concurrent.duration._

class SignUpSpec extends TestKit(ActorSystem("test-system")) with WordSpecLike with GivenWhenThen with StopSystemAfterAll with MockFactory with Matchers {

  val timeToWait = 5 seconds
  implicit val timeout = new Timeout(5 seconds)

  var userSecurityDaoMock: UserSecurityDao = _
  var underTest: ActorRef = _

  override protected def beforeAll() = {
    super.beforeAll()
    userSecurityDaoMock = stub[UserSecurityDao]
    underTest = system.actorOf(Props(classOf[SignUpActor], userSecurityDaoMock))
  }

  "SignUpActor" must {
    "Save sign-up user in DB" in {
      // GIVEN sign up user from client
      val signUpUser = SignUpUserDto(email = "user@example.com", password = "abc", lang = "en", name = "User name")

      // AND userSecurityDao receive user data to save AND response saved user id
      var generatedSalt: String = null
      var generatedPasswordHash: String = null
      var generatedEmailConfirmationToken: String = null

      userSecurityDaoMock.createUser _ when * onCall ((signUpUser: SignUpUser) => {
        generatedSalt = signUpUser.salt
        generatedPasswordHash = signUpUser.passwordHash
        generatedEmailConfirmationToken = signUpUser.emailConfirmationToken
        val newUserId = 1L
        newUserId
      })

      // WHEN send user to signUpActor
      val savedUserIdFuture = underTest ? signUpUser
      Await.result(savedUserIdFuture, timeToWait)

      // THEN send user to dao
      val userForSave = SignUpUser(signUpUser.name, signUpUser.email, generatedEmailConfirmationToken, generatedPasswordHash, generatedSalt, signUpUser.lang)
      userSecurityDaoMock.createUser _ verify userForSave

      // AND generated strong enough salt(32 chars)
      generatedSalt.length shouldBe 32

      // AND generated strong enough email confirmation token(64 chars)
      generatedEmailConfirmationToken.length shouldBe 64

      // AND password saved hashed(sha-512) and salty
      val trueHashedPassword = DigestUtils.sha512Hex(signUpUser.password + generatedSalt)
      generatedPasswordHash shouldBe trueHashedPassword

    }
  }

}
