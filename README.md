# SSG & SSR Website Assignment

This project demonstrates the use of **Static Site Generation (SSG)** and **Server-Side Rendering (SSR)** to build a dynamic website that serves **recipe data** statically and allows users to **dynamically search student results** based on roll number and password. It combines the power of Next.js with APIs to create a seamless user experience with real-time and pre-rendered content.

## 🚀 Features

### Static Site Generation (SSG) - Recipe API
- **Recipes Data**: Fetches data from an external Recipe API and pre-renders the recipes at build time using Next.js’s `getStaticProps`.
- **Performance Optimized**: The recipes are served as static pages, ensuring fast load times and SEO benefits.
- **Recipe List**: Displays a list of recipes fetched from the API with details like ingredients and cooking instructions.

### Server-Side Rendering (SSR) - Student Result API
- **Dynamic Search**: Users can search their exam results by entering their **roll number** and **password**.
- **Server-Side Rendering**: The results are fetched dynamically from an API on each request, ensuring up-to-date information.
- **Security**: The result page is personalized for each student based on their roll number and password.
- **Real-Time Data**: Ensures users receive the most current result data without needing to refresh the page.

## 🛠️ Technologies Used

- **Frontend**:
  - Next.js (for SSR and SSG)
  - Typescript
  - Tailwind CSS for styling
  - Shadcn UI

- **Backend/API**:
  - Node.js
  - Custom Recipe API (for static site generation)
  - Custom Student Result API (for server-side rendering)


## ⚡ Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/Tahasaif3/milestone-4-assignment.git
cd milestone-4-assignment
```

### 2. Install Dependencies

Run the following command to install all dependencies:

```bash
npm install
```

or with **yarn**:

```bash
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_RECIPE_API_URL=your-recipe-api-url
NEXT_PUBLIC_STUDENT_RESULT_API_URL=your-student-result-api-url
```

### 4. Run the Application

To run the development server:

```bash
npm run dev
```

or with **yarn**:

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

## 📝 Pages

- **Home (SSG)**: Displays a statically generated list of recipes fetched from the Recipe API. The page is pre-rendered at build time for better performance.
  
- **Student Results (SSR)**: Allows users to search for their results by entering their roll number and password. The results are fetched dynamically from the API at runtime using **Server-Side Rendering (SSR)**.

## 📂 Folder Structure

```
├── components/        # React components (e.g., RecipeCard, ResultForm, etc.)
├── pages/             # Next.js page routes (Home, Results, etc.)
│   ├── index.js       # Home page - Recipe list (SSG)
│   ├── results.js     # Student result search page (SSR)
├── public/            # Static files (e.g., images, icons, etc.)
├── styles/            # Global CSS styles
├── utils/             # Helper functions (API calls, data formatting, etc.)
├── .env.local         # Environment variables (API URLs, MongoDB URI)
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation (this file)
```

## 📡 API Endpoints

### Recipe API (SSG)
- Endpoint: `/api/recipes`
  - **GET**: Fetches a list of recipes from the external API.
  
### Student Result API (SSR)
- Endpoint: `/api/student-result`
  - **POST**: Accepts **roll number** and **password** to return the student's result.
  - **GET**: Optionally fetches a list of all results if needed for backend logic.

## 🧑‍💻 Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgements

- **Next.js**: For its support for Static Site Generation (SSG) and Server-Side Rendering (SSR).
- **Recipe API**: For providing the recipe data.
- **Student Result API**: Custom-built API to simulate real-time result fetching.
