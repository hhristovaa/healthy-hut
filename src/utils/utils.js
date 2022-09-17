export const isFieldEmpty = (field) => {
    if (field !== null && field !== undefined) {
        return field.length > 2;
    }

    return false;
}

export const capitalizeFirstLetter = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

export const listenForOutsideClicks = (
    listening,
    setListening,
    menuRef,
    setIsOpen,
) => {
    return () => {
        if (listening) return;
        if (!menuRef.current) return;
        setListening(true);
            ;[`click`, `touchstart`].forEach((type) => {
                document.addEventListener(`click`, (evt) => {
                    const cur = menuRef.current
                    const node = evt.target
                    if (cur.contains(node)) return;
                    setIsOpen(false)
                });
            });
    }
}