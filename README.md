# aws-serverless-api

> AWS Serverless RESTful API

### About

Serverless RESTful API created using [Serverless](https://www.serverless.com/framework/docs/getting-started) with [Feathers](http://feathersjs.com).
  



### Stack Used:

AWS Lambda - Deploying serverless App
FeathersJS (with Express) - Creating REST Api
MongoDB - Database management
 



### Getting Started

This project created in purpose to learn & experience creating a serverless service using AWS Lambda.

Below are API services created & available publicly to test. You may also find the API list via api.http file.




### Get contact list

To see more detail on querying, go to [feathers querying](https://docs.feathersjs.com/api/databases/querying.html).




```http
GET /dev/contact
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `$sort` | `object` | **Optional**. To sort return data based on specified field parameter. Acceptable value: (-1=descending) or (1=acending) |
| `$limit` | `number` | **Optional**. To limit maximum number of record to return. |
| `fieldName` | `string` | **Optional**. To filter record based on specified field parameters. |


Example request
```http
GET /dev/contact?[$sort][firstName]=-1
```




### Get specific contact information

```http
GET /dev/contact/{{_id}}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | **Required**. Records ID to get |


Example request
```http
GET /dev/contact/61223baa61a88f9a00407358
```



### Create new contact

```http
POST /dev/contact
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `firstName` | `string` | **Required**. |
| `lastName` | `string` | **Required**. |
| `phoneNumber` | `string` | **Required**. Malaysian phone number with phone code - (eg: 601234567890) |
| `email` | `string` | **Required**.  |
| `address` | `string` | **Required**. |
| `birthDate` | `string` | **Required**. Date format in DD-MM-YYYY |


Example request
```http
PATCH /dev/contact?_id=61223baa61a88f9a00407358
```


### Data

Acceptable request data: 

```javascript
{
"firstName" : string,
"lastName" : string,
"phoneNumber" : string, //with malaysian phone number format including phone code,
"email" : string,
"address" : string,
"birthDate" : string //with format (DD-MM-YYYY)
}
```



### Update specific contact information

```http
PATCH /dev/contact?_id={{_id}}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | **Required**. Records ID to update |


Example request
```http
PATCH /dev/contact?_id=61223baa61a88f9a00407358
```


### Data

Acceptable request data: 

```javascript
{
"firstName" : string,
"lastName" : string,
"phoneNumber" : string, //with malaysian phone number format including phone code,
"email" : string,
"address" : string,
"birthDate" : string //with format (DD-MM-YYYY)
}
```



### Responses
Successful request returns a JSON response in the following format:
```javascript
{
"message" : string,
"status" : number,
"data" : object
}
```



## Help

For more information visit

### ****feathers****
[docs.feathersjs.com](http://docs.feathersjs.com)

### ****serverless****
[serverless docs](https://www.serverless.com/framework/docs/guides/)
