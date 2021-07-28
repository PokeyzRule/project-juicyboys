import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon'
import DocumentStyles from './Document.module.scss'

function Document({ document }) {
    console.log(document)
    let filename = document.split('/').pop()
    let extension = filename.split('.').pop()

    return (
        <div className={DocumentStyles.container} title={filename}>
            <a target="_blank" href={document}>
                <FileIcon extension={extension} {...defaultStyles[extension]} />
                <p className={DocumentStyles.fileName}>{filename}</p>
            </a>
        </div>
    )
}

export default Document