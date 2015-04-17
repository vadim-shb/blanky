package blanky.actors

import akka.actor.{ActorSystem, Props}
import akka.pattern.ask
import akka.testkit.TestKit
import akka.util.Timeout
import blanky.dao.UserSecurityDao
import blanky.domain.{SignUpUser, SignUpUserDto}
import blanky.test_utils.StopSystemAfterAll
import org.apache.commons.codec.digest.DigestUtils
import org.scalamock.scalatest.MockFactory
import org.scalatest.{GivenWhenThen, WordSpecLike}

import scala.concurrent.Await
import scala.concurrent.duration._

class SignUpSpec extends TestKit(ActorSystem("test-system")) with WordSpecLike with GivenWhenThen with StopSystemAfterAll with MockFactory {

  val timeToWait = 5 seconds
  implicit val timeout = new Timeout(5 seconds)

  var userSecurityDaoMock = stub[UserSecurityDao]
  var underTest = system.actorOf(Props(classOf[SignUpActor], userSecurityDaoMock))

  //  override protected def beforeAll() = {
  //    super.beforeAll()
  //
  //
  //  }

  "SignUpActor" must {
    "Save sign-up user in DB" in {
      // GIVEN user to sign up from client
      val signUpUser = SignUpUserDto(email = "user@example.com", password = "abc", lang = "en", name = "User name")

      // AND userSecurityDao receive user data to save AND response correctly
      var salt: String = ""
      var passwordHash: String = ""
      var emailConfirmationToken: String = ""
      (userSecurityDaoMock.createUser _) when (*) onCall ((signUpUser: SignUpUser) => {
        salt = signUpUser.salt
        passwordHash = signUpUser.passwordHash
        emailConfirmationToken = signUpUser.emailConfirmationToken
        val newUserId = 1L
        newUserId
      })

      // WHEN send user to signUpActor
      val savedUserIdFuture = underTest ? signUpUser
      Await.result(savedUserIdFuture, timeToWait)

      // THEN send user to dao
      val userForSave = SignUpUser(signUpUser.name, signUpUser.email, emailConfirmationToken, passwordHash, salt, signUpUser.lang)
      (userSecurityDaoMock.createUser _) verify (userForSave)

      // AND generated strong enough salt
      assert(salt.length == 32)

      // AND generated strong enough email confirmation token
      assert(emailConfirmationToken.length == 64)

      // AND password save hashed and salty
      val trueHashedPassword = DigestUtils.sha512Hex(signUpUser.password + salt)
      assert(trueHashedPassword == passwordHash)

    }
  }

}
