import React from 'react'

const CodeMark = props => {
    return (
        <div className="coder">
            <code>
                {props.children}
            </code>
        </div>
    )
}

export default CodeMark