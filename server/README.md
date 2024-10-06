# Product Management


This is a Node.js based e-commerce API that provides various features for managing products, categories, and user authentication.

## Features

- **User Authentication**: Users can sign up and sign in using JWT tokens for secure access.
- **Category Management**: 
  - Add categories.
  - Add subcategories.
- **Product Management**: 
  - Add products to subcategories.
  - Support for multiple variants of products (e.g., different RAM and price options).
  - Edit existing products.
- **Product Display**: View all products available in the store.
- **Wishlist**: Implement a wishlist feature for users to save their favorite products.
- **Search Functionality**: Search for products by name.
- **Filtering**: Filter products by subcategory.
- **Pagination**: Implement pagination for product listing to improve performance and user experience.

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For user authentication and secure API access.
- **Cloudinary**: For image upload and management.
- **Multer**: Middleware for handling multipart/form-data for file uploads.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ajay-Dev99/product_management.git
2. Create a .env file in the root of your project and add the following environment variables:
   
 ```
PORT=4000
JWT_SECRETE_KEY=your_jwt_secret_key
MONGO_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3.Navigate into the project directory:
```
cd product_management
```
4.Install the dependencies:
```
npm install
```
5.To start the server, run the following command:
```
npm start
```
