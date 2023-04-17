CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE OR REPLACE FUNCTION editor_tracking()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_by := current_user;
        NEW.created_at := NOW();
        NEW.modified_by := current_user;
        NEW.modified_at := NOW();
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.modified_by := current_user;
        NEW.modified_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE public.users (
                              id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                              fname character varying(30) NOT NULL,
                              lname character varying(30) NOT NULL,
                              username character varying(30) NOT NULL,
                              email character varying(128) NOT NULL,
                              password character varying(128),
                              photo character varying,
                              last_login timestamp without time zone,
                              eula json DEFAULT '{}'::json NOT NULL
);
                              json json DEFAULT '{}'::json,
                              remarks character varying(255),
                              created_by character varying(100) DEFAULT "current_user"() NOT NULL,
                              created_at timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL,
                              modified_at timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL,
                              modified_by character varying(100) DEFAULT "current_user"() NOT NULL,

ALTER TABLE public.users OWNER TO geoadmin;
COMMENT ON COLUMN public.users.id IS 'the unigue ID used for relationships with other tables.';
COMMENT ON COLUMN public.users.fname IS 'users last name';
COMMENT ON COLUMN public.users.lname IS 'users last name';
COMMENT ON COLUMN public.users.username IS 'users user name. Generaly first initial, last name such as vgreen for Vera Green';
COMMENT ON COLUMN public.users.email IS 'users email address';
COMMENT ON COLUMN public.users.password IS 'users hashed password where hash is controled from nodeJS';
COMMENT ON COLUMN public.users.last_login IS 'The last time the user logged in. ';
COMMENT ON COLUMN public.users.updatedatabaseusers IS 'If true, the next time the user logs in their user is updated on the databases the user requires access to.';
COMMENT ON COLUMN public.users.created_by IS 'Standard editor tracing field populated by the editor_tracking trigger: the name of the user who created the record.';
COMMENT ON COLUMN public.users.created_at IS 'Standard editor tracing populated by the editor_tracking trigger: the date the record was created.';
COMMENT ON COLUMN public.users.modified_at IS 'Standard editor tracing populated by the editor_tracking trigger: the date the record was last modified.';
COMMENT ON COLUMN public.users.modified_by IS 'Standard editor tracing populated by the editor_tracking trigger: the user who last modified the record.';
COMMENT ON COLUMN public.users.eula IS 'End User License Agreement (EULA) metadata';


CREATE TABLE public.messages (
                                 id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                                 content text NOT NULL,
                                 role character varying(30) DEFAULT 'user',
                                 time bigint DEFAULT extract(epoch from now()) * 1000,
                                 user_id uuid references users.id,
                                 chat_id uuid DEFAULT public.uuid_generate_v4(),
                                 chat_name varchar(120) default 'new chat',
                                 meta json DEFAULT '{}',
                                 created_at timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL,
                                 modified_at timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL,
                                 created_by character varying(100) DEFAULT current_user NOT NULL,
                                 modified_by character varying(100) DEFAULT current_user NOT NULL
);
ALTER TABLE public.messages OWNER TO geoadmin;
COMMENT ON COLUMN public.messages.id IS 'the unique ID used for relationships with other tables.';
COMMENT ON COLUMN public.messages.content IS 'the content of the message';
COMMENT ON COLUMN public.messages.role IS 'the role of the message sender, defaults to "user"';
COMMENT ON COLUMN public.messages.time IS 'the time the message was sent, in milliseconds since the Unix epoch';
COMMENT ON COLUMN public.messages.user_id IS 'the ID of the user who sent the message';
COMMENT ON COLUMN public.messages.chat_id IS 'the ID of the chat room the message was sent in';
COMMENT ON COLUMN public.messages.meta IS 'additional metadata associated with the message, in JSON format';
COMMENT ON COLUMN public.messages.created_at IS 'the date and time the record was created';
COMMENT ON COLUMN public.messages.modified_at IS 'the date and time the record was last modified';
COMMENT ON COLUMN public.messages.created_by IS 'the name of the user who created the record';
COMMENT ON COLUMN public.messages.modified_by IS 'the name of the user who last modified the record';


    create view v_chats_by_user {
        mesages group by
    }

CREATE TRIGGER users_editor_tracking
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION editor_tracking();

CREATE TRIGGER messages_editor_tracking
BEFORE INSERT OR UPDATE ON messages
FOR EACH ROW
EXECUTE FUNCTION editor_tracking();




CREATE VIEW v_msgs_by_chat AS
SELECT
  chat_id,
  chat_name,
  array_agg(
    json_build_object(
      'id', id,
      'role', role,
      'content', content,
      'time', time,
      'user_id', user_id
    ) || meta
  ) as msgs,
  array_agg(DISTINCT user_id) as users
FROM
  public.messages
GROUP BY
  chat_id,
  chat_name;

CREATE VIEW v_chats_by_users AS
SELECT
  user_id,
  array_agg(
    json_build_object(
      'chat_id', chat_id,
      'chat_name', chat_name
    ) || meta
  ) as chats
FROM
  public.messages
GROUP BY
  user_id;