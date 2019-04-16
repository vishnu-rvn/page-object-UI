import React, { Component } from 'react';
import {Tabs, Tab} from 'carbon-components-react';
import ElementList from './components/objectRepo/elementList.js';
import TestCaseList from './components/testCaseRepo/tcList.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <header className="App-header">
                    <div className="flex-container header">
                        <div id="heading">
                            <h1>Bleh Bleh</h1>
                        </div>
                        <div id="settings">
                            
                        </div>
                    </div>
                </header>
                <Tabs>
                    <Tab label="Object Map">
                        <ElementList/>
                    </Tab>
                    <Tab label="Test Cases">
                        <TestCaseList/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;
