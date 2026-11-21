import { createBrowserRouter, Navigate } from "react-router-dom";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import ActivityDetailsPage from "../../Features/Activities/Details/ActivityDetailPage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import HomePage from "../../Features/home/HomePage";
import App from "../Layout/App";
import Counter from "../../Features/counter/Counter";
import TestErrors from "../../Features/Errors/TestErrors";
import NotFound from "../../Features/Errors/NotFound";
import ServerError from "../../Features/Errors/ServerError";
import LoginForm from "../../Features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../Features/account/RegisterForm";


export const router = createBrowserRouter([
    {
         path: "/",
        element: <App />,
        // Children array acts as your navigation roadmap matrix.
        children: [
            {element: <RequireAuth />, children: [
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailsPage /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            ]},
            { path: '', element: <HomePage /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
]);