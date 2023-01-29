CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid,
	"login" varchar(255) UNIQUE,
	"password" varchar(255),
	"age" int,
	"isDeleted" boolean,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "Groups" (
	"id" uuid,
	"name" varchar(255) UNIQUE,
	"permissions" varchar(500),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "UserGroup" (
	"UserId" uuid REFERENCES "Users" ("id"),
	"GroupId" uuid REFERENCES "Groups" ("id") ON DELETE CASCADE,
	CONSTRAINT "id" PRIMARY KEY ("UserId", "GroupId")
);

INSERT INTO "Users"
VALUES
	('f33fc668-4422-4c1e-bd91-8ea74bfaccef', '@1234', 'pass', 23, false),
	('a13a3fb7-da9c-47af-9ab1-f080c352d09a', '@5678', 'pass', 32, false),
	('b69b1a0b-6c4a-43db-8f4b-8165c7e9839d', 'te$t_Account', '1234', 45, false),
	('2887609a-8755-4f96-be88-47ef21f558c4', 'realLogin', 'ets', 54, false);

INSERT INTO "Groups"
VALUES
	('9e53881a-7d4e-43ba-8727-b081eca2f9b1', 'admins', 'READ, WRITE, DELETE, SHARE, UPLOAD_FILES'),
	('f90e16a4-3b1d-4848-ad61-6e984bdc3385', 'regular', 'READ, WRITE, SHARE'),
	('71857933-d8c0-42a5-8a05-82c609fcedbc', 'moderators', 'READ, WRITE, DELETE, SHARE');

INSERT INTO "UserGroup" 
VALUES
	('f33fc668-4422-4c1e-bd91-8ea74bfaccef', '9e53881a-7d4e-43ba-8727-b081eca2f9b1'),
	('a13a3fb7-da9c-47af-9ab1-f080c352d09a', '71857933-d8c0-42a5-8a05-82c609fcedbc'),
	('f33fc668-4422-4c1e-bd91-8ea74bfaccef', 'f90e16a4-3b1d-4848-ad61-6e984bdc3385'),
	('a13a3fb7-da9c-47af-9ab1-f080c352d09a', 'f90e16a4-3b1d-4848-ad61-6e984bdc3385'),
	('b69b1a0b-6c4a-43db-8f4b-8165c7e9839d', 'f90e16a4-3b1d-4848-ad61-6e984bdc3385'),
	('2887609a-8755-4f96-be88-47ef21f558c4', 'f90e16a4-3b1d-4848-ad61-6e984bdc3385');


