CREATE TABLE "Users" (
	"id" uuid,
	"login" varchar(255) UNIQUE,
	"password" varchar(255),
	"age" int,
	"isDeleted" boolean,
	PRIMARY KEY (id)
);

INSERT INTO "Users"
VALUES
	('f33fc668-4422-4c1e-bd91-8ea74bfaccef', '@1234', 'pass', 23, false),
	('a13a3fb7-da9c-47af-9ab1-f080c352d09a', '@5678', 'pass', 32, false),
	('b69b1a0b-6c4a-43db-8f4b-8165c7e9839d', 'te$t_Account', '1234', 45, false),
	('2887609a-8755-4f96-be88-47ef21f558c4', 'realLogin', 'ets', 54, false);

