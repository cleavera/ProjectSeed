#TODO
* Separate out the domain modelling logic into a library
    * Call the API constructor with an api model which has other models associated with it and those have others etc.
* Allow models to be associated with other models
    * Use a decorator, you pass it the Model class you want to associate
    * Distinguish between one to one and one to many? *Thoughts?*
* Hypermedia links - will need rest services to know how to generate links
    * All links will be absolute but relative to the api base path, e.g. **/api/person** even if the base path sits at **/myPath/other/api/person**
    * Will these only be available on options requests or when you fetch the individual resource as well
        * Will have to split out the model and meta if so
