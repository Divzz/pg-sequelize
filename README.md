Postgres Sequelize

This is a sample project to test sequelize with skipLocked as true.

It tries the resolve the following race condition:

DB has two values 1 , status : open and 2, status: open
Intend of both threads is to any get 1 record with status as open.

Thread 1 -> Select statement returns Id 1, status as open
Thread 2 -> Select statement returns Id 1, status as open
Thread 1 -> Updates status of Id1 as closed but Thread 2 is not aware of it and considers id 1 to be open status.

With skipLocked as true, if thread 1 gets the lock first, thread 2 should never read Id 1.



