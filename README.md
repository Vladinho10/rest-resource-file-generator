# REST resource file generator

## Table of contents
* [General info](#general-info)
* [About RESTful](#about-RESTful)
* [Setup](#setup)
* [Usage](#usage)

### General info
As a backend developer all we know that every time when we want to add new API, new logic, new CRUD, we create some file and write into them some codes.\
For example when we what to create a logic (let's call it `resource`) about user, we create
a router. 
```
    userRt.get('/v1/users', UserCtrl.getMany);
    userRt.post('/v1/users', UserCtrl.post);
```
a controller. 
```
    async getMany(req, res) {
     // here should be your code, where it's called service or db model or smth else
    }
    async post(req, res) {
     // here should be your code, where it's called service or db model or smth else
    }
```
then we usually create a service, a model, a test, swagger schema and so on. Almost 6-7 files every time.
So this package allows you to generate all this files at once just call a CLI command and be make your life easy :)  


### About RESTful
Why did I decide to use `rest resource` name? Because I connect this log with RESTful resource. REST is architectural style for distributed hypermedia systems, one of the most famous styles. The key abstraction of information in REST is a resource. Any information that can be named can be a resource: a document or image, a temporal service, a collection of other resources, a non-virtual object (e.g. a person), and so on. REST uses a resource identifier to identify the particular resource involved in an interaction between components. \
For more info, please see here [here](https://restfulapi.net/). That's why I chose REST resource.

### Setup
Before setup please ensure that you use Node.js v12 version or above.
* install package
```
  npm i -g rest-resource-file-generator
```
* create a `rest.js` local config file in your project's root directory like default config file below\
You can dynamically change creating filename, variableName in your code, API base path, or change leave only files you need. 
```
'use strict';
module.exports = function (resourceName) {
    const PascalCaseName = resourceName[0].toUpperCase() + resourceName.slice(1);

    return {
        routers: {
            fileName: `routers/${resourceName}-rt.js`,
            variableName: `${resourceName}Rt`,
            controllersDir: '../controllers',
            basePath: 'v1',
        },
        controllers: {
            fileName: `controllers/${resourceName}-ctrl.js`,
            variableName: `${PascalCaseName}Ctrl`,
            servicesDir: '../services',
        },
        services: {
            fileName: `services/${resourceName}-srv.js`,
            variableName: `${PascalCaseName}Srv`,
            modelsDir: '../dal/models',
        },
        models: {
            fileName: `dal/models/${resourceName}.js`,
            variableName: `${PascalCaseName}`,
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
        swaggerPaths: {
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
        },
        unitTests: {
            fileName: `tests/unit/${resourceName}-test.js`,
            controllersDir: '../controllers',
        },
    };
};
```
If you don't create local config file, it'll be created from global configuration.

### Usage
There is an only one command `rest resource`, but there are some flags what you need to know.

`-N` name. Its value is the resource name.   
`-LR` local restrc.js file existence. If its value is `yes`, it says that the local restrc.js file exists. Otherwise, it uses global configs.   
`-F` fields. It must be the last flag. Its values (and the rest values) are mongoose and swagger schemas configs.  
Let's see on example.

<img src="https://github.com/Vladinho10/rest-resource-file-generator/blob/main/files/command-line.png?raw=true"  alt="command-line"/> 

or you can write just in one line using this syntax.
```
rest-resource -N user -F name--type:String-required:true-minLength:3 age--type:Number-min:13 email--type:String-unique:true
```
It will create all your files like this hierarchy.

<img src="https://github.com/Vladinho10/rest-resource-file-generator/blob/main/files/created-files.png?raw=true"  alt="created-files"/>

If you wanted to generate a controller file, it will look like

<img src="https://github.com/Vladinho10/rest-resource-file-generator/blob/main/files/controller.png?raw=true"  alt="controller"/> 


List of mongoose supported options 
```
    'type',
    'required',
    'default',
    'index',
    'unique',
    'sparse',
    'lowercase',
    'uppercase',
    'trim',
    'minLength',
    'maxLength',
    'min',
    'max',
    'ref',
```
List of mongoose supported options (please be careful about the register).
```
    'String',
    'Number',
    'Date',
    'Buffer',
    'Boolean',
    'Map',
    'Schema.ObjectId',
    'Schema.Types.Mixed',
    'Schema.Types.ObjectId',
    'Schema.Types.Decimal128',
```
These lists will be expanded in the future.
