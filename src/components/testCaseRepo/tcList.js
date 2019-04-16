import React, {Component} from 'react';
import {Table, TableHeader, TableRow, TableData, TableHead, TableBody, NumberInput, Link} from 'carbon-components-react';
import {OverflowMenu, OverflowMenuItem} from 'carbon-components-react';
import {Button} from 'carbon-components-react';
import {Modal} from 'carbon-components-react';
import {FormGroup, Form, TextInput} from 'carbon-components-react';

class TestCaseList extends Component {
    constructor(props){
        super(props)
        this.state= {
            tc_add_modal: false,
            tc_delete_modal: false,
            data: [
                {
                    'tc_name': 'some test case one',
                    'tc_id': 12345,
                    'tc_steps': []
                },
                {
                    'tc_name': 'some test case two',
                    'tc_id': 12456,
                    'tc_steps': []
                },
                {
                    'tc_name': 'some test case three',
                    'tc_id': 65454,
                    'tc_steps': []
                }
            ]
        }
    }
    openModal = (state) => {
        this.setState({
            [state]: true
        })
    };
    closeModal = (state) => {
        this.setState({
            [state]: false
        })
    };
    render() {
        let tc_delete_modal = (
            <Modal primaryButtonText="Delete"
                   className="bx--modal--danger"
                   danger="true"
                   secondaryButtonText="Close"
                   onSecondarySubmit={() => this.closeModal("tc_delete_modal")}
                   onRequestClose={() => this.closeModal("tc_delete_modal")}
                   open={this.state.tc_delete_modal}>
                <p>Do you want to delete the test case?</p>
            </Modal>
        )
        let tc_add_modal = (
            <Modal primaryButtonText="Add"
                   buttonTriggerText="Add TC"
                   secondaryButtonText="Close"
                   modalHeading="Add Testcase"
                   open={this.state.tc_add_modal}
                   onSecondarySubmit={() => this.closeModal("tc_add_modal")}
                   onRequestClose={() => this.closeModal("tc_add_modal")}>
                <Form id="tcadd-form" encType="mutipart/form-data">
                    <FormGroup>
                        <TextInput name="name" id="tc-name" required labelText="TC Name"/>
                    </FormGroup>
                    <FormGroup>
                        <NumberInput name="id" id="tc-id" required labelText="TC ID"/>
                    </FormGroup>
                </Form>
            </Modal>
        )
        let table_data = this.state.data.map((each_data, i) => {
            return (
                <TableRow key={i}>
                    <TableData>{i+1}</TableData>
                    <TableData><Link>{each_data.tc_name}</Link></TableData>
                    <TableData>{each_data.tc_id}</TableData>
                    <TableData>
                        <OverflowMenu>
                            <OverflowMenuItem itemText="Modify"></OverflowMenuItem>
                            <OverflowMenuItem itemText="Delete" onClick={() => this.openModal("tc_delete_modal")}></OverflowMenuItem>
                        </OverflowMenu>
                    </TableData>
                </TableRow>
            )
        })
        return (
            <div>
                {tc_delete_modal}
                {tc_add_modal}
                <div className="flex-container elements-button-gp">
                    <div className='add-button'>
                        <Button kind="primary" onClick={() => this.openModal("tc_add_modal")}>Add Testcase</Button>
                    </div>
                    <div className='add-button'>
                        <Button kind="secondary">Refresh</Button>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow header>
                            <TableHeader>#</TableHeader>
                            <TableHeader>Test case name</TableHeader>
                            <TableHeader>Test case ID</TableHeader>
                            <TableHeader width="50"></TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table_data}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default TestCaseList;