# groupA-frontend

### Running the application
npm install  
npm start 

For full functionality the API need to be running an a local machine.  
You can find the backend: ```https://github.com/Wojciech-Skarbek-K/groupA-backend```

### Running the tests
npm test

## Main page
To see if application is running view ```http://localhost:3000/index```

## Page structure
```http://localhost:3000/index``` -> ```http://localhost:3000/job-roles```  
 a button "View job roles" leads from home page to view job roles page  

```http://localhost:3000/index``` -> ```http://localhost:3000/registration```  
A hyperlink on header leads to registration form

 ```http://localhost:3000/job-roles``` -> ```http://localhost:3000/band-comp/:id```  
 A hyper link on every row that leads to band-comp site with competency name and description  
 
  ```http://localhost:3000/job-roles``` -> ```http://localhost:3000/job-responsibility/:id```  
 A hyper link on every row that leads to job-responsibility site with responsibilities for a role

```http://localhost:3000/job-roles``` -> ```http://localhost:3000/index```  
 a button "back" leads back to home page

 ```http://localhost:3000/band-comp/:id``` -> ```http://localhost:3000/job-roles```  
a button "back" leads back to view job roles

```http://localhost:3000/job-responsibility/:id``` -> ```http://localhost:3000/job-roles```  
 a button "back" leads back to view job roles
