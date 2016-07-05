#TODO
* Separate out the domain modelling logic into a library
    * Call the API constructor with an api (root) model which has other models associated with it and those have others etc.
* Hypermedia links - will need rest services to know how to generate links
    * All links will be absolute but relative to the api base path, e.g. **/api/person** even if the base path sits at **/myPath/other/api/person**
    * Will these only be available on options requests or when you fetch the individual resource as well
        * Will have to split out the model and meta if so
* Allow for model where you can only have one of it *(for the root?)*
    * Probably achieved with a custom rest service which only implements a get all and a post
    * Will it also need a custom resource?
* Authentication
