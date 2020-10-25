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