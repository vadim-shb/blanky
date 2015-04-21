package blanky.dao

import blanky.domain.SignUpUser
import blanky.utils.DbConnected
import scalikejdbc._

//it's better to do in object, but for now (mostly because of mocking issues) it's just class
class UserSecurityDao extends DbConnected {

  def createUser(userToSave: SignUpUser): Long = {
    using(dbFromPool) { db =>
      db localTx { implicit session =>
        val userId: Long = sql"INSERT INTO t_users (name, password_hash, salt, lang) VALUES (${userToSave.name}, ${userToSave.passwordHash}, ${userToSave.salt}, ${userToSave.lang})".updateAndReturnGeneratedKey().apply()
        sql"INSERT INTO t_user_email_demands (email, user_id, usable_as_login, use_for_system_notifications, confirmation_token) VALUES (${userToSave.email}, ${userId}, TRUE, TRUE, ${userToSave.emailConfirmationToken})".update().apply()
        userId
      }
    }
  }
}
