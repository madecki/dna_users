import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./Views/Users/Users";

function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/users" />} />
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
