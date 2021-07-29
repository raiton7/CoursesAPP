# CoursesAPP

## Installation:
***Running API***

Make sure to install the .Net 5.0 SDK for the proper functioning.
You can find it [here](https://dotnet.microsoft.com/download/dotnet/5.0) .

To start the application from the command line, make sure you are inside the project with the solution. 

```
cd [YourDirectory]../directory/CoursesAPP-master
```

Then just simply run the command from the powershell/cmd: 
```
dotnet run --project CoursesAPI
```

*There should be no worries to try compile it on Linux machine.*

***Running Angular***: 

Navigate to:
```
cd [YourDirectory]../CoursesAPP-master/CoursesAPP/src
```

Then run two commands: 
```
npm install
ng serve -o 
```
*-o as optional parameter to open browser.*

*If your port 4200 is already in use, feel free to use ng serve --port whaterveryouwant.* (when changing port remember to change it also in file /CoursesAPI/Startup.cs in line 45, e.g.:
```
options.WithOrigins("http://localhost:4201"))
```

## Technology stack:

***Used Technologies***
+ Angular 12
+ .Net 5.0
+ localdb
+ NuGet Packages: EF Core 5.0.8, EF Core.Design 5.0.8, EF Core.Relational 5.0.8, EF Core.SqlServer 5.0.8, VS.Web.CodeGeneration.Design 5.0.2, Swashbucke.AspNetCore 6.1.4

### Additional info:
Author:
Grzegorz Jurek

Giganci Programowania Zadanie Rekrutacyjne
