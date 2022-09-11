const encode = (s) => {
    return s
        .replace(/[^A-Za-z0-9\s][^A-Za-z0-9\s]/g, "_") // replace a double punctuation with _
        .replace(/[^A-Za-z0-9\s]/g, "") // remove single punctuation
        .replace(/[\s]/g, "-") // replace spaces with -
        .toLowerCase();
};

export default encode;
