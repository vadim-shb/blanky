package blanky.domain

case class SecurityUser(id: Option[Long] = None,
                        email: String,
                        passwordHash: String,
                        salt: String)