import React from 'react';


export const formatMessagesFromError = error => {
    return (
        <>
            <span>
                <i class="fa fa-times" /> {error && error.message}
            </span>
        </>
    );

};

export const createActionType = (type, entity = 'App') => ({
    START: `@@[${entity}] ${type}_START`,
    SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
    ERROR: `@@[${entity}] ${type}_ERROR`,
    END: `@@[${entity}] ${type}_END`,
});

export  const createActionString = (type, entity = 'App') => `[${entity}] ${type}`;

export const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Please enter your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password should be 6+ characters';
    }
    return errors;
};