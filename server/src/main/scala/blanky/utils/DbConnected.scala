package blanky.utils

import scalikejdbc.config.DBs
import scalikejdbc.{ConnectionPool, DB}

trait DbConnected {

  DBs.setup('blanky)

  def connectionFromPool = ConnectionPool.borrow('blanky)

  def dbFromPool = DB(connectionFromPool)
}

