export const isFieldEmpty = (field) => {
    if (field !== null && field !== undefined) {
        return field.length > 2;
    }

    return false;
}

