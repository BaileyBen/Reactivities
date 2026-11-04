import { createBrowserRouter} from "react-router"
import App from "../Layout/App"
import HomePage from "../../Features/home/HomePage"
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard"
import ActivityForm from "../../Features/Activities/Form/ActivityForm"
import ActivityDetails from "../../Features/Activities/Details/ActivityDetails"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'activities/:id', element: <ActivityDetails/>},
            {path: 'createActivity', element: <ActivityForm/>}
        ]
    }
])

