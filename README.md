# REST resource file generator

## Table of contents
* [General info](#general-info)
* [About RESTful](#about-RESTful)
* [Setup](#setup)
* [Usage](#usage)

### General info
:new: You can use it also in front end side for creating file as in back end. Just follow the instructions. \
As a backend developer all we know that every time when we want to add new API, new logic, new CRUD, we create some files and write into them some codes.\
For example when we want to create a logic (let's call it `resource`) about user, we create
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
then we usually create a service, a model, tests, swagger schema and so on. Almost 6-7 files every time.
So this package allows you to generate all this files at once just run a CLI command and make your life easy :)  


### About RESTful
Why did I decide to use `rest resource` name? Because I connect this log with RESTful resource. REST is architectural style for distributed hypermedia systems, one of the most famous styles. The key abstraction of information in REST is a resource. Any information that can be named can be a resource: a document or image, a temporal service, a collection of other resources, a non-virtual object (e.g. a person), and so on. REST uses a resource identifier to identify the particular resource involved in an interaction between components. \
For more info, please see here [here](https://restfulapi.net/). That's why I chose REST resource.

### Setup
Now I created a generator for Mongodb/Mongoose scheme/model. In the next version you'll be able to choose SQL/Sequelize else.
Before setup please ensure that you use Node.js v12 version or above.
* install package
```
  npm i -g rest-resource-file-generator
```
* create a `rest.js` local config file in your project's root directory like default config file below\
```
'use strict';
module.exports = function (resourceName, bodies) {
    return {
        routers: {
            resourceName,
            body: bodies.routers,
            fileName: `routers/${resourceName}-rt.js`,
            params: {
                dir: '../controllers',
                basePath: 'v1',
                routerName: 'camelCaseNameRt',
                controllerName: 'pascalCaseNameCtrl',
                pathName: 'pluralizedName',
            },
        },
        controllers: {
            resourceName,
            body: bodies.controllers,
            fileName: `controllers/${resourceName}-ctrl.js`,
            params: {
                dir: '../services',
                controllerName: 'pascalCaseNameCtrl',
                serviceName: 'pascalCaseNameSrv',
            },
        },
        services: {
            resourceName,
            body: bodies.services,
            fileName: `services/${resourceName}-srv.js`,
            params: {
                modelName: 'pascalCaseName',
                dir: '../dal/models',
                serviceName: 'pascalCaseNameSrv',
            },
        },
        models: {
            resourceName,
            body: bodies.models,
            fileName: `dal/models/${resourceName}.js`,
            params: { // find in string by key name
                modelName: 'pascalCaseName',
                schemaName: 'camelCaseNameSchema',
            },
        },
        unitTests: {
            resourceName,
            body: bodies.unitTests,
            fileName: `tests/unit/${resourceName}-test.js`,
            params: {
                dir: '../controllers', // key and values must contain different words
                controllerName: 'pascalCaseNameCtrl',
                testName: 'pascalCaseName',
            },
        },
        swaggerPaths: {
            resourceName,
            body: bodies.swaggerPaths,
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
            params: {
                basePath: 'v1',
                schemaName: 'camelCaseNameSchema',
                tagName: 'pascalCaseName',
                pathName: 'pluralizedName',
            },
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
    };
};
```
If you don't create local config file, it'll be created from global configuration.
It's allowed to make your variable `resourceName` to camelCase, PascalCase or pluralized.\
E.g. resourceName is `my-child`, camelCase will be `myChild`, PascalCase `MyChild`, pluralized-`myChildren`.\
Also, you can dynamically change creating filename and its body in your code as you need. For that you should create local resources bodies, as in example, or your files' body will be taken from global resource-bodies directory.  
For using local bodies, please create a `resource-bodies` directory and export all you local resource bodies. Files in that must have these special names as in below image. The file names and `restrc.js` returning object's key name must be the same.

<img src="https://github.com/Vladinho10/rest-resource-file-generator/blob/main/files/bodies.png?raw=true"  alt="command-line"/> 

This is a bodyFiles example for routers. You can dynamically change your file's content as you want.
```
'use strict';
module.exports = `'use strict';
const routerName = require('express').Router();

const { controllerName } = require('dir');

routerName.get('/basePath/pathName/:_id', controllerName.getOne);
routerName.get('/basePath/pathName', controllerName.getMany);
routerName.post('/basePath/pathName', controllerName.post);
routerName.put('/basePath/pathName/:_id', controllerName.putOne);
routerName.delete('/basePath/pathName/:_id', controllerName.deleteOne);

module.exports = routerName;
`;
``` 

In this example we set dynamically `dir`, `basePath`, `routerName`, `controllerName`, `pathName` which will be replace in file's body with values you set here (restrc.js  routers params)
```
{
     dir: '../controllers',
     basePath: 'v1',
     routerName: 'camelCaseNameRt',
     controllerName: 'pascalCaseNameCtrl',
     pathName: 'pluralizedName',
}
```

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
    'Schema.ObjectId', // since here to below you must take quotes, othervise it throws an error.
    'Schema.Types.Mixed',
    'Schema.Types.ObjectId',
    'Schema.Types.Decimal128',
```
These lists will be expanded in the future.

P.S. This module works perfectly with my node-server-template, here its link [Node-server](https://github.com/Vladinho10/node-server-template)
