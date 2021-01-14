Hit Counter Setup:
1) RDS needs to accept calls from outside vpc you can do this by adding a new security group in iam which gives access to all ip 0.0.0.0/0. 
2) once RDS is avaliable you can create lambda and connect to SES using aws-sdk


Keep in mind:
-password is stored as just a simple crypt repo and is not that hard to break.