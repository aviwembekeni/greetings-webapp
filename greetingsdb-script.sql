drop table users;

create table users (
    id serial not null primary key,
    name text not null,
    greet_counter int default 0
);
