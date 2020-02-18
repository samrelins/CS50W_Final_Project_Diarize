# Diarize
Diarize is my final project submission for the CS50w course. A positive psychology focussed diary application that encourages users to plan and review their days to make the best possible use of their time. The format of the application is based on the popular 6-minute-diary with a few tweaks and extras added.

## Django
Diarize has been built using the Django framework, introduced in project 3 of the CS50w course. A more detailed explanation of the django framework and project structure is included in the readme for project 3, but here is a brief overview. 

Django is a high-level web framework that allows developers to quickly and iteratively build, prototype and deploy web applications. It does this by including a large amount of the common functionality of web applications (i.e. user account management, security, database management) right out of the box. The framework also encourages developers to work within this philosophy - the re-usable elements of a project (such as a comments system, or an basket order system) are housed in self-contained ‘app’ folders, so they can easily be picked up and slotted into other projects that require the same functionality. 

The conventions of the django development philosophy are enforced by the framework’s structure. The overall product is referred to as a ‘project’ each project begins life as follows:

```
manage.py
<project name>/
	__init__.py
	settings.py
	urls.py
	wsgi.py
```

The manage.py file contains the nuts and bolts that function as the command line API. The project folder contains the global settings and information that are used to stitch your project together.
Functionality is then added by creating or (adding pre-prepared) apps. These are self contained folders that are added to the root directory, and look like so:

```
new_app/
	__init__.py
	admin.py
	apps.py
	migrations/
		__init__.py
	models.py
	tests.py
	views.py
```

Each of the files teases out the common requirements of a web-server - models.py contains python classes that are used to build and maintain a database (if required), views.py contains the code describing the functionality of the app, tests.py contains (unsurprisingly) test scripts and so on. Other files can be added to this basic structure as required, such as a urls.py file to tell django what view function to call when a url is requested, static HTML / CSS / front-end .js files can be added and so on. As mentioned above, a more comprehensive explanation is given in the readme for project 3.

## Project Structure

Diarise is split into two apps - `accounts/` and `diary/`:

**`accounts/`** handles user registration, login, authentication and logout. This app serves as a perfect example of the reusability that Django encourages, as it is lifted almost unchanged from project 3. At the risk of sounding like a broken record, there is a good description of its functionality in the project 3 readme!

**`diary/`** handles all of the actual functionality of diarize. The user journey through the app (once logged in) can be broken down quite nicely via the view functions in views.py:

* **`overview`**: once logged in, users first see the overview screen. This includes a diary page for each of the previous entries they have created - selecting any of these will take them to the relevant entry page. A blank entry appears in the top right of the page that allows users to create a new entry or, if they have already completed the plan stage of a new entry, allows users to complete an unfinished entry.
* **`plan_entry`**: once a user chooses to begin a new entry they will be taken to the plan page. Users are asked to complete each of the sections of the plan one by one and, once submitted, their entries are added to the app’s database. The page then links back to the overview screen which will now include the option to complete this new entry when they are ready
* **`review_entry`**: Once the day is over, users can review their day to complete an entry. Users are asked to review the sections of the plan they made earlier, and this information is recorded on submission to create a complete entry. The page redirects to the overview screen where the new entry will appear alongside the others.
* **`view_entry`**: A user can select any previous entry from the overview screen to see all of the information they entered when creating and completing the entry. 
* **`intro`**: when a user first creates an account, or requests a review of the site functionality, they are directed to the intro page. This guides the user step-by-step through each section of the application, with an explanation of the functionality and how it contributes to the user’s positive psychology

The functions in `views.py` tell only part of the story. A large portion of the functionality is handled front-end via client-side javascript. Each of the intro, plan and review route’s has a similar structure:
* The route’s view function in `views.py` (e.g `plan_entry`) loads a base template with an empty section for the page content
* The base template includes javascript that loads the page functionality - these javascript files can be found in static/js `e.g plan.js`
* The javascript requests the page content as it is required via asynchronous (or AJAX) requests, inserts the content into the main section of the page, and adds the required interactive functionality
* The pages html content is served by a specific `<route name>_pages` view in views.py - e.g `plan_pages` loads the different page content for the plan route
* The different page content can be found in `static/html` folders of the same name as the route in views.py e.g. `static/html/plan_pages/`
* Once the user has completed their entry, the page javascript collects the input and submits it to the respective route’s view function via a POST request


### Bootstrap allows mobile responsive content
 
 
 
