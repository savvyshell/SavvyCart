# SavvyCart eCommerce Platform

> Built with MERN / Redux
[Portfolio Link](https://savvyshell.com) :: SavvyShell.com

![](https://puu.sh/Hy1Ou/392ba44c74.png)


## Live Demo

The web-demo of SavvyCart is being hosted on Heroku for testing purposes, and can be viewed here [Heroku SavvyCart Demo](https://savvycart.herokuapp.com/). Since Heroku hibernates apps that are not in use when running dynos, it may take a few seconds to launch the app for Heroku to wake the application. This is not reflective of the app's runtime speed.

## Features
- Custom database seeder script
- PayPal / CC Integration
- Checkout process

		Cart
		Shipping
		Place Order
		Payment Method
		Etc
       
- Full featured shopping cart
- Products with reviews & ratings functionality
- Products carousel for top-rated products
- Products pagination
- Products search functionality
- Authentication / Authorization / Login / Register
- User profile customization
- User profile order details
- Admin product management
- Admin user management
- Admin order details management (mark orders as delivered)



## Tech Stack

- MERN
- MongoDB
	* Mongoose
	* MongoDB Atlas
- ExpressJS (Backend)
	* Controllers / Routes / Middlewares / API
	* Utilized Cloudinary for image uploads
	* ES6
- ReactJS (Frontend)
	* Redux State Management
	* Axios
	* Fetching from API routes
	* React Bootstrap
	* Hooks / ES6
- NodeJS

## Requirements

It is important to note that ES modules were used for Node, so be sure to have a least v14.6+. If not, you can use the --experimental-modules flag.

## Usage

### Environment Variable

Create a .env file in the root of the project and add the following:
```
NODE_ENV = development
PORT = 1501
MONGO_URI = connection-url-here
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = 'example'
```

You can modify any of these values freely to your specifications, but these fields must exist and must be valid.

### Installing Dependencies

```
npm install
cd frontend
npm install
```

### Run
`npm run dev`

Runs both the server & backend

`npm run server`

Runs only the server

## Build & Deployment

Start by creating the frontend production build.

    cd frontend
    npm run build

With the Heroku postbuild script, you can freely push to Heroku which will automatically build and deploy without you having to do it every time manually.

## Seeding Database

With the seeder script, you can issue the following commands to populate the database with temporary data for sample users & products as well as a way to destroy and clear the database.

	# Import Data
	npm run data:import

	# Destroy / Clear data
	npm run data:destroy

Sample User Logins:
```
admin@example.com (Admin)
p123

john@example.com (Customer)
123

jane@example.com (Customer)
123
```

