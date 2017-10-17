import React, { Component } from 'react'
import Form from 'react-jsonschema-form'

class MyForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            SchemaState: {
                // description: "A simple form example.",
                type: null,
                required: [
                    null,
                    null
                ],
                properties: {
                    firstName: {
                        "type": null,
                        "title": null
                    },
                    lastName: {
                        "type": null,
                        "title": null
                    },
                    age: {
                        "type": null,
                        "title": null,
                        "minimum": null
                    },
                    sex : {
                        "type": null,
                        "title": null,

                        "enumNames": [null, null]
                    },
                    telephone: {
                        "type": null,
                        "title": null,
                        "minLength": null
                    },
                    date: {
                        "type": null,
                        "format": null,
                        "title": null
                    },
                    bio: {
                        "type": null,
                        "title": null,
                        "maxLength": null
                    },
                    password: {
                        "type": null,
                        "title": null,
                        "minLength": null
                    }
                },
                rightInfo: null,
                middleInfo: null,
                leftInfo: null,
                disclaimer: null

            },
            UISchemaState: {

                classNames: null,
                firstName: {
                    "ui:autofocus": null,
                    "ui:emptyValue": null,
                    classNames: null
                },
                lastName: {
                    "ui:emptyValue": null,
                    classNames: null
                },
                age: {
                    "ui:widget": null,
                    "ui:title": null,
                    "ui:description": null,
                    classNames: null
                },
                sex : {
                    "ui:widget": null,
                    classNames: null
                },

                bio: {
                    "ui:widget": null,
                    classNames: null
                },
                password: {
                    "ui:widget": null,
                    "ui:help": null,
                    classNames: null
                },

                date: {
                    "ui:widget": null,
                    classNames: null
                },
                telephone: {
                    "ui:options": {
                        "inputType": null
                    },
                    "ui:description": null,
                    classNames: null
                }
            },
            testFormData: {
                "firstName":"Obed",
                "lastName":"Ampah",
                "age":32,
                "sex":"M",
                "telephone":"1231231234",
                "date":"1980-04-15",
                "bio":"sdlkfjdslakfjdasjlfdjljkfa",
                "password":"adlkfjasdljfad"
            }
        }
    }

    // JSON Schema API Call
    getSchemaData = () => {
        fetch('http://localhost:8090/formservice/getFormJasonSchema')
            .then(resp => resp.json())
            .then(schema => {
                this.setState({ SchemaState: schema })
            })
            .catch(err => console.error(err))
    }

    // UI Schema API Call
    getUISchemaData = () => {
        fetch('http://localhost:8090/formservice/getFormUiJasonSchema')
            .then(resp => resp.json())
            .then(schema => {
                this.setState({ UISchemaState: schema })

                // When UI Schema present first, JSON Schema can be set
                this.getSchemaData()
            })
            .catch(err => console.error(err))
    }

    // Header Render method
    renderHeader = () => {

        const { SchemaState } = this.state

        return (

            <div className="header-container container">
                <div className="row">
                    <div className="header-left-info col-xs-4">{SchemaState.leftInfo}</div>
                    <div className="header-middle-info col-xs-4">{SchemaState.middleInfo}</div>
                    <div className="header-right-info col-xs-4">{SchemaState.rightInfo}</div>
                </div>
                <div className="disclaimer-container row">
                    <div className="disclaimer-content col-xs-12">{SchemaState.disclaimer}</div>
                </div>
            </div>
        )
    }

    // method to create schema for form
    // should look to give it the config object
    // as an argument
    createSchema = () => {

        const { SchemaState } = this.state

        const Schema = SchemaState

        return Schema
    }

    // method to create the UI schema
    // should look to give it the config object
    // as an argument
    createUISchema = () => {

        const { UISchemaState } = this.state

        const UISchema = UISchemaState

        return UISchema

    }

    // method to deliver prepopulated data
    prepopulated = () => {
        return this.state.testFormData
    }

    // Post component mount method calls
    componentDidMount() {

        // Fetch of initial Data
        this.getUISchemaData()
    }

    // onSubmit method that accepts formData prop from form
    // also clears formData object on success
    onSubmit = (formData) => {
        console.log("received form data in onSubmit: ",typeof formData)
        console.log("stringified formData", JSON.stringify(formData))

        const stringJSON = JSON.stringify(formData)

        fetch('http://localhost:8090/formservice/submitForm', {
            body: stringJSON,
            method: 'post'
        }).then((resp) => {
            console.log('This is the resp: ', resp)
            })

        this.setState({ formData: {} })
    }

    // render method
    render() {

        const {testFormData} = this.state

        // return object
        return (
            <div className="container">
                {this.renderHeader()}
                {/* Form Component */}
                <Form
                    schema={this.createSchema()}
                    uiSchema={this.createUISchema()}
                    showErrorList={true}
                    onSubmit={({formData}) => this.onSubmit(formData)}
                >
                </Form>
            </div>
        )
    }
}

export default MyForm