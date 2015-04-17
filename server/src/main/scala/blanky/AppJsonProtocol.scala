package blanky

import blanky.domain.{SignUpUserDto, User}
import spray.json.DefaultJsonProtocol

object AppJsonProtocol extends DefaultJsonProtocol {

  implicit val userFormat = jsonFormat3(User)
  implicit val signUpUserDtoFormat = jsonFormat4(SignUpUserDto)
}
