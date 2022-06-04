-- DROP SCHEMA pcam;

CREATE SCHEMA pcam AUTHORIZATION postgres;

-- DROP SEQUENCE pcam.cam_access_permission_id_seq;

CREATE SEQUENCE pcam.cam_access_permission_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;
-- DROP SEQUENCE pcam.cams_id_seq;

CREATE SEQUENCE pcam.cams_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;
-- DROP SEQUENCE pcam.t_imgs_id_seq;

CREATE SEQUENCE pcam.t_imgs_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;
-- DROP SEQUENCE pcam.t_imgs_id_seq1;

CREATE SEQUENCE pcam.t_imgs_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;
-- DROP SEQUENCE pcam.users_group_id_seq;

CREATE SEQUENCE pcam.users_group_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;
-- DROP SEQUENCE pcam.users_id_seq;

CREATE SEQUENCE pcam.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1;-- pcam.t_imgs definition

-- Drop table

-- DROP TABLE pcam.t_imgs;

CREATE TABLE pcam.t_imgs (
	id bigserial NOT NULL,
	sourceimg text NOT NULL,
	alias varchar NOT NULL,
	typeimg varchar NOT NULL,
	CONSTRAINT t_imgs_pkey PRIMARY KEY (id)
);


-- pcam.users definition

-- Drop table

-- DROP TABLE pcam.users;

CREATE TABLE pcam.users (
	id bigserial NOT NULL,
	fullname varchar(100) NOT NULL,
	alias varchar(100) NOT NULL,
	username varchar(30) NOT NULL,
	usertype int2 NOT NULL,
	status int2 NOT NULL,
	"password" varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (username)
);



-- pcam.users_group definition

-- Drop table

-- DROP TABLE pcam.users_group;

CREATE TABLE pcam.users_group (
	id bigserial NOT NULL,
	groupname varchar(50) NOT NULL,
	description varchar(50) NOT NULL,
	CONSTRAINT users_group_pkey PRIMARY KEY (id)
);


-- pcam.cams definition

-- Drop table

-- DROP TABLE pcam.cams;

CREATE TABLE pcam.cams (
	id bigserial NOT NULL,
	devicename varchar(100) NOT NULL,
	alias varchar(100) NOT NULL,
	streamtype varchar(100) NOT NULL,
	urlcamstream varchar(100) NOT NULL,
	status int2 NOT NULL DEFAULT 0,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	imageid int4 NOT NULL DEFAULT 2,
	CONSTRAINT cams_pkey PRIMARY KEY (id),
	CONSTRAINT cams_fk FOREIGN KEY (imageid) REFERENCES pcam.t_imgs(id)
);


-- pcam.cam_access_permission definition

-- Drop table

-- DROP TABLE pcam.cam_access_permission;

CREATE TABLE pcam.cam_access_permission (
	id bigserial NOT NULL,
	camid int4 NOT NULL,
	alias varchar(100) NOT NULL,
	startpermissiondate timestamptz NOT NULL,
	stoppermissiondate timestamptz NOT NULL,
	durationpermitions int4 NOT NULL,
	userid int4 NOT NULL,
	"token" varchar NOT NULL,
	createbyuser int4 NULL,
	CONSTRAINT cam_access_permission_pkey PRIMARY KEY (id),
	CONSTRAINT cam_access_permission_fk FOREIGN KEY (camid) REFERENCES pcam.cams(id) ON DELETE CASCADE,
	CONSTRAINT cam_access_permission_user_fk FOREIGN KEY (createbyuser) REFERENCES pcam.users(id)
);




CREATE INDEX sytemusers_username_idx ON pcam.users USING btree (username, usertype);
CREATE INDEX users_username_idx ON pcam.users USING btree (username, usertype);
CREATE INDEX cam_access_permission_camid_idx ON pcam.cam_access_permission USING btree (camid);
INSERT INTO pcam.users (id, fullname, alias, username, usertype, status, "password", created_at, updated_at) VALUES(1, 'Administrador', 'Administrador', 'admin', 0, 1, '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2022-05-22 12:03:40.089', '2022-05-22 12:03:40.089');
