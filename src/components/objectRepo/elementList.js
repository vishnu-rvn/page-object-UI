import React, {Component} from 'react';
import {Table, TableHeader, TableRow, TableData, TableHead, Link, TableBody} from 'carbon-components-react';
import {OverflowMenu, OverflowMenuItem} from 'carbon-components-react';
import {Modal} from 'carbon-components-react';
import {Button} from 'carbon-components-react';
import {Form, FormGroup, TextInput, Select, SelectItem} from 'carbon-components-react';
import {InlineNotification} from 'carbon-components-react';


class ElementList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal_show: false,
            dialog_modal_show: false,
            notification_status: "success",
            notification_title: "",
            notification_subtitle: "",
            items: [
                {
                    "name": "name_one",
                    "selector": "selector_one",
                    "selector_type": "selector_type_one",
                    "page": "page_one"
                },{
                    "name": "name_two",
                    "selector": "selector_two",
                    "selector_type": "selector_type_two",
                    "page": "page_two"
                },{
                    "name": "name_three",
                    "selector": "selector_three",
                    "selector_type": "selector_type_three",
                    "page": "page_three"
                },{
                    "name": "name_four",
                    "selector": "selector_four",
                    "selector_type": "selector_type_four",
                    "page": "page_four"
                },{
                    "name": "name_five",
                    "selector": "selector_five",
                    "selector_type": "selector_type_five",
                    "page": "page_five"
                }
            ]
        }
    };
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
    refresh = () => {
        const url = "http://127.0.0.1:5000";
        fetch(url, {
            method: "GET"
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            data => {
                this.setState({
                    items: data
                })
            }
        )
    };
    submitElementData = (event) => {
        const url = "http://127.0.0.1:5000";
        let form = document.getElementById('element-form');
        let form_data = new FormData(form)
        console.log(form)
        fetch(url, {
            method: "POST",
            body: form_data
        }).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                let notif_div = document.getElementById('notification-div')
                this.refresh()
                if (data.status === 'OK') {
                    this.setState({
                        notification_status: "success",
                        notification_title: data.status,
                        notification_subtitle: data.message
                    })
                } else {
                    this.setState({
                        notification_status: "error",
                        notification_title: data.status,
                        notification_subtitle: data.message
                    })
                }
                this.closeModal();
                notif_div.style.display = "block";

            }
        )
    }
    deleteElement = () => {
        const url = "something"
        fetch(url, {
            method: "PUT"
        }).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                console.log(data)
            }
        )
    }
    findElement = () => {
        const url = "http://127.0.0.1:5000/find_element"
        fetch(url, {
            method: "GET"
        }).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                console.log(data)
            }
        )
    }
    componentDidMount() {
        this.refresh()
    };
    showImage(img) {
        this.modal_ref.current.selectImage(img)
    }
    render() {
        let alert_modal = (
            <Modal primaryButtonText="Delete" 
                   secondaryButtonText="Close"
                   onSecondarySubmit={() => this.closeModal("dialog_modal_show")}
                   onRequestClose={() => this.closeModal("dialog_modal_show")}
                   open={this.state.dialog_modal_show}
                   className="bx--modal--danger"
                   danger="true">
                <p>Do you want to delete the element?</p>
            </Modal>
        )
        let element_add_modal = (
            <Modal primaryButtonText="Add" 
                   buttonTriggerText="Add Element" 
                   secondaryButtonText="Close"
                   modalHeading="Add New Element" 
                   onRequestSubmit={this.submitElementData} 
                   open={this.state.modal_show}
                   onSecondarySubmit={() => this.closeModal("modal_show")} 
                   onRequestClose={() => this.closeModal("modal_show")}>
                <Form id="element-form" encType="multipart/form-data">
                    <FormGroup>
                        <TextInput name="name" id="name" required labelText="Name"/>
                    </FormGroup>
                    <FormGroup>
                        <TextInput name="selector" id="selector" required labelText="Selector"/>
                    </FormGroup>
                    <FormGroup>
                        <Button>Find</Button>
                    </FormGroup>
                    <FormGroup>
                        <Select name="selector-type" id="selector-type">
                            <SelectItem hidden value="placeholder-item" text="Choose an Item"/>
                            <SelectItem value="xpath" text="xpath"/>
                            <SelectItem value="id" text="id"/>
                            <SelectItem value="class" text="class"/>
                            <SelectItem value="name" text="name"/>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <TextInput name="page" id="page" required labelText="Page"/>
                    </FormGroup>
                    
                </Form>
            </Modal>
        )
        let notification_popup = <InlineNotification kind={this.state.notification_status} role="alert"
                                    title={this.state.notification_title} subtitle={this.state.notification_subtitle}/>
        let table_data = this.state.items.map((each_row, i) => {
            return (
                <TableRow key={i}>
                    <TableData>{i+1}</TableData>
                    <TableData>{each_row.name}</TableData>
                    <TableData>{each_row.selector}</TableData>
                    <TableData>{each_row.selector_type}</TableData>
                    <TableData>{each_row.page}</TableData>
                    <TableData>
                        <Link href="http://www.google.com">View</Link>
                    </TableData>
                    <TableData>
                        <OverflowMenu>
                            <OverflowMenuItem itemText="Modify" onClick={() => this.openModal("modal_show")}></OverflowMenuItem>
                            <OverflowMenuItem itemText="Delete" onClick={() => this.openModal("dialog_modal_show")}></OverflowMenuItem>
                        </OverflowMenu>
                    </TableData>
                </TableRow>
            )
        })
        return(
            <div>
                {element_add_modal}
                {alert_modal}
                <div id="notification-div">
                    {notification_popup}
                </div>
                <div className="flex-container elements-button-gp">
                    <div className='add-button'>
                        <Button kind="primary" onClick={() => this.openModal("modal_show")}>Add Element</Button>
                    </div>
                    <div className='add-button'>
                        <Button kind="secondary" onClick={this.refresh}>Refresh</Button>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow header>
                            <TableHeader width="30">#</TableHeader>
                            <TableHeader width="100">Name</TableHeader>
                            <TableHeader>Selector</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader>Page</TableHeader>
                            <TableHeader width="50">img</TableHeader>
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

export default ElementList;