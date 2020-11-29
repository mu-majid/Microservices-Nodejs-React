# GitTix (A Simple StubHub Clone): 

## DB Resources : 

  - Tickets
  - Users
  - Orders
  - Charges

In this app we will follow a resource-based microservice design, this basically means each resource will has its own microservice.
Of course a feature based design could be a better approach, but i am trying to start simple a t first.

## Microservices : 

  - Auth Service (sign-in, sign-out, sign-up)
  - Orders Service
  - Tickets Service
  - Expiration Service (Hanlde locking on orders)
  - Payments Service (using `stripe`)

This is a microservices application that uses `Async` communication between services, so it would be a great idea to list the events that we will work with through out the App.

## Events (Services use for Communication):

  - UserCreated
  - User Updated

  - OrderCreated
  - OrderCancelled
  - OrderExpired

  - TicketCreated
  - TicketUpdated

  - ChargeCreated

## Application Architecture Overview:

  We're going to use `Next.js` for client (`SSR`), and `mongodb` for other backend services, except expiration service, we are going to use `Redis`.

  Also, for the event bus server, we are going to use `NATS`.

  ![OverView](./pics/OverviewDiagram.png)

## Kubernetes Cluster Config: 

  - We are going to use google cloud platform to deploy our cluster, also we'll use `skaffold` to handle all the syncing and building images by connecting it to `google cloud builder`

  - right now `kubectl` is now connected to our local cluster created by `minikube`, so we need to create another context that tells `kubectl` how to connect to the cluster we created on `gcp`.

  - To create a context for `kubectl`, we can use GCP UI or use [google-cloud-sdk](https://cloud.google.com/sdk). i will use the sdk : 
    - Step1: Download and install the SDK
    - Step2: run `gcloud auth login`, and login with your gcp account.
    - Step3: run `gcloud init` and configure the project containing the cluster (should be created from gcp ui)
    - Step4: run `gcloud container clusters get-credentials CLUSTER_NAME_ON_UI`, and this will create a context entry in kubectl config for the cluster we created on gcp.
    - Step5: check that cluster entry was added to local `kubectl` config by running `kubectl config view`
    - Step6: switch between different contexts using this command `kubectl config use-context CONTEXT_NAME`

## Password hashing Reminder : 
  - When a user tries to signup, hash password and save it to db.
  - When a user tries to sign in, we retrieve hashed password from db and match it to password he provided. 

## Is user Logged In (Microservices Architecture): 

  - How would we know if a user is authenticated in a microservices architecture? 

      - Approach 1.0 : services Sync with auth service (inspect JWT/Cookie in the auth service) - If Auth goes down, all service are down (the request will be like request ==> orders service ==> auth service)
      - Approach 1.1 : Auth service here acts as a gateway and all our requests has to pass through it. (the request will be like request ==> Auth service ==> orders service)
      - Approach 2.0 : Each service should be able to inspect the cookie or the JWT on its own. (No dependency on outer services.) but this has a downside, that we now don't see authorization (if user was banned in auth service).
      - We will implement approach 2 for the sake of separation between services
      - Solution to Approach 2.0 downside : always add expiration on cookies and jwt issued by auth service, when request comes to other services (handling auth logic by itself) and see that the jwt has expired then call auth srv for refresh token refresh or we could reject request with expired token.
      - What if the user is banned but the token is still active ? user/auth service should emit an event telling all services that a user is banned.(cached in mem for ex)

      
  Sometimes with each each request we could ask for user permission from auth server (if that was a requirement)

  - Browser handle cookie expiration, and a user could copy its content and use it. But JWT encode expiration in itself.
  - JWT is supported in all languages with official implementation, but cookies are not.
  - Cookies may require some backing datastores (for sessionID) but this is not required.
  - Remember Cookie is just a Transport mechanism that may be used for auth (we could use cookie and transport jwt via it).
  - Since we are implementing SSR React App, we will use cookies for transporting JWT (think about the first request you issue to the server, and you want to include some data in it (service workers with nextjs is a workaround if cookies are not prefered))


## Server Side Rendering: 

  - We are using `Next.JS` for SSR, It is convenient for SEO optimization and also saving up multiple requests (script tags in normal react app), and also better for mobile app.

  - `Next.JS` does not use `Reacr Router`, instead it rely on a folder called `pages`, and each file inside this folder maps to a route.
