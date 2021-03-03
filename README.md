# Repo Overview

- Notes collected are from the course and my own research.
## Projects : 

  There is a read me file inside each project with useful notes about implementation decisions made.

 - **blog** : Simple appliction only using `nodejs` and `k8s` without `db` just to demonstrate the idea behind microservices and how they communicate  in a `k8s` env.

 - **GitTix** : a clone to stubhub project, using `Next.JS`, `Node.JS`, `MongoDB`, `redis`, and `Nats` for communication between different services. And all these services are running in `kubernetes` cluster hosted on google cloud platform. 


In this Repo, I will use a variety of technologies. 

- On the frontend, we'll use `React` and `Next JS` to present content to users. Each service is created using `Node` and `Express`. 

- Data for each service is held in either a `Mongo` database or `Redis`. 

- The entire app is deployed and runs in `Docker` containers executed in a `Kubernetes` cluster. 

- Finally, almost all of the code in this course is written with `Typescript`.
