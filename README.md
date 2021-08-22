# aws-serverless-api

> AWS Serverless RESTful API

### About

Serverless RESTful API created using [Serverless](https://www.serverless.com/framework/docs/getting-started) with [Feathers](http://feathersjs.com).
  



### Stack Used:

- Serverless (AWS Lambda) - Creating & Deploying serverless app
- FeathersJS (with Express) - Creating REST Api
- MongoDB - Database management

 



### Getting Started

This project created in purpose to learn & experience creating a serverless service using AWS Lambda.

Below are API services created & available publicly to test. You may also find the API list via api.http file.




### Get contact list

To see more detail on querying, go to [feathers querying](https://docs.feathersjs.com/api/databases/querying.html).



_baseUrl : https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev_

```http
GET {{baseUrl}}/contact
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `$sort` | `object` | **Optional**. To sort return data based on specified field parameter. Acceptable value: (-1=descending) or (1=acending) |
| `$limit` | `number` | **Optional**. To limit maximum number of record to return. |
| `fieldName` | `string` | **Optional**. To filter record based on specified field parameters. |


Example request
```http
GET {{baseUrl}}/contact?[$sort][firstName]=-1
```

CURL 
```
curl -H "Content-type: application/json" 'https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev/contact?[$sort][firstName]=1'
```


### Get specific contact information

```http
GET {{baseUrl}}/contact/{{_id}}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | **Required**. Records ID to get |


Example request
```http
GET {{baseUrl}}/contact/61223baa61a88f9a00407358
```


CURL 
```
curl -H "Content-type: application/json" 'https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev/contact/61223baa61a88f9a00407358'
```



### Create new contact

```http
POST {{baseUrl}}/contact
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
POST {{baseUrl}}/contact
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

CURL
```
curl -XPOST -d '{
  "firstName": "Test",
  "lastName": "User",
  "phoneNumber": "60123456610",
  "email": "test@gmail.com",
  "address": "Selangor",
  "birthDate": "19-06-1991"
}' 'https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev/contact'
```




### Update specific contact information

```http
PATCH {{baseUrl}}/contact?_id={{_id}}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | **Required**. Records ID to update |
| `firstName` | `string` | **Optional**. |
| `lastName` | `string` | **Optional**. |
| `phoneNumber` | `string` | **Optional**. Malaysian phone number with phone code - (eg: 601234567890) |
| `email` | `string` | **Optional**.  |
| `address` | `string` | **Optional**. |
| `birthDate` | `string` | **Optional**. Date format in DD-MM-YYYY |


Example request
```http
PATCH {{baseUrl}}/contact?_id=61223baa61a88f9a00407358
```


CURL
```
curl -XPATCH -d '{
  "address": "Cheras, Kuala Lumpur, Malaysia"
}' 'https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev/contact?_id=61223baa61a88f9a00407351'
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



### Remove specific contact information

```http
DELETE {{baseUrl}}/contact?_id={{_id}}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | **Required**. Records ID to delete |


Example request
```http
DELETE {{baseUrl}}/contact?_id=61223baa61a88f9a00407358
```

CURL
```
curl -XDELETE 'https://wtgqgtivzc.execute-api.ap-southeast-1.amazonaws.com/dev/contact?_id=61223baa61a88f9a00407351'
````




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
