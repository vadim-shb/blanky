package blanky.domain

case class User(id: Option[Long] = None,
                name: Option[String] = None,
                lang: Option[String] = None)

