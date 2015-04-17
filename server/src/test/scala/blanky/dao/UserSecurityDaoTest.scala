package blanky.dao

import blanky.domain.SignUpUser
import blanky.utils.DbConnected
import org.scalatest._
import scalikejdbc._

class UserSecurityDaoTest extends WordSpec with MustMatchers with DbConnected //with AutoRollback {

  val userDao = new UserSecurityDao

  "User security dao" must {
    "insert new user" in {
      // GIVEN user data to save
      val signUpUser = SignUpUser(name = "User Name", email = "user@example.com", emailConfirmationToken = "abc", passwordHash = "def", salt = "salty", lang = "en")

      // WHEN save user
      val savedUserId = userDao.createUser(signUpUser)

      // THEN user saved properly
      using(dbFromPool) { db =>
        val savedUser: Option[SavedUser] = db readOnly { implicit session =>
          sql"""SELECT u.id, u.name, u.password_hash, u.salt, u.lang, e.email, e.confirmation_token, e.usable_as_login, e.use_for_system_notifications
                FROM t_users AS u
                INNER JOIN t_user_email_demands AS e ON u.id = e.user_id
                WHERE u.id = ${savedUserId}"""
            .map(rs => SavedUser(
            SignUpUser(name = rs.string("name"), email = rs.string("email"), emailConfirmationToken = rs.string("confirmation_token"), passwordHash = rs.string("password_hash"), salt = rs.string("salt"), lang = rs.string("lang")),
            rs.boolean("usable_as_login"),
            rs.boolean("use_for_system_notifications")
          )
            ).single().apply()
        }
        assert(savedUser.get.signUpUserData == signUpUser)
        assert(savedUser.get.isEmailUsableAsLogin)
        assert(savedUser.get.isEmailUsableForSystemNotifications)
      }
    }
  }
}

case class SavedUser(signUpUserData: SignUpUser, isEmailUsableAsLogin: Boolean, isEmailUsableForSystemNotifications: Boolean)