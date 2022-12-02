# slm_assignment Nikos Lytras
## Hello there, weclome to my solution
**Here you can find information for how to run the server.**
The first step to run the server is to have a local (or remote) instance of postgres db, for convenience (yours and mine) i added a docker-compose file that contains exactly that. You can start the container by ``cd`` inside the project and ***run the command***: ``docker-compose up -d`` **NOTE:** the docker should be installed on your computer for this to work, If you don't have the docker i'm sure that you will find your postgres instance from somewhere else.

Ok nice so by now we should have a postgres instance up and running. 

The next step is to create a ``.env`` file, this file is used to configure the service, you can see the comments on ``.env.example`` (or you can rename it to ``.env`` and you are ready).

The next step is to create our tables - schemas and fill the up with some test data. ``cd`` inside the project if you are not already in and **hit the command**: ``npm install`` then when this command is finished successfully hit the command:
``npx prisma migrate dev`` this command maybe warn you that the data in db will be lost thats fine just hit yes and then maybe ask you to give a name to the migration just hit enter or give a name you like (just like Nikos), this command will create the schemas and tables for you the hit the command ``npx prisma db seed`` this will fill the tables with some dummy data (you can fill the tables with data also be hit the ``http://localhost:8000/reset/`` endpoint.)

Guess what, you are ready to hit ``npm run start`` and start this server, in this state you can run also the ``npm run test`` command to run the tests.
To interact with the server you can use the ``Postman`` (https://www.postman.com/) a have created a postman collection for the project you can import it from ``SLM_Postman.postman_collection.json`` file to your postman. To see details about the project's api you can hit in some browser the ``http://localhost:8000/api-docs/`` this will open the swagger doc a have created for the project.

And we are done, for any questions you can contact with me, thank you very much for your time.
