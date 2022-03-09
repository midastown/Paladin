DROP TABLE Comment;
DROP TABLE Vote;
DROP TABLE CastUser;
DROP TABLE Saved_Article;
DROP TABLE Article;
DROP TABLE NewsUser;


CREATE TABLE Article(
    Article_id integer(10) primary key,
    Article_url varchar(255) not null
);

CREATE TABLE NewsUser(
    User_id_news integer(10) primary key,
    FullName varchar(100) not null,
    Email varchar(100) not null unique,
    PasswordUser varchar(50) not null 
);

CREATE TABLE Saved_Article(
    User_id_news integer(10),
    Article_id integer(10),
    Date_Saved Date,
    primary key(User_id_news, Article_id),
    foreign key (User_id_news) references NewsUser(User_id_news),
    foreign key (Article_id) references Article(Article_id)
);

CREATE TABLE CastUser(
    User_id_Cast integer(10) primary key,
    FullName varchar(100),
    Username varchar(100) unique,
    Email varchar(100) not null unique,
    PasswordUser varchar(50),
    Expertise varchar(30)
);

CREATE TABLE Vote(
    Vote_id integer(10) primary key,
    Vote varchar(30) not null,
    Article_id integer(10),
    User_id_Cast integer(10),
    foreign key (User_id_cast) references CastUser(User_id_cast),
    foreign key (Article_id) references Article(Article_id)
)

CREATE TABLE Comment(
    Comment_id integer(10) primary key,
    Comment_text blob,
    Date_added Date,
    Vote_id integer(10),
    foreign key (Vote_id) references Vote(Vote_id)
)