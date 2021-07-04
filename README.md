<b>Postgres Sequelize</b>

This is a sample project to test sequelize with skipLocked as true.</br>

It tries the resolve the following race condition:</br>

DB has two values:</br>
* id : 1 , status : open</br>
* id : 2 , status : open</br>

Intent of both threads is to any get 1 record with status as open.</br>

Thread 1 -> Select statement returns Id 1, status as open</br>
Thread 2 -> Select statement returns Id 1, status as open</br>
Thread 1 -> Updates status of Id1 as closed but Thread 2 is not aware of it and considers id 1 to be open status.</br>

With skipLocked as true, if thread 1 gets the lock first, thread 2 should never read Id 1.</br>


For the code to work, need to define following environment variables:</br>
* DB_USERNAME </br>
* DB_PASSWORD </br>
* DB_NAME



