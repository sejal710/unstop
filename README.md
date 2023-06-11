# Unstop

Welcome to the Seat Booking Website! This website is designed to allow users to book a maximum of 7 seats at once. Once all seats are booked, the page can be reset to make the seats available for booking again. If seats are available in the same row, the system will prioritize assigning seats in the same row.

## Installation

#### Prerequisites
- Node.js and npm should be installed on your machine. You can download them from the official Node.js website.

![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)

#### Clone the repository:
 ```
  git clone https://github.com/sejal710/unstop.git
  ```
### Frontend
[![React](https://img.icons8.com/color/48/000000/react-native.png)](https://reactjs.org/)
[![Sass](https://img.icons8.com/color/48/000000/sass.png)](https://sass-lang.com/)
[![TypeScript](https://img.icons8.com/color/48/000000/typescript.png)](https://www.typescriptlang.org/)

#### Install dependencies:
``` 
npm install
```
#### Starting the Development Server To start the development server, run the following command:
```
npm run dev
```
![Web capture_12-6-2023_0295_unstop-khaki vercel app](https://github.com/sejal710/InterviewBook/assets/108399174/879e6c4f-9f18-47e4-888f-f840ad852c0e)


### Backend
![TypeScript](https://img.icons8.com/color/48/000000/typescript.png)
![Express](https://img.icons8.com/color/48/000000/express.png)
![Mongoose](https://img.icons8.com/color/48/000000/mongoose.png)
![CORS](https://img.icons8.com/color/48/000000/api-settings.png)
![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)

#### Install dependencies:
``` 
npm install
```
#### Starting the Development Server To start the development server, run the following command:
```
npm run server
```

#### API endpoints:
  ```
  /seats  - get request
  ```

  ```
  /seats - patch request for booking the seats
  ```
  
  ```
  /seats/reset - patch request for reset
  ```
  
## Folder Structure
- /unstop
  - /Backend
    - /Model
      - seat.model.ts
    - .gitignore
    - db.ts
    - index.ts
    - package-lock.json
    - package.json
  - /Frontend
    - /public
    - /src
      - /Components
        - Loading.tsx
        - Navbar.tsx
        - Popup.tsx
        - Reset.tsx
        - Seat.tsx
        - Train.tsx
      - /Sass
        - Loading.sass
        - Navbar.sass
        - Popup.sass
        - Reset.sass
        - Seat.sass
        - Train.sass
      - App.sass
      - App.tsx
      - main.tsx
      - vite-env.d.ts
    - .eslintrc.cjs
    - .gitignore
    - index.html
    - package-lock.json
    - package.json
    - tsconfig.json
    - tsconfig.node.json
    - vite.config.ts
  - /README.md


### Contact

If you have any questions, suggestions, or feedback, feel free to reach out to the project maintainer or team:

- **Project Maintainer:** [Sejal Jaiswal](mailto:710sejal@gmail.com)
- **Project Repository:** [GitHub](https://github.com/sejal710/unstop)

You can also chat for further discussions and support:

- **Communication Chat:** [Linkdien](https://www.linkedin.com/in/sejal-jaiswal-645b4b217/)
