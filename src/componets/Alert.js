import React from 'react'

export default ({alert, hide}) => {

    return (
        <div 
            className={`alert alert-${alert.type || 'secondary'} alert-dismissible`} 
            role="alert"
        >
        {alert.message}
        <button type="button" className="close" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    )
}