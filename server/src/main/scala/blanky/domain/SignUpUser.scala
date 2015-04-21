package blanky.domain

case class SignUpUser(name: String, email: String, emailConfirmationToken: String, passwordHash: String, salt: String, lang: String)