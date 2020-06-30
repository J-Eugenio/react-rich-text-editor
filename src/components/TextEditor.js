import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'

import { BoldMark, ItalicMark, FormatToolbar, CodeMark } from './index'



const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Slate Text Editor!'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})


export default class TextEditor extends Component {

    state = {
        value: initialValue
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (e, change) => {

        //Se a primeira tecla for diferente de Ctrl ele encerra aqui.
        if (!e.ctrlKey) { return }
        e.preventDefault()

        //Switch verifica qual key esta vindo do evento 'e'
        switch (e.key) {
            //caso B adiciona bold ao texto
            case 'b': {
                change.toggleMark('bold')
                return true
            }
            case 'i': {
                change.toggleMark('italic')
                return true
            }
            case 'c': {
                change.toggleMark('code')
                return true
            }
            case 'l': {
                change.toggleMark('list')
                return true
            }
            case 'u': {
                change.toggleMark('underline')
                return true
            }
            default: {
                return
            }
        }
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            case 'code':
                return <CodeMark {...props} />
            case 'list':
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                )
            case 'underline':
                return <u {...props.attributes}>{props.children}</u>
            default:
                return false
        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault()

        const { value } = this.state

        const change = value.change().toggleMark(type)

        this.onChange(change)
    }

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button
                        onClick={(e) => this.onMarkClick(e, 'bold')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={bold} size={20} />
                    </button>
                    <button
                        onClick={(e) => this.onMarkClick(e, 'italic')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={italic} size={20} />
                    </button>
                    <button
                        onClick={(e) => this.onMarkClick(e, 'code')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={code} size={20} />
                    </button>
                    <button
                        onClick={(e) => this.onMarkClick(e, 'list')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={list} size={20} />
                    </button>
                    <button
                        onClick={(e) => this.onMarkClick(e, 'underline')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={underline} size={20} />
                    </button>
                </FormatToolbar>
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    spellCheck={false}
                />
            </Fragment>
        )
    }
}