CREATE TABLE t_users (
  id            BIGSERIAL    NOT NULL,
  name          VARCHAR(255) NOT NULL,
  password_hash VARCHAR(128) NOT NULL,
  salt          VARCHAR(32)  NOT NULL,
  lang          VARCHAR(7)   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE t_user_emails (
  id                           BIGSERIAL           NOT NULL,
  user_id                      BIGINT              NOT NULL REFERENCES t_users (id),
  email                        VARCHAR(255) UNIQUE NOT NULL,
  usable_as_login              BOOLEAN             NOT NULL,
  use_for_system_notifications BOOLEAN             NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE t_user_email_demands (
  confirmation_token VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
)
  INHERITS (t_user_emails);