# Blog Project:

# Kubernetes Notes: 

 - Evverything is called an object like (Pod, Deployment, Service)

 - A node is like an ec2 or a virtual machine that hosts one or more Pods.

 - A pod is where a container is actually running (many containers could be run inside one Pod).

 - A deployment is the object that is responsibl for managing pods of the same type or logic.

 - We never are going to create or delete Pods, we only manipulate them using deployments.

# Updating A deployment : 

  ## Approach One : (Not used)

    - Change Code
    - Build Image with version
    - Change version in Deployment Config File.
    - Apply deployment.

    Not Used because we don't want to update the config file every time we make a change to our code base

  ## Approach Two : (used)

    - Change Code
    - Update/Build the image to latest
    - Push to dockerhub
    - run `kubectl rollout restart deployment [DEPL_NAME]`

    Note that in our deployment-config.yaml, we always are pointing the containers images to latest.

# Services: 

  ## ClusterIP Service:

    - Default Service and is used to make Pods accesssible inside the cluster.
    - We create a ClusterIP service per Pod.
    - Service name is used to make HTTP requests.

  ## NodePort Services: 

    - Used to make Pods accessible from outside the cluster
    - Used only for Dev purposes.

  ## LoadBalancer Services: 

    - Like Nodeport Service, used to make pods accessiblr from outside the cluster.
    - Used in Production.
    - When we create a loadBalancer Service, k8s requests the provider (AWS, Azure, ...) to provision a load balancer instance (This is outside our cluster).
    - Gives Accss to one Pod.
  ## External Name Services:

    - Also used to make services visible outside a cluster
    - A more advanced option (CNAME ... )

# Ingress And Ingress-Controller: 

  - An Ingress is an API object that defines rules which allow external access to services in a cluster. An Ingress controller fulfills the rules set in the Ingress.

  - ingress-controller is what apply routing rules, and we provide these rules via a config file having annotation (kubernetes.io/ingress.class: nginx)