package blanky.actors

import akka.actor.Actor
import blanky.dao.UserSecurityDao
import blanky.domain.{SignUpUser, SignUpUserDto}
import org.apache.commons.codec.digest.DigestUtils
import org.apache.commons.lang3.RandomStringUtils

class SignUpActor(val userSecurityDao: UserSecurityDao) extends Actor {

  def receive = {
    case SignUpUserDto(name, email, password, lang) =>
      val salt = RandomStringUtils.randomAlphanumeric(32)
      val emailConfirmationToken = RandomStringUtils.randomAlphanumeric(64)
      val passwordHash = DigestUtils.sha512Hex(password + salt)
      val signUpUser = SignUpUser(name, email, emailConfirmationToken, passwordHash, salt, lang)
      val savedUser = userSecurityDao.createUser(signUpUser)
      sender() ! savedUser
  }
}

