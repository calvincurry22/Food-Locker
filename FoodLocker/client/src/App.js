import React from 'react';
import ViolationCategoryProvider from './providers/ViolationCategoryProvider';
import AuditViolationProvider from './providers/AuditViolationProvider';
import CredentialProvider from './providers/CredentialProvider';
import EmployeeProvider from './providers/EmployeeProvider';
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './providers/UserProvider';
import AuditProvider from './providers/AuditProvider';
import TaskProvider from './providers/TaskProvider';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <TaskProvider>
          <EmployeeProvider>
            <CredentialProvider>
              <AuditProvider>
                <AuditViolationProvider>
                  <ViolationCategoryProvider>
                    <Header />
                    <ApplicationViews />
                  </ViolationCategoryProvider>
                </AuditViolationProvider>
              </AuditProvider>
            </CredentialProvider>
          </EmployeeProvider>
        </TaskProvider>
      </UserProvider>
    </Router>
  );
}

export default App;